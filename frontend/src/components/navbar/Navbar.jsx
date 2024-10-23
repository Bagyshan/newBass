import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import searchicon from '../../assets/search (1).png';
import bellicon from '../../assets/Vector (10).png';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation(); 
  const navigate = useNavigate();

  const getTitleAndIcons = () => {
    switch (location.pathname) {
      case '/mapsmainpage':
        return {
          title: 'Главная',
          icons: [
            <img onClick={()=> navigate('/searchpage')} key="search-icon" src={searchicon} alt="Search" className="icon" />,
            <img key="bell-icon" src={bellicon} alt="Notifications" className="icon" />
          ]
        };
      case '/eventsitem': 
        return {
          title: 'Мероприятия',
          icons: [
            <img onClick={()=> navigate('/searchpage')} key="search-icon" src={searchicon} alt="Search" className="icon" />,
            <img key="bell-icon" src={bellicon} alt="Notifications" className="icon" />

          ]
        };
      case '/eventcategorypage': 
        return {
          title: 'Поиск мероприятий',
          icons: [
            <img onClick={()=> navigate('/searchpage')}  key="search-icon" src={searchicon} alt="Search" className="icon" />,
            <img key="bell-icon" src={bellicon} alt="Notifications" className="icon" />
          ]
        };
      case '/savedeventspage': 
        return {
          title: 'Сохраненные',
          icons: [
            <img onClick={()=> navigate('/searchpage')} key="search-icon" src={searchicon} alt="Search" className="icon" />,
            <img key="bell-icon" src={bellicon} alt="Notifications" className="icon" />
          ]
        };
      case '/userprofile': 
        return {
          title: 'Профиль',
          icons: [
            <img onClick={()=> navigate('/searchpage')} key="search-icon" src={searchicon} alt="Search" className="icon" />,
            <img key="bell-icon" src={bellicon} alt="Notifications" className="icon" />
          ]
        };
      case '/searchpage': 
        return {
          title: 'Поиск ',
          icons: [
            <img key="search-icon" src={searchicon} alt="Search" className="icon" />,
            <img key="bell-icon" src={bellicon} alt="Notifications" className="icon" />
          ]
        };
      default:
        return {
          title: 'Bass2bass',
          icons: []
        };
    }
  };

  const { title, icons } = getTitleAndIcons();

  return (
    <nav className="navbar">
      <div className="site-name">{title}</div>
      <div className="icons-container">
        {icons.map((icon) => icon)}
      </div>
    </nav>
  );
};

export default Navbar;
