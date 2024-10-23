import React, { useState } from 'react';
import './SearchPage.css';
import sporticon from '../../assets/sports_volleyball.png';
import celebrationicon from '../../assets/celebration.png';
import eduicon from '../../assets/school (1).png';
import articon from '../../assets/Vector (11).png';
import { FaSearch } from 'react-icons/fa';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="search-page">
      <h2 className="search-title">Поиск мероприятий</h2>
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
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Введите название или категорию"
          className="search-input"
        />
        <button className="search-button" onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchPage;
