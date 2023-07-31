import React from 'react'
import { getLocation } from "../services/location";


export const LocationPopup = ({onCancel, onAllow}) => {
    const handleAllow = () => {
        getLocation();

        onAllow();
    };
    return (
      <div className="popup">
        <div className="popup-content">
          <p className="popup-content__text">
            Allow <strong>Weather App</strong> to get your location.
          </p>
        </div>
        <div className="popup-actions">
          <button className="popup-actions__btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="popup-actions__btn" onClick={handleAllow}>
            Allow
          </button>
        </div>
      </div>
    );
}

export default LocationPopup
