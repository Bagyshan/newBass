import React, { useEffect } from 'react';
import './UserProfilePage.css';
import avatar from '../../assets/userimage.png'; 
import placeicon from '../../assets/fmd_good.png'; 
import usericon from '../../assets/Vector (13).png'; 
import geoicon from '../../assets/Vector (14).png'; 
import likeicon from '../../assets/favorite_border.png'; 
import bellicon from '../../assets/notifications.png'; 
import qaicon from '../../assets/help_outline.png'; 
import officon from '../../assets/power_settings_new.png'; 
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/apiSlice';

const UserProfilePage = () => {
  const dispatch = useDispatch()
  const {isLoading, currentUser} = useSelector(state => state.api)
  useEffect(()=>{
    dispatch(getCurrentUser())
  },[dispatch])
  useEffect(()=>{
    console.log(currentUser)
  },[currentUser])
  return (
    <div className="user-profile-page">
      <div className="profile-container">
        <div className="avatar-section">
          <img src={avatar} alt="User Avatar" className="avatar" />
        </div>
        <div className="user-info">
          <h2 className="user-name">{currentUser?.last_name} {currentUser?.first_name}</h2>
          <p className="user-email">{currentUser?.email}</p>
          <div className="location-info">
            <img src={placeicon} alt="Location" className="location-icon" />
            <span className="location">Город</span>
          </div>
        </div>
      </div>
      <hr className="divider" />
      <div className="profile-links">
        <div className="profile-link">
          <img src={usericon} alt="Edit Profile" className="profile-icon" />
          <span>Редактировать профиль</span>
          <span className="arrow"></span>
        </div>
        <hr className="divider" />
        <div className="profile-link">
          <img src={geoicon} alt="Geolocation" className="profile-icon" />
          <span>Геолокация</span>
          <span className="arrow"></span>
        </div>
        <hr className="divider" />
        <div className="profile-link">
          <img src={likeicon} alt="My Interests" className="profile-icon" />
          <span>Мои интересы</span>
          <span className="arrow"></span>
        </div>
        <hr className="divider" />
        <div className="profile-link">
          <img src={bellicon} alt="Notifications" className="profile-icon" />
          <span>Уведомления</span>
          <span className="arrow"></span>
        </div>
        <hr className="divider" />
        <div className="profile-link">
          <img src={qaicon} alt="Help" className="profile-icon" />
          <span>Помощь</span>
          <span className="arrow"></span>
        </div>
        <hr className="divider" />
        <div className="profile-link">
          <img src={officon} alt="Logout" className="profile-icon" />
          <span>Выйти</span>
          <span className="arrow"></span>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
