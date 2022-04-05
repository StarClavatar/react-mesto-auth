import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    const cardDeleteButtonClassName = (
        `element-grid__remove-button element-grid__remove-button${!isOwn && '_hidden'}`
    ); 

    const LikesButtonClassName = (
        `element-grid__like-button ${isLiked && 'element-grid__like-button_active'}`
    ); 

    function handleDeleteCard(){
        props.onCardDelete(props.card)
    }

    return (
        <li key={props.card._id} className="element-grid__item">
            <img className="element-grid__image" src={props.card.link} alt={props.card.name} onClick={ ()=> {props.onCardClick(props.card.link)} }/>
            <div className="element-grid__info">
                <h2 className="element-grid__title">{props.card.name}</h2>
                <button className={LikesButtonClassName} type="button" onClick={ ()=> {props.onCardLike(props.card)}}></button>
                <span className="element-grid__like-counter">{props.card.likes.length}</span>

            </div>

            <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteCard}></button>
        </li>
    );
}

export default Card;