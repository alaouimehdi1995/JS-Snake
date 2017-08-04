"use strict";
var game_1 = require("./game");
var KeyboardController = (function () {
    function KeyboardController(snake) {
        this.snake = snake;
        this.listen();
    }
    KeyboardController.prototype.listen = function () {
        document.addEventListener('keydown', function (e) {
            var code = String(e.keyCode);
            if (code == "37") {
                if (this.snake.direction != game_1.Direction.right)
                    this.direction = game_1.Direction.left;
            }
            else if (code == "38") {
                if (this.snake.direction != game_1.Direction.down)
                    this.snake.direction = game_1.Direction.up;
            }
            else if (code == "39") {
                if (this.snake.direction != game_1.Direction.left)
                    this.snake.direction = game_1.Direction.right;
            }
            else if (code == "40") {
                if (this.snake.direction != game_1.Direction.up)
                    this.snake.direction = game_1.Direction.down;
            }
        }, false);
    };
    return KeyboardController;
}());
exports.KeyboardController = KeyboardController;
//# sourceMappingURL=gameControl.js.map