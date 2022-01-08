export class UserInfo {
    constructor ( nameElement, jobElement, profileAvatars, _id ) {
        this._nameElement = nameElement;
        this._jobElement = jobElement;
        this._profileAvatars = profileAvatars;
        this._id = _id;
    }

    //сохраняем данные которые к нам поступают
    setUserInfo = ({ name, about, avatar, _id }) => {
      this._nameElement.textContent = name;
      this._jobElement.textContent = about;
      this._profileAvatars.src = avatar;
      this._id = _id;
    }

    //возвращаем назад в виде объекта
    getUserInfo = () => {
      const userValue = {
      name: this._nameElement.textContent,
      about: this._jobElement.textContent,
      avatar: this._profileAvatars.src,
      userId: this._id
    }
    return userValue;
    }
}