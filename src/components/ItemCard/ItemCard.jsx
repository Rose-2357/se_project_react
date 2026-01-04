import { getWeatherCondition } from "../../utils/weatherApi";
import "./ItemCard.css";

export default function ItemCard({ item, weatherCondition }) {
  return (
    <li
      className="itemCard"
      data-name={item.name}
      data-link={item.link}
      data-weather={item.weather}
      style={{
        display: weatherCondition === item.weather ? "flex" : "none",
      }}
    >
      <p className="itemCard__name">{item.name}</p>
      <figure className="itemCard__img-wrapper">
        <img src={item.link} alt={item.name} className="itemCard__img" />
      </figure>
    </li>
  );
}
