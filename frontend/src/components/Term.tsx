import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

export type TermType = {
    owner: string,
    name: string,
    _id: string
}

export function Term(term: TermType) {
    const currentUser = useContext(CurrentUserContext);

    const isOwn = term.owner === currentUser._id;

    //function handleDeleteClick() {
    //    onTermDelete(term);
    //}

    return (
        <li className="card__block">
            <div className="card">
        
                <div className="card__description">
                    <p className="card__name">{term.name}</p>
                </div>
            </div>
        </li>
    );
}