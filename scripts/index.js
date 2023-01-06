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
const cardTemplate = document.querySelector('#card-template');
  

initialCards.forEach(element => {
    photoGridList.prepend(createCard(element.name, element.link));
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

function createCard(titleValue, imgValue) {
    const card = cardTemplate.content.querySelector('.photo-grid__item').cloneNode(true);
    const cardImage = card.querySelector('.photo-grid__img');
    const likeBtn = card.querySelector('.photo-grid__like-button');
    const trashBtn = card.querySelector('.photo-grid__trash-button');

    function like(){
        likeBtn.classList.toggle('photo-grid__like-button_active');
    };
    
    function deleteCard(){
        const delCard = trashBtn.closest('.photo-grid__item');
        delCard.remove();
    };
    
    function popupImage(evt){
        popupImg.src = evt.target.src;
        popupImg.alt = evt.target.alt;
        popupDescription.textContent = evt.target.alt;
        openPopup(popupShowPhoto);
    };

    likeBtn.addEventListener('click', like);
    trashBtn.addEventListener('click', deleteCard);
    cardImage.addEventListener('click', popupImage);

    card.querySelector('.photo-grid__title').textContent = titleValue;
    cardImage.src = imgValue; 
    cardImage.alt = titleValue;

    return card;
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
});
profileAddBtn.addEventListener('click', function(evt){
    evt.preventDefault();

    openPopup(popupCard, evt);
});
formProfile.addEventListener('submit', submitFormProfile);
formCard.addEventListener('submit', function(evt){
    evt.preventDefault();
    photoGridList.prepend(createCard(popupCardTitle.value, popupCardImg.value));
    closePopup(popupCard);
    formCard.reset();

    toggleBtnState(configValidation, formCard, inputsListCard);
});

enableValidation(configValidation);