function closeEscPopup(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

export function openModal(modal) {
  modal.classList.remove('popup_is-animated');
  modal.classList.add('popup_is-opened');
  // Сброс opacity, чтобы transition сработал
  modal.style.opacity = '0';
  modal.style.display = 'flex';
  modal.style.visibility = 'visible';
  modal.style.pointerEvents = 'all';
  document.addEventListener('keydown', closeEscPopup);

  // Запускаем анимацию появления
  requestAnimationFrame(() => {
    modal.style.opacity = '1';
  });
}

export function closeModal(modal) {
  // Плавно скрываем
  modal.style.opacity = '0';
  modal.style.pointerEvents = 'none';
  modal.style.visibility = 'hidden';
  document.removeEventListener('keydown', closeEscPopup);

  setTimeout(() => {
    modal.classList.remove('popup_is-opened');
    modal.style.display = 'none';
  }, 600); // 600ms = время transition
}