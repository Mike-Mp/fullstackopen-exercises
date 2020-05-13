import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherInfo, setWeatherInfo] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => setCountries(res.data));
  }, []);

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${countriesToShow[0].capital}`
      )
      .then((res) => setWeatherInfo(res.data));
  }, [countriesToShow[0].capital]);

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
      <div key={country.name}>
        <p>{country.name}</p>
        <button onClick={() => setSearchTerm(country.name)}>show</button>
      </div>
    ));
  } else {
    countriesMap = countriesToShow.map((country) => (
      <div key={country.name}>
        <h2>{country.name}</h2>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h3>languages</h3>
        <ul>
          {country.languages.map((lang) => (
            <li key={lang.name}>{lang.name}</li>
          ))}
        </ul>
        <img src={country.flag} alt={country.name}></img>
        {weatherInfo ? <div>{weatherInfo.location.name}</div> : <div></div>}
      </div>
    ));
  }

  return (
    <div className="App">
      <input onChange={handleChange} value={searchTerm} />
      <>{countriesMap}</>
    </div>
  );
}

export default App;
