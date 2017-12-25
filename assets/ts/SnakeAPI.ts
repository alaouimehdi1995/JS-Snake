/**
 * Created by mehdi on 24/12/17.
 */


import {APIExtractor} from "./APIExtractor";
import {ScoreListener} from "./ScoreListener/ScoreListener";
import {ObserverInterface} from "./ObserverPattern/ObserverInterface";
import {Game} from "./Game";

export class SnakeAPI implements ObserverInterface{

    dataExtractor:APIExtractor;
    game:Game;
    scorer:ScoreListener;
    gameID:number;

    constructor(gameElement,scoreElement){
        this.dataExtractor=new APIExtractor(gameElement);
        this.scorer=new ScoreListener(scoreElement,this.dataExtractor.blockSize);
        this.game=new Game(gameElement,this.dataExtractor.getGameController(),this.dataExtractor.getBlockSize(),this.dataExtractor.getGameMode());
        this.game.addObserver(this);

    }

    play(){

        this.gameID = setInterval(()=>{this.game.start();}, this.dataExtractor.getGameSpeed());
    }

    notifyGameOver():void{
        clearInterval(this.gameID);
        /*
        * We should implement the restart loop etc.
        * */
    }
    notifyScore(score:number):void{
        this.scorer.updateScore(score);
    }






}