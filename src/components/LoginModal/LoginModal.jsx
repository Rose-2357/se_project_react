import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({ handleCloseModal, onLoginModal, isOpen }) {
  function handleSubmit(e) {
    onLoginModal(e, resetForm);
  }

  const { values, handleChange, errors, handleBlur, resetForm } = useForm({
    email: "",
    password: "",
  });

  return (
    <ModalWithForm
      name="login"
      title="Login"
      submitBtnText="Login"
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
      validationDependencies={[errors.email, errors.password]}
    >
      <label
        className={`modal__text ${errors.email.message !== "" ? "modal__text_state_error" : ""}`}
        htmlFor="login-email"
      >
        Email{errors.email.message}
      </label>
      <input
        className="modal__input modal__input_type_text"
        type="email"
        name="email"
        id="login-email"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <label
        className={`modal__text ${errors.password.message !== "" ? "modal__text_state_error" : ""}`}
        htmlFor="login-password"
      >
        Password{errors.password.message}
      </label>
      <input
        className="modal__input modal__input_type_text"
        type="password"
        name="password"
        id="login-password"
        placeholder="Password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </ModalWithForm>
  );
}
