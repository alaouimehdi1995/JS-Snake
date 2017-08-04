import {Game} from "./game";
import {GameController, KeyboardController} from "./gameControl";

/**
 * Created by mehdi on 04/08/17.
 */

var element=document.getElementById('snake');
var scoreElement=document.getElementById('score');
var game=new Game(element,scoreElement);
var gameController:GameController;

gameController=new KeyboardController(game.snake);

setInterval(function(){game.start()}, 80);