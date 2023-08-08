import React, { useContext, useState } from "react";
import { getFormattedDate, isTodaysDate } from "../functions/date";
import { getPeriods } from "../functions/period";
import {ForecastPeriod} from "./ForecastPeriod";
import { SettingsContext } from "../contexts/SettingsContext";

export const ForecastDay = (props) => {
  const { forecastDay } = props;
  const [showPeriods, setShowPeriods] = useState(false);
  const {useFahrenheit} = useContext(SettingsContext);
  const {
    date,
    day: {
      mintemp_c,
      mintemp_f,
      avgtemp_c: avgTempC,
      avgtemp_f: avgTempF,
      condition,
    },
  } = forecastDay;

  const { text: description, icon } = condition;

  const periods = getPeriods(forecastDay);

  const isToday = isTodaysDate(date);

  const periodsShown = isToday? isToday : showPeriods;

  return (
    <React.Fragment>
      <div className="forecastday">
        {!isToday && (
          <React.Fragment>
            <div className="forecastday__date">{getFormattedDate(date)}</div>
            <div className="forecastday__condition">
              <div className="temp">
                <span className="temp--avg">
                  {useFahrenheit ? `${avgTempF} \u00B0F` : `${avgTempC}\u00B0C`}
                </span>
                <span className="temp--min">
                  {useFahrenheit
                    ? `${mintemp_f} \u00B0F`
                    : `${mintemp_c}\u00B0C`}
                </span>
              </div>
              <div className="description">{description}</div>
              <div className="icon">
                <img src={icon} alt="forecast icon" className="img" />
              </div>
            </div>

            {!isToday && (
              <button type="submit" className="forecastday__periods-btn" onClick={() => setShowPeriods(!showPeriods)}>
                <svg className={`icon ${periodsShown ? 'rotate': ''}`}>
                  <use xlinkHref="/symbols.svg#icon-arrow-down"></use>
                </svg>
              </button>
            )}
          </React.Fragment>
        )}
        {periodsShown && (
          <div className="forecastday__periods">
            {periods.map((period) => (
              <ForecastPeriod key={period.name} period={period} />
            ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
