import { useContext, useState } from "react";
import "./ToggleSwitch.css";
import { TempUnitStateContext } from "../../contexts/TempUnitStateContext";

export default function ToggleSwitch() {
  const [isChecked, setIsChecked] = useContext(TempUnitStateContext);
  const [isActive, setIsActive] = useState(false);

  function handleChange() {
    setIsChecked((prevIschecked) => !prevIschecked);
  }

  function toggleIsActive() {
    setIsActive((prevIsActive) => !prevIsActive);
  }

  function handleMouseLeave() {
    setIsActive(false);
  }

  return (
    <div className="switch">
      <input
        type="checkbox"
        className={`switch__checkbox 
          ${isChecked ? "switch__checkbox_checked" : ""} 
          ${isActive ? "switch__checkbox_active" : ""}`}
        name="switch-checkbox"
        id="switch-checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
      <label
        className="switch__label"
        htmlFor="switch-checkbox"
        onMouseDown={toggleIsActive}
        onMouseUp={toggleIsActive}
        onMouseLeave={handleMouseLeave}
      >
        <span className="switch__text switch__text_position_left">F</span>
        <span className="switch__text switch__text_position_right">C</span>
        <span className="switch__btn" />
      </label>
    </div>
  );
}
