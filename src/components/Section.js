//класс отвечает за отрисовку элементов на странице
export class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
      }
    //добовляем элемент в разметку
      addItem(element) {
        this._container.prepend(element);
      }
    //отвечает за отрисовку всех элементов
      renderItems(items) {
        items.forEach(item => this._renderer(item));
      }
      
      clear() {
        this._container.innerHTML = '';
    }
}