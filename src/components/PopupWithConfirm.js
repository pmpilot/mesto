import { Popup } from './Popup.js';

export class PopupWithConfirm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector)
        this._submitForm = submitForm
        this._popupSubmitButton = this._popupSelector.querySelector('.popup__submit-button')
        this._submitButtonText = this._popupSubmitButton.textContent
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._submitForm(evt, this._card)
        })
    }

    open(card) {
        super.open()
        this._card = card
    }
}