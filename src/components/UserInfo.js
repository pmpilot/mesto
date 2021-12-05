export class UserInfo {
    constructor ( nameElement, jobElement ) {
        this._nameElement = nameElement;
        this._jobElement = jobElement;
    }

    //сохраняем данные которые к нам поступают
    setUserInfo = ({ 'name' : name, 'job' : job }) => {
      this._nameElement.textContent = name;
      this._jobElement.textContent = job;
    }

    //возвращаем назад в виде объекта
    getUserInfo = () => {
        return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    }
  }
}

/*
//заполняет поля форм при открытии окна редактирования
function fillInProfileInputValues() {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
  };
  profileEditButton.addEventListener('click', fillInProfileInputValues);
  
  /*редактируем текст и сохраняем*/
  /*
  function formEditProfileSubmitHandler (evt) {
      evt.preventDefault();
      introTitle.textContent = nameInput.value;
      introSubtitle.textContent = jobInput.value;
  
      closePopup(editProfileModal);
  };*/