// SplashScreen.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <div className="splash-icon">
        <FontAwesomeIcon icon={faComments} />
      </div>
      <h1>Welcome to my Chat Application!</h1>
      <p>Loading...</p>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default SplashScreen;
