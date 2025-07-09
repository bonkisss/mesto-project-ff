export function openModal(modal) {
  modal.classList.add('popup_is-opened');
}

export function closeModal(modal) {
  modal.classList.add('popup_is-animated');
  modal.classList.remove('popup_is-opened');
  setTimeout(() => {
    modal.classList.remove('popup_is-animated');
  }, 600);
}