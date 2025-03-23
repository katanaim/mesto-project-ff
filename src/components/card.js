import { fetchAddLike, fetchDeleteLike, fetchDeleteCard} from './api.js';
import { userData } from './index.js';

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
  if (checkLikeStatus(likes, userData._id)) {
    likeButton.classList.add('card__like-button_is-active');
  }
  likeButton.addEventListener('click', (evt) => handleLikeButton(evt, likes, _id));
  cardElementImage.addEventListener('click', (evt) => handleImageClick(evt, name));
  
  const button = cardElement.querySelector('.card__delete-button');
    if (userData._id === owner._id) {
      cardElement.querySelector('.card__delete-button').classList.add('card__delete-button_visible');
    };
  
  button.addEventListener('click', function () {
    fetchDeleteCard(_id)
    .then(() => {
        deleteFunction(cardElement);
    })
    .catch(err => {
      console.log(err);
    });
  });
  return cardElement; 
}



//Функция удаления карточки
export function deleteCard (cardElement) {
  cardElement.remove();
}

//Лайк карточки
export function handleLikeButton (evt, likes, _id) {
  
  if (!checkLikeStatus (likes, userData._id)) {
  fetchAddLike(_id)
  .then ((data) => {
    likes.splice(0, likes.length, ...data.likes);
    evt.target.nextElementSibling.textContent = data.likes.length;
    evt.target.classList.add('card__like-button_is-active');
  })
  .catch( err => {
    console.log(err);
  });
  }
  else {
  fetchDeleteLike(_id)
  .then((data) => {
    likes.splice(0, likes.length, ...data.likes);
    evt.target.nextElementSibling.textContent = data.likes.length;
    evt.target.classList.remove('card__like-button_is-active');
  })
  .catch( err => {
    console.log(err);
  });
  }
}

//Проверка состояния лайка
function checkLikeStatus (likes, userId) {
  return likes.some( (like) => {
    return like._id === userId
});
}

