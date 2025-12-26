import "./ItemCard.css";

export default function ItemCard({ itemCards }) {
  return itemCards.map((item) => (
    <li className="itemCard">
      <p className="itemCard__name">{item.name}</p>
      <figure className="itemCard__img-wrapper">
        <img src={item.link} alt={item.name} className="itemCard__img" />
      </figure>
    </li>
  ));
}
