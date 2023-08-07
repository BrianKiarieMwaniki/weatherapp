import { getHourFromDateStr } from "./date";

export const getPeriods = (day) => {
  const { hour: hours } = day;

  let morning = hours.filter(
    (h) => getHourFromDateStr(h.time) >= 4 && getHourFromDateStr(h.time) <= 11
  );
  let afternoon = hours.filter(
    (h) => getHourFromDateStr(h.time) >= 12 && getHourFromDateStr(h.time) <= 17
  );
  let evening = hours.filter(
    (h) => getHourFromDateStr(h.time) >= 18 && getHourFromDateStr(h.time) <= 21
  );
  let night = hours.filter(
    (h) => getHourFromDateStr(h.time) >= 22 && getHourFromDateStr(h.time) <= 23
  );
  let nightAfterMidnight = hours.filter(
    (h) => getHourFromDateStr(h.time) >= 0 && getHourFromDateStr(h.time) <= 3
  );

  night = [...nightAfterMidnight];

  const periods = [
    {
      name: "Morning",
      condition: {
        text: getMostRepeatedCondtion(morning),
        icon: getIcon(morning, getMostRepeatedCondtion(morning), "morning"),
      },
      avgTemp: calculateAvgPeriodTemp(morning),
      avgRainPerct: calculateAvgRainingPerct(morning),
    },
    {
      name: "Afternoon",
      condition: {
        text: getMostRepeatedCondtion(afternoon),
        icon: getIcon(
          afternoon,
          getMostRepeatedCondtion(afternoon),
          "afternoon"
        ),
      },
      avgTemp: calculateAvgPeriodTemp(afternoon),
      avgRainPerct: calculateAvgRainingPerct(afternoon),
    },
    {
      name: "Evening",
      condition: {
        text: getMostRepeatedCondtion(evening),
        icon: getIcon(evening, getMostRepeatedCondtion(evening), "evening"),
      },
      avgTemp: calculateAvgPeriodTemp(evening),
      avgRainPerct: calculateAvgRainingPerct(evening),
    },
    {
      name: "Night",
      condition: {
        text: getMostRepeatedCondtion(night),
        icon: getIcon(night, getMostRepeatedCondtion(night), "night"),
      },
      avgTemp: calculateAvgPeriodTemp(night),
      avgRainPerct: calculateAvgRainingPerct(night),
    },
  ];

  return periods;
};

const getMostRepeatedCondtion = (arrayOfObjects) => {
  const conditionFrequency = {};

  // Loop through the array and count the occurrences of each condition
  for (const obj of arrayOfObjects) {
    const conditionText = obj.condition.text;

    if (conditionFrequency[conditionText]) {
      conditionFrequency[conditionText]++;
    } else {
      conditionFrequency[conditionText] = 1;
    }
  }

  let maxCondition = null;
  let maxOccurrences = 0;

  for (const condition in conditionFrequency) {
    if (conditionFrequency[condition] > maxOccurrences) {
      maxCondition = condition;
      maxOccurrences = conditionFrequency[condition];
    }
  }

  return maxCondition;
};

const getIcon = (arrayOfObjects, condition, period) => {
  let obj = null;

  if (period === "morning") {
    obj = arrayOfObjects.find(
      (c) => getHourFromDateStr(c.time) > 6 && c.condition.text === condition
    );
  }
  obj = arrayOfObjects.find((c) => c.condition.text === condition);

  console.log(obj);
  const {
    condition: { icon },
  } = obj;

  return icon;
};

const calculateAvgPeriodTemp = (arrayOfObjects) => {
  const sumTempF = arrayOfObjects.reduce((sum, obj) => sum + obj.temp_f, 0);
  const sumTempC = arrayOfObjects.reduce((sum, obj) => sum + obj.temp_c, 0);

  return {
    avgTempF: (sumTempF / arrayOfObjects.length).toFixed(2),
    avgTempC: (sumTempC / arrayOfObjects.length).toFixed(2),
  };
};

const calculateAvgRainingPerct = (arrayOfObjects) => {
  const sumoFRainPerct = arrayOfObjects.reduce(
    (sum, obj) => sum + obj.will_it_rain,
    0
  );

  return (sumoFRainPerct / arrayOfObjects.length).toFixed(2);
};
