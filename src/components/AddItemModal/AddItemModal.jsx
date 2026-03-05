import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { checkImageValidity } from "../../utils/validation";
import { useForm } from "../../hooks/useForm";

export default function AddItemModal({ handleCloseModal, onAddModal, isOpen }) {
  const { values, handleChange, errors, handleBlur, resetForm } = useForm(
    {
      name: "",
      image: "",
      "weather-type": "",
    },
    {
      image: checkImageValidity,
    },
  );

  function handleSubmit(e) {
    onAddModal(e, resetForm);
  }

  return (
    <ModalWithForm
      name="addClothes"
      title="New Garment"
      submitBtnText="Add garment"
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      validationDependencies={[
        errors.name,
        errors.image,
        errors["weather-type"],
      ]}
      handleSubmit={handleSubmit}
    >
      <label
        className={`modal__text ${
          errors.name.message !== "" ? "modal__text_state_error" : ""
        }`}
        htmlFor="add-clothes-name"
      >
        Name{errors.name.message}
      </label>
      <input
        className="modal__input modal__input_type_text"
        minLength="2"
        maxLength="15"
        type="text"
        name="name"
        id="add-clothes-name"
        placeholder="Name"
        required
        onBlur={handleBlur}
        onInput={handleChange}
        value={values.name}
      />
      <label
        className={`modal__text ${
          errors.image.message !== "" ? "modal__text_state_error" : ""
        }`}
        htmlFor="add-clothes-image"
      >
        Image{errors.image.message}
      </label>
      <input
        className="modal__input modal__input_type_text"
        type="url"
        name="image"
        id="add-clothes-image"
        placeholder="Image"
        required
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.image}
      />
      <fieldset
        className="modal__fieldset"
        name="weather-types"
        id="weather-types"
        onChange={(e) => {
          handleChange(e);
          handleBlur(e);
        }}
        // runs the blur handler to change the validity of the input onChange
      >
        <legend
          className="modal__text modal__text_type_legend"
          htmlFor="weather-types"
        >
          Select the weather type:
        </legend>
        <div className="modal__option">
          <input
            value="hot"
            className="modal__input modal__input_type_radio"
            type="radio"
            name="weather-type"
            id="add-clothes-hot"
            required
            checked={values["weather-type"] === "hot" ? "checked" : ""}
          />
          <span className="modal__radio-input-clone" />
          <label
            className="modal__text modal__text_type_radio-label"
            htmlFor="add-clothes-hot"
          >
            Hot
          </label>
        </div>
        <div className="modal__option">
          <input
            value="warm"
            className="modal__input modal__input_type_radio"
            type="radio"
            name="weather-type"
            id="add-clothes-warm"
            checked={values["weather-type"] === "warm" ? "checked" : ""}
          />
          <span className="modal__radio-input-clone" />
          <label
            className="modal__text modal__text_type_radio-label"
            htmlFor="add-clothes-warm"
          >
            Warm
          </label>
        </div>
        <div className="modal__option">
          <input
            value="cold"
            className="modal__input modal__input_type_radio"
            type="radio"
            name="weather-type"
            id="add-clothes-cold"
            checked={values["weather-type"] === "cold" ? "checked" : ""}
          />
          <span className="modal__radio-input-clone" />
          <label
            className="modal__text modal__text_type_radio-label"
            htmlFor="add-clothes-cold"
          >
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}
