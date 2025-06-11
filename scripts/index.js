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

// DOM-узлы для попапа просмотра изображения
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');

// Функция открытия попапа с картинкой
function openImagePopup(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  imagePopup.classList.add('popup_is-opened');
}

// Обработчик закрытия попапа с картинкой
imagePopupCloseButton.addEventListener('click', function() {
  closePopup(imagePopup);
});

// Функция создания карточки
function createCard(cardData, handleDelete) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button'); 

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', () => handleDelete(cardElement));

  // Добавляем обработчик открытия попапа с картинкой
  cardImage.addEventListener('click', function() {
    openImagePopup(cardData.name, cardData.link);
  });

  // Добавляем обработчик лайка
  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('card__like-button_is-active');
  });

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

// DOM-узлы для попапа редактирования профиля
const editProfilePopup = document.querySelector('.popup_type_edit');
const editProfileForm = editProfilePopup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const descriptionInput = editProfileForm.querySelector('.popup__input_type_description');
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileCloseButton = editProfilePopup.querySelector('.popup__close');

// Открытие попапа редактирования профиля
editProfileButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  editProfilePopup.classList.add('popup_is-opened');
});

// Закрытие попапа редактирования профиля
editProfileCloseButton.addEventListener('click', function() {
  closePopup(editProfilePopup);
});

// Обработка отправки формы редактирования профиля
editProfileForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(editProfilePopup);
});
