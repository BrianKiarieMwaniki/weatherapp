export const getLocation = () => {
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
