import React from "react";
import { ForecastDay } from "../components/ForecastDay";

export const Forecast = (props) => {
  const { forecastday:forecastDays } = props.forecast;

  return (
    <div className="forecast">
      {forecastDays.map((forecastDay) => (
        <ForecastDay key={forecastDay.date} periods={forecastDay.hour} forecastDay={forecastDay} /> 
      ))}
    </div>
  );
};
