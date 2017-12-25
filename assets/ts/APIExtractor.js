"use strict";
var TouchScreenController_1 = require("./GameControllers/TouchScreenController");
var KeyboardController_1 = require("./GameControllers/KeyboardController");
/**
 * Created by mehdi on 24/12/17.
 */
var defaultSettings = {
    gameSpeed: 80,
    blockSize: 20,
    gameModeWithWalls: false,
    gameController: null
};
var APIExtractor = (function () {
    function APIExtractor(element) {
        this.extractGameSpeed(element);
        this.extractBlockSize(element);
        this.extractGameController(element);
        this.extractGameMode(element);
    }
    APIExtractor.prototype.extractGameSpeed = function (element) {
        var gameSpeed = parseFloat(element.getAttribute("game-speed"));
        this.gameSpeed = gameSpeed ? gameSpeed : defaultSettings.gameSpeed;
    };
    APIExtractor.prototype.extractBlockSize = function (element) {
        var blockSize = parseFloat(element.getAttribute("block-size"));
        this.blockSize = blockSize ? blockSize : defaultSettings.blockSize;
    };
    APIExtractor.prototype.extractGameController = function (element) {
        var gameController = element.getAttribute("game-controller");
        if (gameController) {
            if (gameController.toLowerCase() == "keyboard") {
                this.gameController = new KeyboardController_1.KeyboardController();
            }
            else if (gameController.toLowerCase() == "touchscreen") {
                this.gameController = new TouchScreenController_1.TouchScreenController();
            }
            else {
                this.gameController = this.getRightController();
            }
        }
        else
            this.gameController = this.getRightController();
    };
    APIExtractor.prototype.extractGameMode = function (element) {
        var gameMode = element.getAttribute("game-mode");
        this.gameModeWithWalls = (gameMode && gameMode.toLowerCase() == "walls");
    };
    APIExtractor.prototype.getRightController = function () {
        if ('ontouchstart' in window || navigator.maxTouchPoints)
            return new TouchScreenController_1.TouchScreenController;
        else
            return new KeyboardController_1.KeyboardController;
    };
    APIExtractor.prototype.getGameSpeed = function () { return this.gameSpeed; };
    APIExtractor.prototype.getBlockSize = function () { return this.blockSize; };
    APIExtractor.prototype.getGameController = function () { return this.gameController; };
    APIExtractor.prototype.getGameMode = function () { return this.gameModeWithWalls; };
    return APIExtractor;
}());
exports.APIExtractor = APIExtractor;
//# sourceMappingURL=APIExtractor.js.map