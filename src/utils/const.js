export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled', //модификатор когда кнопка submitButtonSelector не доступна
    inputErrorClass: 'popup__input_type_error', //класс для не валидности
    imagePopupSelector: '.popup_type_image',
    userInfoPopupSelector: '.popup_type_edit-profile',
    newCardPopupSelector: 'popup_type_add-card'
};

/*form*/
const introTitle = document.querySelector(".intro__title");
const introSubtitle = document.querySelector(".intro__subtitle");
const profileAvatars = document.querySelector(".intro__avatar");

const imagePopupSelector = '.popup_type_image';
const imageTagSelector = '.popup__image';
const imageTitleSelector = '.popup__title-image';

/*popup*/
const addCardModal = document.querySelector('.popup_type_add-card'); /*открывет карточки*/
const cardPopupSelector = '.popup_type_add-card';
const editProfileModal = document.querySelector('.popup_type_edit-profile'); /*открывает профайла*/
const imageModal = document.querySelector('.popup_type_image'); /*открывает просмотор карточки*/
const editForm = editProfileModal.querySelector(".popup__form");/*форма редактирования профайла*/
const addCardForm = addCardModal.querySelector(".popup__form");/*форма редактирования карточки*/
const profileEditButton = document.querySelector('.intro__open'); /*кнопка открытие редактора профайла*/
/*form data*/
const nameInput = editForm.querySelector(".popup__input_type_name");
const jobInput = editForm.querySelector(".popup__input_type_job");

/*form avatar*/
const deletePopupSelector ='.popup_type_deleteimage';
const popupAvatar = document.querySelector('.popup_type_avatarpopup');
const popupAvatarSelector = '.popup_type_avatarpopup';

const formAvatar = popupAvatar.querySelector('.popup__form-avatar');
const updateAvatarButton = document.querySelector('.intro__avatar-button');
const addPopupButton = document.querySelector('.intro__submit-btn'); //удаление карточки
const cardSelector = '.template-card';



export {
    introTitle,
    introSubtitle,
    profileAvatars,
    imagePopupSelector,
    imageTagSelector,
    imageTitleSelector,
    addCardModal,
    cardPopupSelector,
    editProfileModal,
    imageModal,
    editForm,
    addCardForm,
    profileEditButton,
    nameInput,
    jobInput,
    deletePopupSelector,
    popupAvatar,
    popupAvatarSelector,
    formAvatar,
    updateAvatarButton,
    addPopupButton,
    cardSelector
};