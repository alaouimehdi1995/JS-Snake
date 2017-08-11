/**
 * Created by mehdi on 04/08/17.
 */

import {Game} from "./Game";
import {DataExtractor} from "./DataExtractor";

var element=document.getElementById('snake');

var dataExtractor=new DataExtractor(element);

let game=new Game(element,dataExtractor.getGameController(),dataExtractor.getBlockSize(),dataExtractor.getGameMode());
let gameOver:boolean=false;
function play(){
    gameOver=game.start();
    if(gameOver){
        clearInterval(id);
    }
}
var id = setInterval(play, dataExtractor.getGameSpeed());
