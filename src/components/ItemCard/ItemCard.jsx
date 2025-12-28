import "./ItemCard.css";

export default function ItemCard({ itemCards, handleCardClick }) {
  return itemCards.toReversed().map((item) => (
    <li
      key={item._id}
      className="itemCard"
      data-name={item.name}
      data-link={item.link}
      data-weather={item.weatherType}
    >
      <p className="itemCard__name">{item.name}</p>
      <figure className="itemCard__img-wrapper">
        <img src={item.link} alt={item.name} className="itemCard__img" />
      </figure>
    </li>
  ));
}
