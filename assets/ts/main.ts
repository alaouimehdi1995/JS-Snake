import {Game, Snake} from "./game";

import {Screen} from "./screen";
import {GameController, KeyboardController} from "./gameControl";

/**
 * Created by mehdi on 04/08/17.
 */

var element=document.getElementById('snake');
var scoreElement=document.getElementById('score');
var startGame:boolean=true;

    let game=new Game(element,scoreElement);
    let gameController:GameController=new KeyboardController(game.snake);
    let gameOver=false;
    let str:string="Game Over\nWould you like replay a new game ?";

    var id=setInterval(function(){
        gameOver=game.start();
        console.log(gameOver);
        if(gameOver){
            clearInterval(id);
            startGame=confirm(str);

        }


    }, 80);

