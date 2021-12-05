//класс отвечает за отрисовку элементов на странице
export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
      }
    //добовляем элемент в разметку
      addItem(element) {
        this._container.prepend(element);
      }
    //отвечает за отрисовку всех элементов
      renderItems() {
        this._items.forEach(item => {
          this._renderer(item);
        });
      }
}