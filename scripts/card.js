import { popupImg, popupDescription, openPopup, popupShowPhoto } from "./index.js";

export default class CreateCard {
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
    }

    _handleLike() {
        const likeBtn = this._card
        .querySelector('.photo-grid__like-button');

        likeBtn.classList.toggle('photo-grid__like-button_active');
    };
    
    _handleDelete() {
        const victimCard = this
        ._card
        .closest('.photo-grid__item');
        victimCard.remove();
    };

    _showPopupImage(evt) {
        const cardPhoto = this
        ._card.querySelector('.photo-grid__img');

        popupImg.src = cardPhoto.src;
        popupImg.alt = cardPhoto.alt;
        popupDescription.textContent = cardPhoto.alt;
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