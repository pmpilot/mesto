export class FormValidator {
    constructor(config, formElement){
        this._config = config;
        this._formElement = formElement;
        this._inputList = formElement.querySelectorAll(config.inputSelector);
        this._submitButton = formElement.querySelector(config.submitButtonSelector);
        this._errorClass = config.errorClass;
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

_toggleButtonState = (button, isActive) => {
    if (isActive) {
        button.classList.remove(this._config.inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(this._config.inactiveButtonClass);
        button.disabled = 'disabled';
    }
};

_setEventListeners = (config) => {
    Array.from(this._inputList).forEach(inputElement => {
        inputElement.addEventListener('input', () => {
           const isValid = this._formElement.checkValidity(); 
           this._checkInputValidity(this._formElement, inputElement, config);
           this._toggleButtonState(this._submitButton, isValid, config);
        });
    });

    this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
};
//отключение кнопки "сохранить"
disabledButton () {
    this._submitButton.classList.add(this._config.inactiveButtonClass)
    this._submitButton.disabled = true;
}

enableValidation = () => {
    this._setEventListeners();
  }
}
