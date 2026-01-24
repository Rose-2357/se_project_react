import "./App.css";
import Header from "../Header/Header";
import { getWeatherCondition, getWeatherData } from "../../utils/weatherApi";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { TempUnitStateContext } from "../../contexts/TempUnitStateContext";
import { TempUnitContext } from "../../contexts/TempUnitContext";
import { ItemCardsContext } from "../../contexts/ItemCardsContext";
import { HandleCardClickContext } from "../../contexts/HandleCardClickContext";
import { WeatherConditionContext } from "../../contexts/WeatherConditionContext";
import { HandleOpenAddClothesModalContext } from "../../contexts/HandleOpenAddClothesModalContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { deleteItem, getItems, postItem } from "../../utils/api";
import ConformationModal from "../ConformationModal/ConformationModal";
import { errorImageLink } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [itemCards, setItemCards] = useState([]);
  const [activeModal, setActiveModal] = useState("");

  const [selectedCard, setSelectedCard] = useState();
  const [weatherCondition, setWeatherCondition] = useState(
    getWeatherCondition(weatherData.temp),
  );

  const [isTempUnitChecked, setIsTempUnitChecked] = useState(false);
  const [tempUnit, setTempUnit] = useState("F");
  const [apiFailed, setApiFailed] = useState(false);

  function handleOpenAddClothesModal() {
    setActiveModal("addClothes");
  }

  function handleOpenConformationModal() {
    setActiveModal("conformationModal");
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  function handleDeleteCard(e, id) {
    e.preventDefault();
    deleteItem(id)
      .then(() => {
        setItemCards((prevItemCards) =>
          prevItemCards.filter((item) => item._id !== id),
        );
        handleCloseModal();
      })
      .catch((err) => console.error(err));
  }

  function handleSubmitAddClothes(e, formReseter) {
    e.preventDefault();

    postItem({
      name: e.target.name.value,
      imageUrl: e.target.image.value,
      weather: e.target["weather-type"].value,
    })
      .then((newItem) => {
        setItemCards([...itemCards, newItem]);
        formReseter();
        handleCloseModal();
      })
      .catch((err) => console.error(err));
  }

  function handleCardClick(e) {
    const itemCard = e.target.closest(".itemCard");
    if (!itemCard) return;
    setActiveModal("itemCard");
    setSelectedCard({
      _id: itemCard.getAttribute("data-id"),
      name: itemCard.getAttribute("data-name"),
      imageUrl: itemCard.getAttribute("data-imageUrl"),
      weather: itemCard.getAttribute("data-weather"),
    });
  }

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData({
          ...data,
          temp: {
            F: data.temp,
            C: Math.round(((data.temp - 32) * 5) / 9),
          },
        });
      })
      .catch((err) => {
        setApiFailed(true);
        const tempError = `(failed to get temprature, ${err})`;
        setWeatherData({
          city: `(failed to get city, ${err})`,
          temp: {
            C: tempError,
            F: tempError,
          },
          weather: `(failed to get weather, ${err})`,
        });
      });

    getItems()
      .then((data) => {
        setItemCards(data);
      })
      .catch((err) => {
        setItemCards([
          {
            _id: 0,
            name: `Something went wrong: ${err} \n `,
            weather: weatherCondition,
            imageUrl: new URL(errorImageLink),
          },
        ]);
      });
  }, []);

  useEffect(() => {
    setWeatherCondition(getWeatherCondition(weatherData.temp.F));
  }, [weatherData.temp.F]);

  useEffect(() => {
    setTempUnit(isTempUnitChecked ? "C" : "F");
  }, [isTempUnitChecked]);

  if (Object.keys(weatherData).length === 0 || itemCards.length === 0)
    return null;

  return (
    <BrowserRouter basename="/se_project_react/">
      <TempUnitStateContext.Provider
        value={[isTempUnitChecked, setIsTempUnitChecked]}
      >
        <TempUnitContext.Provider value={tempUnit}>
          <ItemCardsContext.Provider value={itemCards}>
            <HandleCardClickContext.Provider value={handleCardClick}>
              <WeatherConditionContext.Provider value={weatherCondition}>
                <HandleOpenAddClothesModalContext.Provider
                  value={handleOpenAddClothesModal}
                >
                  <div className="app">
                    <div className="app__content">
                      <Header
                        city={weatherData.city}
                        handleOpenModal={handleOpenAddClothesModal}
                      />
                      <Routes>
                        <Route
                          path="/"
                          element={
                            <Main
                              weather={weatherData.weather}
                              temp={weatherData.temp}
                              sunrise={weatherData.sunrise}
                              sunset={weatherData.sunset}
                              apiFailed={apiFailed}
                            />
                          }
                        />
                        <Route path="/profile" element={<Profile />} />
                      </Routes>
                      <Footer />
                      <AddItemModal
                        handleCloseModal={handleCloseModal}
                        onAddModal={handleSubmitAddClothes}
                        isOpen={activeModal === "addClothes"}
                      />
                      <ItemModal
                        card={selectedCard}
                        isOpen={activeModal === "itemCard"}
                        handleCloseModal={handleCloseModal}
                        handleDeleteClick={handleOpenConformationModal}
                      />
                      <ConformationModal
                        handleCloseModal={handleCloseModal}
                        isOpen={activeModal === "conformationModal"}
                        selectedCard={selectedCard}
                        handleDeleteCard={handleDeleteCard}
                      />
                    </div>
                  </div>
                </HandleOpenAddClothesModalContext.Provider>
              </WeatherConditionContext.Provider>
            </HandleCardClickContext.Provider>
          </ItemCardsContext.Provider>
        </TempUnitContext.Provider>
      </TempUnitStateContext.Provider>
    </BrowserRouter>
  );
}

export default App;
