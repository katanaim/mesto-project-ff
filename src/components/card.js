

// Функция создания карточки
export function createCard ({name, link}, deleteFunction, handleLikeButton, imagePopup) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', handleLikeButton);

  cardElement.addEventListener('click', (evt) => imagePopup(evt, cardElement));

  const button = cardElement.querySelector('.card__delete-button');
  button.addEventListener('click', function () {
    deleteFunction(cardElement)
  });
  return cardElement; 
}

//Функция удаления карточки
export function deleteCard (cardElement) {
  cardElement.remove();
}

//Лайк карточки
export function handleLikeButton (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}
