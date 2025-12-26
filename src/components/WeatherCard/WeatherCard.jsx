import "./WeatherCard.css";
import { weatherCardImages } from "../../utils/constants";

export default function WeatherCard({ temp, weather, sunrise, sunset }) {
  const currentTime = Date.now() / 1000;
  const isDay = sunrise < currentTime && currentTime < sunset;

  function getCardImageData(isDay, weather) {
    if (weather === "Drizzle") weather = "Rain";
    const time = isDay ? "day" : "night";
    return {
      src: weatherCardImages[time][weather],
      alt: `${time.toUpperCase()}, ${weather}`,
    };
  }

  const imageData = getCardImageData(isDay, weather);

  return (
    <div className="weather-card">
      <figure className="weather-card__img-wrapper">
        <img
          className="weather-card__img"
          src={imageData.src}
          alt={imageData.alt}
        />
      </figure>
      <p className="weather-card__temp">{temp}°F</p>
    </div>
  );
}
