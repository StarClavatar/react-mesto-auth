import React from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';
import Vector from '../images/Vector.svg';

function Header(props) {
    const location = useLocation();
    
    let link=''; 
    let linkText=''

    if (location.pathname==='/sign-in') {
        link = 'sign-up';
        linkText = 'Регистрация';
    } else if (location.pathname==='/sign-up') {
        link = 'sign-in';
        linkText = 'Вход';
    } else if (location.pathname==='/main') {
        link = 'sign-in';
        linkText = 'Выход';
    }

    function handleLinkClick(){
        if (location.pathname==='/main') { 
            props.onSignOut();
        }
    }

    return (
        <header className="header">
            <img src={Vector} alt="логотип" className="header__logo"/>
            <p className='link header__link'>{props.email}</p>
            <Link to={link} className='link header__link' onClick={handleLinkClick}>{linkText}</Link>
        </header>
    );    
}

export default Header;
