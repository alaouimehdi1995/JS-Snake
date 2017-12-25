import {ObserverInterface} from "./ObserverInterface";
/**
 * Created by mehdi on 24/12/17.
 */


export interface SubjectInterface{

    observers:ObserverInterface[];
    addObserver(observer:ObserverInterface):void;
    removeObserver(observer:ObserverInterface):void;
    notifyAllGameOver():void;
    notifyAllScore():void;


}