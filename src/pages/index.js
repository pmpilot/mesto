import '../pages/index.css';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { initialCards } from '../components/initialCards.js';
//companents import
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled', //модификатор когда кнопка submitButtonSelector не доступна
  inputErrorClass: 'popup__input_type_error', //класс для не валидности
};

const config = {
  imagePopupSelector: '.popup_type_image',
  userInfoPopupSelector: '.popup_type_edit-profile',
  newCardPopupSelector: 'popup_type_add-card'
}

/*form*/
const introTitle = document.querySelector(".intro__title");
const introSubtitle = document.querySelector(".intro__subtitle");

const handleUserInfoFromSubmit = (inputValues) => {
  userInfo.setUserInfo(inputValues);
};

const handleCardFormSubmit = (item) => {
  cardList.addItem(createNewCard(item));
};

const imagePopup = new PopupWithImage('.popup_type_image');/*для работы с карточками*/
const userInfo = new UserInfo(introTitle, introSubtitle);
const userInfoPopup = new PopupWithForm('.popup_type_edit-profile', handleUserInfoFromSubmit);/*для работы с данными пользователя*/
const newCardPopup = new PopupWithForm('.popup_type_add-card', handleCardFormSubmit);

const handleImageClick = ({image, link}) => {
  imagePopup.open(image, link);
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

//валидация форм
const validationProfile = new FormValidator(validationConfig, editForm)
const validationCard = new FormValidator(validationConfig, addCardForm)

imagePopup.setEventListeners();
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();

const enableValidation = () => {
  validationProfile.enableValidation();
  validationCard.enableValidation();
}

enableValidation();

//слушатели отрытие popup
profileEditButton.addEventListener('click', () => {
  const getUserInfo = userInfo.getUserInfo();
  nameInput.value = getUserInfo.name;
  jobInput.value = getUserInfo.job;
  userInfoPopup.open();
});

openAddCardModalButton.addEventListener('click', () => {
  newCardPopup.open();
  validationCard.disabledButton();
});

//отрисовка карточек
const createNewCard = (item) => {
  const card = new Card({
    data: item,
    handleImageClick},
    '.template-card');
  const cardElement = card.createCard();
  return cardElement;
};

const cardList = new Section({
items: initialCards,
renderer: (item) => {
  const element = createNewCard(item);
  cardList.addItem(element);
}}, '.places'); 

cardList.renderItems();