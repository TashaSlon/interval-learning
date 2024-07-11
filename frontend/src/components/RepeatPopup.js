import PopupWithForm from './PopupWithForm.js';
import { useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export function RepeatPopup({isOpen, onClose, question}) {
    const currentUser = useContext(CurrentUserContext);
    const popupClass = isOpen ? ('popup popup_overlay popup_opened'): 'popup popup_overlay';
    const code = question.answer;

    const list = [];

    code && code.forEach(element => {
      (element.fieldType == 'js') 
      ? list.push(<pre><code className="language-js">{element.fieldText}</code></pre>)
      : list.push(<p>{element.fieldText}</p>)
    });

    return (
      <section className={popupClass} id={question._id}>
        <button className="btn btn_type_close" type="reset" onClick={onClose}></button>
        <div className="popup__container">
          <h2 className="popup__title">{question.question}</h2>
          {list}
        </div>
      </section>
    );
}