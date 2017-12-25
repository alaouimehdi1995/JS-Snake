import {Game} from "../Game";
import {GameControllerInterface} from "./GameControllerInterface";
/**
 * Created by mehdi on 24/12/17.
 */


export class TouchScreenController implements GameControllerInterface{
    game: Game;
    listenerFunction;
    public setGame(game: Game):void{
        this.game=game;
    }

    public listen():void{}
    public unlisten():void{
    }


}