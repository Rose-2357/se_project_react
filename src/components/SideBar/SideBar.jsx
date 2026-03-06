import { useContext } from "react";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { DefaultAvatarContext } from "../../contexts/DefaultAvatarContext";
import { HandleOpenEditProfileModalContext } from "../../contexts/HandleOpenEditProfileModalContext";
import { useNavigate } from "react-router-dom";
import { IsLoggedInContext } from "../../contexts/IsLoggedInContext";

export default function SideBar() {
  const currentUser = useContext(CurrentUserContext);
  const username = currentUser.name;
  const defaultAvatar = useContext(DefaultAvatarContext);
  const handleOpenEditProfileModal = useContext(
    HandleOpenEditProfileModalContext,
  );
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useContext(IsLoggedInContext);

  function handleLogOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <div className="side-bar">
      <figure className="side-bar__img-wrapper side-bar__img-wrapper_for_mobile">
        {currentUser.avatar ? (
          <img
            src={currentUser.avatar}
            alt={`${username}'s profile picture`}
            className="side-bar__img"
          />
        ) : (
          <div className="side-bar__img">{defaultAvatar}</div>
        )}
      </figure>
      <div className="side-bar__content">
        <div className="side-bar__main">
          <figure className="side-bar__img-wrapper">
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={`${username}'s profile picture`}
                className="side-bar__img"
              />
            ) : (
              <div className="side-bar__img">{defaultAvatar}</div>
            )}
          </figure>
          <p className="side-bar__text">{username}</p>
        </div>
        <menu className="side-bar__btns">
          <li>
            <button
              type="button"
              className="side-bar__btn"
              onClick={handleOpenEditProfileModal}
            >
              Edit profile
            </button>
          </li>
          <li>
            <button
              type="button"
              className="side-bar__btn"
              onClick={handleLogOut}
            >
              Log out
            </button>
          </li>
        </menu>
      </div>
    </div>
  );
}
