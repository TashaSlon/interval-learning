import PopupWithForm from './PopupWithForm.js';
import { useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export function AddQuestionPopup({isOpen, onClose, onAddQuestion}) {
    const currentUser = useContext(CurrentUserContext);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState([{type: 'text', text: ''}]);
    const [blockAmount, setBlockAmount] = useState(1);
    const [term, setTerm] = useState('');

    console.log(answer);

    const fullBlocks = [];

    for (let i = 0; i < blockAmount; i++) {
      fullBlocks.push(
        <label>
          <select name="codeType" id={"text-type-"+ i} onChange={handleAnswerTypeChange}>
            <option value="text">Текст</option>
            <option value="js">JavaScript</option>
            <option value="ts">TypeScript</option>
            <option value="css">CSS</option>
          </select>
          <textarea className="form__input form__input_type_title" type="text" id={"text-input-" + i} required minLength="2" maxLength="3000" placeholder="Ответ" name="answer" onChange={handleAnswerTextChange}></textarea>
          <span className="form__input-error title-input-error"></span>
        </label>
    )};

    function handleQuestionChange(e) {
        setQuestion(e.target.value);
    }

    function handleAnswerTypeChange(e) {
      const idAnswer = Number(e.target.id.slice(10));
      answer[idAnswer].type = e.target.value;
      console.log(answer);
    }

    function handleAnswerTextChange(e) {
      const idAnswer = Number(e.target.id.slice(11));
      answer[idAnswer].text = e.target.value;
    }

    function handleTermChange(e) {
      setTerm(e.target.value);
    }

    function addBlock() {
      setBlockAmount(blockAmount + 1);
      setAnswer([...answer, {type: 'text', text: ''}]);
    }

    function handleClose() {
      onClose();
      setQuestion('');
      setAnswer([{type: 'text', text: ''}]);
      setTerm('');
      setBlockAmount(1);
  }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onAddQuestion({
          question,
          answer,
          term,
          _id: currentUser._id
        });
        e.target.reset();
        handleClose();
    }

    return (
        <>
            <PopupWithForm
          name='add' title='Новый вопрос'
          isOpen={isOpen}
          onClose={handleClose}
          buttonText='Сохранить'
          onSubmit={handleSubmit}>
          <label>
            <input className="form__input form__input_type_title" type="text" id="title-input" required minLength="2" maxLength="100" placeholder="Вопрос" name="question" onChange={handleQuestionChange} value={question}/>
            <span className="form__input-error title-input-error"></span>
          </label>
          {fullBlocks}
          <button type='button'  className='btn' onClick={addBlock}>Добавить блок</button>
          <label>
            <input className="form__input form__input_type_title" type="text" id="title-input" required minLength="2" maxLength="30" placeholder="Термин" name="term" onChange={handleTermChange} value={term}/>
            <span className="form__input-error title-input-error"></span>
          </label>
        </PopupWithForm>

        </>
    );
}