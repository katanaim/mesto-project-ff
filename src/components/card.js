import { fetchAddLike, fetchDeleteLike, fetchDeleteCard } from "./api.js";
import { userData } from "./index.js";

// Функция создания карточки
export function createCard(
  { name, link, likes, owner, _id },
  deleteFunction,
  handleLikeButton,
  handleImageClick
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardElementImage = cardElement.querySelector(".card__image");
  const cardElementLikes = cardElement.querySelector(".card__like-count");
  cardElement.querySelector(".card__title").textContent = name;
  cardElementImage.src = link;
  cardElementImage.alt = name;
  cardElementLikes.textContent = likes.length;
  const likeButton = cardElement.querySelector(".card__like-button");
  if (checkLikeStatus(likes, userData._id)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", (evt) =>
    handleLikeButton(evt, likes, _id, likeButton, cardElementLikes)
  );
  cardElementImage.addEventListener("click", (evt) =>
    handleImageClick(evt, name)
  );

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (userData._id === owner._id) {
    deleteButton.classList.add("card__delete-button_visible");
  }

  deleteButton.addEventListener("click", function () {
    deleteCard(_id, cardElement, deleteFunction);
  });
  return cardElement;
}

export function deleteCard(_id, cardElement, deleteFunction) {
  fetchDeleteCard(_id)
    .then(() => {
      deleteFunction(cardElement);
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

//Лайк карточки
export function handleLikeButton(
  evt,
  likes,
  _id,
  likeButton,
  cardElementLikes
) {
  if (!likeButton.classList.contains("card__like-button_is-active")) {
    fetchAddLike(_id)
      .then((data) => {
        cardElementLikes.textContent = data.likes.length;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    fetchDeleteLike(_id)
      .then((data) => {
        cardElementLikes.textContent = data.likes.length;
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

//Проверка состояния лайка
function checkLikeStatus(likes, userId) {
  return likes.some((like) => {
    return like._id === userId;
  });
}
