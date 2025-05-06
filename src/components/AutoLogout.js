// src/components/AutoLogout.js

import { useEffect } from 'react';

const AutoLogout = () => {
  useEffect(() => {
    let logoutTimer;

    // Function to log out the user
    const logout = () => {
      console.log('User has been logged out due to inactivity');
      // Your logout logic here, e.g., clearing tokens, redirecting to login page
      window.location.href = '/login'; // Example redirect to login page
    };

    // Reset the timer when there is activity
    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(logout, 60000); // Set timeout for 1 minute (60000 ms)
    };

    // List of events to track user activity
    const events = ['mousemove', 'keydown', 'click'];

    // Attach event listeners for activity
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Initial timer setup
    logoutTimer = setTimeout(logout, 60000); // Start the timer when the component mounts

    // Cleanup event listeners when the component unmounts
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      clearTimeout(logoutTimer);
    };
  }, []);

  return null; // This component does not render anything itself
};

export default AutoLogout;
