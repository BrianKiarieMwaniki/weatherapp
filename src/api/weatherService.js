import httpActions from './weatherHttpService';

export function getRealTimeWeather(latitude, longitude){
    const queryParam = {q: `${latitude}, ${longitude}`};

    return httpActions.get(
      "https://weatherapi-com.p.rapidapi.com/current.json",
      {params: queryParam}
    );
}