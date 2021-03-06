import React, { useState } from "react";
import './App.css';




const api = {
  key: "dd9f8a830506e61f76ec3107230932f5",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
 const dateBuild = (d) => {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return date;
  };



  

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  
  const search = (e) => {
    if (e.key === "Enter") {
     
      fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          setWeather(result);
          console.log(result);
        });
    }
  };

  console.log( weather);

  return (
    <div
      className="App"
    >
      <main>
      <div className="header">
      <div className="title"><h1> Weather</h1></div>
      
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
      </div>
         {(typeof weather.list != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.city.name}, {weather.city.country}</div>
            
          </div>
        </div>
        ) : (
          ""
        )}
       
       

          <div className="card-group">
           { weather.list && weather.list.map((w ,index) =>(

             
        <div className="card" key={index}>
           
          <div className="location-box">
            
            <div className="date">{w.dt_txt}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(w.main.temp)}°c
            </div>
            <div className="weather">{w.weather[0].main}</div>
            

            <img src={`http://openweathermap.org/img/w/${w.weather[0].icon}.png`}/>
            
          </div>
        </div>
        
        )) }
        </div>
       
         </main>
    </div>
  );
}

export default App;

