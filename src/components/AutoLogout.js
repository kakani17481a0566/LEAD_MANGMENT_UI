import { useEffect, useRef } from "react";

const AutoLogout = ({ timeout = 60000 }) => {
  const timer = useRef(null);

  // Reset timer and set up auto-logout
  const resetTimer = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      // Clear all possible user data
      localStorage.clear();
      sessionStorage.clear();
      if ('caches' in window) {
        caches.keys().then(names => names.forEach(name => caches.delete(name)));
      }
      // Force full reload to reset app state
      window.location.reload();
    }, timeout);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer(); // Start on mount

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      clearTimeout(timer.current);
    };
  }, []);

  return null;
};

export default AutoLogout;
