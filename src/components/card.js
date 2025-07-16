import { likeCard, unlikeCard } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

// Обработчик лайка
export function handleLikeCard(cardElement, cardId, likeButton, likeCount, currentUserId) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const request = isLiked ? unlikeCard(cardId) : likeCard(cardId);

  request
    .then(cardData => {
      likeCount.textContent = Array.isArray(cardData.likes) ? cardData.likes.length : 0;

      const isUserLiked = cardData.likes.some(user => user._id === currentUserId);
      likeButton.classList.toggle('card__like-button_is-active', isUserLiked);
    })
    .catch(err => {
      console.error('Ошибка при изменении лайка:', err);
    });
}

// Создание карточки
export function createCard(cardData, { handleDelete, handleImageClick, currentUserId }) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCount.textContent = Array.isArray(cardData.likes) ? cardData.likes.length : 0;

  if (cardData.owner._id !== currentUserId) {
    deleteButton.style.display = 'none';
  } else {
    deleteButton.addEventListener('click', () => handleDelete(cardElement, cardData._id));
  }

  if (cardData.likes.some(user => user._id === currentUserId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => {
    handleLikeCard(cardElement, cardData._id, likeButton, likeCount, currentUserId);
  });

  cardImage.addEventListener('click', () => handleImageClick(cardData));

  return cardElement;
}