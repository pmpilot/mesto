export class Card {
    constructor( item, cardSelector, {handleImageClick, likeImageClick, handleCardDelete}, userId, cardId) {
        this._link = item.link
        this._name = item.name
        this._cardSelector = cardSelector
        this._handleImageClick = handleImageClick
        this._likeImageClick = likeImageClick
        this._handleCardDelete = handleCardDelete
        this._countLikes = item.likes
        this._userId = userId
        this._cardId = cardId
        this._ownerId = item.owner._id;
    }

    _getTemplate() {
      const cardElement = document.querySelector(this._cardSelector).content.querySelector('.place').cloneNode(true);
      return cardElement;
    }

    createCard() {
      this._element = this._getTemplate();
        this._imgElement = this._element.querySelector('.place__image')
        this._imgElement.src = this._link
        this._imgElement.alt = this._name
        this._element.querySelector('.place__title').textContent = this._name
        this._handleLike = this._element.querySelector('.place__like-icon')
        this._likes = this._element.querySelector('.place__like-counter')
        this._deleteIcon = this._element.querySelector('.place__delete-button')
        if (this._ownerId !== this._userId) {
            this._deleteIcon.style.display = 'none'
        }
        
        this.renderLikes()

        this._setEventListeners()
        return this._element
    }

    _setEventListeners() {
        this._handleLike.addEventListener('click', () => {
            this._likeImageClick()
        })

        const deleteButton = this._element.querySelector('.place__delete-button')

        deleteButton.addEventListener('click', () => {
            this._handleCardDelete()
        })

        this._imgElement.addEventListener('click', () => {
            this._handleImageClick(this._link, this._name)
        })
    }

    removeCard() {
        this._element.remove()
    }

    renderLikes() {
        this._likes.textContent = this._countLikes.length
        this._showLikes(this._userId)
    }

    getIdCard() {
        return this._cardId
    }

    likedCard() {
        return this._countLikes.some(like => {
            return like._id === this._userId
        })
    }

    _showLikes() {
        if (this.likedCard(this._userId)) {
            this._handleLike.classList.add('place__like-black')
        } else {
            this._handleLike.classList.remove('place__like-black')
        }
    }

    setLikes(list) {
        this._countLikes = list
    }
}
