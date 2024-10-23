import React from 'react';
import homeicon from '../../assets/cottage (1).png';
import addicon from '../../assets/assistant.png';
import favoriteicon from '../../assets/Vector (8).png';
import profileicon from '../../assets/Vector (9).png';
import './BottomNavBar.css';
import { useNavigate } from 'react-router-dom';

const BottomNavBar = () => {
   const navigate = useNavigate();


  return (
    <div className="bottom-nav">
      <div className="nav-icon">
        <img onClick={()=> navigate('/mapsmainpage')} className='homeimg' src={homeicon} alt="Home" />
      </div>
      <div className="nav-icon">
        <img onClick={()=> navigate('/eventcategorypage')} className='addimg' src={addicon} alt="add" />
      </div>
      <div className="nav-icon">
        <img onClick={()=> navigate('/savedeventspage')} className='favoriteimg' src={favoriteicon} alt="favorite" />
      </div>
      <div className="nav-icon">
        <img onClick={()=> navigate('/userprofile')} className='profileimg' src={profileicon} alt="Profile" />
      </div>
    </div>
  );
};

export default BottomNavBar;
