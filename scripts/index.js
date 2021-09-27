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

const popup = document.querySelector('.popup');

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

//просмотор картинок
const imagePopup = document.querySelector('.popup_type_image');
const img = imagePopup.querySelector('.popup__image');
const titlePopupElement = document.querySelector('.popup__title-image');


//функция отрытие popup
const openPopup = (popup) => {
  document.addEventListener('keydown', closePopupEscape);
  popup.classList.add('popup_is-opened');
};

profileEditButton.addEventListener('click', () => {
  openPopup(editProfileModal)
});

openAddCardModalButton.addEventListener('click', () => {
  openPopup(addCardModal)
});


//функция закрытия на нажатие esc
function closePopupEscape(evt) {
  if (evt.key === 'Escape'){
    const openPopup = document.querySelector('.popup_is-opened');
    closePopup(openPopup);
  }
}

document.addEventListener('keydown', closePopupEscape);

//функция закрытие popup
const closePopup = (popup) => {
  document.removeEventListener('keydown', closePopupEscape);
  popup.classList.remove('popup_is-opened');
};

editProfileModalCloseButton.addEventListener('click', () => {
  closePopup(editProfileModal)
});

addCardModalCloseButton.addEventListener('click', () => {
  closePopup(addCardModal)
});

imageModalCloseButton.addEventListener('click', () => {
  closePopup(imageModal)
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

/*редактирование карточек*/
function addCardSubmitHandler(evt) {
  evt.preventDefault();

  renderCard({name: placeInput.value, link: urlInput.value})
  placeInput.value = '';
  urlInput.value = '';

  closePopup(addCardModal);
};

/*открытие и закрытие окон редактирования*/
editForm.addEventListener('submit', formEditProfileSubmitHandler);
addCardForm.addEventListener('submit', addCardSubmitHandler);


//функция закрытия попапа на нажатие оверлей
const closePopupOverlay = (event, popup) => {
  if (event.target.classList.contains("popup_is-opened")) {
    closePopup(popup);
  }
};

editProfileModal.addEventListener("click", (event) => {
  closePopupOverlay(event, editProfileModal);
});

addCardModal.addEventListener("click", (event) => {
  closePopupOverlay(event, addCardModal);
});

imageModal.addEventListener("click", (event) => {
  closePopupOverlay(event, imageModal);
});


/*//функция закрытия на нажатие esc
function closePopupEscape(evt) {
  if (evt.key === 'Escape'){
    const openPopup = document.querySelector('.popup_is-opened');
    closePopup(openPopup);
  }
}

document.addEventListener('keydown', closePopupEscape);


editProfileModalCloseButton.addEventListener('click', () => {
  document.removeEventListener('keydown', closePopupEscape);
  closePopup(editProfileModal);
})

addCardModalCloseButton.addEventListener('click', () => {
  document.removeEventListener('keydown', closePopupEscape);
  closePopup(addCardModal);
})

imageModalCloseButton.addEventListener('click', () => {
  document.removeEventListener('keydown', closePopupEscape);
  closePopup(imageModal);
})
*/

//like
  function handleLikeClick(e) {
    e.target.classList.toggle('active')
  }

//Удаляем карточки
  function handleDeleteClick(e) {
    e.target.closest('.place').remove()
  }


//Просмотор картинок
  function handleImageClick(e) {
    img.src = e.target.getAttribute('src');
    img.setAttribute('alt', 'фотография места');
    titlePopupElement.textContent = e.target.closest('.place').querySelector('.place__title').textContent;
    openPopup(imagePopup)
  }

  function createCard(data) {
    const cardElement = cardTemplate.cloneNode(true);

      const cardImage = cardElement.querySelector('.place__image');
      const cardTitle = cardElement.querySelector('.place__title');
      const cardLikeButton = cardElement.querySelector('.place__like-icon');
      const cardDeleteButton = cardElement.querySelector('.place__delete-button');
      // событие передаёт в функцию-обработчик
      cardLikeButton.addEventListener('click', handleLikeClick)
      cardDeleteButton.addEventListener('click', handleDeleteClick)
      cardImage.addEventListener('click', handleImageClick)

      cardTitle.textContent = data.name;
      cardImage.src = data.link;
      cardImage.alt = data.alt;
      cardImage.setAttribute('alt', 'фотография места');

      return cardElement;
  }

  function renderCard(data) {
    list.prepend(createCard(data));
  }

  initialCards.forEach((data) => {
    renderCard(data)
  })