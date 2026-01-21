import useModalClose from "../../hooks/useModalClose";
import "./ConformationModal.css";

export default function ConformationModal({
  isOpen,
  handleCloseModal,
  selectedCard,
  handleDeleteCard,
}) {
  useModalClose(isOpen, handleCloseModal, "conformation-modal");

  function deleteCard(e) {
    handleDeleteCard(e, parseInt(selectedCard._id));
  }

  return (
    <div
      className={`conformation-modal ${isOpen ? "conformation-modal_is-open" : ""}`}
    >
      <div className="conformation-modal__content">
        <button
          type="button"
          className="conformation-modal__btn conformation-modal__btn_action_close"
          onClick={handleCloseModal}
        ></button>
        <p className="conformation-modal__title">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </p>
        <form className="conformation-modal__form">
          <button
            className="conformation-modal__btn conformation-modal__btn_action_submit"
            onClick={deleteCard}
          >
            Yes, delete item
          </button>
          <button
            type="button"
            className="conformation-modal__btn conformation-modal__btn_action_cancel"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
