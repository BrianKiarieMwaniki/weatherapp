import React, { useEffect, useState } from "react";
import LocationPopup from "../features/LocationPopup";
import { getLocation } from "../functions/location";
import { RealTimeWeather } from "../features/RealTimeWeather";

export const Home = () => {
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  useEffect(() => {
    const { latitude, longitude } = getLocation();

    if (latitude === null && longitude === null) {
      setShowLocationPopup(true);
    }
  }, []);

  const handlePopupClose = () => {
    setShowLocationPopup(false);
  };

  const currentView = showLocationPopup ? (
    <LocationPopup
      onCancel={handlePopupClose}
      onAllow={() => setShowLocationPopup(false)}
    />
  ) : (
    <RealTimeWeather/>
  );

  return (
    <div className="home">
      {currentView}
    </div>
  );
};
