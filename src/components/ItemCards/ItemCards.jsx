import { useContext } from "react";
import { ItemCardsContext } from "../../contexts/ItemCardsContext";
import { HandleCardClickContext } from "../../contexts/HandleCardClickContext";
import { WeatherConditionContext } from "../../contexts/WeatherConditionContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ItemCards.css";

export default function ItemCards({ filterWeather, filterOwn, customStyles }) {
  const itemCards = useContext(ItemCardsContext);
  const handleCardClick = useContext(HandleCardClickContext);
  const weatherCondition = useContext(WeatherConditionContext);
  if (!customStyles) customStyles = {};
  return (
    <ul className="itemCards" onClick={handleCardClick} style={customStyles}>
      {itemCards.toReversed().map((item) => (
        <ItemCard
          key={item._id}
          filterWeather={filterWeather}
          filterOwn={filterOwn}
          item={item}
          weatherCondition={weatherCondition}
        />
      ))}
    </ul>
  );
}
