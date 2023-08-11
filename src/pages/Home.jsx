import React, { useState } from "react";
import LocationPopup from "../features/LocationPopup";
import { getWeatherForecast } from "../api/weatherService";
import { clearSearchCityLocation, getLocation, setLocation } from "../functions/location";
import { RealTimeWeather } from "../features/RealTimeWeather";
import { useQuery } from "react-query";
import { calculateTimeUntilNextPoll } from "../functions/polling";
import { Forecast } from "../features/Forecast";
import { SearchContext } from './../contexts/SearchContext';
import { Spinner } from "../components/Spinner";

export const Home = () => {
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  const fetchForecast = async () => {
    const { latitude, longitude } = getLocation();

    if (latitude === null && longitude === null) {
      setShowLocationPopup(true);
    }

    return await getWeatherForecast(latitude, longitude, 7);
  };

  const { data, refetch, isFetched, isLoading } = useQuery("forecast", fetchForecast, {
    refetchInterval: () => calculateTimeUntilNextPoll(),
    refetchOnMount:true,    
  });

  if (!isFetched || isLoading) {
    return <Spinner/>;
  }

  const { location, current, forecast} = data;

  const handlePopupClose = () => {
    setShowLocationPopup(false);

  };

  const handlePopupAccept = () => {
    setLocation();
    setShowLocationPopup(false);     
    refetch();
  }

  const handleSearchRefetch = () => {
    refetch();
    clearSearchCityLocation();
  };

  const currentView = showLocationPopup ? (
    <LocationPopup onCancel={handlePopupClose} onAllow={handlePopupAccept} />
  ) : (
    <SearchContext.Provider value={{ handleSearchRefetch }}>
      <React.Fragment>
        <RealTimeWeather location={location} currentWeather={current} />
        <Forecast forecast={forecast} />
      </React.Fragment>
    </SearchContext.Provider>
  );

   return <div className="home">{currentView}</div>;

 
};
