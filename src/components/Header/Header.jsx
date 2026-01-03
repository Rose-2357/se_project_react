import "./Header.css";
import "./menu.css";
import HeaderLogo from "../../assets/logo.svg";
import HeaderProfileImg from "../../assets/profile-img.svg";
import { useEffect, useState } from "react";

export default function Header({ city, handleOpenModal }) {
  const currentDate = new Date().toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <header className="header">
      <div className="header__column header__column_position_left">
        <figure className="header__img-wrapper header__img-wrapper_type_logo">
          <img src={HeaderLogo} alt="WTWR logo" className="header__img" />
        </figure>
        <p className="header__text">{`${currentDate}, ${city}`}</p>
      </div>
      <div className="header__column header__column_position_right">
        <button className="header__add-clothes-btn" onClick={handleOpenModal}>
          + Add clothes
        </button>
        <p className="header__text header__text_type_username">
          Terrence Tegegne
        </p>
        <figure className="header__img-wrapper header__img-wrapper_type_profile">
          <img src={HeaderProfileImg} alt="" className="header__img" />
        </figure>
      </div>
      <button className="header__menu-btn" onClick={toggleMobileMenu}></button>
      <div className={`menu ${isMobileMenuOpen ? "menu_is-open" : ""}`}>
        <div className="menu__content">
          <button
            type="button"
            className="menu__btn menu__btn_type_close"
            onClick={toggleMobileMenu}
          ></button>
          <div className="menu__profile-info">
            <p className="menu__text">Terrence Tegegne</p>
            <figure className="menu__img-wrapper">
              <img src={HeaderProfileImg} alt="" className="menu__img" />
            </figure>
          </div>
          <button
            className="menu__btn menu__btn_type_add-clothes"
            onClick={handleOpenModal}
          >
            + Add clothes
          </button>
        </div>
      </div>
    </header>
  );
}
