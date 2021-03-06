'use strict';

var gallery = require('./gallery');

var IMAGE_WIDTH = 182;
var IMAGE_HEIGHT = 182;
var IMAGE_LOAD_TIMEOUT = 10000;

var templateElement = document.querySelector('#picture-template');
var filtersBlock = document.querySelector('.filters');
var elementToClone;

// Прячем блок с фильтрами.
filtersBlock.classList.add('hidden');

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.picture');
} else {
  elementToClone = templateElement.querySelector('.picture');
}

var getPictureElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.picture-comments').textContent = data.comments;
  element.querySelector('.picture-likes').textContent = data.likes;
  container.appendChild(element);

  var backgroundImage = new Image();
  var imgElement = element.querySelector('img');
  var backgroundLoadTimeout;

  backgroundImage.onload = function(evt) {
    clearTimeout(backgroundLoadTimeout);
    imgElement.src = evt.target.src;
    imgElement.width = IMAGE_WIDTH;
    imgElement.height = IMAGE_HEIGHT;
  };

  backgroundImage.onerror = function() {
    element.classList.add('picture-load-failure');
  };

  backgroundLoadTimeout = setTimeout(function() {
    imgElement.src = '';
    element.classList.add('picture-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  backgroundImage.src = data.url;
  return element;
};

// Отображаем блок с фильтрами.
filtersBlock.classList.remove('hidden');



// Функция-конструктор Picture.
var Picture = function(data, container, indexPicture) {
  // Объект с данными.
  this.data = data;

  this.indexPicture = indexPicture;

  // DOM-элемент.
  this.element = getPictureElement(data, container);

  this.onPictureElementClick = this.onPictureElementClick.bind(this);
};


// Вызов показа фотогалереи по клику на DOM-элемент.
Picture.prototype.showGallery = function() {
  this.element.addEventListener('click', this.onPictureElementClick);
};

// Обработчик клика, который вызывает показ фотогалереи.
Picture.prototype.onPictureElementClick = function(evt) {
  evt.preventDefault();
  gallery.show(this.indexPicture);
};

// Удаление обработчика событий.
Picture.prototype.remove = function() {
  this.element.removeEventListener('click', this.onPictureElementClick);
};

module.exports = Picture;
