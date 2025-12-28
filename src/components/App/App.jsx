import "./App.css";
import Header from "../Header/Header";
import { getData as getWeatherData } from "../../utils/weatherApi";
import { useEffect, useState } from "react";
import Main from "../Main/Main";
import { defaultClothingItems } from "../../utils/constants";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import {
  checkImageValidity,
  checkValidity,
  displayValid,
} from "../../utils/validation";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [itemCards, setItemCards] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [nameError, setNameError] = useState({ error: true, message: "" });
  const [urlError, setUrlError] = useState({ error: true, message: "" });
  const [weatherTypeError, setWeatherTypeError] = useState({
    error: true,
    message: "",
  });

  function handleOpenAddClothesModal() {
    setActiveModal("addClothes");
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  function handleSubmitAddClothes(e) {
    e.preventDefault();
    const newItem = {
      _id: itemCards[itemCards.length - 1]._id + 1,
      name: e.target.name.value,
      link: e.target.image.value,
      weatherType: e.target["weather-type"].value,
    };

    setItemCards([...itemCards, newItem]);
    e.target.reset();
    handleCloseModal();
  }

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch((err) =>
        setWeatherData({
          city: `(failed to get city, ${err})`,
          temp: `(failed to get temprature, ${err})`,
          weather: `(failed to get weather, ${err})`,
        })
      );
  }, []);

  return (
    <div className="app">
      <div className="app__content">
        <Header
          city={weatherData.city}
          handleOpenModal={handleOpenAddClothesModal}
        />
        <Main
          itemCards={itemCards}
          weather={weatherData.weather}
          temp={weatherData.temp}
          sunrise={weatherData.sunrise}
          sunset={weatherData.sunset}
        />
        <Footer />
        <ModalWithForm
          name="addClothes"
          title="New Garment"
          submitBtnText="Add garment"
          isOpen={activeModal === "addClothes"}
          handleCloseModal={handleCloseModal}
          validationDependencies={[nameError, urlError, weatherTypeError]}
          handleSubmit={handleSubmitAddClothes}
        >
          <label
            className={`modal__text ${
              nameError.message !== "" ? "modal__text_state_error" : ""
            }`}
            htmlFor="add-clothes-name"
          >
            Name{nameError.message}
          </label>
          <input
            className="modal__input modal__input_type_text"
            minLength="2"
            maxLength="30"
            type="text"
            name="name"
            id="add-clothes-name"
            placeholder="Name"
            required
            onBlur={(e) => checkValidity(e, setNameError)}
            onInput={(e) => displayValid(e, setNameError)}
          />
          <label
            className={`modal__text ${
              urlError.message !== "" ? "modal__text_state_error" : ""
            }`}
            htmlFor="add-clothes-image"
          >
            Image{urlError.message}
          </label>
          <input
            className="modal__input modal__input_type_text"
            type="url"
            name="image"
            id="add-clothes-image"
            placeholder="Image"
            required
            onBlur={(e) => checkValidity(e, setUrlError, checkImageValidity)}
            onInput={(e) => displayValid(e, setUrlError)}
          />
          <fieldset
            className="modal__fieldset"
            name="weather-types"
            id="weather-types"
            onInput={(e) => checkValidity(e, setWeatherTypeError)}
          >
            <legend
              className="modal__text modal__text_type_legend"
              htmlFor="weather-types"
            >
              Select the weather type:
            </legend>
            <div className="modal__option">
              <input
                value="hot"
                className="modal__input modal__input_type_radio"
                type="radio"
                name="weather-type"
                id="add-clothes-hot"
                required
              />
              <span className="modal__radio-input-clone" />
              <label
                className="modal__text modal__text_type_radio-label"
                htmlFor="add-clothes-hot"
              >
                Hot
              </label>
            </div>
            <div className="modal__option">
              <input
                className="modal__input modal__input_type_radio"
                type="radio"
                name="weather-type"
                id="add-clothes-warm"
              />
              <span className="modal__radio-input-clone" />
              <label
                className="modal__text modal__text_type_radio-label"
                htmlFor="add-clothes-warm"
              >
                Warm
              </label>
            </div>
            <div className="modal__option">
              <input
                className="modal__input modal__input_type_radio"
                type="radio"
                name="weather-type"
                id="add-clothes-cold"
              />
              <span className="modal__radio-input-clone" />
              <label
                className="modal__text modal__text_type_radio-label"
                htmlFor="add-clothes-cold"
              >
                Cold
              </label>
            </div>
          </fieldset>
        </ModalWithForm>
      </div>
    </div>
  );
}

export default App;
