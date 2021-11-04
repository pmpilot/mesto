//функция отрытие popup
export const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEscape);
  
};

//функция закрытия на нажатие esc
export const closePopupEscape = (evt) => {
    if (evt.key === 'Escape'){
      const openPopup = document.querySelector('.popup_is-opened');
      closePopup(openPopup);
    }
  };

  //функция закрытие popup
export const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEscape);
  };

  //функция закрытия попапа на нажатие оверлей
export const closePopupOverlay = (event, popup) => {
  if (event.target.classList.contains("popup_is-opened")) {
    closePopup(popup);
  }
};