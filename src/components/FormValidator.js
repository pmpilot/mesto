export class FormValidator {
    constructor(config, formElement){
        this._config = config;
        this._formElement = formElement;
        this._inputList = formElement.querySelectorAll(config.inputSelector);
        this._submitButton = formElement.querySelector(config.submitButtonSelector);
    }

//включение и выключение ошибки
_showInputError = (errorElement, inputElement) => {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._config.inputErrorClass);
};

_hideInputError = (errorElement, inputElement) => {
    errorElement.textContent = ' ';
    inputElement.classList.remove(this._config.inputErrorClass);
};

//валидация поля
_checkInputValidity = (formElement, inputElement) => {
    const isInputNotValid = !inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`); //# обозначение идентификатора
    if (isInputNotValid) {
        this._showInputError(errorElement, inputElement);
    } else {
        this._hideInputError(errorElement, inputElement);
    }
};

resetValidation() {
    this._inputList.forEach((inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        this._hideInputError(errorElement, inputElement);
    });
}

_toggleButtonState = (isActive) => {
    if (isActive) {
        this._submitButton.classList.remove(this._config.inactiveButtonClass);
        this._submitButton.disabled = false;
    } else {
        this.disabledButton();
    }
};

_setEventListeners = () => {
    Array.from(this._inputList).forEach(inputElement => {
        inputElement.addEventListener('input', () => {
           const isValid = this._formElement.checkValidity(); 
           this._checkInputValidity(this._formElement, inputElement);
           this._toggleButtonState(isValid);
        });
    });

    this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
};

//отключение кнопки "сохранить"
disabledButton () {
    this._submitButton.classList.add('popup__button_disabled')
    this._submitButton.disabled = true;
}

enableValidation = () => {
    this._setEventListeners();
  }
}
