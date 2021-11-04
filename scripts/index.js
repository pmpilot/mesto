import { initialCards } from './initialCards.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { openPopup, closePopup, closePopupEscape, closePopupOverlay } from './utils.js';


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled', //модификатор когда кнопка submitButtonSelector не доступна
  inputErrorClass: 'popup__input_type_error', //класс для не валидности
  errorClass: 'popup__error_visible' //класс включает сообщения об ошибки
};


/*popup*/
const addCardModal = document.querySelector('.popup_type_add-card'); /*открывет карточки*/
const editProfileModal = document.querySelector('.popup_type_edit-profile'); /*открывает профайла*/
const imageModal = document.querySelector('.popup_type_image'); /*открывает просмотор карточки*/

const editForm = editProfileModal.querySelector(".popup__form");/*форма редактирования профайла*/
const addCardForm = addCardModal.querySelector(".popup__form");/*форма редактирования карточки*/

const profileEditButton = document.querySelector('.intro__open'); /*кнопка открытие редактора профайла*/
const openAddCardModalButton = document.querySelector('.intro__submit-btn'); /*кнопка открытие редактор карточек*/

const addCardModalCloseButton = addCardModal.querySelector('.popup__close'); /*крестик редактор карточек*/
const editProfileModalCloseButton = editProfileModal.querySelector('.popup__close'); /*крестик редактор профайла*/
const imageModalCloseButton = imageModal.querySelector('.popup__close'); /*крестик просмотор картинок*/

/*form*/
const introTitle = document.querySelector(".intro__title");
const introSubtitle = document.querySelector(".intro__subtitle");

/*form data*/
const nameInput = editForm.querySelector(".popup__input_type_name");
const jobInput = editForm.querySelector(".popup__input_type_job");

const placeInput = addCardForm.querySelector('.popup__input_type_place');
const urlInput = addCardForm.querySelector('.popup__input_type_url');

const imageModalTitle = imageModal.querySelector('.popup__title');
const imageModalImg = imageModal.querySelector('.popup__image');

const name = document.querySelector('.intro__title');
const job = document.querySelector('.intro__subtitle');

//карточки
const cardTemplate = document.querySelector('.template-card').content.querySelector('.place');
const list = document.querySelector('.places');

//слушатели отрытие popup
profileEditButton.addEventListener('click', () => {
  openPopup(editProfileModal);
  fillInProfileInputValues();
});

openAddCardModalButton.addEventListener('click', () => {
  openPopup(addCardModal)
  validationCard.disabledButton();
});


//слушатель закрытие popup
editProfileModalCloseButton.addEventListener('click', () => {
  closePopup(editProfileModal)
});

addCardModalCloseButton.addEventListener('click', () => {
  closePopup(addCardModal)
});

imageModalCloseButton.addEventListener('click', () => {
  closePopup(imageModal)
});

/*открытие и закрытие окон редактирования*/
editForm.addEventListener('submit', formEditProfileSubmitHandler);
addCardForm.addEventListener('submit', addCardSubmitHandler);


//Слушатели закрытия попапа на нажатие оверлей
editProfileModal.addEventListener("click", (event) => {
  closePopupOverlay(event, editProfileModal);
});

addCardModal.addEventListener("click", (event) => {
  closePopupOverlay(event, addCardModal);
});

imageModal.addEventListener("click", (event) => {
  closePopupOverlay(event, imageModal);
});

//заполняет поля форм при открытии окна редактирования
function fillInProfileInputValues() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
};
profileEditButton.addEventListener('click', fillInProfileInputValues);

/*редактируем текст и сохраняем*/
function formEditProfileSubmitHandler (evt) {
    evt.preventDefault();
    introTitle.textContent = nameInput.value;
    introSubtitle.textContent = jobInput.value;

    closePopup(editProfileModal);
};

/*Добовление новых карточек*/
function addCardSubmitHandler(evt) {
  evt.preventDefault();

  const card = generateCard({name: placeInput.value, link: urlInput.value}, '.template-card')
  renderCard(card)

  placeInput.value = '';
  urlInput.value = '';

  closePopup(addCardModal);
};


  //объект карточки
  const generateCard = (data, cardSelector) => {
    const card = new Card(data, cardSelector).createCard()
    return card
  }

  const renderCard = (data) => {
    list.prepend(data)
  }

  initialCards.forEach((data) => {
    const card = generateCard(data, '.template-card')
    renderCard(card)
  });

  const validationProfile = new FormValidator(validationConfig, editForm)
  const validationCard = new FormValidator(validationConfig, addCardForm)

  const enableValidation = () => {
    validationProfile.enableValidation();
    validationCard.enableValidation();
  }

  enableValidation(validationConfig);