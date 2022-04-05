import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        //основной контент
        <main className="content">
            {/* <!-- секция профиля пользователя --> */}
            <section className="profile">
                <div className="profile__avatar-wrapper">
                    <img src={currentUser.avatar} alt="аватар" className="profile__avatar"/>
                    <button 
                        type="button" 
                        className="profile__avatar-edit-button" 
                        onClick={props.onEditAvatar}>
                    </button>
                </div>
                <div className="profile__info">
                    <div className="profile__info-name">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button 
                            type="button" 
                            className="profile__button profile__button_type_edit"
                            title="Редактировать профиль" 
                            aria-label="Редактировать профиль" 
                            onClick={props.onEditProfile}>
                        </button>
                    </div>
                    <p className="profile__short-description">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__button profile__button_type_add" title="Добавить фото"
                    aria-label="Добавить фото" onClick={props.onAddPlace }></button>
            </section>
            {/* <!-- секция с гридом всех фото --> */}
            <section className="elements-grid">
                <ul className="element-grid">
                    {/* <!-- шаблон новой фото --> */}
                    {props.cards.map((card, i) => (
                        <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
                    ))}
                </ul>
            </section>
        </main>

    );
}

export default Main;