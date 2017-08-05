import {Game, Snake} from "./game";

import {Screen} from "./screen";
import {GameController, KeyboardController} from "./gameControl";

/**
 * Created by mehdi on 04/08/17.
 */

var element=document.getElementById('snake');
var scoreElement=document.getElementById('score');
var startGame:boolean=true;
    let gameController:GameController=new KeyboardController();
    let game=new Game(element,scoreElement,gameController);
    let gameOver=false;
    let str:string="Game Over\nWould you like replay a new game ?";
    function play(){
        gameOver=game.start();
        if(gameOver){
            clearInterval(id);
        }
    }
    var id = setInterval(play, 80);
