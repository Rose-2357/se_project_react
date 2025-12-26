import "./App.css";
import Header from "../Header/Header";
import { getData as getWeatherData } from "../../utils/weatherApi";
import { useEffect, useState } from "react";
import Main from "../Main/Main";

function App() {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch((err) =>
        setWeatherData({
          city: `(failed to get city, ${err})`,
          temp: `(failed to get temprature, ${err})`,
          weather: `(failed to get weather, ${err})`,
        })
      );
  }, []);

  return (
    <div className="app">
      <div className="app__content">
        <Header city={weatherData.city} />
        <Main weather={weatherData.weather} temp={weatherData.temp} />
      </div>
    </div>
  );
}

export default App;
