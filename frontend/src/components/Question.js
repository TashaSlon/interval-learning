import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function Question({question, onClick, onQuestionDelete}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = question.owner === currentUser._id;

  function handleClick() {
    onClick(question);
  }

  function handleDeleteClick() {
    onQuestionDelete(question);
  }

  return (
    <li className="card__block">
      {isOwn && <button className="btn btn_type_delete" type="button" onClick={handleDeleteClick}></button>}
      <div className="card" onClick={handleClick}>
        
        <div className="card__description">
          <p className="card__name">{question.question}</p>
        </div>
      </div>
    </li>
  );
}