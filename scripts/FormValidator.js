export class FormValidator {
    constructor(config, formElement){
        this._config = config;
        this._formElement = formElement;
        this._inputList = formElement.querySelectorAll(config.inputSelector);
        this._submitButton = formElement.querySelector(config.submitButtonSelector);
    }

//включение и выключение ошибки
_showInputError = (inputElement, errorElement) => {
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
};

_hideInputError = (inputElement, errorElement) => {
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
};


//валидация поля
_checkInputValidity = (formElement, inputElement) => {
    const isInputNotValid = !inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`); //# обозначение идентификатора
    if (isInputNotValid) {
        this._showInputError(inputElement, errorElement);
    } else {
        this._hideInputError(inputElement, errorElement);
    }
};

_toggleButtonState = (button, isActive) => {
    if (isActive) {
        button.classList.remove(this._config.inactiveButtonClass);
        button.disabled = false;
    } else { //включаем кнопку
        button.classList.add(this._config.inactiveButtonClass);
        button.disabled = 'disabled';
    }
};

_setEventListeners = (formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass) => {
    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    Array.from(this._inputList).forEach(inputElement => {
        inputElement.addEventListener('input', () => {
           const isValid = formElement.checkValidity(); 
           this._checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
           this._toggleButtonState(this._submitButton, isValid);
        });
    });
};

//отключение кнопки "сохранить"
disabledButton () {
    this._submitButton.classList.add(this._config.inactiveButtonClass)
    this._submitButton.disabled = true;
}

enableValidation = () => {
    /*const formList = document.querySelectorAll(this._config.formSelector);
    formList.forEach(_formElement => {
        this._setEventListeners(
            this._formElement,
            this._config.inputSelector,
            this._config.submitButtonSelector,
            this._config.inputErrorClass,
            this._config.errorClass,
            this._config.inactiveButtonClass
        );
    });*/
    this._setEventListeners(this._formElement, this._config);
}
}

