import React, { useState } from 'react';
import WelcomePage from '../welcomepage/WelcomePage';
import RegistrationPage from '../registerpage/RegistrationPage';

const Main = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleProceed = () => {
    setShowWelcome(false);
  };

  return (
    <div>
      {showWelcome ? (
        <WelcomePage onProceed={handleProceed} />
      ) : (
        <RegistrationPage />
      )}
    </div>
  );
};

export default Main;
