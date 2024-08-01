import PopupWithForm from './PopupWithForm';
import { useState, useContext, FormEvent, useRef, ChangeEvent } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import React from 'react';
import { Answer, AnswerBlock } from './QuestionPopup';
import type { QuestionType } from './QuestionPopup';
import type { TermType } from './Term';

type Props = {
    isOpen: boolean, 
    onClose: () => void, 
    onAddQuestion: (arg0: QuestionType) => void,
    onAddTerm: (term:string) => string,
    terms: TermType[]
}

export function AddQuestionPopup({isOpen, onClose, onAddQuestion, onAddTerm, terms}:Props) {
    const empetyBlock: AnswerBlock = { text: '', type: 'text'};
    const empetyAnswerBlock: Answer = [{text: '', type: 'text'}];

    const currentUser = useContext(CurrentUserContext);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState<Answer>(empetyAnswerBlock);
    const [blockAmount, setBlockAmount] = useState(1);
    const [term, setTerm] = useState('662a4c7c8a9160c1faa202ac');

    const formRef = useRef<HTMLFormElement>(null);

    const fullBlocks:JSX.Element[] = [<label>
        <select name="codeType" id={'text-type-'+ 0} onChange={handleAnswerTypeChange}>
            <option value="text">Текст</option>
            <option value="js">JavaScript</option>
            <option value="ts">TypeScript</option>
            <option value="css">CSS</option>
        </select>
        <textarea className="form__input form__input_type_title" id={'text-input-' + 0} required placeholder="Ответ" name="answer" onChange={handleAnswerTextChange}></textarea>
        <span className="form__input-error title-input-error"></span>
    </label>
    ];
    const fullTerms:JSX.Element[] = [<option value="662a4c7c8a9160c1faa202ac">Без термина</option>];

    function  createBlock(i:number):JSX.Element { 
        return (
            <label>
                <select name="codeType" id={'text-type-'+ i} onChange={handleAnswerTypeChange}>
                    <option value="text">Текст</option>
                    <option value="js">JavaScript</option>
                    <option value="ts">TypeScript</option>
                    <option value="css">CSS</option>
                </select>
                <textarea className="form__input form__input_type_title" id={'text-input-' + i} required placeholder="Ответ" name="answer" onChange={handleAnswerTextChange}></textarea>
                <span className="form__input-error title-input-error"></span>
            </label>
        );}

    for (let i = 1; i < blockAmount; i++) {
        fullBlocks.push(createBlock(i));
    }

    for (const item of terms) {
        item._id !== '662a4c7c8a9160c1faa202ac' && fullTerms.push(
            <option value={item._id} key={item._id}>{item.name}</option>
        );
    }

    function handleQuestionChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target) {
            setQuestion(e.target.value);
        }
    }

    function handleAnswerTypeChange(e: ChangeEvent<HTMLSelectElement>) {
        const idAnswer = Number(e.target.id.slice(10));
        const newBlock: AnswerBlock = {...answer[idAnswer]};
        newBlock.type = e.target.value;
        const newAnswer: Answer = [...answer];
        newAnswer[idAnswer] = newBlock;
        setAnswer(newAnswer);
    }

    function handleAnswerTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const idAnswer = Number(e.target.id.slice(11));
        const newBlock: AnswerBlock = {...answer[idAnswer]};
        newBlock.text = e.target.value;
        const newAnswer: Answer = [...answer];
        newAnswer[idAnswer] = newBlock;
        setAnswer(newAnswer);
    }

    function handleTermSelect(e: ChangeEvent<HTMLSelectElement>) {
        setTerm(e.target.value);
    }

    function handleTermChange(e: ChangeEvent<HTMLInputElement>) {
        setTerm(e.target.value);
    }

    function addBlock() {
        setBlockAmount(blockAmount + 1);
        setAnswer([...answer, empetyBlock]);
    }

    function addTerm() {
        const termId = onAddTerm(term);
        setTerm(termId);
    }

    function handleClose() {
        onClose();
        setQuestion('');
        setAnswer(empetyAnswerBlock);
        setTerm('');
        setBlockAmount(1);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>):void {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        const newQuestion:QuestionType = {
            question,
            answer,
            term,
            _id: currentUser._id
        };
        onAddQuestion(newQuestion);
        if (formRef.current) {
            formRef.current.reset();
        }
        handleClose();
    }

    return ( 
        <PopupWithForm
            name='add' 
            title='Новый вопрос'
            isOpen={isOpen}
            onClose={handleClose}
            buttonText='Сохранить'
            onSubmit={handleSubmit}
            formRef={formRef}>
            <>
                <label>
                    <input className="form__input form__input_type_title" type="text" id="title-input" required placeholder="Вопрос" name="question" onChange={handleQuestionChange} value={question}/>
                    <span className="form__input-error title-input-error"></span>
                </label>
                {fullBlocks}
                <button type='button'  className='btn' onClick={addBlock}>Добавить блок</button>
                <label>
                    <select name="term" id="term" onChange={handleTermSelect}>
                        {fullTerms}
                    </select>
                </label>
                <label>
                    <input className="form__input form__input_type_title" type="text" id="term-input" required placeholder="Термин" name="term-input" onChange={handleTermChange}/>
                    <span className="form__input-error title-input-error"></span>
                </label>
                <button type='button'  className='btn' onClick={addTerm}>Добавить термин</button>
            </>
        </PopupWithForm>
    );
}
