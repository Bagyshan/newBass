import React, { useEffect, useState } from 'react';
import './SavedEvents.css';
import eventImage from '../../assets/cardimg.jpeg'; 
import { useDispatch, useSelector } from 'react-redux';
import timeicon from '../../assets/access_time.png';
import calendaricon from '../../assets/Frame.png';
import { getCurrentUser, getFavorites, getPost } from '../../store/apiSlice';
import { useNavigate } from 'react-router-dom';

const savedEvents = [
  { name: 'Мероприятие 1' },
  { name: 'Мероприятие 2' },
  { name: 'Мероприятие 3' },
  { name: 'Мероприятие 4' },
  { name: 'Мероприятие 5' },
  { name: 'Мероприятие 6' },
  { name: 'Мероприятие 7' },
];

const SavedEventsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {isLoading, favorites, currentUser} = useSelector(state => state.api);
  const [favoriteEvents,setFavoriteEvents] = useState([])

  useEffect(()=>{
    dispatch(getFavorites())
    dispatch(getCurrentUser())
  },[dispatch])
  useEffect(()=>{
    const fetchFavoritePosts = async () => {
      // Ждем, пока все запросы getPost завершатся
      const posts = await Promise.all(
        favorites.map(async (favorite) => {
          const post = await dispatch(getPost(favorite.post));
          return post.payload; // Возвращаем каждый пост
        })
      );
      // Обновляем состояние с результатами
      setFavoriteEvents(posts);
    };
  
    if (favorites.length > 0) {
      fetchFavoritePosts();
    }
    
  },[favorites])
  useEffect(()=>{
    console.log(favorites)
  },[favorites])
  if(!currentUser){
    return (<div className='user-profile-page' style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100% ", flexDirection:"column"}}> 
            <p>Войдите в аккаунт</p>
            <button className="book-button" onClick={()=> navigate(`/sign-in`)}>Войти</button>
       </div>)
  }
  return (
    <div className="saved-events-page">
      {favoriteEvents.map((event) => (
        <div key={event.id} className="saved-event-card" onClick={()=> navigate(`/eventsitem/${event.id}`)}>
          <h3 className="event-name">{event.title}</h3>
          <div className="event-image-container">
            <div className="event-image" style={{ backgroundImage: `url(${event.image})` }} />
            {event.is_free ? <div></div> : <div className="price-tag">{event.price}</div>}
            <div>
              <img src={calendaricon} alt="Calendar" className="details-icon" />
              {(event.event_date).split("T")[0]}
            </div>
            <div>
              <img src={timeicon} alt="Time" className="details-icon" />
              {(event.event_date).split("T")[1].split("Z")}
            </div>
            <div className="favorite-icon">❤️</div> 
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedEventsPage;
