import React, {useState} from 'react';
import {Link} from 'react-router-dom';

export default function Login(props) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValue.email || !formValue.password) {
            return;
        }
        const { password, email } = formValue;
        props.handleLogin(password, email);
        setFormValue({email: '', password: ''});
    }

    const page = "auth";

    return (
        <>
            <section className="auth">
                <h2 className="auth__welcome">
                Вход
                </h2>
                <form onSubmit={handleSubmit} className="auth__form">
                    <input className="auth__input" id="email" name="email" type="email" value={formValue.email} onChange={handleChange} placeholder='Email'/>
                    <input className="auth__input" id="password" name="password" type="password" value={formValue.password} onChange={handleChange} placeholder='Пароль'/>
                    <div className="auth__button-container">
                        <button type="submit" onSubmit={handleSubmit} className="auth__link">Войти</button>
                    </div>
                </form>
                <div className="auth__signin">
                    <p>Не зарегистрированы?</p>
                    <Link to="/sign-up" className="auth__login-link">Зарегистрироваться</Link>
                </div>
            </section>
        </>
    )
}