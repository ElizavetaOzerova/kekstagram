'use strict';

var pictures = [];
var picturesContainer = document.querySelector('.pictures');

// Подключение модуля для работы с данными по сети.
var load = require('./load');

// Подключение модуля отрисовки одной фотографии.
var getPictureElement = require('./picture');

// Подключние модуля показа фото в полноэкранном режиме при нажатии на фото из списка.
var gallery = require('./gallery');

var callback = function(data) {
  pictures = data;
  pictures.forEach(function(picture, indexPicture) {
    getPictureElement(picture, picturesContainer, indexPicture);
  });
  // Передача в объект галереи фотографии.
  gallery.setPictures(pictures);
};

load('http://localhost:1506/api/pictures', callback);
