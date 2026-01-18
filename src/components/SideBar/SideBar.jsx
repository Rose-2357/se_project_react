import SideBarProfileImg from "../../assets/profile-img.svg";
import "./SideBar.css";

export default function SideBar() {
  const username = "Terrence Tegegne";

  return (
    <div className="side-bar">
      <figure className="side-bar__img-wrapper side-bar__img-wrapper_for_mobile">
        <img
          src={SideBarProfileImg}
          alt={`${username}'s profile picture`}
          className="side-bar__img"
        />
      </figure>
      <div className="side-bar__content">
        <div className="side-bar__main">
          <figure className="side-bar__img-wrapper">
            <img
              src={SideBarProfileImg}
              alt={`${username}'s profile picture`}
              className="side-bar__img"
            />
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
