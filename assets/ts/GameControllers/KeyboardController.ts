import {Game} from "../Game";
import {GameControllerInterface} from "./GameControllerInterface";
import {Direction} from "../GameElements/Direction";
/**
 * Created by mehdi on 24/12/17.
 */


export class KeyboardController implements GameControllerInterface{

    game: Game;
    listenerFunction;

    constructor(){
        this.listenerFunction=(e)=>{
            let code:string=String(e.keyCode);
            if(code=="37") //gauche
                this.game.moveSnake(Direction.left);

            else if(code=="38") //haut
                this.game.moveSnake(Direction.up);

            else if(code=="39") //droite
                this.game.moveSnake(Direction.right);

            else if(code=="40") //bas
                this.game.moveSnake(Direction.down);


            else if(code=="32")//en pause
                this.game.moveSnake(Direction.paused);

        };
    }
    public setGame(game: Game):void{
        this.game=game;
        this.listen();
    }

    public listen():void{
        document.addEventListener("keydown", this.listenerFunction,false);
    }
    public unlisten():void{
        document.removeEventListener("keydown", this.listenerFunction);
    }

}