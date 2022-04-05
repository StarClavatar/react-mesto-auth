import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props){
    const [name,setName] = React.useState("");
    const [link,setLink] = React.useState("");

    function handleChangeName(e){setName(e.target.value)};
    function handleChangeLink(e){setLink(e.target.value)};
    
    
    function handleSubmit(e) {
        e.preventDefault();
        
        props.onAddPlace({name,link});
    } 
    
    React.useEffect(
        ()=>{
            setName('');
            setLink('');
        },[props.isOpen]
    );

    return (
        <PopupWithForm 
            title="Новое место" 
            name="add" isOpen={props.isOpen} 
            onClose={props.onClose} 
            onSubmit={handleSubmit}
            buttonText="Сохранить">
            {/* <!-- поле ввода названия --> */}
            <input 
                id="place-name-input" name="name" 
                className="popup__input popup__input_edit_title popup__input_error" 
                type="text" placeholder="Название места" required minLength="2" maxLength="30"
                value={name} onChange={handleChangeName}
            />
            {/* <!-- подпись с ошибкой заполнения названия фото --> */}
            <span id="place-name-input-error" className="popup__input-error">ошибка заполнения</span>
            {/* <!-- поле ввода url-адреса картинки --> */}
            <input 
                id="place-img-input" name="link"
                className="popup__input popup__input_edit_short-description popup__input_error"
                type="url" placeholder="Ссылка на картинку" required
                value={link} onChange={handleChangeLink}
            />
            {/* <!-- подпись с ошибкой заполнения url-адреса  --> */}
            <span id="place-img-input-error" className="popup__input-error">ошибка заполнения</span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;