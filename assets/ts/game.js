"use strict";
var screen_1 = require('./screen');
/*
* TODO:setScore() method in which we access to element and modify it's score content
* */
(function (Direction) {
    Direction[Direction["right"] = 0] = "right";
    Direction[Direction["left"] = 1] = "left";
    Direction[Direction["up"] = 2] = "up";
    Direction[Direction["down"] = 3] = "down";
})(exports.Direction || (exports.Direction = {}));
var Direction = exports.Direction;
var Coordonates = (function () {
    function Coordonates(x, y) {
        this.x = x;
        this.y = y;
    }
    return Coordonates;
}());
exports.Coordonates = Coordonates;
var Snake = (function () {
    function Snake(game, initialPosition) {
        this.body = [];
        this.game = game;
        this.direction = Direction.right;
        for (var i = 0; i < initialPosition.length; i++) {
            this.body.push(new Coordonates(initialPosition[i].x, initialPosition[i].y));
        }
    }
    Snake.prototype.draw = function () {
        var x, y;
        for (var i = 0; i < this.body.length; i++) {
            x = parseInt(String(this.body[i].x)) * parseInt(String(this.game.screen.blocSize)) + "px";
            y = parseInt(String(this.body[i].y)) * parseInt(String(this.game.screen.blocSize)) + "px";
            var Div = document.createElement('div');
            Div.className = "bloc";
            Div.style.top = y;
            Div.style.left = x;
            Div.innerHTML = ' ';
            this.game.screen.element.appendChild(Div);
        }
    };
    Snake.prototype.move = function (head) {
        this.body.pop();
        this.body.unshift(head);
    };
    Snake.prototype.eatFood = function (food) {
        this.body.unshift(new Coordonates(food.position.x, food.position.y));
    };
    Snake.prototype.checkGameOver = function () {
        for (var i = 1; i < this.body.length; i++) {
            if (this.body[i].x == this.body[0].x && this.body[i].y == this.body[0].y) {
                return true;
            }
        }
        return false;
    };
    return Snake;
}());
exports.Snake = Snake;
var Food = (function () {
    function Food(game) {
        this.game = game;
        this.position = new Coordonates(null, null);
    }
    Food.prototype.randomIntFromInterval = function (min, max) {
        return (Math.random() * (max - min) + min);
    };
    Food.prototype.getRandomBloc = function () {
        var px = parseInt(String(this.randomIntFromInterval(this.game.screen.border.left, this.game.screen.border.right)));
        var py = parseInt(String(this.randomIntFromInterval(this.game.screen.border.top, this.game.screen.border.down)));
        this.position.x = px;
        this.position.y = py;
    };
    Food.prototype.draw = function () {
        var x = parseInt("" + this.position.x) * parseInt("" + this.game.screen.blocSize) + "px";
        var y = parseInt("" + this.position.y) * parseInt("" + this.game.screen.blocSize) + "px";
        var Div = document.createElement('div');
        Div.className = "bloc";
        Div.style.top = y;
        Div.style.left = x;
        Div.innerHTML = ' ';
        this.game.screen.element.appendChild(Div);
    };
    return Food;
}());
exports.Food = Food;
var Game = (function () {
    function Game(element, scoreElement, gameController) {
        this.score = 0;
        this.gameOver = false;
        this.screen = new screen_1.Screen(element, scoreElement);
        this.snake = new Snake(this, [{ x: 2, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }]);
        this.controller = gameController;
        this.controller.setSnake(this.snake);
        this.food = new Food(this);
        this.food.getRandomBloc();
    }
    Game.prototype.restartGame = function () {
        this.score = 0;
        this.gameOver = false;
        this.screen.cleanScreen();
        this.snake = new Snake(this, [{ x: 2, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }]);
        this.controller.unlisten();
        this.controller.setSnake(this.snake);
        this.food = new Food(this);
        this.food.getRandomBloc();
    };
    Game.prototype.setScreen = function (screen) {
        this.screen = screen;
    };
    Game.prototype.setSnake = function (snake) {
        this.snake = snake;
    };
    Game.prototype.setFood = function (food) {
        this.food = food;
    };
    Game.prototype.start = function () {
        var head;
        if (this.snake.direction == Direction.right) {
            if (this.snake.body[0].x < this.screen.border.right - 1)
                head = new Coordonates(this.snake.body[0].x + 1, this.snake.body[0].y);
            else
                head = new Coordonates(this.screen.border.left, this.snake.body[0].y);
        }
        else if (this.snake.direction == Direction.left) {
            if (this.snake.body[0].x > this.screen.border.left)
                head = new Coordonates(this.snake.body[0].x - 1, this.snake.body[0].y);
            else
                head = new Coordonates(this.screen.border.right - 1, this.snake.body[0].y);
        }
        else if (this.snake.direction == Direction.up) {
            if (this.snake.body[0].y > this.screen.border.top)
                head = new Coordonates(this.snake.body[0].x, this.snake.body[0].y - 1);
            else
                head = new Coordonates(this.snake.body[0].x, this.screen.border.down - 1);
        }
        else if (this.snake.direction == Direction.down) {
            if (this.snake.body[0].y < this.screen.border.down - 1)
                head = new Coordonates(this.snake.body[0].x, this.snake.body[0].y + 1);
            else
                head = new Coordonates(this.snake.body[0].x, this.screen.border.top);
        }
        this.snake.move(head);
        this.screen.cleanScreen();
        this.snake.draw();
        if (this.snake.checkGameOver()) {
            this.gameOver = true;
            var str = "Game Over\nWould you like replay a new game ?";
            var startGame = confirm(str);
            if (startGame) {
                this.restartGame();
            }
        }
        else {
            if (this.snake.body[0].x == this.food.position.x && this.snake.body[0].y == this.food.position.y) {
                this.snake.eatFood(this.food);
                this.score += this.snake.body.length;
                this.screen.scoreElement.innerHTML = "Score: " + this.score;
                this.food.getRandomBloc();
            }
            this.food.draw();
        }
        return this.gameOver;
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=game.js.map