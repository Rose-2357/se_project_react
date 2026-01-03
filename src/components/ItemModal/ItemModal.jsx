import "./ItemModal.css";

export default function ItemModal({ card, isOpen, handleCloseModal }) {
  if (!card) return null;

  function handleMouseDown(e) {
    const shouldClose = ["ItemModal", "ItemModal__close-btn"];
    if (
      shouldClose.some((item) => Array.from(e.target.classList).includes(item))
    )
      handleCloseModal();
  }

  return (
    <div
      className={`ItemModal ${isOpen ? "ItemModal_is-open" : ""}`}
      onMouseDown={handleMouseDown}
    >
      <div className="ItemModal__content">
        <button className="ItemModal__close-btn" type="button" />
        <div className="ItemModal__img-container">
          <figure className="ItemModal__img-wrapper">
            <img src={card.link} alt={card.name} className="ItemModal__img" />
          </figure>
          <figure className="ItemModal__img-wrapper ItemModal__img-wrapper_effect_blur">
            <img
              src={card.link}
              alt={card.name}
              className="ItemModal__img ItemModal__img_effect_blur"
            />
          </figure>
        </div>
        <div className="ItemModal__text">
          <p className="ItemModal__para">{card.name}</p>
          <p className="ItemModal__para ItemModal__para_position_last">
            Weather: {card.weather}
          </p>
        </div>
      </div>
    </div>
  );
}
