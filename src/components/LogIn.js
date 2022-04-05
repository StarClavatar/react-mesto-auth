import React from 'react';

function LogIn(props) {
    const [email, setEmail] = React.useState ('');
    const [password, setPassword] = React.useState ('');

    function handleEmailChange(e) {setEmail(e.target.value)};
    function handlePasswordChange(e) {setPassword(e.target.value)};

    function handleAuthorize(e){
        e.preventDefault();
        props.onAuthorise(email, password);
    }

    return (
        <div className="entrance">
            <h2 className="entrance__heading">Вход</h2>
            <form action="" className="form" onSubmit={handleAuthorize}>
                <input className="form__input" type="email" required placeholder="Email" onChange={handleEmailChange}/>
                <input className="form__input" type="password" required placeholder="Пароль" onChange={handlePasswordChange}/>
                <button className="entrance__button" type="submit">Войти</button>
            </form>
        </div>
    );
}

export default LogIn;