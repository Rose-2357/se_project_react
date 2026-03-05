import { useContext } from "react";
import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function ItemCard({
  filterWeather,
  filterOwn,
  item,
  weatherCondition,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <li
      className="itemCard"
      data-card={JSON.stringify(item)}
      style={{
        display:
          (weatherCondition === item.weather || !filterWeather) &&
          (item.owner === currentUser._id || !filterOwn)
            ? "flex"
            : "none",
      }}
    >
      <p className="itemCard__name">{item.name}</p>
      <figure className="itemCard__img-wrapper">
        <img src={item.imageUrl} alt={item.name} className="itemCard__img" />
      </figure>
    </li>
  );
}
