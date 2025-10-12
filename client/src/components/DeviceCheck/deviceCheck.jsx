import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DeviceCheck = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      console.log('Current window width:', width); // Debug log
      if (width < 768) {
        console.log('Device width < 768px, redirecting...'); // Debug log
        navigate("/device-not-supported");
      }
    };

    checkDevice();

    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, [navigate]);

  return <>{children}</>;
};

export default DeviceCheck;
