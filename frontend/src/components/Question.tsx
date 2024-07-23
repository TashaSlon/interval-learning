import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { QuestionType } from './QuestionPopup';

type Props = {
    question: QuestionType, 
    onClick: (arg0: QuestionType) => void, 
    onQuestionDelete: (arg0: QuestionType) => void
}

export function Question(props:Props):JSX.Element {
    const currentUser = useContext(CurrentUserContext);
    const {question, onClick, onQuestionDelete} = props;

    const isOwn = question.owner === currentUser._id;

    function handleClick() {
        onClick(question);
    }

    function handleDeleteClick() {
        onQuestionDelete(question);
    }

    return (
        <li className="card__block" key={question._id}>
            {isOwn && <button className="btn btn_type_delete" type="button" onClick={handleDeleteClick}></button>}
            <div className="card" onClick={handleClick}>
        
                <div className="card__description">
                    <p className="card__name">{question.question}</p>
                </div>
            </div>
        </li>
    );
}