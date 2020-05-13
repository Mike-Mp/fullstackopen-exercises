import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  let countriesMap;
  if (countriesToShow.length > 10) {
    countriesMap = <p>Too many matches, specify another filter</p>;
  } else if (countriesToShow.length > 1) {
    countriesMap = countriesToShow.map((country) => (
      <>
        <p key={country.name}>{country.name}</p>
      </>
    ));
  } else {
    countriesMap = countriesToShow.map((country) => (
      <>
        <h2 key={country.name}>{country.name}</h2>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h3>languages</h3>
        <ul>
          {country.languages.map((lang) => (
            <li>{lang.name}</li>
          ))}
        </ul>
        <img src={country.flag} alt={country.name}></img>
      </>
    ));
  }

  return (
    <div className="App">
      <input onChange={handleChange} value={searchTerm} />
    </div>
  );
}

export default App;
