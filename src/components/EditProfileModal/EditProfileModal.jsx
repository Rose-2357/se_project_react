import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { checkImageValidity } from "../../utils/validation";

export default function EditProfileModal({
  handleCloseModal,
  onAddModal,
  isOpen,
}) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, setErrors, handleBlur, resetForm } =
    useForm(
      {
        name: currentUser.name,
        avatar: currentUser.avatar,
      },
      {
        avatar: checkImageValidity,
      },
    );

  useEffect(() => {
    setErrors((prev) => ({
      ...prev,
      avatar: {
        error: false,
        message: "",
      },
    }));
  }, []);

  function handleSubmit(e) {
    onAddModal(e);
  }

  return (
    <ModalWithForm
      name="editProfile"
      title="Change profile data"
      submitBtnText="Save changes"
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      validationDependencies={[errors.name, errors.avatar]}
      handleSubmit={handleSubmit}
    >
      <label
        className={`modal__text ${errors.name.message !== "" ? "modal__text_state_error" : ""}`}
        htmlFor="edit-profile-name"
      >
        Name{errors.name.message}
      </label>
      <input
        className="modal__input modal__input_type_text"
        minLength="2"
        maxLength="15"
        type="text"
        name="name"
        id="edit-profile-name"
        placeholder="Name"
        required
        onBlur={handleBlur}
        onInput={handleChange}
        value={values.name}
      />
      <label
        className={`modal__text ${errors.avatar.message !== "" ? "modal__text_state_error" : ""}`}
        htmlFor="edit-profile-avatar"
      >
        Avatar URL{errors.avatar.message}
      </label>
      <input
        className="modal__input modal__input_type_text"
        type="url"
        name="avatar"
        id="edit-profile-avatar"
        placeholder="Avatar URL"
        onBlur={handleBlur}
        onInput={handleChange}
        value={values.avatar}
      />
    </ModalWithForm>
  );
}
