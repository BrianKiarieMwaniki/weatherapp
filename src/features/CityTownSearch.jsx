import React, { useEffect, useState } from "react";
import { searchCitiesTowns } from "../api/weatherService";
import City from "../components/City";

function CityTownSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState([]);
  const [showResult, setShowResult] = useState(true);

  const handleInputChange = async (e) => {
    setShowResult(true);
    let inputText = e.target.value;
    setSearchTerm(inputText);
    if (inputText.length < 3) {
      setCities([]);
      return;
    }
    const result = await searchCitiesTowns(inputText);
    console.log(result);

    setCities(result);
    // setCities([
    //   {
    //     id: 2801268,
    //     name: "London",
    //     region: "City of London, Greater London",
    //     country: "United Kingdom",
    //     lat: 51.52,
    //     lon: -0.11,
    //     url: "london-city-of-london-greater-london-united-kingdom",
    //   },
    //   {
    //     id: 2548753,
    //     name: "Long Beach",
    //     region: "California",
    //     country: "United States of America",
    //     lat: 33.77,
    //     lon: -118.19,
    //     url: "long-beach-california-united-states-of-america",
    //   },
    //   {
    //     id: 279381,
    //     name: "Londrina",
    //     region: "Parana",
    //     country: "Brazil",
    //     lat: -23.3,
    //     lon: -51.15,
    //     url: "londrina-parana-brazil",
    //   },
    //   {
    //     id: 315398,
    //     name: "London",
    //     region: "Ontario",
    //     country: "Canada",
    //     lat: 42.98,
    //     lon: -81.25,
    //     url: "london-ontario-canada",
    //   },
    //   {
    //     id: 1122649,
    //     name: "Loni",
    //     region: "Uttar Pradesh",
    //     country: "India",
    //     lat: 28.75,
    //     lon: 77.28,
    //     url: "loni-uttar-pradesh-india",
    //   },
    // ]);
  };

  const handleResultSelected = (name, region, country) => {
    setSearchTerm(`${name}, ${region},${country}`);
    setShowResult(false);
  };

  return (
    <div className="citysearch">
      <input
        type="text"
        className="citysearch__input"
        placeholder="search city or town..."
        onChange={handleInputChange}
        value={searchTerm}
      />
      {cities && showResult && (
        <div className="citysearch__cities">
          {cities.map((city) => (
            <City
              key={city.id}
              name={city.name}
              region={city.region}
              country={city.country}
              onClick={() =>
                handleResultSelected(city.name, city.region, city.country)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CityTownSearch;
