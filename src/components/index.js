import '../index.css';
import { initialCards } from '../cards';
import {createCard, deleteCard, handleLikeButton} from './card';
import {showPopup, hidePopup} from './modal';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
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
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// Вывести карточки на страницу
initialCards.forEach(function (card) {
  const newCard = createCard(card, deleteCard, handleLikeButton, handleImageClick);
  placesList.append(newCard);
}); 

//Попап по нажатию на картинку
function handleImageClick(evt, cardElement) {
  if (evt.target === cardElement.querySelector('.card__image')) {
    popupImage.src  = evt.target.src; 
    popupImage.alt  = evt.target.alt; 
    popupCaption.textContent  = cardElement.querySelector('.card__title').textContent;
    showPopup(popupTypeImage);
  }
};


//Редактирование имени и информации о себе
function handleFormEditProfile(evt) {
  evt.preventDefault();
  if (jobInput && nameInput) {
    profileDescription.textContent = jobInput.value;
    profileTitle.textContent = nameInput.value;
  } else {
    console.error('jobInput or nameInput is null');
  }
  hidePopup(popupTypeEdit);
}

//Создание новой карточки
function handleFormNewPlace (evt) {
  evt.preventDefault(); 
  const cardInfo = {
    name: cardNameInput.value,
    link: cardImageInput.value
  };
  const newCard = createCard(cardInfo, deleteCard, handleLikeButton, handleImageClick);
  placesList.prepend(newCard);
  formNewPlace.reset();
  hidePopup(popupTypeNewCard);
}


// Обработчик открытия попапа на кнопку 
profileEditButton.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  showPopup(popupTypeEdit);
});
profileAddButton.addEventListener('click', function () {
  showPopup(popupTypeNewCard);
});

// Обработчик закрытия попапов по кнопке и по оверлею
popups.forEach(function (popupElement) {
  const popupCloseButton = popupElement.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', function () {
    hidePopup(popupElement);
  });
  popupElement.addEventListener('click', function (evt) {
    if (evt.target === evt.currentTarget) {
      hidePopup(popupElement);
    }
  });
});

formEditProfile.addEventListener('submit', handleFormEditProfile);
formNewPlace.addEventListener('submit', handleFormNewPlace);



