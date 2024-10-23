import React, { useState } from 'react';
import './EventsCategoryPage.css';
import calendaricon from '../../assets/Frame.png';
import sporticon from '../../assets/sports_volleyball.png';
import celebrationicon from '../../assets/celebration.png';
import eduicon from '../../assets/school (1).png';
import articon from '../../assets/Vector (11).png';
import favoriteicon from '../../assets/Vector (12).png';
import cardimg from '../../assets/cardimg.jpeg';

const EventsCategoryPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date

  // Function to handle date change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="events-category-page">
      {/* Calendar Section */}
      <div className="calendar-section">
        <div className="calendar-header">
          <img src={calendaricon} alt="Calendar" className="calendar-icon" />
          <input 
            type="date" 
            value={selectedDate} 
            onChange={handleDateChange} 
            className="date-picker" 
          />
        </div>
      </div>

      {/* Categories Section */}
      <div className="categories-section">
        <h3 className="categories-title">Категории</h3>
        <div className="categories-list">
          <button className="category-button" style={{ backgroundColor: 'rgba(8, 194, 62, 1)' }}>
            <img src={sporticon} alt="Sport" className="category-icon" />
            Спорт
          </button>
          <button className="category-button" style={{ backgroundColor: 'rgba(36, 176, 172, 1)' }}>
            <img src={articon} alt="Art" className="category-icon" />
            Искусство
          </button>
          <button className="category-button" style={{ backgroundColor: 'rgba(4, 168, 107, 1)' }}>
            <img src={celebrationicon} alt="Entertainment" className="category-icon" />
            Развлечение
          </button>
          <button className="category-button" style={{ backgroundColor: 'rgba(135, 211, 0, 1)' }}>
            <img src={eduicon} alt="Education" className="category-icon" />
            Наука
          </button>
        </div>
      </div>

      {/* Events for Today Section */}
      <div className="events-section">
        <h3 className="events-title">Сегодня</h3>
        <div className="events-list">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="event-card" style={{ borderColor: 'rgba(8, 194, 62, 1)' }}> {/* Example color, adjust based on category */}
              <div className="event-image" style={{ backgroundImage: `url(${cardimg})` }}>
                <div className="price-tag">Цена</div>
                <img src={favoriteicon} alt="Favorite" className="favorite-icon" />
              </div>
              <div className="event-info">
                <span className="event-name">Название мероприятия</span>
                <span className="event-date">{selectedDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hot Tickets Section */}
      <div className="hot-tickets-section">
        <h3 className="hot-tickets-title">Горящие билеты!</h3>
        <div className="hot-tickets-list">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="event-card" style={{ borderColor: 'rgba(36, 176, 172, 1)' }}> {/* Example color, adjust based on category */}
              <div className="event-image" style={{ backgroundImage: `url(${cardimg})` }}>
                <div className="price-tag">Цена</div>
                <img src={favoriteicon} alt="Favorite" className="favorite-icon" />
              </div>
              <div className="event-info">
                <span className="event-name">Название мероприятия</span>
                <span className="event-date">{selectedDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsCategoryPage;
