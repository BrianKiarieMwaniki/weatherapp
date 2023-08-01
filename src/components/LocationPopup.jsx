import React from "react";
import { setLocation } from "../services/location";
import { motion } from "framer-motion";

export const LocationPopup = ({ onCancel, onAllow }) => {
  const popupVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        type: "tween",
        stiffness: 100,
      },
    },
    explode: {
      opacity: 0,
      scale: [1, 2, 0],
      transition: {
        duration: 0.5,
        type: "spring",
        damping: 20,
        stiffness: 300,
      },
    },
  };

  const handleAllow = () => {
    setLocation();

    onAllow();
  };
  return (
    <motion.div
      className="popup"
      variants={popupVariants}
      initial="hidden"
      animate="visible"
      exit="explode"
    >
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
    </motion.div>
  );
};

export default LocationPopup;
