const configValidation = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__input_invalid',
    errorClass: 'form__input-error_active'
};

const page = document.querySelector('.page');
const forms = page.querySelector('.form');
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

import formValidator from './formValidator.js';
import card from './card.js';

const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new formValidator(config, formElement)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

    console.log(formName)

   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(configValidation);
 

function createNewCard(name, link) {
    const cardElement = new card(name, link, '#card-template').renderCard();
    return cardElement
}
  

initialCards.forEach(element => {
    const card = createNewCard(element.name, element.link);
    photoGridList.prepend(card);
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

    formValidators['profile-edit'].resetValidation()
});
profileAddBtn.addEventListener('click', function(evt){
    evt.preventDefault();

    openPopup(popupCard, evt);
});
formProfile.addEventListener('submit', submitFormProfile);
formCard.addEventListener('submit', function(evt){
    evt.preventDefault();
    const card = createNewCard(popupCardTitle.value, popupCardImg.value);
    photoGridList.prepend(card);
    closePopup(popupCard);
    formCard.reset();

    formValidators['card-edit'].resetValidation()
});

export { popupImg, popupDescription, openPopup, popupShowPhoto, configValidation };