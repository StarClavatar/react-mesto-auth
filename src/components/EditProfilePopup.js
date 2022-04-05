import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props){
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(()=>{
        setName(currentUser.name);
        setDescription(currentUser.about);
        },[currentUser, props.isOpen]
    );

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleChangeName(e){setName(e.target.value)};
    function handleChangeDescription(e){setDescription(e.target.value)};

    function handleSubmit(e){
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm 
            title="Редактировать профиль"
            name="edit" 
            isOpen={props.isOpen} 
            onClose={props.onClose} 
            onSubmit={handleSubmit}
            buttonText="Сохранить">
            {/* <!-- поле ввода с имененим профиля --> */}
            <input 
                id="name-input" name="username"
                className="popup__input popup__input_edit_title popup__input_error" 
                type="text" placeholder="Имя" required minLength="2" maxLength="40"
                value={name || ''} onChange={handleChangeName}
            />
            {/* <!-- подпись ошибки заполнения имени --> */}
            <span id="name-input-error" className="popup__input-error">ошибка заполнения</span>
            {/* <!-- поле ввода описания профиля  --> */}
            <input 
                id="job-input" 
                name="about" 
                className="popup__input popup__input_edit_short-description popup__input_error"
                type="text" placeholder="Описание" required minLength="2" maxLength="200"
                value={description || ''} onChange={handleChangeDescription}
            />
            {/* <!-- подпись ошибки заполнения описания профиля --> */}
            <span id="job-input-error" className="popup__input-error">ошибка заполнения</span>
        </PopupWithForm>

    );
} 


export default EditProfilePopup;