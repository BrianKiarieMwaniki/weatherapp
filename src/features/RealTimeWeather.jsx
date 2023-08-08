import React, { useContext } from "react";
import { getTodaysDate } from "../functions/date";
import { SettingsContext } from "../contexts/SettingsContext";
import CityTownSearch from "./CityTownSearch";

export const RealTimeWeather = (props) => {
  
  const {location, currentWeather: current} = props;
  const {useMetricSystem, useFahrenheit} = useContext(SettingsContext);

  const {
    condition,
    temp_c: tempC,
    temp_f: tempF,
    wind_kph: windSpeed,
    wind_mph: windSpeedMph,
    wind_dir: windDirection,
    humidity,
    cloud,
    precip_in:rain
  } = current;

  const { name, region, country } = location;
  const { description, icon } = condition;

  return (
    <div className="real-time">
      <div className="real-time__main">
        <div className="real-time__location">
         <div className="info">
            <p>{name},</p>
            <p>{region},</p>
            <p>{country}</p>
         </div>
         <div className="input-box">
          <CityTownSearch/>
         </div>
        </div>
        <div className="real-time__date">
          <p> {getTodaysDate()}</p>
        </div>
        <div className="real-time__condition">
          <div className="real-time__condition-items">
            <div className="real-time__condition-item">
              <svg className="icon">
                <use xlinkHref="/symbols.svg#icon-thermometer"></use>
              </svg>
              <div className="info">
                <span className="text">Feels like</span>
                <span className="value">
                  {useFahrenheit ? `${tempF} \u00B0F` : `${tempC}\u00B0C`}
                </span>
              </div>
            </div>
            <div className="real-time__condition-item">
              <svg className="icon">
                <use xlinkHref="/symbols.svg#icon-wind"></use>
              </svg>
              <div className="info">
                <span className="text">Wind</span>
                <span className="value">
                  {windDirection}&nbsp;
                  {useMetricSystem
                    ? `${windSpeed} km/h`
                    : `${windSpeedMph} m/h`}
                </span>
              </div>
            </div>
            <div className="real-time__condition-item">
              <svg className="icon">
                <use xlinkHref="/symbols.svg#icon-humidity"></use>
              </svg>
              <div className="info">
                <span className="text">Humidity</span>
                <span className="value">{humidity}%</span>
              </div>
            </div>
            <div className="real-time__condition-item">
              <svg className="icon">
                <use xlinkHref="/symbols.svg#icon-clouds"></use>
              </svg>
              <div className="info">
                <span className="text">Cloud Cover</span>
                <span className="value">{cloud}%</span>
              </div>
            </div>
            <div className="real-time__condition-item">
              <svg className="icon">
                <use xlinkHref="/symbols.svg#icon-rain"></use>
              </svg>
              <div className="info">
                <span className="text">Rain</span>
                <span className="value">{rain}</span>
              </div>
            </div>
          </div>
          <p className="description">{description}</p>
          <img
            src={icon}
            alt="weather icon"
            className="real-time__condition--img"
          />
        </div>
      </div>
    </div>
  );
};
