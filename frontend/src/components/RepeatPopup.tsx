import React, { MouseEventHandler } from 'react';
import { QuestionType } from './QuestionPopup';

type Props = {
    isOpen: boolean, 
    onClose: MouseEventHandler<HTMLButtonElement>, 
    question: QuestionType
}

export function RepeatPopup(props:Props):JSX.Element {
    const {isOpen, onClose, question} = props;

    const popupClass = isOpen ? ('popup popup_overlay popup_opened'): 'popup popup_overlay';

    if (isOpen) {
        const code = question.answer;

        const list:JSX.Element[] = [];

        code && code.forEach(element => {
            (element.type === 'js') 
                ? list.push(<pre><code className="language-js">{element.text}</code></pre>)
                : list.push(<p>{element.text}</p>);
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
    } else {
        return (
            <section className={popupClass} id={question._id}>
            </section>
        );
    }
}