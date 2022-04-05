class mestoApi {
    constructor(params) {
        this._baseUrl = params.baseUrl;
        this._headers = params.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    //загрузка данных профиля
    getProfile() {
        return fetch(
                `${this._baseUrl}/users/me`, {
                    method: 'GET',
                    headers: this._headers
                }
            )
            .then(this._checkResponse);
    }

    // обновление данных пользоателя
    patchProfile(name, about) {
        return fetch(
                `${this._baseUrl}/users/me`, {
                    method: 'PATCH',
                    headers: this._headers,
                    body: JSON.stringify({
                        name: name,
                        about: about
                    })
                }
            )
            .then(this._checkResponse);
    }

    // обновление фото пользоателя
    patchProfilePhoto(link) {
        return fetch(
                `${this._baseUrl}/users/me/avatar`, {
                    method: 'PATCH',
                    headers: this._headers,
                    body: JSON.stringify({
                        avatar: link
                    })
                }
            )
            .then(this._checkResponse);
    }


    //запрашиваем массив карточек с сервера
    getInitialCards() {
        return fetch(
                `${this._baseUrl}/cards`, {
                    method: 'GET',
                    headers: this._headers
                }
            )
            .then(this._checkResponse);
    }

    //создаём новую карточку
    createNewCard(name, link) {
        return fetch(
                `${this._baseUrl}/cards`, {
                    method: 'POST',
                    headers: this._headers,
                    body: JSON.stringify({
                        name: name,
                        link: link
                    })
                }
            )
            .then(this._checkResponse);
    }

    like(id) {
        return fetch(this._url + `/cards/likes/${id}`, {
                method: 'PUT',
                headers: this._headers
            })
            .then(this._checkResponse)
    }

    dislike(id) {
        return fetch(this._url + `/cards/likes/${id}`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(this._checkResponse)
    }


    deleteCard(cardId) {
        return fetch(
                `${this._baseUrl}/cards/${cardId}`, {
                    method: 'DELETE',
                    headers: this._headers
                }
            )
            .then(this._checkResponse);
    }

    //обновляем статус карточки
    updateLikeStatus(cardId, isLiked) {
        if (isLiked) {
            return this._addLike(cardId);
        } else {
            return this._removeLike(cardId);        
        }
    }

    //установить лайк на карточку
    _addLike(cardId) {
        return fetch(
            `${this._baseUrl}/cards/${cardId}/likes`,
            {
                method: 'PUT',
                headers: this._headers
            }
        )
        .then(this._checkResponse);
    }

    //снять лайк с карточки
    _removeLike(cardId) {
        return fetch(
            `${this._baseUrl}/cards/${cardId}/likes`,
            {
                method: 'DELETE',
                headers: this._headers
            }
        )
        .then(this._checkResponse);
    }
}

const Api = new mestoApi({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-32",
    headers: {
        authorization: 'ce5975c2-555f-46c5-8851-9175f75178d9',
        'Content-Type': 'application/json'
    }
});

export default Api;
