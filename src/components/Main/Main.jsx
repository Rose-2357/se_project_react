import WeatherCard from "../WeatherCard/WeatherCard";

export default function Main({ temp, weather }) {
  return <WeatherCard weather={weather} temp={temp} />;
}
