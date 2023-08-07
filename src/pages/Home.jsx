import React, { useState } from "react";
import LocationPopup from "../features/LocationPopup";
import { getWeatherForecast } from "../api/weatherService";
import { getLocation } from "../functions/location";
import { RealTimeWeather } from "../features/RealTimeWeather";
import { useQuery } from "react-query";
import { calculateTimeUntilNextPoll } from "../functions/polling";
import { Forecast } from "../features/Forecast";

export const Home = () => {
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  const fetchForecast = async () => {
    const { latitude, longitude } = getLocation();

    if (latitude === null && longitude === null) {
      setShowLocationPopup(true);
    }

    return await getWeatherForecast(latitude, longitude, 7);
  };

  const { data, refetch, isFetched } = useQuery("forecast", fetchForecast, {
    refetchInterval: () => calculateTimeUntilNextPoll(),
  });

  if (!isFetched) {
    return <div>Error</div>;
  }

  const { location, current, forecast} = data;

  const handlePopupClose = () => {
    setShowLocationPopup(false);

    refetch();
  };

  const currentView = showLocationPopup ? (
    <LocationPopup
      onCancel={handlePopupClose}
      onAllow={() => setShowLocationPopup(false)}
    />
  ) : (
    <React.Fragment>
      <RealTimeWeather location={location} currentWeather={current} />
      <Forecast forecast={forecast}/>
    </React.Fragment>
  );

  return <div className="home">{currentView}</div>;
};
