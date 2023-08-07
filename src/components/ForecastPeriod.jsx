import React from "react";
export const ForecastPeriod = ({ period, isShown }) => {
  const {
    name,
    condition,
    avgTemp: { avgTempF, avgTempC },
    avgRainPerct,
  } = period;

  const { text: description, icon } = condition;

  const useFahrenheit = false;

  return (
    <React.Fragment>
      {isShown && (
        <div className="forecast-period">
          <p className=".name">{name}</p>
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
            <span className="rain--text">{avgRainPerct}</span>
          </p>
        </div>
      )}
    </React.Fragment>
  );
};

export default ForecastPeriod;
