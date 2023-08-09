import httpActions from "./weatherHttpService";

const baseUri = "https://weather-com.p.rapidapi.com";

export function getRealTimeWeather(latitude, longitude) {
  const queryParam = { q: `${latitude}, ${longitude}` };

  return httpActions.get("https://weatherapi-com.p.rapidapi.com/current.json", {
    params: queryParam,
  });
}

export const getWeatherForecast = async (latitude, longitude, days) => {
  const queryParams = { q: `${latitude}, ${longitude}`, days: days };

  const { data } = await httpActions.get(`${baseUri}/forecast.json`, {
    params: queryParams,
  });

  if (data) {
    const { location, current, forecast } = data;

    return { location, current, forecast };
  }

  return null;
};

export const searchCitiesTowns = async (searchString) => {
  const queryParams = { q: searchString };

  const { data } = await httpActions.get(`${baseUri}/search.json`, {
    params: queryParams,
  });

  if (data) {
    return data;
  }

  return null;
};
