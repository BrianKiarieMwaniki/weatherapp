import React from "react";
import { useContext, useEffect } from "react";
import { SettingsContext } from "./../contexts/SettingsContext";
import { setSettings } from "./../functions/settings";
import { motion, useAnimate, usePresence } from "framer-motion";

function Setting({ hideSettings }) {
  const {
    useFahrenheit,
    setUseFahrenheit,
    useMetricSystem,
    setUseMetricSystem,
  } = useContext(SettingsContext);

  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        await animate(
          scope.current,
          { opacity: 1, x: 10 },
          { duration: 0.8, ease: "easeIn", delay: 0 }
        );
      };
      enterAnimation();
    } else {
      const exitAnimation = async () => {
        await animate(
          scope.current,
          { x: 1500 },
          { duration: 4, ease: "backOut" }
        );
        safeToRemove();
      };

      exitAnimation();
    }
  }, [isPresent]);

  const setSettingValues = () => {
    setSettings(useFahrenheit, useMetricSystem);
  };

  return (
    <div className="settings" ref={scope}>
      <>
        <svg className="settings__btn-close" onClick={hideSettings}>
          <use xlinkHref="/symbols.svg#icon-arrow-down"></use>
        </svg>
        <div className="settings__input">
          <p>Use Fahrenheit</p>
          <div class="checkbox-wrapper">
            <input
            className="checkbox"
              type="checkbox"
              id="chb-fahrenheit"
              checked={useFahrenheit}
              onChange={(e) => {
                setUseFahrenheit(e.target.checked);
                setSettingValues();
              }}
            />
            <label for="chb-fahrenheit" class="toggle">
              <span></span>
            </label>
          </div>
        </div>
        <div className="settings__input">
          <p>Use Metric System</p>

          <div class="checkbox-wrapper">
            <input
            className="checkbox"
              type="checkbox"
              id="chb-metric"
              checked={useMetricSystem}
              onChange={(e) => {
                setUseMetricSystem(e.target.checked);
                setSettingValues();
              }}
            />
            <label for="chb-metric" class="toggle">
              <span></span>
            </label>
          </div>
        </div>
      </>
    </div>
  );
}

export default Setting;
