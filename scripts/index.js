// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard ({name, link}, deleteFunction) {

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;

  const button = cardElement.querySelector('.card__delete-button');
  button.addEventListener('click', function () {
    deleteFunction (cardElement)
  });
  return cardElement; 
}


// @todo: Функция удаления карточки
function deleteCard (cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
  const newCard = createCard(card, deleteCard);
  placesList.append(newCard);
})