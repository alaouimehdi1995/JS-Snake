/**
 * Created by mehdi on 24/12/17.
 */
"use strict";
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