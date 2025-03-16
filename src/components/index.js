import '../index.css';
import {createCard, deleteCard, handleLikeButton} from './card';
import {showPopup, hidePopup} from './modal';
import {clearValidation, enableValidation} from './validation';

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
const profileImage = document.querySelector('.profile__image');
const popupEditProfileImage = document.querySelector('.popup_type_edit-profile-image');
const formEditProfileImage = document.forms['edit-profile-image'];
const profileImageInput = document.querySelector('.popup__input_type_profile_image');

const settings =  {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'form__input-error_active'
}; 


//Попап по нажатию на картинку
function handleImageClick(evt, name) {
    popupImage.src  = evt.target.src; 
    popupImage.alt  = evt.target.alt; 
    popupCaption.textContent  = name;
    showPopup(popupTypeImage);
};


//Редактирование имени и информации о себе
function handleFormEditProfile(evt) {
  evt.preventDefault();
  if (jobInput && nameInput) {
    profileDescription.textContent = jobInput.value;
    profileTitle.textContent = nameInput.value;
    patchUpdateProfile();
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
    link: cardImageInput.value,
    likes: []
  };
  const newCard = createCard(cardInfo, deleteCard, handleLikeButton, handleImageClick);
  placesList.prepend(newCard);
  postNewCard(cardInfo.name, cardInfo.link);
  formNewPlace.reset();
  hidePopup(popupTypeNewCard);
}


// Обработчик открытия попапа на кнопку 
profileEditButton.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  const form = formEditProfile;
  clearValidation (form, settings);
  showPopup(popupTypeEdit);
});

profileAddButton.addEventListener('click', function () {
  showPopup(popupTypeNewCard);
  const form = formEditProfile;
  clearValidation (form, settings);
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

enableValidation(settings); 









//запрос чтобы получить данные пользователя

export function fetchUserData() {
  return fetch ('https://nomoreparties.co/v1/pwff-cohort-1/users/me', {
    headers: {
      authorization: '4ced1f7f-b5e7-41c7-b685-2106f174e3aa'
    }
  })
  .then ((res) => {
    return res.json();
  });
}



//запрос чтобы получить карточки и вывести их
function fetchCardsData() {
  return fetch ('https://nomoreparties.co/v1/pwff-cohort-1/cards', {
    headers: {
      authorization: '4ced1f7f-b5e7-41c7-b685-2106f174e3aa'
    }
  })
  .then ((res) => {
    return res.json();
  })
}


Promise.all ([fetchUserData(), fetchCardsData()])
.then(([dataUser, dataCards]) => {
  profileTitle.textContent = dataUser.name;
  profileDescription.textContent = dataUser.about;
  const picture = dataUser.avatar;
  profileImage.style.backgroundImage = `url('${picture}')`;

  dataCards.forEach(function (card) {
    const newCard = createCard(card, deleteCard, handleLikeButton, handleImageClick);
    placesList.append(newCard);
  }); 
})
.catch((err) => {
  console.log(err);
});


//отправить данные о пользователе
function patchUpdateProfile() {
  return fetch('https://nomoreparties.co/v1/pwff-cohort-1/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '4ced1f7f-b5e7-41c7-b685-2106f174e3aa',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      name: profileTitle.textContent,
      about: profileDescription.textContent
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch(err => console.error(err));
}


//запрос на добавление новой карточки

function postNewCard(name, link) {
  fetch('https://nomoreparties.co/v1/pwff-cohort-1/cards', {
    method: 'POST',
    headers: {
      authorization: '4ced1f7f-b5e7-41c7-b685-2106f174e3aa',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Card added:', data);
  })
  .catch(error => {
    console.error('Error adding card:', error);
  });
}




//Открыть поп-ап редактирования профиля
profileImage.addEventListener('click', function () {
  showPopup(popupEditProfileImage);
});

//Редактирование фото профиля 
function handleFormEditProfileImage(evt) {
  evt.preventDefault();
  if (profileImageInput) {
    fetch('https://nomoreparties.co/v1/pwff-cohort-1/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: '4ced1f7f-b5e7-41c7-b685-2106f174e3aa',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: profileImageInput.value
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {
      profileImage.style.backgroundImage = `url('${data.avatar}')`;
      hidePopup(popupEditProfileImage);
    })
    .catch(err => console.error(err));
  }
}

formEditProfileImage.addEventListener('submit', handleFormEditProfileImage);
