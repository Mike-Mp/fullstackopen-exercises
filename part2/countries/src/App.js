import React, { useState, useEffect } from "react";
import "./App.css";
import Country from "./components/Country";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => setCountries(res.data));
  }, []);

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
      <Country country={country} />
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
