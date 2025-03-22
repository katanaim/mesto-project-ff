import { fetchUserData, fetchAddLike, fetchDeleteLike, fetchDeleteCard} from './api.js';

// Функция создания карточки
export function createCard ({name, link, likes, owner, _id}, deleteFunction, handleLikeButton, handleImageClick) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.card__image');
  const cardElementLikes = cardElement.querySelector('.card__like-count');
  cardElement.querySelector('.card__title').textContent = name;
  cardElementImage.src = link;
  cardElementImage.alt = name;
  cardElementLikes.textContent = likes.length;
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', (evt) => handleLikeButton(evt, _id));
  cardElementImage.addEventListener('click', (evt) => handleImageClick(evt, name));
  
  const button = cardElement.querySelector('.card__delete-button');
  fetchUserData().then((data) => {
    if (data._id === owner._id) {
      cardElement.querySelector('.card__delete-button').classList.add('card__delete-button_visible');
    }});
  
  button.addEventListener('click', function () {
    deleteFunction(cardElement);
    fetchDeleteCard(_id);

  });
  return cardElement; 
}



//Функция удаления карточки
export function deleteCard (cardElement) {
  cardElement.remove();
}

//Лайк карточки
export function handleLikeButton (evt, _id) {
  evt.target.classList.toggle('card__like-button_is-active');
  if (evt.target.classList.contains('card__like-button_is-active')) {
  fetchAddLike(_id)
  .then ((data) => {
    evt.target.nextElementSibling.textContent = data.likes.length;
  });
  }
  else {
  fetchDeleteLike(_id)
  .then((data) => {
    evt.target.nextElementSibling.textContent = data.likes.length;
  });
  }
}

