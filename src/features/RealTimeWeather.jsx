import React, { useEffect, useState } from "react";
import { getWeatherForecast } from "../api/weatherService";
import { getLocation } from "../functions/location";
import { getTodaysDate } from "../functions/date";

export const RealTimeWeather = () => {
  const [condition, setCondition] = useState({ description: "", icon: " " });
  const [location, setLocation] = useState({
    name: "",
    region: "",
    country: "",
  });
  const [tempInfo, setTempInfo] = useState({ tempC: 0, tempF: 0 });
  const [windInfo, setWindInfo] = useState({
    windSpeedKph: 0,
    windSpeedMph: 0,
    windDirection: "",
  });

  const [humidity, setHumidity] = useState(0);
  const [cloud, setCloud] = useState(0);

  useEffect(() => {
    const { latitude, longitude } = getLocation();
    const getWeather = async () => {
      const { location, current } = await getWeatherForecast(
        latitude,
        longitude,
        7
      );

      if (location) {
        const { name, region, country } = location;
        setLocation({ name, region, country });
      }

      if (current) {
        const {
          condition: { text, icon },
          temp_c: tempC,
          temp_f: tempF,
          wind_kph: windSpeed,
          wind_mph: windSpeedMph,
          wind_dir: windDirection,
          humidity,
          cloud,
        } = current;

        setCondition({ description: text, icon });
        setTempInfo({ tempC, tempF });
        setWindInfo({
          windSpeedKph: windSpeed,
          windSpeedMph,
          windDirection,
        });
        setHumidity(humidity);
        setCloud(cloud);
      }
    };

    getWeather();
  }, []);
  const { name, region, country } = location;
  const { description, icon } = condition;
  const { tempC, tempF } = tempInfo;
  const { windSpeedKph: windSpeed, windSpeedMph, windDirection } = windInfo;

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
                <span className="value">{tempC}&deg;</span>
              </div>
            </div>
            <div className="real-time__condition-item">
              <svg className="icon">
                <use xlinkHref="/symbols.svg#icon-wind"></use>
              </svg>
              <div className="info">
                <span className="text">Wind</span>
                <span className="value">
                  {windDirection}&nbsp;{windSpeed} km/h
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
