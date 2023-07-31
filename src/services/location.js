export const getLocation = () => {
    let latitude = localStorage.getItem('latitude');
    let longitude = localStorage.getItem('longitude');

    if(latitude !== null && longitude !== null){
        return {latitude: latitude, longitude: longitude};
    }
    else{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                
                if(latitude && longitude) {
                    localStorage.setItem('latitude', latitude);
                    localStorage.setItem('longitude', longitude);
                    
                    return {latitude: latitude, longitude: longitude};
                }
            })
        }
    }
}