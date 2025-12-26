import "./WeatherCard.css";
import weatherCardImages from "../../utils/weatherCardImages";

export default function WeatherCard({ temp, weather }) {
  const currentTime = new Date().getHours();
  const isDay = 6 < currentTime && currentTime < 18;

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
      <p className="weather-card__temp">{Math.round(temp)}°F</p>
    </div>
  );
}
