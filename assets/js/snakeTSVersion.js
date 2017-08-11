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
    Snake.prototype.check = function (x, y) {
        for (var i = 0; i < this.body.length; i++) {
            if (this.body[i].x == x && this.body[i].y == y)
                return true;
        }
        return false;
    };
    Snake.prototype.draw = function () {
        var x, y;
        for (var i = 0; i < this.body.length; i++) {
            x = parseInt(String(this.body[i].x)) * parseInt(String(this.game.screen.blocSize)) + "px";
            y = parseInt(String(this.body[i].y)) * parseInt(String(this.game.screen.blocSize)) + "px";
            var Div = document.createElement('div');
            Div.className = "snakeBloc";
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
        do {
            var px = parseInt(String(this.randomIntFromInterval(this.game.screen.border.left, this.game.screen.border.right)));
            var py = parseInt(String(this.randomIntFromInterval(this.game.screen.border.top, this.game.screen.border.down)));
        } while (this.game.snake.check(px, py));
        this.position.x = px;
        this.position.y = py;
    };
    Food.prototype.draw = function () {
        var x = parseInt(String(this.position.x)) * parseInt(String(this.game.screen.blocSize)) + "px";
        var y = parseInt(String(this.position.y)) * parseInt(String(this.game.screen.blocSize)) + "px";
        var Div = document.createElement('div');
        Div.className = "foodBloc";
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
    function Game(element, gameController, blockSize, withWalls) {
        this.score = 0;
        this.gameOver = false;
        this.screen = new Screen_1.Screen(element, blockSize);
        this.snake = new Snake(this, [{ x: 2, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }]);
        this.controller = gameController;
        this.withWalls = withWalls;
        this.controller.setSnake(this.snake);
        this.food = new Food(this);
        this.food.getRandomBloc();
    }
    Game.prototype.restartGame = function () {
        this.score = 0;
        this.gameOver = false;
        this.screen.cleanScreen();
        this.snake = new Snake(this, [{ x: 2, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }]);
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
    Game.prototype.updateScore = function () {
        this.screen.scoreElement.innerHTML = "Score: " + String(this.score);
    };
    Game.prototype.start = function () {
        var head;
        if (this.snake.direction == Direction.right) {
            if (this.snake.body[0].x < this.screen.border.right - 1)
                head = new Coordonates(this.snake.body[0].x + 1, this.snake.body[0].y);
            else {
                if (this.withWalls)
                    this.gameOver = true;
                head = new Coordonates(this.screen.border.left, this.snake.body[0].y);
            }
        }
        else if (this.snake.direction == Direction.left) {
            if (this.snake.body[0].x > this.screen.border.left)
                head = new Coordonates(this.snake.body[0].x - 1, this.snake.body[0].y);
            else {
                if (this.withWalls)
                    this.gameOver = true;
                head = new Coordonates(this.screen.border.right - 1, this.snake.body[0].y);
            }
        }
        else if (this.snake.direction == Direction.up) {
            if (this.snake.body[0].y > this.screen.border.top)
                head = new Coordonates(this.snake.body[0].x, this.snake.body[0].y - 1);
            else {
                if (this.withWalls)
                    this.gameOver = true;
                head = new Coordonates(this.snake.body[0].x, this.screen.border.down - 1);
            }
        }
        else if (this.snake.direction == Direction.down) {
            if (this.snake.body[0].y < this.screen.border.down - 1)
                head = new Coordonates(this.snake.body[0].x, this.snake.body[0].y + 1);
            else {
                if (this.withWalls)
                    this.gameOver = true;
                head = new Coordonates(this.snake.body[0].x, this.screen.border.top);
            }
        }
        this.snake.move(head);
        this.screen.cleanScreen();
        this.snake.draw();
        this.updateScore();
        if (this.gameOver || this.snake.checkGameOver()) {
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
                this.updateScore();
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
var DataExtractor_1 = __webpack_require__(3);
var element = document.getElementById('snake');
var dataExtractor = new DataExtractor_1.DataExtractor(element);
var game = new Game_1.Game(element, dataExtractor.getGameController(), dataExtractor.getBlockSize(), dataExtractor.getGameMode());
var gameOver = false;
function play() {
    gameOver = game.start();
    if (gameOver) {
        clearInterval(id);
    }
}
var id = setInterval(play, dataExtractor.getGameSpeed());
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
    function Screen(element, blocSize) {
        this.element = element;
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
        var Div = document.createElement('div');
        Div.className = "scoreBlock";
        Div.style.left = (parseInt(String(this.border.left)) + 5) * parseInt(String(this.blocSize)) + "px";
        Div.style.top = (parseInt(String(this.border.top)) - 2) * parseInt(String(this.blocSize)) + "px";
        Div.style.width = 5 * this.blocSize + "px";
        Div.style.height = this.blocSize + "px";
        this.scoreElement = Div;
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
        this.element.appendChild(this.scoreElement);
    };
    return Screen;
}());
exports.Screen = Screen;
//# sourceMappingURL=Screen.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var GameController_1 = __webpack_require__(4);
/**
 * Created by mehdi on 11/08/17.
 */
var defaultSettings = {
    gameSpeed: 80,
    blockSize: 20,
    gameModeWithWalls: false,
    gameController: null
};
var DataExtractor = (function () {
    function DataExtractor(element) {
        this.extractGameSpeed(element);
        this.extractBlockSize(element);
        this.extractGameController(element);
        this.extractGameMode(element);
    }
    DataExtractor.prototype.extractGameSpeed = function (element) {
        var gameSpeed = parseFloat(element.getAttribute("game-speed"));
        if (gameSpeed)
            this.gameSpeed = gameSpeed;
        else
            this.gameSpeed = defaultSettings.gameSpeed;
    };
    DataExtractor.prototype.extractBlockSize = function (element) {
        var blockSize = parseFloat(element.getAttribute("block-size"));
        if (blockSize)
            this.blockSize = blockSize;
        else
            this.blockSize = defaultSettings.blockSize;
    };
    DataExtractor.prototype.extractGameController = function (element) {
        var gameController = element.getAttribute("game-controller");
        if (gameController) {
            if (gameController.toLowerCase() == "keyboard") {
                this.gameController = new GameController_1.KeyboardController();
            }
            else if (gameController.toLowerCase() == "touchscreen") {
                this.gameController = new GameController_1.TouchScreenController();
            }
            else {
                this.gameController = this.getRightController();
            }
        }
        else
            this.gameController = this.getRightController();
    };
    DataExtractor.prototype.extractGameMode = function (element) {
        var gameMode = element.getAttribute("game-mode");
        if (gameMode && gameMode.toLowerCase() == "walls")
            this.gameModeWithWalls = true;
        else
            this.gameModeWithWalls = false;
    };
    DataExtractor.prototype.getRightController = function () {
        if ('ontouchstart' in window || navigator.maxTouchPoints)
            return new GameController_1.TouchScreenController;
        else
            return new GameController_1.KeyboardController;
    };
    DataExtractor.prototype.getGameSpeed = function () { return this.gameSpeed; };
    DataExtractor.prototype.getBlockSize = function () { return this.blockSize; };
    DataExtractor.prototype.getGameController = function () { return this.gameController; };
    DataExtractor.prototype.getGameMode = function () { return this.gameModeWithWalls; };
    return DataExtractor;
}());
exports.DataExtractor = DataExtractor;
//# sourceMappingURL=DataExtractor.js.map

/***/ }),
/* 4 */
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
var TouchScreenController = (function () {
    function TouchScreenController() {
        this.xDown = null;
        this.yDown = null;
    }
    TouchScreenController.prototype.setSnake = function (snake) {
        this.snake = snake;
        this.listen(this.snake);
    };
    TouchScreenController.prototype.listen = function (snake) {
        this.listenEvent = function (ev) {
            if (ev.type == "panleft") {
                move(snake, Game_1.Direction.left);
            }
            else if (ev.type == "panright") {
                move(snake, Game_1.Direction.right);
            }
            else if (ev.type == "panup") {
                move(snake, Game_1.Direction.up);
            }
            else if (ev.type == "pandown") {
                move(snake, Game_1.Direction.down);
            }
        };
        this.hammer = new Hammer(document.getElementsByTagName("body")[0]);
        this.hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL, threshold: 1, velocity: 0.1 });
        this.hammer.on("panleft panright panup pandown", this.listenEvent);
    };
    TouchScreenController.prototype.unlisten = function () {
        this.hammer.off("panleft panright panup pandown");
    };
    return TouchScreenController;
}());
exports.TouchScreenController = TouchScreenController;
//# sourceMappingURL=GameController.js.map

/***/ })
/******/ ]);