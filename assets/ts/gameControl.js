"use strict";
var game_1 = require("./game");
var KeyboardController = (function () {
    function KeyboardController(snake) {
        this.snake = snake;
        this.listen(this.snake);
    }
    KeyboardController.prototype.listen = function (snake) {
        document.addEventListener('keydown', function (e) {
            var code = String(e.keyCode);
            if (code == "37") {
                if (snake.direction != game_1.Direction.right)
                    snake.direction = game_1.Direction.left;
            }
            else if (code == "38") {
                if (snake.direction != game_1.Direction.down)
                    snake.direction = game_1.Direction.up;
            }
            else if (code == "39") {
                if (snake.direction != game_1.Direction.left)
                    snake.direction = game_1.Direction.right;
            }
            else if (code == "40") {
                if (snake.direction != game_1.Direction.up)
                    snake.direction = game_1.Direction.down;
            }
        }, false);
    };
    return KeyboardController;
}());
exports.KeyboardController = KeyboardController;
//# sourceMappingURL=gameControl.js.map