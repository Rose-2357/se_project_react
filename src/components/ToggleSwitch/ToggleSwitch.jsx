import { useContext, useState } from "react";
import "./ToggleSwitch.css";
import { TempUnitStateContext } from "../../contexts/TempUnitStateContext";

export default function ToggleSwitch() {
  function handleChange() {
    setIsChecked((prevIschecked) => !prevIschecked);
  }

  const [isChecked, setIsChecked] = useContext(TempUnitStateContext);

  return (
    <div className="switch">
      <input
        type="checkbox"
        className={`switch__checkbox ${
          isChecked ? "switch__checkbox_checked" : ""
        }`}
        name="switch-checkbox"
        id="switch-checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
      <label className="switch__label" htmlFor="switch-checkbox">
        <span className="switch__text switch__text_position_left">F</span>
        <span className="switch__text switch__text_position_right">C</span>
        <span className="switch__btn" />
      </label>
    </div>
  );
}
