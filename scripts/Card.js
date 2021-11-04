import { openPopup } from './utils.js';

//просмотор картинок
const imagePopup = document.querySelector('.popup_type_image');
const img = imagePopup.querySelector('.popup__image');
const titlePopupElement = imagePopup.querySelector('.popup__title-image');

export class Card {
    constructor(data, cardSelector){
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
      const cardElement = document.querySelector(this._cardSelector).content.querySelector('.place').cloneNode(true);
      return cardElement;
  }

    createCard(data) {
      this._element = this._getTemplate();
      this._element.querySelector('.place__title').textContent = this._name;
      this._cardLikeButton = this._element.querySelector('.place__like-icon');
      //this._cardDeleteButton = this._element.querySelector('.place__delete-button');

      const cardImage = this._element.querySelector('.place__image');

      cardImage.src = this._link;
      cardImage.alt = this._name;

      this._setEventListeners();

      return this._element;
  }

    //like
  _handleLikeClick() {
    this._cardLikeButton.classList.toggle('active');
  }

//Удаляем карточки
  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }

//Просмотор картинок
  _handleImageClick() {
    img.src = this._link;
    img.alt = this._name;
    titlePopupElement.textContent = this._name;
    openPopup(imagePopup);
  }

  // событие передаёт в функцию-обработчик
  _setEventListeners(){
  this._element.querySelector('.place__like-icon').addEventListener('click', () => {
    this._handleLikeClick();
  })

  this._element.querySelector('.place__delete-button').addEventListener('click', () => {
      this._handleDeleteClick();
  })

  this._element.querySelector('.place__image').addEventListener('click', () => {
      this._handleImageClick(this._name, this._link);
  });
}
}