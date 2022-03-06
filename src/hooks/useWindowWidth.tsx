import { useState, useEffect } from 'react';

function getWindowWidth() {
  const { innerWidth: width } = window;
  return width;
}

const useWindowWidth = (): number => {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    function handleResize() {
      setWindowWidth(getWindowWidth());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowWidth;
};

export default useWindowWidth;
