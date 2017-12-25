"use strict";
var Coordinates_1 = require("./Coordinates");
/**
 * Created by mehdi on 24/12/17.
 */
var Food = (function () {
    function Food(game) {
        this.game = game;
        this.position = new Coordinates_1.Coordinates(null, null);
    }
    Food.prototype.randomIntFromInterval = function (min, max) {
        return (Math.random() * (max - min) + min);
    };
    Food.prototype.getRandomBloc = function () {
        do {
            var px = parseInt(String(this.randomIntFromInterval(this.game.getScreen().getBorder().left, this.game.getScreen().getBorder().right)));
            var py = parseInt(String(this.randomIntFromInterval(this.game.getScreen().getBorder().top, this.game.getScreen().getBorder().down)));
        } while (this.game.getSnake().checkCollision(px, py));
        this.position.x = px;
        this.position.y = py;
    };
    return Food;
}());
exports.Food = Food;
//# sourceMappingURL=Food.js.map