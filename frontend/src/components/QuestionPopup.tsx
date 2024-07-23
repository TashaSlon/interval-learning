import Prism from 'prismjs';
import React, { MouseEventHandler } from 'react';

export type AnswerBlock = {
    text: string,
    type: string,
};
export type Answer = AnswerBlock[];

export type QuestionType ={
    _id?: string,
    question: string,
    answer: Answer,
    term: string,
    owner?: string
}

type Props = {
    isOpen: boolean, 
    onClose: MouseEventHandler<HTMLButtonElement>, 
    question: QuestionType
}

export function QuestionPopup(props: Props):JSX.Element {
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
    } else {
        return (
            <section className={popupClass} id={question._id}>
            </section>
        );
    }
}