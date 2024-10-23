import React, { useEffect } from 'react';
import './SavedEvents.css';
import eventImage from '../../assets/cardimg.jpeg'; 
import { useDispatch, useSelector } from 'react-redux';
import { getFavorites } from '../../store/apiSlice';

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
  const {isLoading, favorites} = useSelector(state => state.api);
  useEffect(()=>{
    dispatch(getFavorites())
  },[dispatch])
  useEffect(()=>{
    console.log(favorites)
  },[favorites])
  return (
    <div className="saved-events-page">
      {savedEvents.map((event, index) => (
        <div key={index} className="saved-event-card">
          <h3 className="event-name">{event.name}</h3>
          <div className="event-image-container">
            <div className="event-image" style={{ backgroundImage: `url(${eventImage})` }} />
            <div className="price-tag">Цена</div>
            <div className="favorite-icon">❤️</div> 
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedEventsPage;
