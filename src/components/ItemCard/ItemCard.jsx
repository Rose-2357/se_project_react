import "./ItemCard.css";

export default function ItemCard({ itemCards }) {
  return itemCards.toReversed().map((item) => (
    <li key={item._id} className="itemCard">
      <p className="itemCard__name">{item.name}</p>
      <figure className="itemCard__img-wrapper">
        <img src={item.link} alt={item.name} className="itemCard__img" />
      </figure>
    </li>
  ));
}
