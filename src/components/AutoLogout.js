import { useEffect, useRef } from "react";

const AutoLogout = ({ timeout = 60000 }) => {
  const timer = useRef(null);

  const resetTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      localStorage.clear();      // Clear local storage
      sessionStorage.clear();    // Clear session storage
      caches.keys().then(names => names.forEach(name => caches.delete(name))); // Optional: clear browser cache
      window.location.reload();  // 🔁 Full page reload (user will be logged out)
    }, timeout);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      clearTimeout(timer.current);
    };
  }, []);

  return null;
};

export default AutoLogout;
