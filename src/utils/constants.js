import daySun from "../assets/day-sun.svg";
import dayCloud from "../assets/day-cloud.svg";
import dayRain from "../assets/day-rain.svg";
import dayStorm from "../assets/day-storm.svg";
import daySnow from "../assets/day-snow.svg";
import dayFog from "../assets/day-fog.svg";

import nightSun from "../assets/night-sun.svg";
import nightCloud from "../assets/night-cloud.svg";
import nightRain from "../assets/night-rain.svg";
import nightStorm from "../assets/night-storm.svg";
import nightSnow from "../assets/night-snow.svg";
import nightFog from "../assets/night-fog.svg";

export const weatherCardImages = {
  day: {
    Clear: daySun,
    Clouds: dayCloud,
    Rain: dayRain,
    Thunderstorm: dayStorm,
    Snow: daySnow,
    Fog: dayFog,
  },
  night: {
    Clear: nightSun,
    Clouds: nightCloud,
    Rain: nightRain,
    Thunderstorm: nightStorm,
    Snow: nightSnow,
    Fog: nightFog,
  },
};

export const apiKey = "1125eb6732b0a503a712b9010ee97a61";

export const errorImageLink =
  "https://medias.artmajeur.com/hd/13698077_aaaaa1234567.jpg?v=1742514890";
