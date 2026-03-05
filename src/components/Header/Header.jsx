import "./Header.css";
import "./menu.css";
import HeaderLogo from "../../assets/logo.svg";
import HeaderProfileImg from "../../assets/profile-img.svg";
import { useContext, useEffect, useState } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { randomInt } from "../../utils/generalHelpers";
import { use } from "react";
import { DefaultAvatarContext } from "../../contexts/DefaultAvatarContext";

export default function Header({
  city,
  handleOpenAddClothesModal,
  handleOpenRegisterModal,
  handleOpenLoginModal,
  setDefaultAvatar,
  isLoggedIn,
}) {
  const currentDate = new Date().toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  function handleClick(e) {
    if (e.target.classList.contains("menu_is-open")) setIsMobileMenuOpen(false);
  }

  useEffect(() => {
    setDefaultAvatar(
      <svg viewBox="0 0 10 10">
        <circle
          cx="5"
          cy="5"
          r="5"
          fill={`hsl(${randomInt(0, 360)}, 50%, 45%`}
        ></circle>
        <text
          x="5"
          y="5"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#f9f9f9"
          fontSize="5"
        >
          {currentUser?.name?.substring(0, 1)?.toUpperCase()}
        </text>
      </svg>,
    );
  }, []);

  const username = currentUser.name;
  const defaultAvatar = useContext(DefaultAvatarContext);

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
        {isLoggedIn ? (
          <>
            <button
              className="header__text-btn"
              onClick={handleOpenAddClothesModal}
            >
              + Add clothes
            </button>
            <Link className="header__link" to="/profile">
              <p className="header__text header__text_type_username">
                {username}
              </p>
              <figure className="header__img-wrapper header__img-wrapper_type_profile">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={`${username}'s profile picture`}
                    className="header__img"
                  />
                ) : (
                  <div className="header__img">{defaultAvatar}</div>
                )}
              </figure>
            </Link>
          </>
        ) : (
          <>
            <button
              className="header__text-btn header__text-btn_type_sign-up"
              onClick={handleOpenRegisterModal}
            >
              Sign up
            </button>
            <button
              className="header__text-btn header__text-btn_type_login"
              onClick={handleOpenLoginModal}
            >
              Log in
            </button>
          </>
        )}
      </div>
      <button className="header__menu-btn" onClick={toggleMobileMenu}></button>
      <div
        className={`menu ${isMobileMenuOpen ? "menu_is-open" : ""}`}
        onClick={handleClick}
      >
        <div className="menu__content">
          <button
            type="button"
            className="menu__btn menu__btn_type_close"
            onClick={toggleMobileMenu}
          ></button>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="menu__profile-info">
                <p className="menu__text">{username}</p>
                <figure className="menu__img-wrapper">
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={`${username}'s profile picture`}
                      className="menu__img"
                    />
                  ) : (
                    <div className="menu__img">{defaultAvatar}</div>
                  )}
                </figure>
              </Link>
              <button
                className="menu__btn menu__btn_type_add-clothes"
                onClick={handleOpenAddClothesModal}
              >
                + Add clothes
              </button>
            </>
          ) : (
            <>
              <button
                className="menu__btn menu__btn_type_login"
                onClick={handleOpenLoginModal}
              >
                Log in
              </button>
              <button
                className="menu__btn menu__btn_type_sign-up"
                onClick={handleOpenRegisterModal}
              >
                Sign up
              </button>
            </>
          )}
          <ToggleSwitch />
        </div>
      </div>
    </header>
  );
}
