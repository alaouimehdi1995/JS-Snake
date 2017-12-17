/**
 * Created by mehdi on 04/08/17.
 */


import {SnakeAPI} from "./SnakeAPI";

var element=document.getElementById('snake');


var snakeGame=new SnakeAPI(element);
snakeGame.play();
