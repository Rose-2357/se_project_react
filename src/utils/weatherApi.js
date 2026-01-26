import { apiKey } from "./constants";

function getCoords() {
  if (!navigator.geolocation) {
    return Promise.reject("Geolocation is not supported by your browser");
  }
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error.message);
      },
    );
  });
}

export function getWeatherCondition(temp) {
  return temp >= 86 ? "hot" : temp >= 66 ? "warm" : "cold";
}

export function getWeatherData() {
  return getCoords()
    .then(({ latitude, longitude }) => {
      return fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`,
      )
        .then((res) =>
          res.ok ? res.json() : Promise.reject(new Error(res.status)),
        )
        .then((res) => ({
          city: res.name,
          temp: Math.round(res.main.feels_like),
          weather: res.weather[0].main,
          sunrise: res.sys.sunrise,
          sunset: res.sys.sunset,
        }))
        .catch((err) => Promise.reject(err));
    })
    .catch((err) => Promise.reject(`Error: ${err}`));
}
