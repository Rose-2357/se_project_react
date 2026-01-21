import "./ItemCard.css";

export default function ItemCard({ filtered, item, weatherCondition }) {
  return (
    <li
      className="itemCard"
      data-id={item._id}
      data-name={item.name}
      data-imageUrl={item.imageUrl}
      data-weather={item.weather}
      style={{
        display:
          weatherCondition === item.weather || !filtered ? "flex" : "none",
      }}
    >
      <p className="itemCard__name">{item.name}</p>
      <figure className="itemCard__img-wrapper">
        <img src={item.imageUrl} alt={item.name} className="itemCard__img" />
      </figure>
    </li>
  );
}
