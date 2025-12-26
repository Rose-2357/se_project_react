import WeatherCard from "../WeatherCard/WeatherCard";

export default function Main({ temp, weather }) {
  return (
    <main className="main">
      <WeatherCard weather={weather} temp={temp} />;
    </main>
  );
}
