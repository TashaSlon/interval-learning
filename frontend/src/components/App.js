import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import {Main} from './Main';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import {EditProfilePopup} from './EditProfilePopup.js';
import {EditAvatarPopup} from './EditAvatarPopup.js';
import {AddTermPopup} from './AddTermPopup.js';
import ProtectedRouteElement from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import { getEmail, authorize, register,logout } from '../utils/auth.js';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddTermPopupOpen, setIsAddTermPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [terms, setTerms] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [status, setStatus] = useState(false);

  const navigate = useNavigate();

  function tokenCheck() {
    getEmail()
    .then((res) => {
      if (res){
        setLoggedIn(true);
        navigate("/", {replace: true});
      }
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
  };

  useEffect(() => {
    tokenCheck();
    if (loggedIn){
      api.getUserInfo()
        .then(userData => {
          setCurrentUser(userData);
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
    }},[loggedIn]);

  useEffect(() => {
    if (loggedIn){
      api.getTerms()
      .then(terms => {
        setTerms(terms);
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
    }},[loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddTermPopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleInfoTooltipClick(res) {
    if(res.data) {
      setStatus(true);
    }
    setIsInfoTooltipOpen(true);
  };

  function closeAllPopups() {
    setIsAddTermPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsSubmitPopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  };

  function handleTermDelete(term) {
    api.deleteTerm(term._id)
    .then(() => {
        setTerms((state) => state.filter((c) => c._id !== term._id));
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
  }

  function handleUpdateUser(userData) {
    api.setUserInfo(userData)
    .then(() => {
      setCurrentUser({...currentUser, name: userData.name, about: userData.about});
      closeAllPopups();
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
  }

  function handleUpdateAvatar(avatar) {
    api.setUserAvatar(avatar)
    .then(() => {
      setCurrentUser({...currentUser, avatar});
      closeAllPopups();
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
  }

  function handleAddTerm(term) {
    api.addNewTerm(term)
    .then((newTerm) => {
      setTerms([newTerm, ...terms]);
      closeAllPopups();
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
  }

  function handleLogin(password, email) {
    authorize(password, email)
      .then(() => {
          setUserData(email);
          setLoggedIn(true);
          navigate('/', {replace: true});
      })
      .catch(err => {
        setStatus(false);
        handleInfoTooltipClick(err);
      });
  }

  function handleRegister(password, email) {
    register(password, email)
    .then((res) => {
        handleInfoTooltipClick(res);
        navigate('/sign-in', {replace: true});
    })
    .catch(err => {
      setStatus(false);
      handleInfoTooltipClick(err);
    });
  }

  function signOut(){
    logout()
    .then((res) => {
      setLoggedIn(false);
      navigate('/sign-in', {replace: true});
    })
    .catch(err => {
      setStatus(false);
      handleInfoTooltipClick(err);
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<ProtectedRouteElement
          element={Main} onEditProfile = {handleEditProfileClick}
            onAddPlace = {handleAddPlaceClick}
            onEditAvatar = {handleEditAvatarClick}
            onCardClick = {handleCardClick}
            terms = {terms}
            onTermDelete = {handleTermDelete}
            userData = {userData}
            signOut = {signOut}
          loggedIn={loggedIn}/>} />
          <Route path="/sign-up" element={
            <div className="registerContainer">
              <Register onRegister={handleRegister} />
            </div>} />
          <Route path="/sign-in" element={
            <div className="loginContainer">
              <Login handleLogin={handleLogin}/>
            </div>} />
          <Route path="/" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
        </Routes>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <AddTermPopup isOpen={isAddTermPopupOpen} onClose={closeAllPopups} onAddTerm={handleAddTerm}/>
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} status={status}/>

        <PopupWithForm
          name='submit'
          title='Вы уверены?'
          isOpen={isSubmitPopupOpen}
          onClose={closeAllPopups}
          buttonText='Да'
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
