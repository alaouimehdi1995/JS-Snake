/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var screen_1 = __webpack_require__(2);
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
    function Snake(screen, initialPosition) {
        this.body = [];
        this.screen = screen;
        this.direction = Direction.right;
        for (var i = 0; i < initialPosition.length; i++) {
            this.body.push(new Coordonates(initialPosition[i].x, initialPosition[i].y));
        }
    }
    Snake.prototype.draw = function () {
        var x, y;
        for (var i = 0; i < this.body.length; i++) {
            x = parseInt(String(this.body[i].x)) * parseInt(String(this.screen.blocSize)) + "px";
            y = parseInt(String(this.body[i].y)) * parseInt(String(this.screen.blocSize)) + "px";
            var Div = document.createElement('div');
            Div.className = "bloc";
            Div.style.top = y;
            Div.style.left = x;
            Div.innerHTML = ' ';
            this.screen.element.appendChild(Div);
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
    function Food(screen) {
        this.screen = screen;
        this.position = new Coordonates(null, null);
    }
    Food.prototype.randomIntFromInterval = function (min, max) {
        return (Math.random() * (max - min) + min);
    };
    Food.prototype.getRandomBloc = function () {
        var px = parseInt(String(this.randomIntFromInterval(this.screen.border.left, this.screen.border.right)));
        var py = parseInt(String(this.randomIntFromInterval(this.screen.border.top, this.screen.border.down)));
        this.position.x = px;
        this.position.y = py;
    };
    Food.prototype.draw = function () {
        var x = parseInt("" + this.position.x) * parseInt("" + this.screen.blocSize) + "px";
        var y = parseInt("" + this.position.y) * parseInt("" + this.screen.blocSize) + "px";
        var Div = document.createElement('div');
        Div.className = "bloc";
        Div.style.top = y;
        Div.style.left = x;
        Div.innerHTML = ' ';
        this.screen.element.appendChild(Div);
    };
    return Food;
}());
exports.Food = Food;
var Game = (function () {
    function Game(element, scoreElement) {
        this.score = 0;
        this.gameOver = false;
        this.screen = new screen_1.Screen(element, scoreElement);
        this.snake = new Snake(this.screen, [{ x: 2, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }]);
        this.food = new Food(this.screen);
        this.food.getRandomBloc();
    }
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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var game_1 = __webpack_require__(0);
var gameControl_1 = __webpack_require__(3);
/**
 * Created by mehdi on 04/08/17.
 */
var element = document.getElementById('snake');
var scoreElement = document.getElementById('score');
var startGame = true;
var game = new game_1.Game(element, scoreElement);
var gameController = new gameControl_1.KeyboardController(game.snake);
var gameOver = false;
var str = "Game Over\nWould you like replay a new game ?";
var id = setInterval(function () {
    gameOver = game.start();
    console.log(gameOver);
    if (gameOver) {
        clearInterval(id);
        startGame = confirm(str);
    }
}, 80);
//# sourceMappingURL=main.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by mehdi on 04/08/17.
 */

var Border = (function () {
    function Border() {
    }
    return Border;
}());
exports.Border = Border;
var Screen = (function () {
    function Screen(element, scoreElement, blocSize) {
        this.element = element;
        this.scoreElement = scoreElement;
        if (blocSize)
            this.blocSize = blocSize;
        else
            this.blocSize = 20;
        this.border = new Border();
        this.border.left = 0;
        this.border.right = 0;
        this.border.top = 0;
        this.border.down = 0;
        this.width = "0";
        this.height = "0";
        this.adapt();
        this.element.style.width = this.width;
        this.element.style.height = this.height;
    }
    Screen.prototype.adapt = function () {
        this.width = parseInt(String(parseFloat(getComputedStyle(this.element, null).width) / this.blocSize)) * this.blocSize + "px";
        this.height = parseInt(String(parseFloat(getComputedStyle(this.element, null).height) / this.blocSize)) * this.blocSize + "px";
        this.border.left = 0;
        this.border.top = 0;
        this.border.right = parseFloat(this.width) / this.blocSize;
        this.border.down = parseFloat(this.height) / this.blocSize;
    };
    Screen.prototype.cleanScreen = function () {
        var parent = this.element.parentNode;
        var newDiv = document.createElement('div');
        newDiv.id = "snake";
        newDiv.style.width = this.width;
        newDiv.style.height = this.height;
        newDiv.className = "snake";
        parent.replaceChild(newDiv, this.element);
        this.element = newDiv;
    };
    return Screen;
}());
exports.Screen = Screen;
//# sourceMappingURL=screen.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var game_1 = __webpack_require__(0);
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

/***/ })
/******/ ]);