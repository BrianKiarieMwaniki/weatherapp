import React, { useEffect, useState } from "react";
import { getRealTimeWeather } from "../api/weatherService";
import { getLocation } from "../functions/location";

export const RealTimeWeather = () => {
  const [condition, setCondition] = useState({ description: "", icon: " " });
  useEffect(() => {
    const { latitude, longitude } = getLocation();
    const getWeather = async () => {
      const { data } = await getRealTimeWeather(latitude, longitude);

      if (data) {
        const {
          current: {
            condition: { text, icon },
          },
        } = data;

        setCondition({ description: text, icon });
      }
    };

    getWeather();
  }, []);
  const { description, icon } = condition;
  return (
    <div>
      <p>{description}</p>
      <img src={icon} alt="weather icon" />
    </div>
  );
};
