/*form*/
let openFormButton = document.querySelector('.form__open');
let form = document.querySelector('.form');
let closeFormButton = document.querySelector('.form__close');

function toggleForm() {
    form.classList.toggle('form_is-opened');
}

openFormButton.addEventListener(
    'click', 
    toggleForm
);

openFormButton.addEventListener('click', toggleForm);
closeFormButton.addEventListener('click', toggleForm);

/*popup*/
let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".section__title");
let jobInput = document.querySelector(".section__subtitle");
let newName = document.querySelector(".popup__filed_name");
let newJob = document.querySelector(".popup__filed_job");

function formSubmitHandler (evt) {
    evt.preventDefault();

    nameInput.textContent = newName.value;
    jobInput.textContent = newJob.value;

    toggleForm()

    console.log(newName);
    console.log(newJob);
}
formElement.addEventListener('submit', formSubmitHandler);

/*like*/
/*let like = document.getElementById('btn');
btn.addEventListener("click", function() {
    like.classList.add("place__like-black");
});*/
