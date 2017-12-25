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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by mehdi on 24/12/17.
 */

(function (Direction) {
    Direction[Direction["right"] = 0] = "right";
    Direction[Direction["left"] = 1] = "left";
    Direction[Direction["up"] = 2] = "up";
    Direction[Direction["down"] = 3] = "down";
    Direction[Direction["paused"] = 4] = "paused";
})(exports.Direction || (exports.Direction = {}));
var Direction = exports.Direction;
//# sourceMappingURL=Direction.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by mehdi on 24/12/17.
 */

var Coordinates = (function () {
    function Coordinates(x, y) {
        this.x = x;
        this.y = y;
    }
    return Coordinates;
}());
exports.Coordinates = Coordinates;
//# sourceMappingURL=Coordinates.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by mehdi on 24/12/17.
 */

var SnakeAPI_1 = __webpack_require__(3);
var gameElement = document.getElementById('snake');
var scoreElement = document.getElementById('scoreBlock');
var snakeGame = new SnakeAPI_1.SnakeAPI(gameElement, scoreElement);
snakeGame.play();
//# sourceMappingURL=main.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by mehdi on 24/12/17.
 */

var APIExtractor_1 = __webpack_require__(4);
var ScoreListener_1 = __webpack_require__(7);
var Game_1 = __webpack_require__(8);
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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TouchScreenController_1 = __webpack_require__(5);
var KeyboardController_1 = __webpack_require__(6);
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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by mehdi on 24/12/17.
 */
var TouchScreenController = (function () {
    function TouchScreenController() {
    }
    TouchScreenController.prototype.setGame = function (game) {
        this.game = game;
    };
    TouchScreenController.prototype.listen = function () { };
    TouchScreenController.prototype.unlisten = function () {
    };
    return TouchScreenController;
}());
exports.TouchScreenController = TouchScreenController;
//# sourceMappingURL=TouchScreenController.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Direction_1 = __webpack_require__(0);
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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by mehdi on 24/12/17.
 */

var ScoreListener = (function () {
    function ScoreListener(element) {
        this.element = element;
    }
    ScoreListener.prototype.updateScore = function (newScore) {
        this.element.innerHTML = "Score: " + newScore;
    };
    return ScoreListener;
}());
exports.ScoreListener = ScoreListener;
//# sourceMappingURL=ScoreListener.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Food_1 = __webpack_require__(9);
var Snake_1 = __webpack_require__(10);
var Screen_1 = __webpack_require__(11);
var Direction_1 = __webpack_require__(0);
var Coordinates_1 = __webpack_require__(1);
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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Coordinates_1 = __webpack_require__(1);
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

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Direction_1 = __webpack_require__(0);
var Coordinates_1 = __webpack_require__(1);
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

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by mehdi on 24/12/17.
 */
var defaultBlocSize = 20;
var Border = (function () {
    function Border() {
    }
    return Border;
}());
exports.Border = Border;
var Screen = (function () {
    function Screen(element, blockSize) {
        this.element = element;
        this.initialWidth = getComputedStyle(this.element, null).width;
        this.initialHeight = getComputedStyle(this.element, null).height;
        this.blockSize = blockSize ? blockSize : defaultBlocSize;
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
        this.width = parseInt(String(parseFloat(getComputedStyle(this.element, null).width) / this.blockSize)) * this.blockSize + "px";
        this.height = parseInt(String(parseFloat(getComputedStyle(this.element, null).height) / this.blockSize)) * this.blockSize + "px";
        this.border.left = 0;
        this.border.top = 0;
        this.border.right = parseFloat(this.width) / this.blockSize;
        this.border.down = parseFloat(this.height) / this.blockSize;
        var Div = document.createElement('div');
        Div.className = "scoreBlock";
        Div.style.left = (parseInt(String(this.border.left)) + 5) * parseInt(String(this.blockSize)) + "px";
        Div.style.top = (parseInt(String(this.border.top)) - 2) * parseInt(String(this.blockSize)) + "px";
        Div.style.width = 5 * this.blockSize + "px";
        Div.style.height = this.blockSize + "px";
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
    Screen.prototype.drawFood = function (food) {
        var x = parseInt(String(food.position.x)) * parseInt(String(this.blockSize)) + "px";
        var y = parseInt(String(food.position.y)) * parseInt(String(this.blockSize)) + "px";
        var Div = document.createElement('div');
        Div.className = "foodBloc";
        Div.style.width = this.blockSize + "px";
        Div.style.height = this.blockSize + "px";
        Div.style.top = y;
        Div.style.left = x;
        Div.innerHTML = ' ';
        this.element.appendChild(Div);
    };
    Screen.prototype.drawSnake = function (snake) {
        var x, y;
        for (var i = 0; i < snake.body.length; i++) {
            x = parseInt(String(snake.body[i].x)) * parseInt(String(this.blockSize)) + "px";
            y = parseInt(String(snake.body[i].y)) * parseInt(String(this.blockSize)) + "px";
            var Div = document.createElement('div');
            Div.className = "snakeBloc";
            Div.style.width = this.blockSize + "px";
            Div.style.height = this.blockSize + "px";
            Div.style.top = y;
            Div.style.left = x;
            Div.innerHTML = ' ';
            this.element.appendChild(Div);
        }
    };
    Screen.prototype.getBorder = function () {
        return this.border;
    };
    return Screen;
}());
exports.Screen = Screen;
//# sourceMappingURL=Screen.js.map

/***/ })
/******/ ]);