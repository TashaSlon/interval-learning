import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function Term({term, onCardClick, onTermDelete}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = term.owner === currentUser._id;

  function handleClick() {
    onCardClick(term);
  }

  function handleDeleteClick() {
    onTermDelete(term);
  }

  return (
    <li className="card__block">
      {isOwn && <button className="btn btn_type_delete" type="button" onClick={handleDeleteClick}></button>}
      <div className="card">
        
        <div className="card__description">
          <p className="card__name">{term.name}</p>
        </div>
      </div>
    </li>
  );
}