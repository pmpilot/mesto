import '../pages/index.css';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
//companents import
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { Api } from '../components/Api.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';

/*form*/
const introTitle = document.querySelector(".intro__title");
const introSubtitle = document.querySelector(".intro__subtitle");
const profileAvatars = document.querySelector(".intro__avatar")

const imagePopupSelector = '.popup_type_image'
const imageTagSelector = '.popup__image'
const imageTitleSelector = '.popup__title-image'


const imagePopup = new PopupWithImage('.popup_type_image');/*для работы с карточками*/
const popupWithImage = new PopupWithImage(imagePopupSelector, imageTagSelector, imageTitleSelector)

const userInfo = new UserInfo(introTitle, introSubtitle, profileAvatars);
const handleImageClick = (name, link) => {
  imagePopup.open(name, link);
};

/*popup*/
const addCardModal = document.querySelector('.popup_type_add-card'); /*открывет карточки*/
const cardPopupSelector = '.popup_type_add-card'
const editProfileModal = document.querySelector('.popup_type_edit-profile'); /*открывает профайла*/
const profilePopupSelector = '.popup_type_edit-profile'
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
const cardSelector = '.template-card'



/*form avatar*/
const deletePopupSelector ='.popup_type_deleteimage'
const popupAvatar = document.querySelector('.popup_type_avatarpopup')
const popupAvatarSelector = '.popup_type_avatarpopup'

const formAvatar = popupAvatar.querySelector('.popup__form-avatar')
const profileAvatarInput = popupAvatar.querySelector('.popup__input_type_avatar')
const updateAvatarButton = document.querySelector('.profile__avatar-edit')
const updateAvatarButtonSelector = '.profile__avatar-edit'
const avatarButtonSave = popupAvatar.querySelector('.profile__avatar-edit')
const addPopupButton = document.querySelector('.intro__submit-btn') //удаление карточки

const profileSelector = {
  userName: '.profile__username',
  userDescription: '.profile__user-description',
  profileAvatars: '.profile__avatar'
}

//создание popup удаление
const popupDeleteConfirm = new PopupWithConfirm(deletePopupSelector, (evt, card) => {
  deleteConfirm(evt, card)
})

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-31',
  headers: {
    authorization: 'bd8d3232-6129-46d6-9d47-8d7bd22b95c4',
    'Content-type': 'application/json'
  }
})

let userId = null;

const cardList = new Section({
  renderer: (cardItem) => {
    const newCard = createNewCard(cardItem);
    cardList.addItem(newCard);
    }
  }, '.places');

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([data, items]) => {
  userId = data._id;
  const reverseItems = items.reverse();
  userInfo.setUserInfo(data);
  cardList.renderItems(reverseItems);
})
.catch((error) => {
  console.log(`Произошла ошибка: ${error}`)
})

//редактор профессии 
const popupEditProfile = new PopupWithForm( 
  { popupSelector:'.popup_type_edit-profile', 
   handleFormSubmit: (info) => {
  popupEditProfile.renderLoading(true)
  
  api.editUserInfo(info.name, info.about)
  .then((data) => {
    userInfo.setUserInfo(data);
    popupEditProfile.close()
  })
  .catch((err) => {
    console.log(`Произошла ошибка: ${err}`)
  })
  .finally(() => 
    popupEditProfile.renderLoading(false))
  }
})

//добавление новой карточки
const popupAddCard = new PopupWithForm(
   { popupSelector: cardPopupSelector,
   handleFormSubmit: (info) => {
  popupAddCard.renderLoading(true);

  api.addCard(info.name, info.link)
  .then((data) => {
    const newCard = createNewCard(data)
    cardList.addItem(newCard);
    popupAddCard.close(); 
    })
    .catch((err) => {
      console.log(`Произошла ошибка: ${err}`)
    })
    .finally(() => 
    popupAddCard.renderLoading(false))
  }
})

//редактор аватара
const popupEditAvatar = new PopupWithForm(
   { popupSelector: popupAvatarSelector,
    handleFormSubmit: (info) => {
    popupEditAvatar.renderLoading(true); 
  api.editUserAvatar(info.avatar)
    .then((data) => {
      userInfo.setUserInfo(data)
      popupEditAvatar.close()
   })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
        popupEditAvatar.renderLoading(false)
  })
}
});

//открытие редактора аватар
updateAvatarButton.addEventListener('click', () => {
  popupEditAvatar.open();
  avatarValidation.disabledButton();
  avatarValidation.resetValidation();
});

//открытия редактора профессии
profileEditButton.addEventListener('click', () => {
  const getUserInfo = userInfo.getUserInfo();
  nameInput.value = getUserInfo.name;
  jobInput.value = getUserInfo.about;
  popupEditProfile.open();

  validationProfile.resetValidation();
});

//открытие редактоа карточек
addPopupButton.addEventListener('click', () => {
  popupAddCard.open();
  validationCard.disabledButton();
  validationCard.resetValidation();
});

//валидация форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled', //модификатор когда кнопка submitButtonSelector не доступна
  inputErrorClass: 'popup__input_type_error', //класс для не валидности
  imagePopupSelector: '.popup_type_image',
  userInfoPopupSelector: '.popup_type_edit-profile',
  newCardPopupSelector: 'popup_type_add-card'
};

const validationProfile = new FormValidator(validationConfig, editForm)
const validationCard = new FormValidator(validationConfig, addCardForm)
const avatarValidation = new FormValidator(validationConfig, formAvatar)

const enableValidation = () => {
validationProfile.enableValidation();
validationCard.enableValidation();
avatarValidation.enableValidation();
}

enableValidation(validationConfig);

//отрисовка карточек
function createNewCard(item) {
  const newCard = new Card(item, cardSelector, {
    handleImageClick,
    likeImageClick: () => {
      const likedCard = newCard.likedCard();
      const resultApi = likedCard ? api.dislikeCard(newCard.getIdCard()) : api.likeCard(newCard.getIdCard());
      resultApi.then(data => {
        newCard.setLikes(data.likes);
        newCard.renderLikes()
      }).catch((err) => {
        console.log(err)
      })
    }, handleCardDelete: () => {
      popupDeleteConfirm.open(newCard)
    }
  }, userId, item._id)
  const cardElement = newCard.createCard();
  return cardElement;
}

//модалка удаление карточи
const deleteConfirm = (evt, newCard) => {
  evt.preventDefault();
  api.removeCard(newCard.getIdCard())
    .then(() => {
      newCard.removeCard()
      popupDeleteConfirm.close()
    })
    .catch((err) => {
    console.log(err);
  });
}

imagePopup.setEventListeners();
popupDeleteConfirm.setEventListeners();
popupEditAvatar.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupWithImage.setEventListeners();