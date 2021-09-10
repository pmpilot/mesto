/*выбор элементов*/
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

/*const popup = document.querySelectorAll('.popup');


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

//функция отрытие popup
const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
};

profileEditButton.addEventListener('click', () => {
  openPopup(editProfileModal)
});

openAddCardModalButton.addEventListener('click', () => {
  openPopup(addCardModal)
});

//функция закрытие popup
const closePopup = (popup) => {
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

/*редактируем текст и сохраняем*/
function formSubmitHandler (evt) {
    evt.preventDefault();
    introTitle.textContent = nameInput.value;
    introSubtitle.textContent = jobInput.value;

    closePopup(editProfileModal);
}

/*редактирование карточек*/
function addCardSubmitHandler(evt) {
  evt.preventDefault();

  renderCard({name: placeInput.value, link: urlInput.value})
  placeInput.value = '';
  urlInput.value = '';

  closePopup(addCardModal);
}

/*открытие и закрытие окон редактирования*/
editForm.addEventListener('submit', formSubmitHandler);
addCardForm.addEventListener('submit', addCardSubmitHandler);


/*прописываем карточки*/
addCardModalCloseButton.addEventListener('click', openPopup);

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];


  const cardTemplate = document.querySelector('.template-card').content.querySelector('.place');
  const list = document.querySelector('.places');

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
    const imagePopup = document.querySelector('.popup_type_image');
    imagePopup.classList.add('popup')
    const img = imagePopup.querySelector('.popup__image')
    img.src = e.target.getAttribute('src')
    const titlePopupElement = document.querySelector('.popup__title-image');
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

      return cardElement;
  }

  function renderCard(data) {
    list.prepend(createCard(data));
  }

  initialCards.forEach((data) => {
    renderCard(data)
  })