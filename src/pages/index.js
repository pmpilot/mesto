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
import {
    validationConfig,
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
} from '../utils/const.js';

const imagePopup = new PopupWithImage('.popup_type_image');//для работы с карточками
const popupWithImage = new PopupWithImage(imagePopupSelector, imageTagSelector, imageTitleSelector)
const userInfo = new UserInfo(introTitle, introSubtitle, profileAvatars);

const handleImageClick = (name, link) => {
  imagePopup.open(name, link);
};

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