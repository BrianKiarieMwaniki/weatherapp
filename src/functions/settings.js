export const getSettings = () => {
  let jsonSettings = localStorage.getItem("settings");

  let settings = JSON.parse(jsonSettings);

  if(!settings)
  {
    setSettings(false, true);
    getSettings();
  }
 
  return settings;
};

export const setSettings = (useFahrenheit, useMetricSystem) => {
  let settings = {
    fahrenheit: useFahrenheit,
    metricSystem: useMetricSystem,
  };

  const jsonSettings = JSON.stringify(settings);

  localStorage.setItem("settings", jsonSettings);
};
