import {Snake, Direction} from "./game";


export interface GameController{
    snake:Snake;
    listen();

}

export class KeyboardController implements GameController{
    snake: Snake;

    constructor(snake){
        this.snake=snake;
        this.listen();
    }
    listen() {
        document.addEventListener('keydown',function(e){

            let code:string=String(e.keyCode);

            if(code=="37"){ //gauche
                if(this.snake.direction!=Direction.right)
                    this.direction=Direction.left;
            }
            else if(code=="38"){ //haut
                if(this.snake.direction!=Direction.down)
                    this.snake.direction=Direction.up;
            }
            else if(code=="39"){ //droite
                if(this.snake.direction!=Direction.left)
                    this.snake.direction=Direction.right;
            }
            else if(code=="40"){ //bas
                if(this.snake.direction!=Direction.up)
                    this.snake.direction=Direction.down;
            }

        },false);


    }

}