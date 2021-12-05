export class Card {
    constructor({ data, handleImageClick }, cardSelector){
        this._link = data.link;
        this._image = data.image;
        this._handleImageClick = handleImageClick;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
      const cardElement = document.querySelector(this._cardSelector).content.querySelector('.place').cloneNode(true);
      return cardElement;
  }

    createCard() {
      this._element = this._getTemplate();
      this._element.querySelector('.place__title').textContent = this._image;
      this._cardLikeButton = this._element.querySelector('.place__like-icon');

      const cardImage = this._element.querySelector('.place__image');

      cardImage.src = this._link;
      cardImage.alt = this._image;

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

  // событие передаёт в функцию-обработчик
  _setEventListeners(){
  this._element.querySelector('.place__like-icon').addEventListener('click', () => {
    this._handleLikeClick();
  })

  this._element.querySelector('.place__delete-button').addEventListener('click', () => {
      this._handleDeleteClick();
  })

  this._element.querySelector('.place__image').addEventListener('click', () => {
    this._handleImageClick({link: this._link, image: this._image})
  });
}
}