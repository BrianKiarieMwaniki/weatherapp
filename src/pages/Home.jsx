import React, { useEffect, useState } from "react";
import LocationPopup from "../components/LocationPopup";
import { getLocation } from "../services/location";
import { RealTimeWeather } from "../components/RealTimeWeather";

export const Home = () => {
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  useEffect(() => {
    const {latitude, longitude} = getLocation();

    if (latitude === null && longitude === null) {
      setShowLocationPopup(true);
    }
  }, []);

  const handlePopupClose = () => {
    setShowLocationPopup(false);
  };

  return (
    <div className="home">
      {showLocationPopup && (
        <div className="popup-container">
          <LocationPopup
            onCancel={handlePopupClose}
            onAllow={() => setShowLocationPopup(false)}
          />
        </div>
      )}

      {!showLocationPopup && <RealTimeWeather/>}

    </div>
  );
};
