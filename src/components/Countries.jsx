/* eslint-disable react/jsx-key */
import axios from "axios";
import { useEffect, useState } from "react";
import Cards from "./Cards";

const Countries = () => {
  const [data, setData] = useState([]);
  const [rangeValue, setRangeValue] = useState(36);
  const [selectedRadio, setSelectedRadio] = useState("");
  const radios = ["Africa", "America", "Asia", "Europa", "Oceania"];

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="countries">
      <ul className="radio-container">
        <input
          type="range"
          min="1"
          max="250"
          defaultValue={rangeValue}
          onChange={(e) => {
            setRangeValue(e.target.value);
          }}
        />
        {radios.map((continent, index) => (
          <li key={index}>
            <input
              type="radio"
              name="continentRadio"
              checked={continent === selectedRadio}
              id={continent}
              onChange={(e) => setSelectedRadio(e.target.id)}
            />
            <label htmlFor={continent}>{continent}</label>
          </li>
        ))}
      </ul>

      {selectedRadio && (
        <button onClick={() => setSelectedRadio("")}>
          Annuler la recherche
        </button>
      )}
      <ul>
        {data

          .filter((country) => country.continents[0].includes(selectedRadio))
          .sort((a, b) => b.population - a.population)
          .slice(0, rangeValue)
          .map((country, index) => (
            <Cards key={index} country={country} />
          ))}
      </ul>
    </div>
  );
};

export default Countries;
