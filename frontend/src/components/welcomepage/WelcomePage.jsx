import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import welcomepagepng from '../../assets/Rectangle.png';
import './WelcomePage.css';

const WelcomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      image: welcomepagepng,
      text: 'Создавайте собственные <br/> мероприятия и событие',
    },
    {
      image: welcomepagepng,
      text: 'Создавайте собственные <br/> мероприятия и событие',
    },
    {
      image: welcomepagepng,
      text: 'Создавайте собственные <br/> мероприятия и событие',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/sign-in'); // Переход на страницу регистрации
    }
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-slide">
        <img src={slides[currentSlide].image} alt="Slide" className="slide-image" />
        <p className="slide-text" dangerouslySetInnerHTML={{ __html: slides[currentSlide].text }} />
        <div className="dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>
      <button className="next-button" onClick={handleNext}>
        {currentSlide < slides.length - 1 ? 'Далее' : 'Перейти'}
      </button>
    </div>
  );
};

export default WelcomePage;
