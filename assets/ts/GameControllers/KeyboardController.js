"use strict";
var Direction_1 = require("../GameElements/Direction");
/**
 * Created by mehdi on 24/12/17.
 */
var KeyboardController = (function () {
    function KeyboardController() {
        var _this = this;
        this.listenerFunction = function (e) {
            var code = String(e.keyCode);
            if (code == "37")
                _this.game.moveSnake(Direction_1.Direction.left);
            else if (code == "38")
                _this.game.moveSnake(Direction_1.Direction.up);
            else if (code == "39")
                _this.game.moveSnake(Direction_1.Direction.right);
            else if (code == "40")
                _this.game.moveSnake(Direction_1.Direction.down);
            else if (code == "32")
                _this.game.moveSnake(Direction_1.Direction.paused);
        };
    }
    KeyboardController.prototype.setGame = function (game) {
        this.game = game;
        this.listen();
    };
    KeyboardController.prototype.listen = function () {
        document.addEventListener("keydown", this.listenerFunction, false);
    };
    KeyboardController.prototype.unlisten = function () {
        document.removeEventListener("keydown", this.listenerFunction);
    };
    return KeyboardController;
}());
exports.KeyboardController = KeyboardController;
//# sourceMappingURL=KeyboardController.js.map