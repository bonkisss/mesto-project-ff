import '../pages/index.css';
import { initialCards } from '../scripts/cards.js';
import avatar from '../images/avatar.jpg';
import logo from '../images/logo.svg';
import { createCard, handleDeleteCard, handleLikeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

// DOM-элементы
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = newCardPopup.querySelector('.popup__form');
const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = newCardForm.querySelector('.popup__input_type_url');
const addCardButton = document.querySelector('.profile__add-button');
const newCardCloseButton = newCardPopup.querySelector('.popup__close');

const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');

const editProfilePopup = document.querySelector('.popup_type_edit');
const editProfileForm = editProfilePopup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const descriptionInput = editProfileForm.querySelector('.popup__input_type_description');
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileCloseButton = editProfilePopup.querySelector('.popup__close');

// Функция для открытия попапа с картинкой
function handleImageClick(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(imagePopup);
}

// --- Обработчики событий ---

// Открытие попапа добавления карточки
addCardButton.addEventListener('click', () => openModal(newCardPopup));

// Закрытие попапа добавления карточки
newCardCloseButton.addEventListener('click', () => closeModal(newCardPopup));

// Отправка формы новой карточки
newCardForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  const cardData = { name, link };
  const cardElement = createCard(cardData, {
    handleDelete: handleDeleteCard,
    handleLike: handleLikeCard,
    handleImageClick: handleImageClick
  });
  placesList.prepend(cardElement);
  newCardForm.reset();
  closeModal(newCardPopup);
});

// Открытие попапа редактирования профиля
editProfileButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(editProfilePopup);
});

// Закрытие попапа редактирования профиля
editProfileCloseButton.addEventListener('click', () => closeModal(editProfilePopup));

// Отправка формы редактирования профиля
editProfileForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editProfilePopup);
});

// Закрытие попапа с картинкой
imagePopupCloseButton.addEventListener('click', () => closeModal(imagePopup));

// Закрытие любого попапа по клику на оверлей
document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('mousedown', function(evt) {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

// Закрытие любого попапа по Esc
document.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
});

// Установка аватара и логотипа
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;
document.querySelector('.logo').src = logo;

// Выводим стартовые карточки
initialCards.forEach(function(cardData) {
  const cardElement = createCard(cardData, {
    handleDelete: handleDeleteCard,
    handleLike: handleLikeCard,
    handleImageClick: handleImageClick
  });
  placesList.appendChild(cardElement);
});