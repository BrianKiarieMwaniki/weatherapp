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
  const [windInfo, setWindInfo] = useState({ windSpeedKph: 0, windSpeedMph:0, windDirection: "", windDegree: 0 });
  const [pressureInfo, setPressureInfo] = useState({pressureMb: 0, pressureIn: 0});
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
            wind_mph: windSpeedMph,
            wind_dir: windDirection,
            wind_degree: windDegree,
            pressure_mb: pressureMb,
            pressure_in: pressureIn
          },
        } = data;

        setLocation({ name, region, country });
        setCondition({ description: text, icon });
        setTempInfo({ tempC, tempF });
        setWindInfo({ windSpeedKph: windSpeed,windSpeedMph, windDirection, windDegree });
        setPressureInfo({pressureMb, pressureIn})
      }
    };

    getWeather();
  }, []);
  const { name, region, country } = location;
  const { description, icon } = condition;
  const { tempC, tempF } = tempInfo;
  const { windSpeedKph: windSpeed, windSpeedMph, windDirection, windDegree } = windInfo;
  const {pressureMb, pressureIn} = pressureInfo;

  return (
    <div className="real-time">
      <div className="real-time__main">
        <div className="real-time__location">
          <p>{name}</p>
          <p>{region}</p>
          <p>{country}</p>
        </div>        
        <div className="real-time__condition">
          <p>{description}</p>
          <img src={icon} alt="weather icon" className="real-time__condition--img"/>
        </div>
      </div>
     <div className="real-time__cards">
        <div className="real-time__card">
          <p className="title">Temp</p>
          <p>{tempC}&deg;C</p>
          <p>{tempF}&deg;F</p>
        </div>
        <div className="real-time__card">
          <p className="title">Wind</p>
          <p>{windSpeed} kph</p>
          <p>{windSpeedMph} mph</p>
          <p>{windDirection}</p>
          <p>{windDegree}&deg;</p>
        </div>
        <div className="real-time__card">
          <p className="title">Pressure</p>
          <p>{pressureMb} mb</p>
          <p>{pressureIn} inHg</p>         
        </div>
     </div>
    </div>
  );
};
