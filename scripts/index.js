/*выбор элементов*/
/*popup*/
let openPopupButton = document.querySelector('.intro__open');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');
/*form*/
let formElement = document.querySelector(".popup__form");
let introTitle = document.querySelector(".intro__title");
let introSubtitle = document.querySelector(".intro__subtitle");
let nameInput = document.querySelector(".popup__input_name");
let jobInput = document.querySelector(".popup__input_job");

/*popup*/
/*открывает и закрываем окно редактирование*/
function toggleForm() {
    if (!popup.classList.contains('.popup__is-opened')){ /*! -условие с отрицанием*/
    nameInput.value = introTitle.textContent;
    jobInput.value = introSubtitle.textContent;
    }

    popup.classList.toggle('popup__is-opened');
}

/*input*/
/*редактируем текст и сохраняем*/
function formSubmitHandler (evt) {
    evt.preventDefault();
    
    introTitle.textContent = nameInput.value;
    introSubtitle.textContent = jobInput.value;

    toggleForm()
}

/*listeners*/
formElement.addEventListener('submit', formSubmitHandler);
openPopupButton.addEventListener('click', toggleForm);
closePopupButton.addEventListener('click', toggleForm);