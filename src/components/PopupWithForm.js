import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor( { popupSelector, handleFormSubmit } ) {
        super(popupSelector);

        this._popupElement = document.querySelector(popupSelector);
        this._popupFormElement = this._popupElement.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popupFormElement.querySelectorAll('.popup__input');
        this._clickFormSubmit = this._submitClick.bind(this);
        this._popupSubmitButton = this._popupElement.querySelector('.popup__submit-button')
        this._submitButtonText = this._popupSubmitButton.textContent
    }

    //сбрасываем данные формы. 
    close() {
        this._popupFormElement.reset();
        super.close(); //вызываем close родительского метода
    }

    //из формы достаем все данные полей и сохраняем в объект
    _getInputValues() {
        const formValues = {};
        this._inputList.forEach(input => formValues[input.name] = input.value);//создаем по названию name форму values

        return formValues;
    };

    _submitClick(event) {
        event.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this.close();
    }; 

     //закрытие попапа когда форма была засабмичена
    setEventListeners() {
        super.setEventListeners();
        this._popupFormElement.addEventListener('submit', this._clickFormSubmit);
        };

    renderLoading(isLoading, loadingMessage='Сохранение...') {
        if(isLoading) {
            this._popupSubmitButton.textContent = loadingMessage
        } else {
            this._popupSubmitButton.textContent = this._submitButtonText
        }
    }
}