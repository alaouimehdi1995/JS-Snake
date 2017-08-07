import {Snake, Direction, Game} from "./Game";


export interface GameController{
    snake:Snake;
    setSnake(snake:Snake);
    listen(snake:Snake);
    unlisten();

}
function move(snake:Snake,direction:Direction){
    if(direction==Direction.left){ //gauche
        if(snake.direction!=Direction.right)
            snake.direction=Direction.left;
    }
    else if(direction==Direction.up){ //haut
        if(snake.direction!=Direction.down)
            snake.direction=Direction.up;
    }
    else if(direction==Direction.right){ //droite
        if(snake.direction!=Direction.left)
            snake.direction=Direction.right;
    }
    else if(direction==Direction.down){ //bas
        if(snake.direction!=Direction.up)
            snake.direction=Direction.down;
    }
}

 export class KeyboardController implements GameController{
    listenEvent;
     snake: Snake;
    constructor(){

    }
    setSnake(snake:Snake){
        this.snake=snake;
        this.listen(this.snake);
    }

    listen(snake:Snake) {
        this.listenEvent=function(e){
            let code:string=String(e.keyCode);
            if(code=="37"){ //gauche
                move(snake,Direction.left);
            }
            else if(code=="38"){ //haut
                move(snake,Direction.up);
            }
            else if(code=="39"){ //droite
                move(snake,Direction.right);
            }
            else if(code=="40"){ //bas
                move(snake,Direction.down);
            }

        }

        document.addEventListener('keydown',this.listenEvent,false);
    }
    unlisten(){
        document.removeEventListener('keydown',this.listenEvent,false);
    }

}


export class TouchScreenController implements GameController{
    snake:Snake;
    xDown:number;
    yDown:number;
    listenEvent;
    constructor(){
        this.xDown=null;
        this.yDown=null;
    }
    handleTouchStart(evt) {
        this.xDown = evt.touches[0].clientX;
        this.yDown = evt.touches[0].clientY;
    };
    setSnake(snake:Snake){
        this.snake=snake;
        this.listen(this.snake);
    }
    listen(snake:Snake){
        this.listenEvent=function (evt) {
            if ( ! this.xDown || ! this.yDown ) {
                return;
            }

            var xUp = evt.touches[0].clientX;
            var yUp = evt.touches[0].clientY;

            var xDiff = this.xDown - xUp;
            var yDiff = this.yDown - yUp;

            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                if ( xDiff > 0 ) {
                    move(snake,Direction.left);
                } else {
                    move(snake,Direction.right);
                }
            } else {
                if ( yDiff > 0 ) {
                    move(snake,Direction.up);
                } else {
                    move(snake,Direction.down);
                }
            }
            /* reset values */
            this.xDown = null;
            this.yDown = null;
        };


        document.addEventListener('touchstart', this.handleTouchStart, false);
        document.addEventListener('touchmove', this.listenEvent, false);
    }
    unlisten(){
        document.removeEventListener('touchstart', this.handleTouchStart, false);
        document.removeEventListener('touchmove', this.listenEvent, false);
    }

}