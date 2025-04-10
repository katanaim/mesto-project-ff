import "../index.css";
import { createCard, deleteCard, handleLikeButton } from "./card";
import { showPopup, hidePopup } from "./modal";
import { clearValidation, enableValidation } from "./validation";
import {
  fetchUserData,
  fetchCardsData,
  patchUpdateProfile,
  postNewCard,
  postProfileImage,
} from "./api";
export let userData;

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popups = document.querySelectorAll(".popup");
const formEditProfile = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const formNewPlace = document.forms["new-place"];
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardImageInput = document.querySelector(".popup__input_type_url");
const placesList = document.querySelector(".places__list");
const profileDescription = document.querySelector(".profile__description");
const profileTitle = document.querySelector(".profile__title");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const profileImage = document.querySelector(".profile__image");
const popupEditProfileImage = document.querySelector(
  ".popup_type_edit-profile-image"
);
const formEditProfileImage = document.forms["edit-profile-image"];
const profileImageInput = document.querySelector(
  ".popup__input_type_profile_image"
);

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input-error",
  errorClass: "form__input-error_active",
};

//Попап по нажатию на картинку
function handleImageClick(evt, name) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = name;
  showPopup(popupTypeImage);
}

//Редактирование имени и информации о себе
function handleFormEditProfile(evt) {
  evt.preventDefault();
  const button = evt.target.querySelector(".popup__button");
  if (jobInput && nameInput) {
    renderLoading(button, true);
    patchUpdateProfile(profileTitle.textContent, profileDescription.textContent)
      .then(() => {
        profileDescription.textContent = jobInput.value;
        profileTitle.textContent = nameInput.value;
        hidePopup(popupTypeEdit);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        renderLoading(button, false);
      });
  } else {
    console.error("jobInput or nameInput is null");
  }
}

function renderLoading(button, isLoading) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

//Создание новой карточки
function handleFormNewPlace(evt) {
  const button = evt.target.querySelector(".popup__button");
  renderLoading(button, true);
  evt.preventDefault();
  postNewCard(cardNameInput.value, cardImageInput.value)
    .then((data) => {
      const newCard = createCard(
        data,
        deleteCard,
        handleLikeButton,
        handleImageClick
      );
      placesList.prepend(newCard);
      hidePopup(popupTypeNewCard);
      formNewPlace.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(button, false);
    });
}

// Обработчик открытия попапа на кнопку
profileEditButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, settings);
  showPopup(popupTypeEdit);
});

profileAddButton.addEventListener("click", function () {
  formNewPlace.reset();
  clearValidation(formNewPlace, settings);
  showPopup(popupTypeNewCard);
});

// Обработчик закрытия попапов по кнопке и по оверлею
popups.forEach(function (popupElement) {
  const popupCloseButton = popupElement.querySelector(".popup__close");
  popupCloseButton.addEventListener("click", function () {
    hidePopup(popupElement);
  });
  popupElement.addEventListener("click", function (evt) {
    if (evt.target === evt.currentTarget) {
      hidePopup(popupElement);
    }
  });
});

formEditProfile.addEventListener("submit", handleFormEditProfile);
formNewPlace.addEventListener("submit", handleFormNewPlace);

enableValidation(settings);

Promise.all([fetchUserData(), fetchCardsData()])
  .then(([dataUser, dataCards]) => {
    userData = dataUser;
    profileTitle.textContent = dataUser.name;
    profileDescription.textContent = dataUser.about;
    const picture = dataUser.avatar;
    profileImage.style.backgroundImage = `url('${picture}')`;

    dataCards.forEach(function (card) {
      const newCard = createCard(
        card,
        deleteCard,
        handleLikeButton,
        handleImageClick
      );
      placesList.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//Открыть поп-ап редактирования профиля
profileImage.addEventListener("click", function () {
  formEditProfileImage.reset();
  clearValidation(formEditProfileImage, settings);
  showPopup(popupEditProfileImage);
});

//Редактирование фото профиля
function handleFormEditProfileImage(evt) {
  evt.preventDefault();
  const button = evt.target.querySelector(".popup__button");
  renderLoading(button, true);
  if (profileImageInput) {
    postProfileImage(profileImageInput)
      .then((data) => {
        profileImage.style.backgroundImage = `url('${data.avatar}')`;
        hidePopup(popupEditProfileImage);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        renderLoading(button, false);
      });
  }
}

formEditProfileImage.addEventListener("submit", handleFormEditProfileImage);
