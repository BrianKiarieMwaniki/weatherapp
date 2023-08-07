import React from "react";
import { getFormattedDate, isTodaysDate } from "../functions/date";
import { getPeriods } from "../functions/period";
import ForecastPeriod from "./ForecastPeriod";

export const ForecastDay = (props) => {
  const { forecastDay } = props;
  const useFahrenheit = false;
  const {
    date,
    day: {
    //   maxtemp_c,
    //   maxtemp_f,
      mintemp_c,
      mintemp_f,
      avgtemp_c: avgTempC,
      avgtemp_f: avgTempF,
      condition,
    },
  } = forecastDay;

  const { text: description, icon } = condition;

  const periods = getPeriods(forecastDay);

  console.log(periods);

  const isToday = isTodaysDate(date);

  return (
    <React.Fragment>
        <div className="forecastday">
      {!isToday && (
          <React.Fragment>
              <div className="forecastday__date">{getFormattedDate(date)}</div>
              <div className="forecastday__condition">
                <div className="temp">
                  <span className="temp--avg">{useFahrenheit ? `${avgTempF} \u00B0F` : `${avgTempC}\u00B0C`}</span>
                  <span className="temp--min">{useFahrenheit ? `${mintemp_f} \u00B0F` : `${mintemp_c}\u00B0C`}</span>
                </div>
                <div className="description">{description}</div>
                <div className="icon">
                  <img src={icon} alt="forecast icon" className="img" />
                </div>
              </div>
          </React.Fragment>
      )}
      {periods.map((period) => (<ForecastPeriod key={period.name} isShown={isToday} period={period}/>))}
        </div>
    </React.Fragment>
  );
};
