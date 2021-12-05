import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupElement = document.querySelector(popupSelector);
        this._imageElement = this._popupElement.querySelector('.popup__image');
        this._titleElement = this._popupElement.querySelector('.popup__title-image');
    }

    open (image, link) {
        super.open();
        this._imageElement.src = link;
        this._imageElement.alt = `Изображение ${image}`;
        this._titleElement.textContent = image;
    }
}