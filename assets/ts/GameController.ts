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
    hammer;
    xDown:number;
    yDown:number;
    listenEvent;
    constructor(){
        this.xDown=null;
        this.yDown=null;
    }

    setSnake(snake:Snake){
        this.snake=snake;
        this.listen(this.snake);
    }
    listen(snake:Snake){
        this.listenEvent=function(ev){
            if(ev.type=="panleft"){
                move(snake,Direction.left);
            }
            else if(ev.type=="panright"){
                move(snake,Direction.right);
            }
            else if(ev.type=="panup"){
                move(snake,Direction.up);
            }
            else if (ev.type=="pandown"){
                move(snake,Direction.down);
            }
        }

        this.hammer= new Hammer(document.getElementsByTagName("body")[0]);

        this.hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL, threshold: 1, velocity: 0.1 });

        this.hammer.on("panleft panright panup pandown", this.listenEvent);
    }
    unlisten(){
        this.hammer.off("panleft panright panup pandown");
    }

}