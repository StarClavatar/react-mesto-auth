//массив стандартного набора карточек, которые должны загружаться с сервера
// этот блок необходим для webpack. Сначала объявляем url, потом их используем в массиве
const XinCun = new URL('.././images/XinCun.jpg',
    import.meta.url);
const TheRomanticPark = new URL('.././images/TheRomanticPark.jpg',
    import.meta.url);
const theLostChambersAquarium = new URL('.././images/theLostChambersAquarium.jpg',
    import.meta.url);
const TheRomanticPark2 = new URL('.././images/TheRomanticPark2.jpg',
    import.meta.url);
const parkYanoda = new URL('.././images/parkYanoda.jpg',
    import.meta.url);
const kama = new URL('.././images/kama.jpeg',
    import.meta.url);
//

export const initialCards = [
    {
        name: 'Xincun, Hainan',
        link: XinCun //теперь вместо url переменная, объявленая выше (необходимо для webpack)
    },
    {
        name: 'The Romantic Park',
        link: TheRomanticPark
    },
    {
        name: 'The Lost Chambers Aquarium',
        link: theLostChambersAquarium
    },
    {
        name: 'The Romantic Park',
        link: TheRomanticPark2
    },
    {
        name: 'Yanoda park',
        link: parkYanoda
    },
    {
        name: 'Гангстер со стажем',
        link: kama
    }
];

// объект с настройками валидации
export const validationData = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
}

// ID шаблона новой фото
export const newCardTemplateId = '#element-grid-template'

// Profile
const profile = document.querySelector('.profile')
export const profileTitleSelector = '.profile__title'
export const profileShortSelector = '.profile__short-description'
export const profilePhotoSelector ='.profile__avatar'
export const profileTitle = profile.querySelector('.profile__title')
export const popupEditProfileButton = profile.querySelector('.profile__button_type_edit')
export const ProfilePhotoEditButton = profile.querySelector('.profile__avatar-edit-button')
export const popupAddCardButton = profile.querySelector('.profile__button_type_add')

//ProfileEditPopup
export const popupEditProfileSelector = '.popup_type_edit';
export const popupEditProfileNameId = 'name-input';
export const popupEditProfileDescId = 'job-input';
export const popupEditProfile = document.querySelector('.popup_type_edit')
export const popupEditProfileForm = popupEditProfile.querySelector('form')

//ProfilePhoto
export const popupProfilePhotoSelector = '.popup_type_new-avatar'
export const popupProfilePhoto = document.querySelector(popupProfilePhotoSelector)
export const popupProfilePhotoForm = popupProfilePhoto.querySelector('form')
export const popupProfilePhotoUrlSelector = 'profile-img-input'


//elements grid
export const elementGridSelector = '.element-grid'

// AddCardPopup
export const popupAddCardSelector = '.popup_type_add'
export const popupAddCard = document.querySelector(popupAddCardSelector)
export const closeAddCardButton = popupAddCard.querySelector('.popup__close-button')
export const popupAddCardForm = popupAddCard.querySelector('form')
export const popupPhotoTitleInputId = 'place-name-input'
export const popupPhotoLinkInputId = 'place-img-input'

//форма подтверждения удаления карточки
export const popupDeleteCarSelector = '.popup_delete-confirm'

// zoomImagePopup
export const popupZoomImage = document.querySelector('.popup_zoom-image')
export const closeZoomImageButton = popupZoomImage.querySelector('.popup__close-button')
export const popupZoomImageImg = popupZoomImage.querySelector('.popup__image')
export const popupZoomImageCaption = popupZoomImage.querySelector('.popup__image-caption')

//константы для работы с API
export const cohortId = 'cohort-32';
export const apiToken = 'ce5975c2-555f-46c5-8851-9175f75178d9';
export const apiBaseUrl = `https://mesto.nomoreparties.co/v1/${cohortId}`
