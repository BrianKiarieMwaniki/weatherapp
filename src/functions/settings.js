export const getSettings = () => {
  let jsonSettings = localStorage.getItem("settings");

  if(!jsonSettings)
  {
    return {fahrenheit: false, metricSystem: false};
  }

  let {fahrenheit, metricSystem} = JSON.parse(jsonSettings); 
  return {fahrenheit, metricSystem};
};

export const setSettings = (useFahrenheit, useMetricSystem) => {
  let settings = {
    fahrenheit: useFahrenheit,
    metricSystem: useMetricSystem,
  };

  const jsonSettings = JSON.stringify(settings);

  localStorage.setItem("settings", jsonSettings);
};
