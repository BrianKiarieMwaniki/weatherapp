import React, { useEffect, useState } from "react";
import LocationPopup from "../components/LocationPopup";

export const Home = () => {
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  useEffect(() => {
    const latitude = localStorage.getItem("latitude");
    const longitude = localStorage.getItem("longitude");

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
    </div>
  );
};
