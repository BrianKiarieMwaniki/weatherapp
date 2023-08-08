import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import "./assets/sass/main.scss";
import { Home } from "./pages/Home";
import { SettingsContext } from "./contexts/SettingsContext";
import React, { useEffect, useState } from "react";
import { getSettings } from "./functions/settings";
import { AnimatePresence, motion} from "framer-motion";
import Setting from "./features/Setting";

function App() {
  const [useFahrenheit, setUseFahrenheit] = useState();
  const [useMetricSystem, setUseMetricSystem] = useState();

  const [showSettings, setShowSettings] = useState(false);


  useEffect(() => {
    let settings = getSettings();

    if(!settings) settings = getSettings();

    const { fahrenheit, metricSystem } = settings;

    setUseFahrenheit(fahrenheit);
    setUseMetricSystem(metricSystem);
  }, []);

  

  const closeSettings = () => {
    setShowSettings(false);    
  };

  const queryClient = new QueryClient();
  return (
    <SettingsContext.Provider
      value={{
        useFahrenheit,
        setUseFahrenheit,
        useMetricSystem,
        setUseMetricSystem,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Home />

          <motion.svg
            className="settings__btn-open"
            whileTap={{
              rotate: 360,
              transition: { duration: 0.8, type: "circInOut" },
            }}
            onClick={() => setShowSettings(true)}
          >
            <use xlinkHref="/symbols.svg#icon-settings"></use>
          </motion.svg>

          <AnimatePresence>
            {showSettings && <Setting hideSettings={closeSettings} />}
          </AnimatePresence>
        </div>
      </QueryClientProvider>
    </SettingsContext.Provider>
  );
}

export default App;
