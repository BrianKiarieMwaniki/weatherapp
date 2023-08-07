import React from "react";
import { getWeatherForecast } from "../api/weatherService";
import { getLocation } from "../functions/location";
import { getTodaysDate } from "../functions/date";
import { useQuery } from "react-query";
import { calculateTimeUntilNextPoll } from "../functions/polling";

export const RealTimeWeather = () => {
  const useMetricSystem = false;
  const useFahrenheit = false;

  const fetchForecast = async () => {
    const { latitude, longitude } = getLocation();
    return await getWeatherForecast(latitude, longitude, 7);
  };

  const { data } = useQuery("forecast", fetchForecast, {
    refetchInterval: () => calculateTimeUntilNextPoll(),
  });

  const { location, current } = data;
  const {
    condition,
    temp_c: tempC,
    temp_f: tempF,
    wind_kpH: windSpeed,
    wind_mph: windSpeedMph,
    wind_dir: windDirection,
    humidity,
    cloud,
  } = current;

  const { name, region, country } = location;
  const { description, icon } = condition;

  return (
    <div className="real-time">
      <div className="real-time__main">
        <div className="real-time__location">
          <p>{name},</p>
          <p>{region},</p>
          <p>{country}</p>
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
