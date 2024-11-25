import React, { useState, useRef, useEffect } from 'react';
import './MapsMainPage.css';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup, useMap, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getCurrentUser, getPosts, getPostsByCategory } from '../../store/apiSlice';
import plusIcon from '../../assets/plus.png'
import gpsIcon from '../../assets/gps.svg'
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
const MapsMainPage = () => {
  const [events, setEvents] = useState([]); // Состояние для хранения мероприятий
  const dispatch = useDispatch()
  const [showPopup, setShowPopup] = useState(false); // Состояние для управления видимостью попапа
  const [position, setPosition] = useState(null); // Состояние для хранения координат клика
  const popupRef = useRef(null); // Ссылка на контейнер попапа
  const {posts, categories, postsByCategory, currentUser} = useSelector((state) => state.api)
  const [flyToPosition,setFlyToPosition] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [selectedDate, setSelectedDate] = useState('')
  const [visiblePosts,setVisiblePosts] = useState([])
  const colorOfCategory = {
    1:"#A66E38",
    2:"#FFAD60",
    3:"#FFEEAD",
    4:"#96CEB4"
  }
  const navigate = useNavigate()
  
  useEffect(() => {
    // Получаем посты и категории при первой загрузке компонента
    dispatch(getPosts());
    dispatch(getCategories());
    dispatch(getCurrentUser())
  }, [dispatch]);
  
  useEffect(() => {
    // Устанавливаем видимые посты при изменении всех постов
    setVisiblePosts(posts);
  }, [posts]);
  
  useEffect(() => {
    // Проверяем, что категория выбрана и она не "Все"
    if (Number(selectedCategory) !== 0) {
      // Отправляем запрос на получение постов по выбранной категории
      dispatch(getPostsByCategory(Number(selectedCategory)));
    } else {
      // Если выбрана категория "Все", устанавливаем видимые посты на все посты
      setVisiblePosts(posts);
    }
  }, [selectedCategory, dispatch, posts]); // добавляем posts для корректного обновления
  
  useEffect(() => {
    // Устанавливаем видимые посты при изменении постов по категории
    if (Number(selectedCategory) !== 0) {
      setVisiblePosts(postsByCategory); // Показываем посты по выбранной категории
    }
  }, [postsByCategory, selectedCategory]);
  // useEffect(()=>{
  //   if (selectedDate === ''){
  //     return;
  //   }
  //   // Проверка н а пустую строку не нужна, если проверяем наличие значения
  //     setVisiblePosts(prev =>
  //       prev.filter(post => post.event_date?.split("T")[0] === selectedDate)
  //     );
  // }, [selectedDate])
  useEffect(() => {
    if (selectedDate === '') {
      // Если дата не выбрана, показываем все посты (либо по категории, либо все)
      if (Number(selectedCategory) !== 0) {
        setVisiblePosts(postsByCategory); // Показываем посты по категории
      } else {
        setVisiblePosts(posts); // Показываем все посты
      }
      return;
    }
  
    // Фильтруем исходный массив постов (posts или postsByCategory)
    setVisiblePosts(() => {
      const sourcePosts = Number(selectedCategory) !== 0 ? postsByCategory : posts;
      return sourcePosts.filter(post => post.event_date?.split("T")[0] === selectedDate);
    });
  }, [selectedDate, selectedCategory, posts, postsByCategory]);
  
  // Компонент, который обрабатывает клики на карте
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition(e.latlng); // Сохраняем координаты клика
        setShowPopup(true); // Показываем попап
        localStorage.setItem('lat', e.latlng.lat);
        localStorage.setItem('lng', e.latlng.lng)
      },
    });

    return null; // Не отображаем маркер здесь
  }
  const addIcon = new L.Icon({
    iconUrl: plusIcon,
    iconSize : [30,30]
  })
  const createCustomIcon = (color) => {
    return L.divIcon({
        className: 'custom-icon',
        html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: solid white 3px"></div>`,
        iconSize: [10, 10],
        iconAnchor: [13, 13]
    });
  };
  function GeolocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      locationfound(e) {
        setPosition(e.latlng)
        // map.flyTo(e.latlng, map.getZoom())
      },
    })
    
    useEffect(() => {
      map.locate()
    }, [map])
    useEffect(() => {
      if (flyToPosition && position) {
        map.flyTo(position, 17); // Выполняем полёт карты только при нажатии кнопки
        setFlyToPosition(false); // Сбрасываем состояние после полёта
      }
    }, [flyToPosition, position, map]);
    return (<>{position === null ? null : (
      <>
        <Marker 
          position={position}
          icon={createCustomIcon('#237F87')}
        >
          <Popup>You are here</Popup>
        </Marker>
        <Circle
            center={position}
            radius={50} // Радиус в метрах (например, 200 метров)
            color="#2E9CA6"
            fillColor="#82F5FF"
            fillOpacity={0.2} // Прозрачность круга
          />
        
      </>
    )}
    </>
    )
  }
  
  // Обработка клика вне попапа
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false); // Закрываем попап
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleClosePopup = (e) => {
   e.stopPropagation()
    setPosition(null)
  };
  const handleSelectDate = (e) =>{
    setSelectedDate(e.target.value)
  }
  const handleSelectCategory = (e) =>{
    setSelectedCategory(e.target.value)
  }
  return (
    <div className='maps'>
      <MapContainer center={[42.87, 74.59]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <button 
          className='gpsButton'
          onClick={(e) => {
            e.stopPropagation()
            setFlyToPosition(true)}}  
        >
              <img src={gpsIcon} style={{width:'35px',height:'35px', margin:'0',padding:'0'}} alt="" />
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker /> {/* Компонент для обработки кликов */}
        {/* <AutoLocationMarker /> */}
        <GeolocationMarker/>
        {/* Отображаем маркеры для каждого мероприятия */}
        {visiblePosts.map((post) => (
          <Marker key={post.id} position={[post.latitude, post.longitude]} icon={createCustomIcon(colorOfCategory[post?.category])}>
            <Popup>
              
              <img style={{width:"100%"}}src={post?.image}/> <br/>
              {post.title} <br />
              Дата: {(post.event_date).split("T")[0]} <br/>
              Время: {(post.event_date).split("T")[1].split("Z")} <br/>
              {post.isFree ? '': post.price} <br/>
              {categories[(post?.category)-1]?.name} <br/>
              <p style={{color:"blue"}} onClick={() => navigate(`/eventsitem/${post.id}`)}>Подробнее...</p>
            </Popup>
          </Marker>
        ))}
        <select className='selectCategoryMap' name='category' onChange={handleSelectCategory}>
          <option key={0} value={0}>
            Все
          </option>
          {categories.map((category) => (
            <option key={category.id} value={Number(category.id)}>
              {category.name}
            </option>
          ))}
        </select>
        <input className='selectDate' type='date' onChange={handleSelectDate}/>
        {/* Отображаем маркер для текущего клика и попап */}
        {currentUser.user_type == 'vip' && (
          position && (
            <Marker position={position} icon={addIcon}>
              <Popup>
                <div ref={popupRef}>
                  <p>Вы хотите создать мероприятие?</p>
                  <button onClick={() => navigate("/createpost")}>Да</button>
                  <button onClick={handleClosePopup}>Нет</button>
                </div>
              </Popup>
            </Marker>
        )
        )}
      </MapContainer>
    </div>
  );
}

export default MapsMainPage;
