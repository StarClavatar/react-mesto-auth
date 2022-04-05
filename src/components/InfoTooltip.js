import React from 'react';
import OK from '../images/OK Icon.svg';
import NotOK from '../images/not OK icon.svg';

function InfoTooltip(props) {

    let img = props.isRegisered ? OK : NotOK;

    return (
        <div className={`popup ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container popup__container_place-entrance">
                    <div className="popup__wrapper">
                        <img className="popup__img" src={img} alt=""/>
                        <p className="popup__message">{props.isRegisered ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так. \n Попробуйте еще раз'}</p>
                    </div>
                    <button type="button" className="popup__close-button" onClick={props.onClose}></button>
            </div>
        </div>
    );
}

export default InfoTooltip;