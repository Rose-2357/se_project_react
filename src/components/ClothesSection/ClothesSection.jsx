import { useContext } from "react";
import { ItemCardsContext } from "../../contexts/ItemCardsContext";
import ItemCards from "../ItemCards/ItemCards";
import "./ClothesSection.css";
import { HandleOpenAddClothesModalContext } from "../../contexts/HandleOpenAddClothesModalContext";

export default function ClothesSection() {
  const handleOpenModal = useContext(HandleOpenAddClothesModalContext);

  return (
    <div className="clothes">
      <div className="clothes__text-container">
        <p className="clothes__title">Your items</p>
        <button
          type="button"
          className="clothes__btn"
          onClick={handleOpenModal}
        >
          + Add new
        </button>
      </div>
      <div className="clothes__list-container">
        <ItemCards
          customStyles={{
            justifyContent: "inherit",
          }}
        />
      </div>
    </div>
  );
}
