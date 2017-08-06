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

var Screen_1 = __webpack_require__(2);
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
            Div.style.width = this.game.screen.blocSize + "px";
            Div.style.height = this.game.screen.blocSize + "px";
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
        Div.style.width = this.game.screen.blocSize + "px";
        Div.style.height = this.game.screen.blocSize + "px";
        Div.style.top = y;
        Div.style.left = x;
        Div.innerHTML = ' ';
        this.game.screen.element.appendChild(Div);
    };
    return Food;
}());
exports.Food = Food;
var Game = (function () {
    function Game(element, scoreElement, gameController, blockSize) {
        this.score = 0;
        this.gameOver = false;
        if (blockSize)
            this.screen = new Screen_1.Screen(element, scoreElement, blockSize);
        else
            this.screen = new Screen_1.Screen(element, scoreElement);
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
        //this.controller.unlisten();
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
//# sourceMappingURL=Game.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by mehdi on 04/08/17.
 */

var Game_1 = __webpack_require__(0);
var GameController_1 = __webpack_require__(3);
var element = document.getElementById('snake');
var scoreElement = document.getElementById('score');
var gameSpeed = parseFloat(element.getAttribute("game-speed"));
var blockSize = parseFloat(element.getAttribute("block-size"));
var gameController = new GameController_1.KeyboardController();
var game = new Game_1.Game(element, scoreElement, gameController, blockSize);
var gameOver = false;
function play() {
    gameOver = game.start();
    if (gameOver) {
        clearInterval(id);
    }
}
var id = setInterval(play, gameSpeed);
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
        this.initialWidth = getComputedStyle(this.element, null).width;
        this.initialHeight = getComputedStyle(this.element, null).height;
        if (blocSize) {
            this.blocSize = blocSize;
            document.getElementsByClassName("bloc");
        }
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
//# sourceMappingURL=Screen.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Game_1 = __webpack_require__(0);
function move(snake, direction) {
    if (direction == Game_1.Direction.left) {
        if (snake.direction != Game_1.Direction.right)
            snake.direction = Game_1.Direction.left;
    }
    else if (direction == Game_1.Direction.up) {
        if (snake.direction != Game_1.Direction.down)
            snake.direction = Game_1.Direction.up;
    }
    else if (direction == Game_1.Direction.right) {
        if (snake.direction != Game_1.Direction.left)
            snake.direction = Game_1.Direction.right;
    }
    else if (direction == Game_1.Direction.down) {
        if (snake.direction != Game_1.Direction.up)
            snake.direction = Game_1.Direction.down;
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
                move(snake, Game_1.Direction.left);
            }
            else if (code == "38") {
                move(snake, Game_1.Direction.up);
            }
            else if (code == "39") {
                move(snake, Game_1.Direction.right);
            }
            else if (code == "40") {
                move(snake, Game_1.Direction.down);
            }
        };
        document.addEventListener('keydown', this.listenEvent, false);
    };
    KeyboardController.prototype.unlisten = function () {
        document.removeEventListener('keydown', this.listenEvent, false);
    };
    return KeyboardController;
}());
exports.KeyboardController = KeyboardController;
//# sourceMappingURL=GameController.js.map

/***/ })
/******/ ]);