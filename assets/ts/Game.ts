import {GameControllerInterface} from "./GameControllers/GameControllerInterface";
import {Food} from "./GameElements/Food";
import {Snake} from "./GameElements/Snake";
import {Screen} from './Screen';
import {SubjectInterface} from "./ObserverPattern/SubjectInterface";
import {ObserverInterface} from "./ObserverPattern/ObserverInterface";
import {Direction} from "./GameElements/Direction";
import {Coordinates} from "./GameElements/Coordinates";
/**
 * Created by mehdi on 24/12/17.
 */


export class Game implements SubjectInterface{


    observers: ObserverInterface[]=[];
    private snake:Snake;
    private food:Food;
    private screen:Screen;
    private controller:GameControllerInterface;
    private withWallsMode:boolean;
    private score:number;
    private isGameOver:boolean;

    constructor(element:HTMLElement,gameController:GameControllerInterface,blockSize:number,withWalls:boolean){
        this.score = 0;
        this.isGameOver = false;
        this.setScreen(new Screen(element,blockSize));
        this.setSnake( new Snake(this,[{x:2,y:2},{x:2,y:1},{x:1,y:1},{x:0,y:1},{x:0,y:0}]) );
        this.setController(gameController);
        this.withWallsMode = withWalls;
        this.setFood( new Food(this) );
        this.food.getRandomBloc();
    }




    public getSnake():Snake{    return this.snake;  }
    public getFood():Food{  return this.food;   }
    public getScreen():Screen{  return this.screen; }
    public setScreen(screen:Screen):void{
        this.screen = screen;
    }
    public setSnake(snake:Snake):void{
        this.snake = snake;
    }
    public setFood(food:Food):void{
        this.food = food;
    }
    public setController(controller:GameControllerInterface):void{
        this.controller = controller;
        this.controller.setGame(this);
    }
    public gameOver():void{ this.isGameOver=true; }
    public start():void{

        let head:Coordinates;

        if (this.snake.direction == Direction.right) {

            if(this.snake.body[0].x<this.screen.getBorder().right-1)
                head = new Coordinates( this.snake.body[0].x + 1,this.snake.body[0].y);
            else {
                if(this.withWallsMode)
                    this.gameOver();

                head = new Coordinates(this.screen.getBorder().left, this.snake.body[0].y);
            }
        }

        else if (this.snake.direction == Direction.left) {

            if(this.snake.body[0].x>this.screen.getBorder().left)
                head = new Coordinates(  this.snake.body[0].x - 1, this.snake.body[0].y);
            else {
                if(this.withWallsMode)
                    this.gameOver();

                head = new Coordinates(this.screen.getBorder().right - 1, this.snake.body[0].y);
            }
        }

        else if (this.snake.direction == Direction.up) {

            if(this.snake.body[0].y>this.screen.getBorder().top)
                head = new Coordinates(  this.snake.body[0].x, this.snake.body[0].y - 1);
            else {
                if(this.withWallsMode)
                    this.gameOver();

                head = new Coordinates(this.snake.body[0].x, this.screen.getBorder().down - 1);
            }
        }

        else if (this.snake.direction == Direction.down) {

            if(this.snake.body[0].y<this.screen.getBorder().down-1)
                head = new Coordinates(  this.snake.body[0].x,  this.snake.body[0].y + 1);
            else {
                if(this.withWallsMode)
                    this.gameOver();

                head = new Coordinates(this.snake.body[0].x, this.screen.getBorder().top);
            }

        }

        if(!this.snake.isPaused()){
            this.snake.move(head);
            this.screen.cleanScreen();
            this.screen.drawSnake(this.snake);
            this.notifyAllScore();
        }


        if(this.isGameOver || this.snake.checkGameOver()){
            this.gameOver();
            this.notifyAllGameOver();
        }
        else {

            if (this.snake.body[0].x == this.food.position.x && this.snake.body[0].y == this.food.position.y) {
                this.snake.eatFood(this.food);
                this.score += this.snake.body.length;
                this.notifyAllScore();
                this.food.getRandomBloc();

            }
            this.screen.drawFood(this.food);
        }

    }

    public moveSnake(direction:Direction){
        if(direction==Direction.left){ //gauche
            if(this.snake.direction!=Direction.right)
                this.snake.direction=Direction.left;
        }
        else if(direction==Direction.up){ //haut
            if(this.snake.direction!=Direction.down)
                this.snake.direction=Direction.up;
        }
        else if(direction==Direction.right){ //droite
            if(this.snake.direction!=Direction.left)
                this.snake.direction=Direction.right;
        }
        else if(direction==Direction.down){ //bas
            if(this.snake.direction!=Direction.up)
                this.snake.direction=Direction.down;
        }
        else if(direction==Direction.paused){//en pause
            this.snake.setPaused();

        }
    }

    public addObserver(observer: ObserverInterface): void {
        this.observers.push(observer);
    }

    public removeObserver(observer: ObserverInterface): void {
        this.observers.splice(this.observers.indexOf(observer));
    }


    notifyAllGameOver():void{
        for(let element of this.observers)
            element.notifyGameOver();
    }
    notifyAllScore():void{
        for(let element of this.observers)
            element.notifyScore(this.score);
    }

}