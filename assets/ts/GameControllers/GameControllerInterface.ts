import {Game} from "../Game";
/**
 * Created by mehdi on 24/12/17.
 */

export interface GameControllerInterface{
    game:Game;
    listenerFunction;
    setGame(game:Game):void;
    listen():void;
    unlisten():void;

}