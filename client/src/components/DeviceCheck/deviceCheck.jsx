import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DeviceCheck = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 768) {
        navigate('/device-not-supported');
      }
    };

    checkDevice();

    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, [navigate]);

  return <>{children}</>;
};

export default DeviceCheck;
