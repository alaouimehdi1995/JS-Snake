import {Game} from "../Game";
import {Coordinates} from "./Coordinates";
/**
 * Created by mehdi on 24/12/17.
 */



export class Food{

    position:Coordinates;
    game:Game;

    constructor(game:Game){
        this.game=game;
        this.position=new Coordinates(null,null);
    }


    private randomIntFromInterval (min:number,max:number) :number{
        return (Math.random()*(max-min)+min);
    }

    public getRandomBloc():void{
        do {
            var px = parseInt(String(this.randomIntFromInterval(this.game.getScreen().getBorder().left, this.game.getScreen().getBorder().right)));
            var py = parseInt(String(this.randomIntFromInterval(this.game.getScreen().getBorder().top, this.game.getScreen().getBorder().down)));
        }while(this.game.getSnake().checkCollision(px,py));
        this.position.x=px;
        this.position.y=py;
    }
}