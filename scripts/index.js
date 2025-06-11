// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

// @todo: DOM узлы

// Функция создания карточки
function createCard(cardData, handleDelete) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', () => handleDelete(cardElement));

  return cardElement;
}

// Функция удаления карточки
function handleDeleteCard(cardElement) {
  cardElement.remove();
}

// Вывести карточки на страницу
initialCards.forEach(function(cardData) {
  const cardElement = createCard(cardData, handleDeleteCard);
  placesList.appendChild(cardElement);
});
