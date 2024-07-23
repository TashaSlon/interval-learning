import React, {useState} from 'react';
import {Link} from 'react-router-dom';

type Props = {
    onRegister: (password: string, email: string)=>void
}

const Register = (props: Props) => {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const {name, value} = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    };
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    
        const { password, email } = formValue;
        props.onRegister(password, email);
    };

    return (
        <>
            <section className="auth">
                <h2 className="auth__welcome">
        Регистрация
                </h2>
                <form onSubmit={handleSubmit} className="auth__form">
                    <input className="auth__input" id="email" name="email" type="email" value={formValue.email} onChange={handleChange} placeholder='Email'/>
                    <input className="auth__input" id="password" name="password" type="password" value={formValue.password} onChange={handleChange} placeholder='Пароль'/>
                    <div className="auth__button-container">
                        <button type="submit" onSubmit={handleSubmit} className="auth__link">Зарегистрироваться</button>
                    </div>
                </form>
                <div className="auth__signin">
                    <p>Уже зарегистрированы?</p>
                    <Link to="/sign-in" className="auth__login-link">Войти</Link>
                </div>
            </section>
        </>
    );
};

export default Register;