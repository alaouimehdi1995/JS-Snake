/**
 * Created by mehdi on 24/12/17.
 */
"use strict";
var APIExtractor_1 = require("./APIExtractor");
var ScoreListener_1 = require("./ScoreListener/ScoreListener");
var Game_1 = require("./Game");
var SnakeAPI = (function () {
    function SnakeAPI(gameElement, scoreElement) {
        this.dataExtractor = new APIExtractor_1.APIExtractor(gameElement);
        this.scorer = new ScoreListener_1.ScoreListener(scoreElement);
        this.game = new Game_1.Game(gameElement, this.dataExtractor.getGameController(), this.dataExtractor.getBlockSize(), this.dataExtractor.getGameMode());
        this.game.addObserver(this);
    }
    SnakeAPI.prototype.play = function () {
        var _this = this;
        this.gameID = setInterval(function () { console.log("sahra wla"); _this.game.start(); }, this.dataExtractor.getGameSpeed());
    };
    SnakeAPI.prototype.notifyGameOver = function () {
        clearInterval(this.gameID);
        /*
        * We should implement the restart loop etc.
        * */
    };
    SnakeAPI.prototype.notifyScore = function (score) {
        this.scorer.updateScore(score);
    };
    return SnakeAPI;
}());
exports.SnakeAPI = SnakeAPI;
//# sourceMappingURL=SnakeAPI.js.map