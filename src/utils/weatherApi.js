import { apiKeey, latitude, longitude } from "./constants";

export function getWeatherCondition(temp) {
  return temp >= 86 ? "hot" : temp >= 66 ? "warm" : "cold";
}

export function getWeatherData() {
  // return fetch(
  //   `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKeey}`
  // )
  //   .then((res) =>
  //     res.ok ? res.json() : Promise.reject(new Error(res.status))
  //   )
  //   .then((res) => ({
  //     city: res.name,
  //     temp: Math.round(res.main.feels_like),
  //     weather: res.weather[0].main,
  //     sunrise: res.sys.sunrise,
  //     sunset: res.sys.sunset,
  //   }))
  //   .catch((res) => Promise.reject(res));

  return Promise.resolve({
    city: "Garland",
    temp: 74,
    weather: "Clouds",
    sunrise: 1766755652,
    sunset: 1766791601,
  });
}
