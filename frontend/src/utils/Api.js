class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _getHeaders() {
    return {
      "Content-Type": "application/json",
    };
  }

  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._getHeaders(),
      credentials: 'include' })
    .then(this._getJson);
  }

  setUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      credentials: 'include',
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
    .then(this._getJson);
  }

  getTerms() {
    return fetch(`${this._baseUrl}/terms`, {
      method: 'GET',
      headers: this._getHeaders(),
      credentials: 'include' })
    .then(this._getJson);
  }

  addNewTerm(termData) {
    return fetch(`${this._baseUrl}/terms`, {
      method: 'POST',
      headers: this._getHeaders(),
      credentials: 'include',
      body: JSON.stringify({
        name: termData.name,
      })
    })
    .then(this._getJson);
  }

  deleteTerm(termId) {
    return fetch(`${this._baseUrl}/terms/${termId}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
      credentials: 'include'
    })
    .then(this._getJson);
  }

  getQuestions() {
    return fetch(`${this._baseUrl}/questions`, {
      method: 'GET',
      headers: this._getHeaders(),
      credentials: 'include' })
    .then(this._getJson);
  }

  addNewQuestion(questionData) {
    return fetch(`${this._baseUrl}/questions`, {
      method: 'POST',
      headers: this._getHeaders(),
      credentials: 'include',
      body: JSON.stringify({
        question: questionData.question,
        answer: questionData.answer,
        term: questionData.term
      })
    })
    .then(this._getJson);
  }

  deleteQuestion(questionId) {
    return fetch(`${this._baseUrl}/questions/${questionId}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
      credentials: 'include'
    })
    .then(this._getJson);
  }

  getQuestionsForRepeat() {
    return fetch(`${this._baseUrl}/questions/repeat`, {
      method: 'GET',
      headers: this._getHeaders(),
      credentials: 'include' })
    .then(this._getJson);
  }

  setQuestionDone(id) {
    return fetch(`${this._baseUrl}/questions/repeat/${id}`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      credentials: 'include'
    })
    .then(this._getJson);
  }

  setUserAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      credentials: 'include',
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(this._getJson);
  }
}

const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://api.tashaslon.nomoreparties.sbs' : 'http://localhost:3000';

export const api = new Api(BASE_URL);
export {BASE_URL};
