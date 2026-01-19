import "./App.css";
import Header from "../Header/Header";
import { getWeatherCondition, getWeatherData } from "../../utils/weatherApi";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../Main/Main";
import { defaultClothingItems } from "../../utils/constants";
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

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [itemCards, setItemCards] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");

  const [selectedCard, setSelectedCard] = useState();
  const [weatherCondition, setWeatherCondition] = useState(
    getWeatherCondition(weatherData.temp),
  );

  const [isTempUnitChecked, setIsTempUnitChecked] = useState(false);
  const [tempUnit, setTempUnit] = useState("F");

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
      weather: e.target["weather-type"].value,
    };

    setItemCards([...itemCards, newItem]);
    e.target.reset();
    handleCloseModal();
  }

  function handleCardClick(e) {
    const itemCard = e.target.closest(".itemCard");
    if (!itemCard) return;
    setActiveModal("itemCard");
    setSelectedCard({
      name: itemCard.getAttribute("data-name"),
      link: itemCard.getAttribute("data-link"),
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
      .catch((err) =>
        setWeatherData({
          city: `(failed to get city, ${err})`,
          temp: `(failed to get temprature, ${err})`,
          weather: `(failed to get weather, ${err})`,
        }),
      );
  }, []);

  useEffect(() => {
    setWeatherCondition(getWeatherCondition(weatherData.temp));
  }, [weatherData.temp]);

  useEffect(() => {
    setTempUnit(isTempUnitChecked ? "C" : "F");
  }, [isTempUnitChecked]);

  if (Object.keys(weatherData).length === 0) return null;

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
