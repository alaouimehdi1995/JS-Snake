"use strict";
var game_1 = require("./game");
var gameControl_1 = require("./gameControl");
/**
 * Created by mehdi on 04/08/17.
 */
var element = document.getElementById('snake');
var scoreElement = document.getElementById('score');
var startGame = true;
var game = new game_1.Game(element, scoreElement);
var gameController = new gameControl_1.KeyboardController(game.snake);
var gameOver = false;
var str = "Game Over\nWould you like replay a new game ?";
var id = setInterval(function () {
    gameOver = game.start();
    console.log(gameOver);
    if (gameOver) {
        clearInterval(id);
        startGame = confirm(str);
    }
}, 80);
//# sourceMappingURL=main.js.map