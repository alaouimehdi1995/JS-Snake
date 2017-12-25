/**
 * Created by mehdi on 24/12/17.
 */
"use strict";
var ScoreListener = (function () {
    function ScoreListener(element, blockSize) {
        this.element = element;
        this.blockSize = blockSize;
        this.element.style.width = 5 * this.blockSize + "px";
        this.element.style.height = this.blockSize + "px";
        this.element.style.left = (window.innerWidth - parseFloat(this.element.style.width)) / 4 + "px";
    }
    ScoreListener.prototype.updateScore = function (newScore) {
        this.element.innerHTML = "Score: " + newScore;
    };
    return ScoreListener;
}());
exports.ScoreListener = ScoreListener;
//# sourceMappingURL=ScoreListener.js.map