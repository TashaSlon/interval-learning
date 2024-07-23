import PopupWithForm from './PopupWithForm';
import { useState } from 'react';
import React from 'react';

type Props = {
    isOpen: boolean, 
    onClose: () => void, 
    onAddTerm: (term: string) => string
}

export function AddTermPopup({isOpen, onClose, onAddTerm}:Props) {
    
    const [name, setName] = useState('');

    function handleNameChange(e: { target: { value: React.SetStateAction<string>; }; }) {
        setName(e.target.value);
    }

    function handleClose() {
        onClose();
        setName('');
    }

    function handleSubmit(e: { preventDefault: () => void; }) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onAddTerm(name);
    }

    return (
        <PopupWithForm
            name='add' title='Новое место'
            isOpen={isOpen}
            onClose={handleClose}
            buttonText='Сохранить'
            onSubmit={handleSubmit}>
            <label>
                <input className="form__input form__input_type_title" type="text" id="title-input" required minLength={2} maxLength={30} placeholder="Название" name="name" onChange={handleNameChange} value={name}/>
                <span className="form__input-error title-input-error"></span>
            </label>
        </PopupWithForm>
    );
}