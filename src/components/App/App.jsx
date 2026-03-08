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
import {
  addLike,
  deleteItem,
  editProfile,
  getItems,
  postItem,
  removeLike,
} from "../../utils/api";
import ConformationModal from "../ConformationModal/ConformationModal";
import { errorImageLink } from "../../utils/constants";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getCurrentUser, login, signUp } from "../../utils/auth";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { DefaultAvatarContext } from "../../contexts/DefaultAvatarContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { HandleOpenEditProfileModalContext } from "../../contexts/HandleOpenEditProfileModalContext";
import { OnCardLikeContext } from "../../contexts/OnCardLikeContext";
import { randomInt } from "../../utils/generalHelpers";
import { use } from "react";
import { IsLoggedInContext } from "../../contexts/IsLoggedInContext";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [defaultAvatar, setDefaultAvatar] = useState();
  const [defaultAvatarColor, setDefaultAvatarColor] = useState();

  function handleOpenAddClothesModal() {
    setActiveModal("addClothes");
  }

  function handleOpenRegisterModal() {
    setActiveModal("signUp");
  }

  function handleOpenLoginModal() {
    setActiveModal("login");
  }

  function handleOpenConformationModal() {
    setActiveModal("conformationModal");
  }

  function handleOpenEditProfileModal() {
    setActiveModal("editProfile");
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
      weather: e.target.weatherType.value,
    })
      .then((newItem) => {
        setItemCards([...itemCards, newItem]);
        formReseter();
        handleCloseModal();
      })
      .catch((err) => console.error(err));
  }
  function handleLogin(formReseter) {
    setIsLoggedIn(true);
    formReseter();
    handleCloseModal();
  }

  function handleSubmitRegisterModal(e, formReseter) {
    e.preventDefault();
    signUp({
      name: e.target.name.value,
      avatar: e.target.avatar.value,
      email: e.target.email.value,
      password: e.target.password.value,
    })
      .then(() => {
        login({
          email: e.target.email.value,
          password: e.target.password.value,
        });
      })
      .then(() => {
        handleLogin(formReseter);
      })
      .catch((err) => console.error(err));
  }

  function handleSubmitLoginModal(e, formReseter) {
    e.preventDefault();
    login({
      email: e.target.email.value,
      password: e.target.password.value,
    })
      .then(() => {
        handleLogin(formReseter);
      })
      .catch((err) => console.error(err));
  }

  function handleSubmitEditProfileModal(e) {
    e.preventDefault();
    editProfile({
      name: e.target.name.value,
      avatar: e.target.avatar.value,
    })
      .then(() => {
        setCurrentUser((prev) => ({
          ...prev,
          name: e.target.name.value,
          avatar: e.target.avatar.value,
        }));
      })
      .then(() => {
        handleCloseModal();
      })
      .catch((err) => console.error(err));
  }

  function handleCardClick(e) {
    if (/itemCard__like-/.test(e.target.className.baseVal)) return;
    const itemCard = e.target.closest(".itemCard");
    if (!itemCard) return;
    setActiveModal("itemCard");
    setSelectedCard(JSON.parse(itemCard.dataset.card));
  }

  function handleUpdatedCard(updatedCard) {
    setItemCards((cards) =>
      cards.map((card) => (card._id === updatedCard._id ? updatedCard : card)),
    );
  }

  function handleCardLike(id, isLiked) {
    !isLiked
      ? addLike(id).then(handleUpdatedCard).catch(console.error)
      : removeLike(id).then(handleUpdatedCard).catch(console.error);
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
    setWeatherCondition(getWeatherCondition(weatherData?.temp?.F));
  }, [weatherData?.temp?.F]);

  useEffect(() => {
    setTempUnit(isTempUnitChecked ? "C" : "F");
  }, [isTempUnitChecked]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) return;

    getCurrentUser(token).then((user) => {
      setIsLoggedIn(true);
      setCurrentUser(user);
    });
  }, [isLoggedIn]);

  useEffect(() => {
    setDefaultAvatarColor(`hsl(${randomInt(0, 360)}, 50%, 45%`);
  }, []);

  useEffect(() => {
    setDefaultAvatar(
      <svg viewBox="0 0 10 10">
        <circle cx="5" cy="5" r="5" fill={defaultAvatarColor}></circle>
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
  }, [currentUser]);

  if (Object.keys(weatherData).length === 0) return null;

  return (
    <BrowserRouter basename="/se_project_react/">
      <IsLoggedInContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
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
                    <HandleOpenEditProfileModalContext.Provider
                      value={handleOpenEditProfileModal}
                    >
                      <CurrentUserContext.Provider value={currentUser}>
                        <DefaultAvatarContext.Provider value={defaultAvatar}>
                          <OnCardLikeContext.Provider value={handleCardLike}>
                            <div className="app">
                              <div className="app__content">
                                <Header
                                  city={weatherData.city}
                                  handleOpenAddClothesModal={
                                    handleOpenAddClothesModal
                                  }
                                  handleOpenRegisterModal={
                                    handleOpenRegisterModal
                                  }
                                  handleOpenLoginModal={handleOpenLoginModal}
                                  setDefaultAvatar={setDefaultAvatar}
                                  isLoggedIn={isLoggedIn}
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
                                  <Route
                                    path="/profile"
                                    element={
                                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                                        <Profile />
                                      </ProtectedRoute>
                                    }
                                  />
                                </Routes>
                                <Footer />
                                <AddItemModal
                                  handleCloseModal={handleCloseModal}
                                  onAddModal={handleSubmitAddClothes}
                                  isOpen={activeModal === "addClothes"}
                                />
                                <RegisterModal
                                  handleCloseModal={handleCloseModal}
                                  onRegisterModal={handleSubmitRegisterModal}
                                  isOpen={activeModal === "signUp"}
                                />
                                <LoginModal
                                  handleCloseModal={handleCloseModal}
                                  onLoginModal={handleSubmitLoginModal}
                                  isOpen={activeModal === "login"}
                                />

                                <ItemModal
                                  card={selectedCard}
                                  isOpen={activeModal === "itemCard"}
                                  handleCloseModal={handleCloseModal}
                                  handleDeleteClick={
                                    handleOpenConformationModal
                                  }
                                />
                                <ConformationModal
                                  handleCloseModal={handleCloseModal}
                                  isOpen={activeModal === "conformationModal"}
                                  selectedCard={selectedCard}
                                  handleDeleteCard={handleDeleteCard}
                                />
                                <EditProfileModal
                                  handleCloseModal={handleCloseModal}
                                  onAddModal={handleSubmitEditProfileModal}
                                  isOpen={activeModal === "editProfile"}
                                />
                              </div>
                            </div>
                          </OnCardLikeContext.Provider>
                        </DefaultAvatarContext.Provider>
                      </CurrentUserContext.Provider>
                    </HandleOpenEditProfileModalContext.Provider>
                  </HandleOpenAddClothesModalContext.Provider>
                </WeatherConditionContext.Provider>
              </HandleCardClickContext.Provider>
            </ItemCardsContext.Provider>
          </TempUnitContext.Provider>
        </TempUnitStateContext.Provider>
      </IsLoggedInContext.Provider>
    </BrowserRouter>
  );
}

export default App;
