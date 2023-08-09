import React, { useContext, useState } from "react";
import { searchCitiesTowns } from "../api/weatherService";
import City from "../components/City";
import { setSearchCityLocation } from "../functions/location";
import { SearchContext } from "../contexts/SearchContext";

function CityTownSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState([]);
  const [showResult, setShowResult] = useState(true);

  const { handleSearchRefetch } = useContext(SearchContext);

  const handleInputChange = async (e) => {
    setShowResult(true);
    let inputText = e.target.value;
    setSearchTerm(inputText);
    if (inputText.length < 3) {
      setCities([]);
      return;
    }
    const result = await searchCitiesTowns(inputText);

    setCities(result);
    
  };

  const handleResultSelected = (city) => {
    const { name, region, country, lat, lon } = city;
    setSearchCityLocation(lat, lon);
    setSearchTerm(`${name}, ${region},${country}`);
    setShowResult(false);
    handleSearchRefetch();
  };

  const handleInputBackspace = () => {
    if (searchTerm.length > 0) setSearchTerm("");
    setShowResult(false);
    handleSearchRefetch();
  };

  return (
    <div className="citysearch">
      <div className="citysearch__input-group">
        <input
          type="text"
          className="citysearch__input-control"
          placeholder="search city or town..."
          onChange={handleInputChange}
          value={searchTerm}
        />
        <svg className="citysearch__input-icon" onClick={handleInputBackspace}>
          {searchTerm.length > 0 ? (
            <use xlinkHref="/symbols.svg#icon-backspace"></use>
          ) : (
            <use xlinkHref="/symbols.svg#icon-search"></use>
          )}
        </svg>
      </div>
      {cities && showResult && (
        <div className="citysearch__cities">
          {cities.map((city) => (
            <City
              key={city.id}
              name={city.name}
              region={city.region}
              country={city.country}
              onClick={() => handleResultSelected(city)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CityTownSearch;
