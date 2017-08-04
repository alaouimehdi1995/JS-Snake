import {Snake, Direction, Game} from "./game";


export interface GameController{
    snake:Snake;
    listen(snake:Snake);

}

 export class KeyboardController implements GameController{
    snake: Snake;

    constructor(snake){
        this.snake=snake;
        this.listen(this.snake);
    }

    listen(snake:Snake) {
        document.addEventListener('keydown',function(e){

            let code:string=String(e.keyCode);

            if(code=="37"){ //gauche
                if(snake.direction!=Direction.right)
                    snake.direction=Direction.left;
            }
            else if(code=="38"){ //haut
                if(snake.direction!=Direction.down)
                    snake.direction=Direction.up;
            }
            else if(code=="39"){ //droite
                if(snake.direction!=Direction.left)
                    snake.direction=Direction.right;
            }
            else if(code=="40"){ //bas
                if(snake.direction!=Direction.up)
                    snake.direction=Direction.down;
            }

        },false);


    }

}