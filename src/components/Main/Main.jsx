import ItemCards from "../ItemCards/ItemCards";
import WeatherCard from "../WeatherCard/WeatherCard";
import "./Main.css";
import { useContext } from "react";
import { TempUnitContext } from "../../contexts/TempUnitContext";

export default function Main({ temp, weather, sunrise, sunset }) {
  const tempUnit = useContext(TempUnitContext);

  temp = temp[tempUnit];

  return (
    <main className="main">
      <WeatherCard
        weather={weather}
        temp={temp}
        tempUnit={tempUnit}
        sunrise={sunrise}
        sunset={sunset}
      />
      <p className="main__text">
        Today is {temp}° {tempUnit} / You may want to wear:
      </p>
      <ItemCards filtered />
    </main>
  );
}
