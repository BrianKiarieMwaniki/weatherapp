import React, { useEffect, useState } from "react";
import { getRealTimeWeather } from "../api/weatherService";
import { getLocation } from "../functions/location";

export const RealTimeWeather = () => {
  const [condition, setCondition] = useState({ description: "", icon: " " });
  const [location, setLocation] = useState({
    name: "",
    region: "",
    country: "",
  });
  const [tempInfo, setTempInfo] = useState({ tempC: 0, tempF: 0 });
  const [windInfo, setWindInfo] = useState({ windSpeed: 0, windDirection: "" });
  useEffect(() => {
    const { latitude, longitude } = getLocation();
    const getWeather = async () => {
      const { data } = await getRealTimeWeather(latitude, longitude);

      if (data) {
        const {
          location: { name, region, country },
          current: {
            condition: { text, icon },
            temp_c: tempC,
            temp_f: tempF,
            wind_kph: windSpeed,
            wind_dir: windDirection,
          },
        } = data;

        setLocation({ name, region, country });
        setCondition({ description: text, icon });
        setTempInfo({ tempC, tempF });
        setWindInfo({ windSpeed, windDirection });
      }
    };

    getWeather();
  }, []);
  const { name, region, country } = location;
  const { description, icon } = condition;
  const { tempC, tempF } = tempInfo;
  const { windSpeed, windDirection } = windInfo;
  return (
    <div className="real-time">
      <div className="real-time__condition">
        <div className="real-time__location">
          <p>{name}</p>
          <p>{region}</p>
          <p>{country}</p>
        </div>
        <p>{description}</p>
        <img src={icon} alt="weather icon" />
      </div>
      <div className="real-time__tempInfo">
        <p>{tempC}</p>
        <p>{tempF}</p>
      </div>
      <div className="real-time__windInfo">
        <p>{windSpeed}</p>
        <p>{windDirection}</p>
      </div>
    </div>
  );
};
