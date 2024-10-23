// App.js
import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import MyRoutes from './routes/MyRoutes'; 
import './App.css';
import BottomNavBar from './components/navigationbar/BottomNavBar';

const AppContent = () => {
  const location = useLocation();

  // Определяем, показывать ли BottomNavBar
  const showBottomNavBar = !['/', '/register'].includes(location.pathname);

  return (
    <div className="app-container">
      <Navbar />
      <div className="content-overlay">
        <MyRoutes />
      </div>
      {showBottomNavBar && <BottomNavBar />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
