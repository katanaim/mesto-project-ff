import '../index.css';
import { initialCards } from '../cards.js';
import * as cardModule from './card.js';
import * as modalModule from './modal.js';

const profileEditButton = document.querySelector('.profile__edit_button');
const profileAddButton = document.querySelector('.profileAddButton');
const popups = document.querySelectorAll('.popup');
const formEditProfile = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const formNewPlace = document.forms['new-place'];
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardImageInput = document.querySelector('.popup__input_type_url');
const placesList = document.querySelector('.places__list');
const profileDescription = document.querySelector('.profile__description');
const profileTitle = document.querySelector('.profile__title');

// Вывести карточки на страницу
initialCards.forEach(function (card) {
  const newCard = cardModule.createCard(card, cardModule.deleteCard, cardModule.handleLikeButton, imagePopup);
  placesList.append(newCard);
}); 

//Попап по нажатию на картинку
function imagePopup (evt, cardElement) {
  if (evt.target === cardElement.querySelector('.card__image')) {
    document.querySelector('.popup__image').src  = evt.target.src; 
    document.querySelector('.popup__image').alt  = evt.target.alt; 
    document.querySelector('.popup__caption').textContent  = cardElement.querySelector('.card__title').textContent;
    modalModule.showPopup('.popup_type_image');
  }
};

// Обработчик открытия попапа на кнопку 
profileEditButton.addEventListener('click', function () {
  modalModule.showPopup('.popup_type_edit');
  
});
profileAddButton.addEventListener('click', function () {
  modalModule.showPopup('.popup_type_new-card');
});


// Обработчик закрытия попапов по кнопке и по оверлею
popups.forEach(function (popupElement) {
  const popupCloseButton = popupElement.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', function () {
    modalModule.hidePopup(`.${popupElement.classList[1]}`);
  });
  popupElement.addEventListener('click', function (evt) {
    if (evt.target === evt.currentTarget) {
      modalModule.hidePopup(`.${popupElement.classList[1]}`)
    }
  });
});

//Редактирование имени и информации о себе
function handleFormEditProfile(evt) {
  evt.preventDefault();
  if (jobInput && nameInput) {
    profileDescription.textContent = jobInput.value;
    profileTitle.textContent = nameInput.value;
  } else {
    console.error('jobInput or nameInput is null');
  }
  modalModule.hidePopup('.popup_type_edit');
}

formEditProfile.addEventListener('submit', handleFormEditProfile);


//Создание новой карточки
function handleFormNewPlace (evt) {
  evt.preventDefault(); 
  const cardInfo = {
    name: cardNameInput.value,
    link: cardImageInput.value
  };
  const newCard = cardModule.createCard(cardInfo, cardModule.deleteCard, cardModule.handleLikeButton, imagePopup);
  placesList.prepend(newCard);
  formNewPlace.reset();
  modalModule.hidePopup('.popup_type_new-card');
}

formNewPlace.addEventListener('submit', handleFormNewPlace);



