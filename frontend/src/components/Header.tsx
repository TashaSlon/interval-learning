import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
    loggedIn: boolean,
    onRepeat: ()=>void,
    onAddQuestion: ()=>void,
    signOut: ()=>void
}

export default function Header(props:Props) {

    return (
        <header className="header">
            <div className='header__block'>
                <Link to="/" className="logo"><h1>Interval Learning</h1></Link>

                { (() => {
                    switch (props.loggedIn) {
                    case false: 
                        return <></>;
                    case true: 
                        return <div className='header__user'>
                            <button className="btn btn_type_repeat" type="button" onClick={props.onRepeat}></button>
                            <button className="btn btn_type_add" type="button" onClick={props.onAddQuestion}></button>
                            <button className="btn btn_type_user" type="button"></button>
                            <ul className="dropdown">
                                <li><Link to="/profile">Профиль</Link></li>
                                <li><Link to="/sign-in" onClick={props.signOut} className="auth__login-link">Выйти</Link></li>
                            </ul> 
                        </div>;
                    default:
                        return <Link to="/sign-in" className="auth__login-link">Войти</Link>;
                    }
                })()}
            </div>
        </header>
    );
}