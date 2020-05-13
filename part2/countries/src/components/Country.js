import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [weatherInfo, setWeatherInfo] = useState([]);

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
      )
      .then((res) => setWeatherInfo(res.data))
      .catch((err) => console.log(err));
  }, [country.capital]);

  let weatherInformation;
  console.log(weatherInfo);
  if (weatherInfo.length !== 0 && !weatherInfo.error) {
    weatherInformation = (
      <div key={weatherInfo.location.name}>
        <p>{weatherInfo.location.name}</p>
        <p>temperature: {weatherInfo.current.temperature.toString()}</p>
        <img
          src={weatherInfo.current.weather_icons[0]}
          alt={weatherInfo.location.name}
        />
        <p>
          wind: {weatherInfo.current.wind_speed.toString()}
          mph direction {weatherInfo.current.wind_dir}
        </p>
      </div>
    );
  } else {
    weatherInformation = <div></div>;
  }

  return (
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
      {weatherInformation}
    </div>
  );
};

export default Country;
