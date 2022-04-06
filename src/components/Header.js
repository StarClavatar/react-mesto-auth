import React from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { Switch, Route, Link } from 'react-router-dom';
import Vector from '../images/Vector.svg';

function Header(props) {
    const location = useLocation();
    
    function handleLinkClick(){
        if (location.pathname==='/') { 
            props.onSignOut();
        }
    }

    return (
        <header className="header">
            <img src={Vector} alt="логотип" className="header__logo"/>
            <Switch>
                <Route exact path={'/'}>
                    <p className='link header__link'>{props.email}</p>
                    <Link to='/sign-in' className='link header__link' onClick={handleLinkClick}>Выход</Link>
                </Route>
                <Route path={'/sign-in'}>
                    <Link to='/sign-up' className='link header__link'>Регистрация</Link>
                </Route>
                <Route path={'/sign-up'}>
                    <Link to='/sign-in' className='link header__link'>Вход</Link>
                </Route>
            </Switch>
        </header>
    );    
}

export default Header;
