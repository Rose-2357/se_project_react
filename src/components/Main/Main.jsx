import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";
import "./Main.css";
import "./ItemCards.css";

export default function Main({
  itemCards,
  temp,
  weather,
  sunrise,
  sunset,
  handleCardClick,
  weatherCondition,
}) {
  return (
    <main className="main">
      <WeatherCard
        weather={weather}
        temp={temp}
        sunrise={sunrise}
        sunset={sunset}
      />
      <p className="main__text">Today is {temp}° F / You may want to wear:</p>
      <ul className="itemCards" onClick={handleCardClick}>
        <ItemCard itemCards={itemCards} weatherCondition={weatherCondition} />
      </ul>
    </main>
  );
}
