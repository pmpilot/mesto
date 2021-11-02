export class FormValidator {
    constructor(config, formElement){
        this._config = config
        this._formElement = formElement
        this._inputList = formElement.querySelectorAll(config.inputSelector)
    }

//включение и выключение ошибки
_showInputError = (formElement, inputElement, errorElement, inputErrorClass, errorClass) => {
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
};

_hideInputError = (formElement, inputElement, errorElement, inputErrorClass, errorClass) => {
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};


//валидация поля
_checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`); //# обозначение идентификатора
    if (!inputElement.validity.valid) {
        this._showInputError(formElement, inputElement, errorElement, inputErrorClass, errorClass);
    } else {
        this._hideInputError(formElement, inputElement, errorElement, inputErrorClass, errorClass);
    }
};

_hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
};

//ошибка пустых строк
_hasNotInputValues = (inputList) => {
    return inputList.every(inputElement => {
        return inputElement.value.lenght === 0;
    });
};

_disableSubmitButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass);
};

_enableSubmitButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.remove(inactiveButtonClass);
};

//переключение состояния кнопки
_toggleButtonState = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
    const buttonElement = formElement.querySelector(submitButtonSelector);

    if (this._hasInvalidInput(inputList) || this._hasNotInputValues(inputList)) { //выключаем кнопку
        this._disableSubmitButton(buttonElement, inactiveButtonClass);
    } else { //включаем кнопку
        this._enableSubmitButton(buttonElement, inactiveButtonClass);
    }
};

_setEventListeners = (formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass) => {
    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    this._inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
           this._checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
           this._toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
        });
    });

    //_toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
};

//отключение кнопки "сохранить"
disableButton () {
    const submitButton = this._formElement.querySelector(this._config.submitButtonSelector)
    submitButton.classList.add(this._config.inactiveButtonClass)
    submitButton.disabled = true
}

enableValidation = () => {
    const formList = document.querySelectorAll(this._config.formSelector);
    formList.forEach(_formElement => {
        this._setEventListeners(
            this._formElement,
            this._config.inputSelector,
            this._config.submitButtonSelector,
            this._config.inputErrorClass,
            this._config.errorClass,
            this._config.inactiveButtonClass
        );
    });
};
}

