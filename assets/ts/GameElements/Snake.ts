import {Game} from "../Game";
import {Direction} from "./Direction";
import {Food} from "./Food";
import {Coordinates} from "./Coordinates";
/**
 * Created by mehdi on 24/12/17.
 */


export class Snake{
    body:Coordinates[];
    direction:Direction;
    lastDirection:Direction;
    game:Game;

    constructor(game:Game,initialPosition){
        this.body=[];
        this.game=game;
        this.direction=Direction.right;
        for(let i=0;i<initialPosition.length;i++){
            this.body.push(new Coordinates(initialPosition[i].x,initialPosition[i].y));
        }

    }
    public setPaused():void{
        if(this.direction==Direction.paused){
            this.direction=this.lastDirection;
        }
        else{
            this.lastDirection = this.direction;
            this.direction = Direction.paused;
        }


    }
    public isPaused():boolean{
        return this.direction == Direction.paused;
    }


    public move(newHeadPosition:Coordinates):void{
        this.body.pop();
        this.body.unshift(newHeadPosition);
    }
    public eatFood(food:Food):void{
        this.body.unshift(new Coordinates(food.position.x,food.position.y));
    }
    public checkGameOver():boolean{
        for(let i=1;i<this.body.length;i++){
            if(this.body[i].x==this.body[0].x && this.body[i].y==this.body[0].y){
                return true;
            }
        }
        return false;
    }
    public checkCollision(x:number,y:number):boolean{
        for(let i=0;i<this.body.length;i++){
            if(this.body[i].x==x && this.body[i].y==y)
                return true;
        }
        return false;
    }
}