import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupElement = document.querySelector(popupSelector);
        this._imageElement = this._popupElement.querySelector('.popup__image');
        this._titleElement = this._popupElement.querySelector('.popup__title-image');
    }

    open (name, link) {
        this._imageElement.src = name;
        this._imageElement.alt = `Изображение ${link}`;
        this._titleElement.textContent = link;
        super.open();
    }
}