"use strict";
var game_1 = require("./game");
var gameControl_1 = require("./gameControl");
/**
 * Created by mehdi on 04/08/17.
 */
var element = document.getElementById('snake');
var scoreElement = document.getElementById('score');
var startGame = true;
var gameController = new gameControl_1.KeyboardController();
var game = new game_1.Game(element, scoreElement, gameController);
var gameOver = false;
var str = "Game Over\nWould you like replay a new game ?";
function play() {
    gameOver = game.start();
    if (gameOver) {
        clearInterval(id);
    }
}
var id = setInterval(play, 80);
//# sourceMappingURL=main.js.map