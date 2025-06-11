// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

// DOM-узлы для формы добавления новой карточки
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = newCardPopup.querySelector('.popup__form');
const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = newCardForm.querySelector('.popup__input_type_url');

// Находим кнопку "+" (добавить карточку)
const addCardButton = document.querySelector('.profile__add-button');

// Находим кнопку закрытия попапа новой карточки
const newCardCloseButton = newCardPopup.querySelector('.popup__close');

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

// Обработчик открытия попапа новой карточки
addCardButton.addEventListener('click', function() {
  newCardPopup.classList.add('popup_is-opened');
});

// Обработчик закрытия попапа по крестику
newCardCloseButton.addEventListener('click', function() {
  closePopup(newCardPopup);
});

// Функция для закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

// Обработчик отправки формы новой карточки
newCardForm.addEventListener('submit', function(evt) {
  evt.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  const cardData = { name, link };
  const cardElement = createCard(cardData, handleDeleteCard);

  // Добавляем новую карточку в начало списка
  placesList.prepend(cardElement);

  // Очищаем форму
  newCardForm.reset();

  // Закрываем попап
  closePopup(newCardPopup);
});

// Вывести карточки на страницу
initialCards.forEach(function(cardData) {
  const cardElement = createCard(cardData, handleDeleteCard);
  placesList.appendChild(cardElement);
});
