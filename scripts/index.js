const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');
const photoGridList = document.querySelector('.photo-grid__list');
const popup = document.querySelectorAll('.popup');
const formProfile = document.querySelector('.form-profile');
const formCard = document.querySelector('.form-card');
const popupCloseBtn = document.querySelectorAll('.popup__close-button');
const popupProfile = document.querySelector('#popup-profile');
const popupProfileName = document.querySelector('.form__input_type_profile-name');
const popupProfileDescription = document.querySelector('.form__input_type_profile-description');
const popupCard = document.querySelector('#popup-card');
const popupCardTitle = document.querySelector('.form__input_type_card-title');
const popupCardImg = document.querySelector('.form__input_type_card-img-link');
const popupShowPhoto = document.querySelector('#popup-img');
const popupImg = document.querySelector('.popup__image');
const popupDescription = document.querySelector('.popup__description');
const cardTemplate = document.querySelector('#card-template');
 

function popupOpened(evt) {
    if (evt.target.classList.contains('profile__edit-button')) {
        popupProfile.classList.add('popup_opened');
        popupProfileName.value = profileName.textContent;
        popupProfileDescription.value = profileDescription.textContent;
    } else {
        popupCard.classList.add('popup_opened');
    };
};

function closePopup () {
    if (popupProfile.classList.contains('popup_opened')) {
        popupProfile.classList.remove('popup_opened');
    } else if (popupCard.classList.contains('popup_opened')){
        popupCard.classList.remove('popup_opened');
    } else {
        popupShowPhoto.classList.remove('popup_opened');
    }
};


function submitFormProfile(evt) {
    evt.preventDefault();
    profileName.textContent = popupProfileName.value;
    profileDescription.textContent = popupProfileDescription.value;

    closePopup();
};

function submitFormCard(titleValue, imgValue) {
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
        popupShowPhoto.classList.add('popup_opened');
        popupImg.src = evt.target.src;
        popupImg.alt = evt.target.alt;
        popupDescription.textContent = evt.target.alt;
    };

    likeBtn.addEventListener('click', like);
    trashBtn.addEventListener('click', deleteCard);
    cardImage.addEventListener('click', popupImage);

    card.querySelector('.photo-grid__title').textContent = titleValue;
    cardImage.src = imgValue; 
    cardImage.alt = titleValue;

    return card;
};



popupCloseBtn.forEach(element => {
    element.addEventListener('click', closePopup);
});
profileEditBtn.addEventListener('click', popupOpened);
profileAddBtn.addEventListener('click', popupOpened);
formProfile.addEventListener('submit', submitFormProfile);
formCard.addEventListener('submit', function(event){
    event.preventDefault();

    photoGridList.prepend(submitFormCard(popupCardTitle.value, popupCardImg.value));

    closePopup();

    formCard.reset();
});