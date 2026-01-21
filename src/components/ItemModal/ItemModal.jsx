import useModalClose from "../../hooks/useModalClose";
import "./ItemModal.css";

export default function ItemModal({
  card,
  isOpen,
  handleCloseModal,
  handleDeleteClick,
}) {
  useModalClose(isOpen, handleCloseModal, "item-modal");

  if (!card) return null;
  return (
    <div className={`item-modal ${isOpen ? "item-modal_is-open" : ""}`}>
      <div className="item-modal__content">
        <button
          className="item-modal__close-btn"
          type="button"
          onClick={handleCloseModal}
        />
        <div className="item-modal__img-container">
          <figure className="item-modal__img-wrapper">
            <img
              src={card.imageUrl}
              alt={card.name}
              className="item-modal__img"
            />
          </figure>
          <figure className="item-modal__img-wrapper item-modal__img-wrapper_effect_blur">
            <img
              src={card.imageUrl}
              alt={card.name}
              className="item-modal__img item-modal__img_effect_blur"
            />
          </figure>
        </div>
        <div className="item-modal__text">
          <div className="item-modal__description">
            <p className="item-modal__para">{card.name}</p>
            <p className="item-modal__para item-modal__para_position_last">
              Weather: {card.weather}
            </p>
          </div>
          <button
            className="item-modal__btn"
            type="button"
            onClick={handleDeleteClick}
          >
            Delete items
          </button>
        </div>
      </div>
    </div>
  );
}
