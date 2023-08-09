export const getLocation = () => {
  const searchCity = localStorage.getItem("searchCity");
  if(searchCity)
  {
    const {latitude, longitude} = JSON.parse(searchCity);

    return {latitude, longitude};
  }
  let latitude = localStorage.getItem("latitude");
  let longitude = localStorage.getItem("longitude");
  return { latitude: latitude, longitude: longitude };
};

export const setLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      if (latitude && longitude) {
        localStorage.setItem("latitude", latitude);
        localStorage.setItem("longitude", longitude);
      }
    });
  }
};

export const setSearchCityLocation = (latitude, longitude) => {
  const searchCityLocation =  {
    "latitude": latitude,
    "longitude": longitude
  }

  const searchCityJson = JSON.stringify(searchCityLocation);

  localStorage.setItem("searchCity", searchCityJson);
}

export const clearSearchCityLocation = () =>{
  localStorage.removeItem("searchCity");
}
