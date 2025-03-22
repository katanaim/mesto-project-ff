
const config = {
  baseUrl : 'https://nomoreparties.co/v1/pwff-cohort-1',
  headers: {
    authorization: '4ced1f7f-b5e7-41c7-b685-2106f174e3aa',
    'Content-Type': 'application/json'
  }
};

//запрос чтобы получить данные пользователя (экспортируемая)
export function fetchUserData() {
  return fetch (`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then ((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch(err => {
    console.error(err);
  });
}

//запрос чтобы получить карточки и вывести их (экспортируемая)
export function fetchCardsData() {
  return fetch (`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then ((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch(err => {
    console.error(err);
  });
}

//отправить данные о пользователе (экспортируемая)
export function patchUpdateProfile(title, description) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: title,
      about: description
    })
  })
  .then ((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch(err => {
    console.error(err);
  });
}


//запрос на добавление новой карточки (экспортируемая)
export function postNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then ((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(data => {
    console.log('Card added:', data);
 })
  .catch(err => {
    console.error(err);
  });
}

//функция отправки нового фото профиля  (экспортируемая)
export function postProfileImage (profileImageInput) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: profileImageInput.value
    })
  })
  .then ((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch(err => {
    console.error(err);
  });
}

//Функция добавления лайка (экспортируемая)
export function fetchAddLike(_id) {
  return fetch (`${config.baseUrl}/cards/likes/${_id}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then ((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch(err => {
    console.error(err);
  });
}

//Функция удаления лайка (экспортируемая)
export function fetchDeleteLike(_id) {
  return fetch (`${config.baseUrl}/cards/likes/${_id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then ((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch(err => {
    console.error(err);
  });
}

//Функция удаления карточки (экспортируемая)
export function fetchDeleteCard(_id) {
  return fetch(`${config.baseUrl}/cards/${_id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then ((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch(err => {
    console.error(err);
  });
}