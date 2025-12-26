import { apiKeey, latitude, longitude } from "./constants";

let randomNum = 0;

document.addEventListener("click", () => {
  randomNum = Math.floor(Math.random() * 10);
});

export function getData() {
  //   return fetch(
  //     `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKeey}`
  //   )
  //     .then((res) =>
  //       res.ok ? res.json() : Promise.reject(new Error(res.status))
  //     )
  //     .then((res) => ({
  //       city: res.name,
  //       temp: res.main.feels_like,
  //       weather: res.weather[0].main,
  //     }))
  //     .catch((res) => Promise.reject(res));

  return Promise.resolve({
    city: "Garland",
    temp: 74.05,
    weather: "Clouds",
  });
}
