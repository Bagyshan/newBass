import React, { useEffect, useState } from 'react';
import './EventCard.css';
import favorite from '../../assets/Vector (12).png';
import placeicon from '../../assets/fmd_good.png';
import timeicon from '../../assets/access_time.png';
import calendaricon from '../../assets/Frame.png';
import cardimg from '../../assets/Rectangle 2540.png';
import artimg from '../../assets/Vector (11).png';
import qaicon from '../../assets/help.png';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getPost } from '../../store/apiSlice';
import { useNavigate, useParams } from 'react-router-dom';

const EventCard = () => {
  const [isBooked, setIsBooked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {eventId} = useParams()
  const {isLoading, post, categories} = useSelector(state=> state.api) 
  useEffect(()=>{
    dispatch(getPost(eventId))
    dispatch(getCategories())
  },[dispatch])
  useEffect(()=>{
    console.log(post)
    console.log(categories)
  },[post])
  const handleBookClick = () => {
    setIsBooked(true);
  };
  const eventTime = (post.event_date)?.split('T')
  return (
    <div className="event_card">
      <div className="event-title">{post?.title}</div>
      <div className="event-image">
        <img src={cardimg} alt="Event" className="event-img" />
        {!post.is_free && (<div className="price-container">Цена: {post.price}</div>)}
        <img src={favorite} alt="Favorite" className="favorite-icon" />
      </div>
      <div className="category">
        <img src={artimg} alt="Category" className="category-icon" />
        {categories[(post.category)-1]?.name}
      </div>
      <div className="description">
        {post?.description}
      </div>
      <div className="details">
        <div className="details-item">
          <img src={timeicon} alt="Time" className="details-icon" />
          {eventTime && eventTime[1]?.split("Z")}
        </div>
        <div className="details-item">
          <img src={calendaricon} alt="Calendar" className="details-icon" />
          {eventTime && eventTime[0]}
        </div>
        {/* <div className="details-item">
          <img src={qaicon} alt="More details" className="details-icon" />
          подробнее…
        </div> */}
      </div>
      <button className="book-button" onClick={handleBookClick}>
        {isBooked ? 'Забронировано' : 'Забронировать'}
      </button>
      <button className="book-button" onClick={() => navigate("/mapsmainpage")}>
        На карту
      </button>
    </div>
  );
};

export default EventCard;
