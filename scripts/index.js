const configValidation = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__input_invalid',
    errorClass: 'form__input-error_active'
};

const page = document.querySelector('.page');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');
const photoGridList = document.querySelector('.photo-grid__list');
const popups = document.querySelectorAll('.popup');
const formProfile = document.querySelector('.form-profile');
const formCard = document.querySelector('.form-card');
const popupCloseBtns = document.querySelectorAll('.popup__close-button');
const popupProfile = document.querySelector('#popup-profile');
const popupProfileName = document.querySelector('#form__edit-profile-name');
const popupProfileDescription = document.querySelector('#form__edit-profile-description');
const popupCard = document.querySelector('#popup-card');
const popupCardTitle = document.querySelector('#form__card-title');
const popupCardImg = document.querySelector('#form__card-img');
const inputsListCard = Array.from(formCard.querySelectorAll(configValidation.inputSelector));
const popupShowPhoto = document.querySelector('#popup-img');
const popupImg = document.querySelector('.popup__image');
const popupDescription = document.querySelector('.popup__description');

import enableValidation from './formValidator.js';
import CreateCard from './card.js';

initialCards.forEach(element => {
    const Card = new CreateCard(element.name, element.link, '#card-template').renderCard();
    photoGridList.prepend(Card);
});

function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    } else {
        return;
}};

function openPopup(popup) {
    popup.classList.add('popup_opened');
    page.addEventListener('keydown', closePopupEsc);
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    page.removeEventListener('keydown', closePopupEsc);
};


function submitFormProfile(evt) {
    evt.preventDefault();

    profileName.textContent = popupProfileName.value;
    profileDescription.textContent = popupProfileDescription.value;

    closePopup(popupProfile);
};

popups.forEach(function (popup) {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__close-button')) {
          closePopup(popup);
        }
    })
});
profileEditBtn.addEventListener('click', function(evt){
    evt.preventDefault();

    openPopup(popupProfile, evt);

    popupProfileName.value = profileName.textContent;
    popupProfileDescription.value = profileDescription.textContent;

    new enableValidation(configValidation).toggleBtnState(formCard, inputsListCard);
});
profileAddBtn.addEventListener('click', function(evt){
    evt.preventDefault();

    openPopup(popupCard, evt);
});
formProfile.addEventListener('submit', submitFormProfile);
formCard.addEventListener('submit', function(evt){
    evt.preventDefault();

    const Card = new CreateCard(popupCardTitle.value, popupCardImg.value, '#card-template').renderCard();
    photoGridList.prepend(Card);
    closePopup(popupCard);
    formCard.reset();

    new enableValidation(configValidation).toggleBtnState(formCard, inputsListCard);
});

new enableValidation(configValidation).enableValidation();

export { popupImg, popupDescription, openPopup, popupShowPhoto, configValidation };