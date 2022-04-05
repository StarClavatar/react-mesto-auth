import React from 'react';

function PopupWithForm(props) { 

    function handleOverlayClick(evt) {
        if (evt.target===evt.currentTarget) {props.onClose()};
    }

    return (
        //редактирование профиля
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`} onClick={handleOverlayClick}>
            <div className="popup__container">
                <form className="popup__input-form popup__form" name={`${props.name}-form`} onSubmit={props.onSubmit} noValidate>
                    {/* заголовок формы */}
                    <h2 className="popup__title">{props.title}</h2>
                    {/* содержимое из родительского компонента */}
                    {props.children}
                     {/* кнонка submit'a формы */}
                    <button className="popup__button popup__submit-button" type="submit">{props.buttonText}</button>
                </form>
                {/* крестик закрытия формы редактирования профиля  */}
                <button type="button" className="popup__close-button" onClick={props.onClose}></button>
            </div>
        </div>
    );
}

export default PopupWithForm;
