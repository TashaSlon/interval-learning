import PopupWithForm from './PopupWithForm.js';
import { useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export function AddTermPopup({isOpen, onClose, onAddTerm}) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleClose() {
      onClose();
      setName('');
  }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onAddTerm({
          name,
          _id: currentUser._id
        });
    }

    return (
        <>
            <PopupWithForm
          name='add' title='Новое место'
          isOpen={isOpen}
          onClose={handleClose}
          buttonText='Сохранить'
          onSubmit={handleSubmit}>
          <label>
            <input className="form__input form__input_type_title" type="text" id="title-input" required minLength="2" maxLength="30" placeholder="Название" name="name" onChange={handleNameChange} value={name}/>
            <span className="form__input-error title-input-error"></span>
          </label>
        </PopupWithForm>

        </>
    );
}