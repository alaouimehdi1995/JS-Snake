/**
 * Created by mehdi on 04/08/17.
 */

import {Game, Snake} from "./Game";
import {GameController, KeyboardController} from "./GameController";



var element=document.getElementById('snake');
var scoreElement=document.getElementById('score');
    let gameController:GameController=new KeyboardController();
    let game=new Game(element,scoreElement,gameController);
    let gameOver=false;
    function play(){
        gameOver=game.start();
        if(gameOver){
            clearInterval(id);
        }
    }
    var id = setInterval(play, 80);
