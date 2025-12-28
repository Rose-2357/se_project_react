import "./ModalWithForm.css";
import { useEffect, useState } from "react";

export default function ModalWithForm({
  title,
  name,
  children,
  submitBtnText,
  isOpen,
  handleCloseModal,
  validationDependencies,
  handleSubmit,
}) {
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isAnyInputInvalid = validationDependencies.some(
      (value) => value.error
    );
    if (isAnyInputInvalid && isFormValid) setIsFormValid(false);
    if (!(isAnyInputInvalid || isFormValid)) setIsFormValid(true);
  }, validationDependencies);

  function handleMouseDown(e) {
    const shouldClose = ["modal", "modal__close-btn"];
    if (
      shouldClose.some((item) => Array.from(e.target.classList).includes(item))
    )
      handleCloseModal();
  }

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_is-open" : ""}`}
      onMouseDown={handleMouseDown}
    >
      <div className="modal__content">
        <h2 className="modal__text modal__text_type_title">{title}</h2>
        <button className="modal__close-btn" type="button" />
        <form name={name} className="modal__form" onSubmit={handleSubmit}>
          {children}
          <button
            className={`modal__submit-btn ${
              !isFormValid ? "modal__submit-btn_disabled" : ""
            }`}
            disabled={!isFormValid}
          >
            {submitBtnText}
          </button>
        </form>
      </div>
    </div>
  );
}
