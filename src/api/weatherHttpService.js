import axios from "axios";

axios.defaults.headers.common["X-RapidAPI-Key"] =
  process.env.REACT_APP_WEATHER_API_KEY;
axios.defaults.headers.common["X-RapidAPI-Host"] =
  process.env.REACT_APP_API_HOST;

const httpActions = {
  get: axios.get,
};
export default httpActions;
