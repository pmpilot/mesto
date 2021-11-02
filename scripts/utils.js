//функция отрытие popup
export const openPopup = (popup) => {
  document.addEventListener('keydown', closePopupEscape);
  popup.classList.add('popup_is-opened');
  validationCard.disableButton()
};

//функция закрытия на нажатие esc
export const closePopupEscape = (evt) => {
    if (evt.key === 'Escape'){
      const openPopup = document.querySelector('.popup_is-opened');
      closePopup(openPopup);
    }
  }

  //функция закрытие popup
export const closePopup = (popup) => {
    document.removeEventListener('keydown', closePopupEscape);
    popup.classList.remove('popup_is-opened');
  };