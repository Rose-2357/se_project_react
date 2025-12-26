import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";
import "./Main.css";
import "./ItemCards.css";

export default function Main({ itemCards, temp, weather, sunrise, sunset }) {
  return (
    <main className="main">
      <WeatherCard
        weather={weather}
        temp={temp}
        sunrise={sunrise}
        sunset={sunset}
      />
      <p className="main__text">Today is {temp}° F / You may want to wear:</p>
      <ul className="itemCards">
        <ItemCard itemCards={itemCards} />
      </ul>
    </main>
  );
}
