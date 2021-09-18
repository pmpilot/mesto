//включение и выключение ошибки
const showInputError = (formElement, inputElement, errorElement, inputErrorClass, errorClass) => {
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, errorElement, inputErrorClass, errorClass) => {
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};


//валидация поля
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`); //# обозначение идентификатора
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, errorElement, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement, errorElement, inputErrorClass, errorClass);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
};

//ошибка пустых строк
const hasNotInputValues = (inputList) => {
    return inputList.every(inputElement => {
        return inputElement.value.lenght === 0;
    });
};

const disableSubmitButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass);
};

const enableSubmitButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.remove(inactiveButtonClass);
};

//переключение состояния кнопки
const toggleButtonState = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
    const buttonElement = formElement.querySelector(submitButtonSelector);

    if (hasInvalidInput(inputList) || hasNotInputValues(inputList)) { //выключаем кнопку
        disableSubmitButton(buttonElement, inactiveButtonClass);
    } else { //включаем кнопку
        enableSubmitButton(buttonElement, inactiveButtonClass);
    }
};

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass) => {
    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
           checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
           toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
        });
    });

    toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
};

const enableValidation = (config) => {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach(formElement => {
        setEventListeners(
            formElement,
            config.inputSelector,
            config.submitButtonSelector,
            config.inputErrorClass,
            config.errorClass,
            config.inactiveButtonClass
        );
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled', //модификатор когда кнопка submitButtonSelector не доступна
    inputErrorClass: 'popup__input_type_error', //класс для не валидности
    errorClass: 'popup__error_visible' //класс включает сообщения об ошибки
  });