/**
 * Created by mehdi on 24/12/17.
 */



export interface ObserverInterface{
    notifyGameOver():void;
    notifyScore(score:number):void;
}