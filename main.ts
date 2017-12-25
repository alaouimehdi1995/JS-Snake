/**
 * Created by mehdi on 24/12/17.
 */

import {SnakeAPI} from "./assets/ts/SnakeAPI";


var gameElement = document.getElementById('snake');
var scoreElement = document.getElementById('scoreBlock');
var snakeGame=new SnakeAPI(gameElement,scoreElement);
snakeGame.play();
