// RegistrationPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../registerpage/RegistrationPage.css';
import './createPostPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getCategories, getCurrentUser, login, register } from '../../store/apiSlice';
import { KEY_TOKEN } from '../../store/general';

const CreatPostPage = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch()
  const {isLoading, currentUser, categories} = useSelector((state) => state.api)
  const lat = localStorage.getItem('lat')
  const lng = localStorage.getItem('lng')
  const [newPost, setNewPost] = useState({
    title:"",
    description:"",
    image:"https://www.techwebtopic.com/wp-content/uploads/2022/02/PNG-to-Vector-SVG-File.jpg",
    longitude: lng,
    latitude: lat,
    event_date:"",
    event_time:"",
    is_free: true,
    price:"",
    creator: currentUser?.id,
    category: 1,
  })
  const navigateToMainPage = () => {
    localStorage.removeItem('lat')
    localStorage.removeItem('lng')
    navigate('/mapsmainpage'); 
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPost(prev => ({
        ...prev,
        image: file
      }));
    }
  };
  useEffect(()=>{
    dispatch(getCategories())
    dispatch(getCurrentUser())
  },[dispatch])
  useEffect(()=>{
    console.log(currentUser)
    setNewPost(prev=> ({...prev, creator: currentUser?.id}))
  },[currentUser])
  const handleChangePost = (event) => {
    const { name, value } = event.target;
    const processedValue = 
    name === 'is_free' ? value === 'true' : 
    name === 'category' ? Number(value) : // Преобразуем category в int
    value;
    
    setNewPost(prev => ({
      ...prev,
      [name]: processedValue
    }));
  }
  console.log(newPost)
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();

  // Добавляем остальные данные
  formData.append('title', newPost.title);
  formData.append('description', newPost.description);
  formData.append('event_date', `${newPost.event_date} ${newPost.event_time}:00+00`);
  formData.append('longitude', newPost.longitude);
  formData.append('latitude', newPost.latitude);
  formData.append('is_free', newPost.is_free);
  formData.append('price', newPost.price);
  formData.append('creator', newPost.creator);
  formData.append('category', newPost.category);

  // Добавляем изображение
  if (newPost.image) {
    formData.append('image', newPost.image);
  }
    await dispatch(createPost({newPost: formData, navigateToMainPage}))
    setNewPost({
        title:"",
        description:"",
        image:"",
        longitude: lng,
        latitude: lat,
        event_date:"",
        event_time: "",
        is_free: true,
        price:"",
        creator: currentUser?.id,
        category: 1,
    })
  };

  return (
    <div className="registration-container">
      <p className="description">Добавление мероприятия</p>
      <form onSubmit={handleSubmit}>
        <input 
          name="title" 
          value={newPost.title}
          placeholder="Название мероприятия" 
          className="phone-input"
          onChange={handleChangePost} />
        <textarea
          name='description' 
          value={newPost.description}
          placeholder="Описание мероприятия"
          className="phone-input"
          onChange={handleChangePost} />
          <div className='typeOfEvent'>
              <div className="radio-group">
                <label>
                  <input
                      type="radio"
                      name="is_free"
                      value='true'
                      checked={newPost.is_free === true}
                      onChange={handleChangePost}
                  />
                  Бесплатно
                </label>
                <label>
                  <input
                      type="radio"
                      name="is_free"
                      value="false"
                      checked={newPost.is_free === false}
                      onChange={handleChangePost}
                  />
                  Платно
                </label>
              </div>
            </div>
            {!newPost.is_free && (<input 
              name='price' 
              value={newPost.price}
              placeholder="Цена"
              className="phone-input"
              onChange={handleChangePost} />)}
            <input 
              className='postDate'
              name='event_date'
              value={newPost.event_date}
              type='date'
              onChange={handleChangePost}
            />
            <input 
              className='postDate'
              name='event_time'
              value={newPost.event_time}
              type='time'
              onChange={handleChangePost}
            />
            <input
              type='file'
              name="image"
              accept="image/*" 
              onChange={handleImageChange}
            />
        <select className='selectCategory' name='category' value={newPost.category} onChange={handleChangePost}>
          {categories.map((category, index) => (
            <option key={index} value={Number(category.id)}>
              {category.name}
            </option>
          ))}
        </select>
        
          <button className="submit-button" type='submit'>Добавить мероприятие</button> 
      </form>
      <button className="submit-button" onClick={navigateToMainPage}>Отмена</button> 
      
    </div>
  );
};

export default CreatPostPage;