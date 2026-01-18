import "./Header.css";
import "./menu.css";
import HeaderLogo from "../../assets/logo.svg";
import HeaderProfileImg from "../../assets/profile-img.svg";
import { useState } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

export default function Header({ city, handleOpenModal }) {
  const currentDate = new Date().toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  const username = "Terrence Tegegne";

  return (
    <header className="header">
      <div className="header__column header__column_position_left">
        <Link to="/">
          <figure className="header__img-wrapper header__img-wrapper_type_logo">
            <img src={HeaderLogo} alt="WTWR logo" className="header__img" />
          </figure>
        </Link>
        <p className="header__text">{`${currentDate}, ${city}`}</p>
      </div>
      <div className="header__column header__column_position_right">
        <ToggleSwitch />
        <button className="header__add-clothes-btn" onClick={handleOpenModal}>
          + Add clothes
        </button>
        <Link className="header__link" to="/profile">
          <p className="header__text header__text_type_username">{username}</p>
          <figure className="header__img-wrapper header__img-wrapper_type_profile">
            <img
              src={HeaderProfileImg}
              alt={`${username}'s profile picture`}
              className="header__img"
            />
          </figure>
        </Link>
      </div>
      <button className="header__menu-btn" onClick={toggleMobileMenu}></button>
      <div className={`menu ${isMobileMenuOpen ? "menu_is-open" : ""}`}>
        <div className="menu__content">
          <button
            type="button"
            className="menu__btn menu__btn_type_close"
            onClick={toggleMobileMenu}
          ></button>
          <Link to="/profile" className="menu__profile-info">
            <p className="menu__text">{username}</p>
            <figure className="menu__img-wrapper">
              <img
                src={HeaderProfileImg}
                alt={`${username}'s profile picture`}
                className="menu__img"
              />
            </figure>
          </Link>
          <button
            className="menu__btn menu__btn_type_add-clothes"
            onClick={handleOpenModal}
          >
            + Add clothes
          </button>
          <ToggleSwitch />
        </div>
      </div>
    </header>
  );
}
