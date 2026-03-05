import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal({
  handleCloseModal,
  onRegisterModal,
  isOpen,
}) {
  const { values, handleChange, errors, setErrors, handleBlur, resetForm } =
    useForm({
      email: "",
      password: "",
      name: "",
      avatar: "",
    });

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
    onRegisterModal(e, resetForm);
  }

  return (
    <ModalWithForm
      name="signUp"
      title="Sign Up"
      submitBtnText="Sign Up"
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
      validationDependencies={[
        errors.email,
        errors.password,
        errors.name,
        errors.avatar,
      ]}
    >
      <label
        className={`modal__text ${errors.email.message !== "" ? "modal__text_state_error" : ""}`}
        htmlFor="sign-up-email"
      >
        Email*{errors.email.message}
      </label>
      <input
        className="modal__input modal__input_type_text"
        type="email"
        name="email"
        id="sign-up-email"
        placeholder="Email"
        required
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <label
        className={`modal__text ${errors.password.message !== "" ? "modal__text_state_error" : ""}`}
        htmlFor="sign-up-password"
      >
        Password*{errors.password.message}
      </label>
      <input
        className="modal__input modal__input_type_text"
        type="password"
        name="password"
        id="sign-up-password"
        placeholder="Password"
        required
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <label
        className={`modal__text ${errors.name.message !== "" ? "modal__text_state_error" : ""}`}
        htmlFor="sign-up-name"
      >
        Name*{errors.name.message}
      </label>
      <input
        className="modal__input modal__input_type_text"
        type="text"
        name="name"
        id="sign-up-name"
        placeholder="Name"
        required
        minLength="2"
        maxLength="30"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <label
        className={`modal__text ${errors.avatar.message !== "" ? "modal__text_state_error" : ""}`}
        htmlFor="sign-up-avatar"
      >
        Avatar{errors.avatar.message}
      </label>
      <input
        className="modal__input modal__input_type_text"
        type="url"
        name="avatar"
        id="sign-up-avatar"
        placeholder="Avatar URL"
        value={values.avatar}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </ModalWithForm>
  );
}
