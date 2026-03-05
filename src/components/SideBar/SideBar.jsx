import { useContext } from "react";
import SideBarProfileImg from "../../assets/profile-img.svg";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { DefaultAvatarContext } from "../../contexts/DefaultAvatarContext";

export default function SideBar() {
  const currentUser = useContext(CurrentUserContext);
  const username = currentUser.name;
  const defaultAvatar = useContext(DefaultAvatarContext);

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
            <button type="button" className="side-bar__btn">
              Change profile data
            </button>
          </li>
          <li>
            <button type="button" className="side-bar__btn">
              Log out
            </button>
          </li>
        </menu>
      </div>
    </div>
  );
}
