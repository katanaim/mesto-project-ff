// Показать попап
export function showPopup (popup) {
 // const popup = document.querySelector(popupName);
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', escapeExitHandler);
}

// Убрать попап
export function hidePopup (popup) {
 // const popup = document.querySelector(popupName);
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escapeExitHandler);
}

// Выход из попапа на escape
function escapeExitHandler(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    hidePopup(popup);
  }
}

