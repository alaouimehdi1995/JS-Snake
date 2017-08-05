"use strict";
var game_1 = require("./game");
function move(snake, direction) {
    if (direction == game_1.Direction.left) {
        if (snake.direction != game_1.Direction.right)
            snake.direction = game_1.Direction.left;
    }
    else if (direction == game_1.Direction.up) {
        if (snake.direction != game_1.Direction.down)
            snake.direction = game_1.Direction.up;
    }
    else if (direction == game_1.Direction.right) {
        if (snake.direction != game_1.Direction.left)
            snake.direction = game_1.Direction.right;
    }
    else if (direction == game_1.Direction.down) {
        if (snake.direction != game_1.Direction.up)
            snake.direction = game_1.Direction.down;
    }
}
var KeyboardController = (function () {
    function KeyboardController() {
    }
    KeyboardController.prototype.setSnake = function (snake) {
        this.snake = snake;
        this.listen(this.snake);
    };
    KeyboardController.prototype.listen = function (snake) {
        this.listenEvent = function (e) {
            var code = String(e.keyCode);
            if (code == "37") {
                move(snake, game_1.Direction.left);
            }
            else if (code == "38") {
                move(snake, game_1.Direction.up);
            }
            else if (code == "39") {
                move(snake, game_1.Direction.right);
            }
            else if (code == "40") {
                move(snake, game_1.Direction.down);
            }
        };
        document.addEventListener('keydown', this.listenEvent, false);
    };
    KeyboardController.prototype.unlisten = function () {
        var v = document.removeEventListener('keydown', this.listenEvent, false);
    };
    return KeyboardController;
}());
exports.KeyboardController = KeyboardController;
//# sourceMappingURL=gameControl.js.map