/*выбор элементов*/
/*popup*/
const addCardModal = document.querySelector('.popup_type_add-card'); /*карточки*/
const editProfileModal = document.querySelector('.popup_type_edit-profile'); /*редактор профайла*/
const imageModal = document.querySelector('.popup_type_image'); /*просмотор карточки*/

const editForm = editProfileModal.querySelector(".popup__form");/*форма редактирования профайла*/
const addCardForm = addCardModal.querySelector(".popup__form");

const profileEditButton = document.querySelector('.intro__open'); /*открывает редактор профайла*/
const openAddCardModalButton = document.querySelector('.intro__submit-btn'); /*открывает редактор карточек*/

const addCardModalCloseButton = addCardModal.querySelector('.popup__close'); /*закрывает редактор карточек*/
const editProfileModalCloseButton = editProfileModal.querySelector('.popup__close'); /*закрывает редактор профайла*/
const imageModalCloseButton = imageModal.querySelector('.popup__close'); /*закрывает редактор профайла*/


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


/*открывает и закрываем окно редактирование*/
function toggleModalWindow(modalWindow) {
    if (!modalWindow.classList.contains('.popup_is-opened')){ /*! -условие с отрицанием*/
    nameInput.value = introTitle.textContent;
    jobInput.value = introSubtitle.textContent;
    }

    modalWindow.classList.toggle('popup_is-opened');
}

/*input*/
/*редактируем текст и сохраняем*/
function formSubmitHandler (evt) {
    evt.preventDefault();
    introTitle.textContent = nameInput.value;
    introSubtitle.textContent = jobInput.value;

    toggleModalWindow(editProfileModal);
}

/*редактирование карточек*/
function addCardSubmitHandler(evt) {
  evt.preventDefault();

  renderCard({name: placeInput.value, link: urlInput.value})

  toggleModalWindow(addCardModal);
}

/*открытие и закрытие окон редактирования*/
editForm.addEventListener('submit', formSubmitHandler);
addCardForm.addEventListener('submit', addCardSubmitHandler);



profileEditButton.addEventListener('click', () => {
  toggleModalWindow(editProfileModal)
});

editProfileModalCloseButton.addEventListener('click', () => {
  toggleModalWindow(editProfileModal)
});

openAddCardModalButton.addEventListener('click', () => {
  toggleModalWindow(addCardModal)
});

addCardModalCloseButton.addEventListener('click', () => {
  toggleModalWindow(addCardModal)
});

imageModalCloseButton.addEventListener('click', () => {
  toggleModalWindow(imageModal)
});

/*прописываем карточки*/
addCardModalCloseButton.addEventListener('click', toggleModalWindow);

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
    e.stopPropagation()
    e.target.classList.toggle('active')
  }

//Удаляем карточки
  function handleDeleteClick(e) {
      e.stopPropagation()
      e.target.closest('.place').remove()
  }

//Просмотор картинок
  function handleImageClick(e) {
    e.stopPropagation()
    const imagePopup = document.querySelector('.popup_type_image');
    imagePopup.classList.add('popup')
    const img = imagePopup.querySelector('.popup__image')
    img.src = e.target.getAttribute('src')
    const titlePopupElement = document.querySelector('.popup__title-image');
    titlePopupElement.textContent = e.target.closest('.place').querySelector('.place__title').textContent;
    toggleModalWindow(imagePopup)
    console.log(imagePopup)
  }

  function createCard(data) {
    const cardElement = cardTemplate.cloneNode(true);

      const cardImage = cardElement.querySelector('.place__image');
      const cardTitle = cardElement.querySelector('.place__title');
      const cardLikeButton = cardElement.querySelector('.place__like-icon');
      const cardDeleteButton = cardElement.querySelector('.place__delete-button');
      // событие передаёт в функцию-обработчик
      cardLikeButton.addEventListener('click', (e) => handleLikeClick(e))
      cardDeleteButton.addEventListener('click', (e) => handleDeleteClick(e))
      cardImage.addEventListener('click', (e) => handleImageClick(e))

      cardTitle.textContent = data.name;
      cardImage.src = data.link;

      return cardElement;
  }

  function renderCard(data) {
    list.prepend(createCard(data));
  }


  initialCards.forEach((data) => {
    renderCard(data)
  })
