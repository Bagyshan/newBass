// RegistrationPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import basicon from '../../assets/snapedit_1722799096937-removebg (1) 3.png';
import googleicon from '../../assets/Vector (3).png';
import appleicon from '../../assets/_Apple Logo.png';
import './RegistrationPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../../store/apiSlice';
import { KEY_TOKEN } from '../../store/general';

const SignUp = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch()
  const {isLoading} = useSelector((state) => state.api)

  const [userRegistration, setUserRegistration] = useState({
    email:"",
    username:"",
    first_name:"",
    last_name:"",
    password:"",
  })
  const navigateToLogin = () => {
    navigate('/sign-in'); 
  };
  const handleChangeUserRegistration = (event) => {
    const { name, value } = event.target;
    setUserRegistration(prev => ({...prev, [name]: value}))
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    await dispatch(register({user: userRegistration, navigateToLogin}))
    setUserRegistration({
        email:"",
        username: "",
        first_name:"",
        last_name:"",
        password:"",
    })
  };

  return (
    <div className="registration-container">
      <img src={basicon} alt="Logo" className="logo" />
      <p className="description">Регистрация</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          name='email' 
          value={userRegistration.email}
          placeholder="E-mail" 
          className="phone-input"
          onChange={handleChangeUserRegistration} />
        <input 
          name='username' 
          value={userRegistration.username}
          placeholder="Никнейм"
          className="phone-input"
          onChange={handleChangeUserRegistration} />
        <input 
          name='first_name' 
          value={userRegistration.first_name}
          placeholder="Имя"
          className="phone-input"
          onChange={handleChangeUserRegistration} />
        <input 
          name='last_name' 
          value={userRegistration.last_name}
          placeholder="Фамилия" 
          className="phone-input"
          onChange={handleChangeUserRegistration} />
        <input
          type="password" 
          name='password' 
          placeholder="Пароль" 
          value={userRegistration.password}
          className="phone-input" 
          onChange={handleChangeUserRegistration}/>
          <button className="submit-button" type='submit'>Создать аккаунт</button> 
      </form>
      
    </div>
  );
};

export default SignUp;
