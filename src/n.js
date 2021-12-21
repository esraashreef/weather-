import React, { useState } from "react";
import './App.css';


const api = {
  key: "dd9f8a830506e61f76ec3107230932f5",
  base: "https://api.openweathermap.org/data/2.5/",
};

function n() {
 const dateBuild = (d) => {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return date;
  };

  const img_src= "http://openweathermap.org/img/w/{weather.weather[0].icon}.png"

  console.log(img_src)

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  
  const search = (e) => {
    if (e.key === "Enter") {
     
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          setWeather(result);
          console.log(result);
        });
    }
  };

  return (
    <div
      className="App"
    >
      <main>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
       
           {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuild(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
            

            <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}/>
            
          </div>
        </div>
        ) : (
          ""
        )}
         </main>
    </div>
  );
}

export default App;

