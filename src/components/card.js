

// Функция создания карточки
export function createCard ({name, link}, deleteFunction, handleLikeButton, handleImageClick) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__title').textContent = name;
  cardElementImage.src = link;
  cardElementImage.alt = name;

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', handleLikeButton);

  cardElementImage.addEventListener('click', (evt) => handleImageClick(evt, name));

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
