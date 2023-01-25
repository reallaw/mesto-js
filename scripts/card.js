import { popupImg, popupDescription, openPopup, popupShowPhoto } from "./index.js";

export default class Card {
    constructor(title, image, cardTemplate) {
        this._title = title;
        this._image = image;
        this._cardTemplate = cardTemplate;
    };

    _getCardTemplate() {
        this._card = document
        .querySelector(this._cardTemplate)
        .content
        .querySelector('.photo-grid__item')
        .cloneNode(true);
        this._likeBtn = this._card
        .querySelector('.photo-grid__like-button');
        this._victimCard = this
        ._card
        .closest('.photo-grid__item');
        this._cardPhoto = this
        ._card.querySelector('.photo-grid__img');
    }

    _handleLike() {
        this._likeBtn.classList.toggle('photo-grid__like-button_active');
    };
    
    _handleDelete() {
        this._victimCard.remove();
    };

    _showPopupImage(evt) {
        popupImg.src = this._cardPhoto.src;
        popupImg.alt = this._cardPhoto.alt;
        popupDescription.textContent = this._cardPhoto.alt;
        openPopup(popupShowPhoto);
    };

    _setEventListeners() {
        // Like
        this._card
        .querySelector('.photo-grid__like-button')
        .addEventListener('click', () => {
          this._handleLike();
        })
    
        // Delete
        this._card
        .querySelector('.photo-grid__trash-button')
        .addEventListener('click', () => {
          this._handleDelete();
        })
    
        // Popup Image
        this._card
        .querySelector('.photo-grid__img')
        .addEventListener('click', () => {
            this._showPopupImage();
        })
    }

    renderCard() {
        this._getCardTemplate();
        this._setEventListeners();
        this._card.querySelector('.photo-grid__title').textContent = this._title;
        this._card.querySelector('.photo-grid__img').alt = this._title;
        this._card.querySelector('.photo-grid__img').src = this._image;

        return this._card;
    }
}