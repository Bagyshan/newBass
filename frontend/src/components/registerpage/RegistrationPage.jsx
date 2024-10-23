// RegistrationPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import basicon from '../../assets/snapedit_1722799096937-removebg (1) 3.png';
import googleicon from '../../assets/Vector (3).png';
import appleicon from '../../assets/_Apple Logo.png';
import './RegistrationPage.css';
import { useDispatch } from 'react-redux';
import { login } from '../../store/apiSlice';
import { KEY_TOKEN } from '../../store/general';

const RegistrationPage = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch()
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('')
  const navigateToMainPage = () => {
    navigate('/mapsmainpage'); 
  };
  const navigateToRegistrtation = () =>{
    navigate('/sign-up')
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    await dispatch(login({user:{email: email, password: password}, navigateToMainPage}))
    setEmail('');
    setPassword('');
  };

  return (
    <div className="registration-container">
      <img src={basicon} alt="Logo" className="logo" />
      <p className="description">Введите E-mail</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          name='email' 
          value={email}
          placeholder="E-mail" 
          className="phone-input"
          onChange={(e)=> setEmail(e.target.value)} />
        <input 
          type="password" 
          name='password' 
          placeholder="Пароль" 
          value={password}
          className="phone-input" 
          onChange={(e)=> setPassword(e.target.value)}/>
          <button className="submit-button" type='submit'>Войти</button> 
      </form>
      <p className="or-text">или</p>
      {/*<div className="social-buttons">
        <button className="social-button google-button">
          <img src={googleicon} alt="Google Icon" className="social-icon google-icon" />
          Войти с помощью Google
        </button>
        <button className="social-button apple-button">
          <img id='appleicon' src={appleicon} alt="Apple Icon" className="social-icon apple-icon" />
          Войти с помощью Apple
        </button>
      </div> */}
      <button className="submit-button"  onClick={navigateToRegistrtation}>Создать аккаунт</button> 
    </div>
  );
};

export default RegistrationPage;
