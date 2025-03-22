import { fetchUserData } from './index.js';

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
    fetch(`https://nomoreparties.co/v1/pwff-cohort-1/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: '4ced1f7f-b5e7-41c7-b685-2106f174e3aa'
    } 
  })

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
  return fetch (`https://nomoreparties.co/v1/pwff-cohort-1/cards/likes/${_id}`, {
    method: 'PUT',
    headers: {
      authorization: '4ced1f7f-b5e7-41c7-b685-2106f174e3aa'
    }
  })
  .then ((res) => {
    return res.json();
  })
  .then ((data) => {
    evt.target.nextElementSibling.textContent = data.likes.length;
    console.log(data.likes);
  });
  }
  else {
  return fetch (`https://nomoreparties.co/v1/pwff-cohort-1/cards/likes/${_id}`, {
    method: 'DELETE',
    headers: {
      authorization: '4ced1f7f-b5e7-41c7-b685-2106f174e3aa'
    }
  })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    evt.target.nextElementSibling.textContent = data.likes.length;
    console.log(data.likes);
  });
  }
}

