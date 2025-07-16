import '../pages/index.css';
import avatar from '../images/avatar.jpg';
import logo from '../images/logo.svg';
import { initialCards } from '../scripts/cards.js';
import { createCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addCard,
  deleteCard,
  changeAvatar
} from './components/api.js';

// DOM-элементы
const placesList = document.querySelector('.places__list');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = newCardPopup.querySelector('.popup__form');
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
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarForm.querySelector('.popup__input_type_avatar-link');
const avatarImage = document.querySelector('.profile__image');
const avatarPopupCloseButton = avatarPopup.querySelector('.popup__close');

// Конфиг для валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

// Открытие попапов
addCardButton.addEventListener('click', () => {
  clearValidation(newCardForm, validationConfig);
  openModal(newCardPopup);
});

newCardCloseButton.addEventListener('click', () => closeModal(newCardPopup));

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
  openModal(editProfilePopup);
});

editProfileCloseButton.addEventListener('click', () => closeModal(editProfilePopup));

avatarImage.addEventListener('click', () => {
  clearValidation(avatarForm, validationConfig);
  openModal(avatarPopup);
});

avatarPopupCloseButton.addEventListener('click', () => closeModal(avatarPopup));
imagePopupCloseButton.addEventListener('click', () => closeModal(imagePopup));

// Открытие попапа с картинкой
function handleImageClick(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(imagePopup);
}

// Закрытие попапов по оверлею
document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('mousedown', function(evt) {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

// Установка аватара и логотипа
avatarImage.style.backgroundImage = `url(${avatar})`;
document.querySelector('.logo').src = logo;

// Загрузка пользователя и карточек
let currentUserId = null;

Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    currentUserId = user._id;
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    avatarImage.style.backgroundImage = `url(${user.avatar})`;

    placesList.innerHTML = '';
    cards.forEach(cardData => {
      const cardElement = createCard(cardData, {
        handleDelete: handleDeleteCard,
        handleImageClick: handleImageClick,
        currentUserId: currentUserId
      });
      placesList.appendChild(cardElement);
    });
  })
  .catch(err => {
    console.error('Ошибка загрузки данных:', err);
  });

// Отправка формы редактирования профиля
editProfileForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const submitButton = editProfileForm.querySelector('.popup__button');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  updateUserInfo(nameInput.value, descriptionInput.value)
    .then(user => {
      profileName.textContent = user.name;
      profileDescription.textContent = user.about;
      closeModal(editProfilePopup);
    })
    .catch(err => {
      console.error('Ошибка обновления профиля:', err);
    })
    .finally(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
});

// Отправка формы новой карточки
newCardForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const submitButton = newCardForm.querySelector('.popup__button');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  const name = newCardForm.querySelector('.popup__input_type_card-name').value;
  const link = newCardForm.querySelector('.popup__input_type_url').value;

  addCard(name, link)
    .then(cardData => {
      const cardElement = createCard(cardData, {
        handleDelete: handleDeleteCard,
        handleImageClick: handleImageClick,
        currentUserId: currentUserId
      });
      placesList.prepend(cardElement);
      newCardForm.reset();
      clearValidation(newCardForm, validationConfig);
      closeModal(newCardPopup);
    })
    .catch(err => {
      console.error('Ошибка добавления карточки:', err);
    })
    .finally(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
});

// Отправка формы смены аватара
avatarForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const submitButton = avatarForm.querySelector('.popup__button');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  changeAvatar(avatarInput.value)
    .then(user => {
      avatarImage.style.backgroundImage = `url(${user.avatar})`;
      closeModal(avatarPopup);
    })
    .catch(err => {
      console.error('Ошибка обновления аватара:', err);
    })
    .finally(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
});

// Удаление карточки
function handleDeleteCard(cardElement, cardId) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch(err => {
      console.error('Ошибка удаления карточки:', err);
    });
}
