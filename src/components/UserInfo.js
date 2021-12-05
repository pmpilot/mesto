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