import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Header from './Header';
import Repeat from './Repeat';
import {TermType} from './Term';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import {AddTermPopup} from './AddTermPopup';
import {AddQuestionPopup} from './AddQuestionPopup';
import {QuestionPopup, QuestionType} from './QuestionPopup';
import {RepeatPopup} from './RepeatPopup';
import ProtectedRouteElement from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import { getEmail, authorize, register,logout } from '../utils/auth.js';
import React from 'react';

type Result = {
    data: object
}


function App() {
    const [isAddTermPopupOpen, setIsAddTermPopupOpen] = useState(false);
    const [isAddQuestionPopupOpen, setIsAddQuestionPopupOpen] = useState(false);
    const [isQuestionPopupOpen, setIsQuestionPopupOpen] = useState(false);
    const [isRepeatPopupOpen, setIsRepeatPopupOpen] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [terms, setTerms] = useState<TermType[]>([]);
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [questionsForRepeat, setQuestionsForRepeat] = useState([]);
    const [question, setQuestion] = useState<QuestionType>({
        _id: '',
        question: '',
        answer: [{
            text: '',
            type: ''
        }],
        term: '',
        owner: ''
    });
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const [status, setStatus] = useState(false);

    const navigate = useNavigate();

    function tokenCheck() {
        getEmail()
            .then((res) => {
                if (res){
                    setLoggedIn(true);
                    navigate('/', {replace: true});
                }
            })
            .catch(err => console.log(`Ошибка.....: ${err}`));
    }

    useEffect(() => {
        tokenCheck();
        if (loggedIn){
            api.getUserInfo()
                .then(userData => {
                    setCurrentUser(userData);
                })
                .catch(err => console.log(`Ошибка.....: ${err}`));
        }},[loggedIn]);

    useEffect(() => {
        if (loggedIn){
            api.getQuestions()
                .then(questions => {
                    setQuestions(questions);
                })
                .catch(err => console.log(`Ошибка.....: ${err}`));
        }},[loggedIn]);

    useEffect(() => {
        if (loggedIn){
            api.getTerms()
                .then(terms => {
                    setTerms(terms);
                })
                .catch(err => console.log(`Ошибка.....: ${err}`));
        }},[loggedIn]);

    function handleAddQuestionPopup() {
        setIsAddQuestionPopupOpen(true);
    }

    function handleQuestionClick(question: QuestionType) {
        setIsQuestionPopupOpen(true);
        setQuestion(question);
    }

    function handleInfoTooltipClick(res: Result) {
        if(res.data) {
            setStatus(true);
        }
        setIsInfoTooltipOpen(true);
    }

    function closeAllPopups() {
        setIsAddTermPopupOpen(false);
        setIsAddQuestionPopupOpen(false);
        setIsInfoTooltipOpen(false);
        setQuestion({
            _id: '',
            question: '',
            answer: [{
                text: '',
                type: ''
            }],
            term: '',
            owner: ''
        });
        setIsQuestionPopupOpen(false);
        setIsRepeatPopupOpen(false);
    }

    function handleTermDelete(term: TermType) {
        api.deleteTerm(term._id)
            .then(() => {
                setTerms((state) => state.filter((c) => c._id !== term._id));
            })
            .catch(err => console.log(`Ошибка.....: ${err}`));
    }

    function handleQuestionDelete(question:QuestionType) {
        api.deleteQuestion(question._id)
            .then(() => {
                setQuestions((state) => state.filter((c) => c._id !== question._id));
            })
            .catch(err => console.log(`Ошибка.....: ${err}`));
    }

    function handleAddTerm(term: string):string {
        let id = '';
        api.addNewTerm(term)
            .then((newTerm: TermType) => {
                setTerms([newTerm, ...terms]);
                id = newTerm._id;
            })
            .catch(err => console.log(`Ошибка.....: ${err}`));
        return id;
    }

    function handleAddQuestion(question:QuestionType) {
        api.addNewQuestion(question)
            .then((newQuestion:QuestionType) => {
                setQuestions([newQuestion, ...questions]);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка.....: ${err}`));
    }

    function handleLogin(password:string, email:string) {
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

    function handleRegister(password:string, email:string) {
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
            .then(() => {
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
                setQuestionsForRepeat(questions);
                navigate('/repeat', {replace: true});
            })
            .catch(err => console.log(`Ошибка.....: ${err}`));
    
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header loggedIn={loggedIn} signOut={signOut} onAddQuestion={handleAddQuestionPopup} onRepeat={handleRepeat}/>
                <Routes>
                    <Route path="/" element={
                        <ProtectedRouteElement isLogin={loggedIn}>
                            <Main onQuestionClick = {handleQuestionClick}
                                questions = {questions}
                                onQuestionDelete = {handleQuestionDelete}
                            />
                        </ProtectedRouteElement>
                    } />
                    <Route path="/repeat" element={
                        <ProtectedRouteElement isLogin={loggedIn}>
                            <Repeat questions = {questionsForRepeat} />
                        </ProtectedRouteElement>
                    } />
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

                <AddTermPopup isOpen={isAddTermPopupOpen} onClose={closeAllPopups} onAddTerm={handleAddTerm}/>
                <AddQuestionPopup isOpen={isAddQuestionPopupOpen} onClose={closeAllPopups} onAddQuestion={handleAddQuestion} onAddTerm={handleAddTerm} terms={terms}/>
                <QuestionPopup isOpen={isQuestionPopupOpen} onClose={closeAllPopups} question={question}/>
                <RepeatPopup isOpen={isRepeatPopupOpen} onClose={closeAllPopups} question={question}/>
                <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} status={status}/>

            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
