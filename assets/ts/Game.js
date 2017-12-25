"use strict";
var Food_1 = require("./GameElements/Food");
var Snake_1 = require("./GameElements/Snake");
var Screen_1 = require('./Screen');
var Direction_1 = require("./GameElements/Direction");
var Coordinates_1 = require("./GameElements/Coordinates");
/**
 * Created by mehdi on 24/12/17.
 */
var Game = (function () {
    function Game(element, gameController, blockSize, withWalls) {
        this.observers = [];
        this.score = 0;
        this.isGameOver = false;
        this.setScreen(new Screen_1.Screen(element, blockSize));
        this.setSnake(new Snake_1.Snake(this, [{ x: 2, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }]));
        this.setController(gameController);
        this.withWallsMode = withWalls;
        this.setFood(new Food_1.Food(this));
        this.food.getRandomBloc();
    }
    Game.prototype.getSnake = function () { return this.snake; };
    Game.prototype.getFood = function () { return this.food; };
    Game.prototype.getScreen = function () { return this.screen; };
    Game.prototype.setScreen = function (screen) {
        this.screen = screen;
    };
    Game.prototype.setSnake = function (snake) {
        this.snake = snake;
    };
    Game.prototype.setFood = function (food) {
        this.food = food;
    };
    Game.prototype.setController = function (controller) {
        this.controller = controller;
        this.controller.setGame(this);
    };
    Game.prototype.gameOver = function () { this.isGameOver = true; };
    Game.prototype.start = function () {
        var head;
        if (this.snake.direction == Direction_1.Direction.right) {
            if (this.snake.body[0].x < this.screen.getBorder().right - 1)
                head = new Coordinates_1.Coordinates(this.snake.body[0].x + 1, this.snake.body[0].y);
            else {
                if (this.withWallsMode)
                    this.gameOver();
                head = new Coordinates_1.Coordinates(this.screen.getBorder().left, this.snake.body[0].y);
            }
        }
        else if (this.snake.direction == Direction_1.Direction.left) {
            if (this.snake.body[0].x > this.screen.getBorder().left)
                head = new Coordinates_1.Coordinates(this.snake.body[0].x - 1, this.snake.body[0].y);
            else {
                if (this.withWallsMode)
                    this.gameOver();
                head = new Coordinates_1.Coordinates(this.screen.getBorder().right - 1, this.snake.body[0].y);
            }
        }
        else if (this.snake.direction == Direction_1.Direction.up) {
            if (this.snake.body[0].y > this.screen.getBorder().top)
                head = new Coordinates_1.Coordinates(this.snake.body[0].x, this.snake.body[0].y - 1);
            else {
                if (this.withWallsMode)
                    this.gameOver();
                head = new Coordinates_1.Coordinates(this.snake.body[0].x, this.screen.getBorder().down - 1);
            }
        }
        else if (this.snake.direction == Direction_1.Direction.down) {
            if (this.snake.body[0].y < this.screen.getBorder().down - 1)
                head = new Coordinates_1.Coordinates(this.snake.body[0].x, this.snake.body[0].y + 1);
            else {
                if (this.withWallsMode)
                    this.gameOver();
                head = new Coordinates_1.Coordinates(this.snake.body[0].x, this.screen.getBorder().top);
            }
        }
        if (!this.snake.isPaused()) {
            this.snake.move(head);
            this.screen.cleanScreen();
            this.screen.drawSnake(this.snake);
            this.notifyAllScore();
        }
        if (this.isGameOver || this.snake.checkGameOver()) {
            this.gameOver();
            this.notifyAllGameOver();
        }
        else {
            if (this.snake.body[0].x == this.food.position.x && this.snake.body[0].y == this.food.position.y) {
                this.snake.eatFood(this.food);
                this.score += this.snake.body.length;
                this.notifyAllScore();
                this.food.getRandomBloc();
            }
            this.screen.drawFood(this.food);
        }
    };
    Game.prototype.moveSnake = function (direction) {
        if (direction == Direction_1.Direction.left) {
            if (this.snake.direction != Direction_1.Direction.right)
                this.snake.direction = Direction_1.Direction.left;
        }
        else if (direction == Direction_1.Direction.up) {
            if (this.snake.direction != Direction_1.Direction.down)
                this.snake.direction = Direction_1.Direction.up;
        }
        else if (direction == Direction_1.Direction.right) {
            if (this.snake.direction != Direction_1.Direction.left)
                this.snake.direction = Direction_1.Direction.right;
        }
        else if (direction == Direction_1.Direction.down) {
            if (this.snake.direction != Direction_1.Direction.up)
                this.snake.direction = Direction_1.Direction.down;
        }
        else if (direction == Direction_1.Direction.paused) {
            this.snake.setPaused();
        }
    };
    Game.prototype.addObserver = function (observer) {
        this.observers.push(observer);
    };
    Game.prototype.removeObserver = function (observer) {
        this.observers.splice(this.observers.indexOf(observer));
    };
    Game.prototype.notifyAllGameOver = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var element = _a[_i];
            element.notifyGameOver();
        }
    };
    Game.prototype.notifyAllScore = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var element = _a[_i];
            element.notifyScore(this.score);
        }
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=Game.js.map