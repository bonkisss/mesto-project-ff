const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-42',
  headers: {
    authorization: '1c4619f9-7521-418c-86e9-0f22a5e53bf5',
    'Content-Type': 'application/json'
  }
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization
    }
  }).then(res => res.ok ? res.json() : Promise.reject(res.status));
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization
    }
  }).then(res => res.ok ? res.json() : Promise.reject(res.status));
};

export const updateUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  }).then(res => res.ok ? res.json() : Promise.reject(res.status));
};

export const addCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link })
  }).then(res => res.ok ? res.json() : Promise.reject(res.status));
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  }).then(res => res.ok ? res.json() : Promise.reject(res.status));
};

export const changeAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl })
  }).then(res => res.ok ? res.json() : Promise.reject(res.status));
};

export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization
    }
  }).then(res => res.ok ? res.json() : Promise.reject(res.status));
};

export const unlikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  }).then(res => res.ok ? res.json() : Promise.reject(res.status));
};