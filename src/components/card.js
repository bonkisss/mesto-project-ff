const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(cardData, { handleDelete, handleLike, handleImageClick, currentUserId }) {
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

  // Показываем корзину только для своих карточек
  if (cardData.owner._id !== currentUserId) {
    deleteButton.style.display = 'none';
  } else {
    deleteButton.addEventListener('click', () => handleDelete(cardElement, cardData._id));
  }

  // Отображаем активный лайк, если пользователь уже лайкнул
  if (cardData.likes.some(user => user._id === currentUserId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => handleLike(cardElement, cardData._id, likeButton, likeCount));
  cardImage.addEventListener('click', () => handleImageClick(cardData));

  return cardElement;
}