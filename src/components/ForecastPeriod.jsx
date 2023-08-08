import React, { useContext } from "react";
import { motion } from 'framer-motion';
import { SettingsContext } from "../contexts/SettingsContext";

export const ForecastPeriod = ({ period}) => {
  const {
    name,
    condition,
    avgTemp: { avgTempF, avgTempC },
    avgRainPerct,
  } = period;

  const { text: description, icon } = condition;

  const {useFahrenheit} = useContext(SettingsContext);

  const animationVariants = {
    hidden: { opacity: 0 , y: 120},
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        type: "easeIn",
        stiffness: 100,
      },
    },
  };

  return (
    <React.Fragment>
        <motion.div className="forecast-period" variants={animationVariants} initial="hidden" animate="visible">
          <p className="name">{name}</p>
          <p className="temp">
            {useFahrenheit ? `${avgTempF} \u00B0F` : `${avgTempC}\u00B0C`}
          </p>
          <div className="description">{description}</div>
          <div className="icon">
            <img src={icon} alt="forecast icon" className="img" />
          </div>
          <p className="rain">
            <svg className="rain--icon">
              <use xlinkHref="/symbols.svg#icon-rain"></use>
            </svg>
            <span className="rain--text">{avgRainPerct}%</span>
          </p>
        </motion.div>      
    </React.Fragment>
  );
};
