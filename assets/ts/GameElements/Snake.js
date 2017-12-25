"use strict";
var Direction_1 = require("./Direction");
var Coordinates_1 = require("./Coordinates");
/**
 * Created by mehdi on 24/12/17.
 */
var Snake = (function () {
    function Snake(game, initialPosition) {
        this.body = [];
        this.game = game;
        this.direction = Direction_1.Direction.right;
        for (var i = 0; i < initialPosition.length; i++) {
            this.body.push(new Coordinates_1.Coordinates(initialPosition[i].x, initialPosition[i].y));
        }
    }
    Snake.prototype.setPaused = function () {
        if (this.direction == Direction_1.Direction.paused) {
            this.direction = this.lastDirection;
        }
        else {
            this.lastDirection = this.direction;
            this.direction = Direction_1.Direction.paused;
        }
    };
    Snake.prototype.isPaused = function () {
        return this.direction == Direction_1.Direction.paused;
    };
    Snake.prototype.move = function (newHeadPosition) {
        this.body.pop();
        this.body.unshift(newHeadPosition);
    };
    Snake.prototype.eatFood = function (food) {
        this.body.unshift(new Coordinates_1.Coordinates(food.position.x, food.position.y));
    };
    Snake.prototype.checkGameOver = function () {
        for (var i = 1; i < this.body.length; i++) {
            if (this.body[i].x == this.body[0].x && this.body[i].y == this.body[0].y) {
                return true;
            }
        }
        return false;
    };
    Snake.prototype.checkCollision = function (x, y) {
        for (var i = 0; i < this.body.length; i++) {
            if (this.body[i].x == x && this.body[i].y == y)
                return true;
        }
        return false;
    };
    return Snake;
}());
exports.Snake = Snake;
//# sourceMappingURL=Snake.js.map