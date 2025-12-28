import "./Header.css";
import HeaderLogo from "../../assets/logo.svg";
import HeaderProfileImg from "../../assets/profile-img.svg";

export default function Header({ city, handleOpenModal }) {
  const currentDate = new Date().toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__column">
        <figure className="header__img-wrapper header__img-wrapper_type_logo">
          <img src={HeaderLogo} alt="WTWR logo" className="header__img" />
        </figure>
        <p className="header__text">{`${currentDate}, ${city}`}</p>
      </div>
      <div className="header__column">
        <button className="header__btn" onClick={handleOpenModal}>
          + Add clothes
        </button>
        <p className="header__text header__text_type_username">
          Terrence Tegegne
        </p>
        <figure className="header__img-wrapper header__img-wrapper_type_profile">
          <img src={HeaderProfileImg} alt="" className="header__img" />
        </figure>
      </div>
    </header>
  );
}
