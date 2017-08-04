/**
 * Created by mehdi on 04/08/17.
 */
"use strict";
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