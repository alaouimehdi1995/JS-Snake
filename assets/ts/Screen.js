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