import PopupWithForm from './PopupWithForm.js';
import { useState, useContext } from "react";
import Prism from 'prismjs';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export function QuestionPopup({isOpen, onClose, question}) {
    const currentUser = useContext(CurrentUserContext);
    const popupClass = isOpen ? ('popup popup_overlay popup_opened'): 'popup popup_overlay';
    const code = question.answer;
    const list = [];

    code && code.forEach(element => {
      (element.type == 'js') 
      ? list.push(<pre><code className="language-js">{element.text}</code></pre>)
      : list.push(<p>{element.text}</p>)
    });

    setTimeout(() => Prism.highlightAll(), 0);

    return (
      <section className={popupClass} id={question._id}>
        <div className="popup__container">
          <button className="btn btn_type_close" type="reset" onClick={onClose}></button>
          <h2 className="popup__title">{question.question}</h2>
          {list}
        </div>
      </section>
    );
}