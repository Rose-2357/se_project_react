import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";
import "./Main.css";
import "./ItemCards.css";
import { useContext } from "react";
import { TempUnitContext } from "../../contexts/TempUnitContext";

export default function Main({
  itemCards,
  temp,
  weather,
  sunrise,
  sunset,
  handleCardClick,
  weatherCondition,
}) {
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
      <ul className="itemCards" onClick={handleCardClick}>
        {itemCards.toReversed().map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            weatherCondition={weatherCondition}
          />
        ))}
      </ul>
    </main>
  );
}
