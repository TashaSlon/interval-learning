import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Main from './Main.tsx';
import {Profile} from './Profile';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import Header from './Header.js';
import Repeat from './Repeat.js';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import {EditProfilePopup} from './EditProfilePopup.js';
import {EditAvatarPopup} from './EditAvatarPopup.js';
import {AddTermPopup} from './AddTermPopup.js';
import {AddQuestionPopup} from './AddQuestionPopup.js';
import {QuestionPopup} from './QuestionPopup.js';
import {RepeatPopup} from './RepeatPopup.js';
import ProtectedRouteElement from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import { getEmail, authorize, register,logout } from '../utils/auth.js';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddTermPopupOpen, setIsAddTermPopupOpen] = useState(false);
  const [isAddQuestionPopupOpen, setIsAddQuestionPopupOpen] = useState(false);
  const [isQuestionPopupOpen, setIsQuestionPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = useState(false);
  const [isRepeatPopupOpen, setIsRepeatPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [terms, setTerms] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [questionsForRepeat, setQuestionsForRepeat] = useState([]);
  const [question, setQuestion] = useState({});
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
      api.getQuestions()
      .then(questions => {
        setQuestions(questions);
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
    }},[loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddQuestionPopup() {
    setIsAddQuestionPopupOpen(true);
  };

  function handleQuestionClick(question) {
    setIsQuestionPopupOpen(true);
    setQuestion(question);
  }

  function handleInfoTooltipClick(res) {
    if(res.data) {
      setStatus(true);
    }
    setIsInfoTooltipOpen(true);
  };

  function closeAllPopups() {
    setIsAddTermPopupOpen(false);
    setIsAddQuestionPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsSubmitPopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
    setQuestion({});
    setIsQuestionPopupOpen(false);
    setIsRepeatPopupOpen(false);
  };

  function handleTermDelete(term) {
    api.deleteTerm(term._id)
    .then(() => {
        setTerms((state) => state.filter((c) => c._id !== term._id));
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
  }

  function handleQuestionDelete(question) {
    api.deleteQuestin(question._id)
    .then(() => {
        setQuestions((state) => state.filter((c) => c._id !== question._id));
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

  function handleAddQuestion(question) {
    api.addNewQuestion(question)
    .then((newQuestion) => {
      setQuestions([newQuestion, ...questions]);
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

  function handleRepeat() {
    api.getQuestionsForRepeat()
    .then((questions) => {
      const now = new Date();
      console.log(questions);
      setQuestionsForRepeat(questions);
      navigate('/repeat', {replace: true});
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
    
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} signOut={signOut} onAddQuestion={handleAddQuestionPopup} onRepeat={handleRepeat}/>
        <Routes>
          <Route path="/" element={<ProtectedRouteElement
            element={Main} 
            onQuestionClick = {handleQuestionClick}
            questions = {questions}
            onQuestionDelete = {handleQuestionDelete}
            loggedIn={loggedIn}
          />} />
          <Route path="/repeat" element={<ProtectedRouteElement
            element={Repeat} 
            questions = {questionsForRepeat}
            loggedIn={loggedIn}
          />} />
          <Route path="/profile" element={<ProtectedRouteElement
            element={Profile} 
            onEditProfile = {handleEditProfileClick}
            onEditAvatar = {handleEditAvatarClick}
            loggedIn={loggedIn}
          />} />
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
        <AddQuestionPopup isOpen={isAddQuestionPopupOpen} onClose={closeAllPopups} onAddQuestion={handleAddQuestion}/>
        <QuestionPopup isOpen={isQuestionPopupOpen} onClose={closeAllPopups} question={question}/>
        <RepeatPopup isOpen={isRepeatPopupOpen} onClose={closeAllPopups} question={question}/>
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
