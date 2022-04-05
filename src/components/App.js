import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Header from './Header';
import EditProfilePopup from './EditProfilePopup';
import Main from './Main';
import LogIn from './LogIn';
import Register from './Register';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import ProtectedRoute from './ProtectedRoute';
import InfoToolTip from './InfoTooltip';
import React from 'react';
import Api from '../utils/Api';
import * as Auth from '../utils/Auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App(props) {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({name:'',link:'',about:''});
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [cards, setCards] = React.useState([]);
    const [email,setEmail] = React.useState('');
    const [isRegisered, setIsRegitered] = React.useState(false);
    
    const handleEditProfileClick = () => { setIsEditProfilePopupOpen(true) } 
    const handleAddPlaceClick = () => { setIsAddPlacePopupOpen(true) } 
    const handleEditAvatarClick = () => { setIsEditAvatarPopupOpen(true) } 
    const handleInfoTolltipOpen = () => { setIsInfoTooltipOpen(true) };
    const handleCardClick = (link) => { setSelectedCard(link) }

    React.useEffect(
        ()=>{handleTokenCheck()},[]
    );

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsInfoTooltipOpen(false);
        setSelectedCard(null);
    }

    function handleUpdateUser(user){
        Api.patchProfile(user.name,user.about)
        .then ((res)=>{
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch(err=>console.log(err))
    }

    function handleUpdateAvatar(avatarUrl){
        Api.patchProfilePhoto(avatarUrl)
        .then ((res)=>{
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch(err=>console.log(err))   
    }

    function handleAddPlaceSubmit(card){
        Api.createNewCard(card.name, card.link)
        .then ((newCard)=>{
            console.log(newCard);
            setCards([newCard,...cards]);
            closeAllPopups();
        })
        .catch(err=>console.log(err))   
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        Api.updateLikeStatus(card._id, !isLiked)
        .then((newCard) => {
            setCards((prevState)=>{return prevState.map((c) => c._id === card._id ? newCard : c)});
        })
        .catch(err=>console.log(err));
    } 

    function handleCardDelete(card){
        Api.deleteCard(card._id)
        .then (res=>{
            console.log (res)
            setCards ((prevState)=> prevState.filter((c) => c._id !== card._id && c));
        })
    }

    function handleTokenCheck(){
        const token = localStorage.getItem('token');
        if (token) {
            // проверяем токен пользователя
            Auth.checkToken(token)
            .then((res) => {
                if (res) { 
                    handleLogin(res.data.email); 
                }
            })
        }; 
    }

    function handleRegister (email,password) {
        Auth.register(email, password)
        .then((res) => {
            setIsRegitered(!res.error);
            handleInfoTolltipOpen();
        });
    }

    function handleAuthorize(email,password) {
        Auth.authorize(email, password)
        .then((data) => {
            if (data.token){
                localStorage.setItem('token',data.token);
                handleLogin(email);
            }
        })
    }
    
    function handleSignOut() {
        setCards([]);
        setEmail('');
        localStorage.removeItem('token');
    }

    function handleLogin(email){
        setEmail(email);
        props.history.push('/main')
        //загружаем профиль пользователя и карточки 
        Promise.all([Api.getProfile(), Api.getInitialCards()])
        .then(([profile, cards]) => {
            //отображаем информацию профиля    
            setCurrentUser(profile);
            //рисуем все карточки
            setCards(cards);
        })
        .catch(err => { console.log(err) }); 
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>

            <Header emal={email} onSignOut={handleSignOut}/>

            <Switch>

                <Route path="/main">
                    <ProtectedRoute
                        component={Main}
                        email={email}
                        onEditProfile={handleEditProfileClick} 
                        onAddPlace={handleAddPlaceClick} 
                        onEditAvatar={handleEditAvatarClick} 
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardClick={handleCardClick}
                        onCardDelete={handleCardDelete}
                    />

                    <EditProfilePopup 
                        isOpen={isEditProfilePopupOpen} 
                        onUpdateUser={handleUpdateUser} 
                        onClose={closeAllPopups}
                    />  

                    <AddPlacePopup 
                        isOpen={isAddPlacePopupOpen} 
                        onAddPlace={handleAddPlaceSubmit} 
                        onClose={closeAllPopups}
                    />

                    <EditAvatarPopup 
                        isOpen={isEditAvatarPopupOpen} 
                        onUpdateAvatar={handleUpdateAvatar} 
                        onClose={closeAllPopups} 
                    /> 

                    <ImagePopup 
                        isOpen={selectedCard} 
                        onClose={closeAllPopups} 
                    />

                </Route>

                <Route path="/sign-in">
                    <LogIn onAuthorise={handleAuthorize} />
                </Route>

                <Route path="/sign-up">
                    <Register onRegister={handleRegister}/>
                    <InfoToolTip isOpen={isInfoTooltipOpen} isRegisered={isRegisered} onClose={closeAllPopups}/>
                </Route>

                <Route exact path="/">
                    {email ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
                </Route>

            </Switch>
            
            <Footer />      
            
        </CurrentUserContext.Provider>
    );
}

export default withRouter(App);