import {GameController, TouchScreenController, KeyboardController} from "./GameController";
/**
 * Created by mehdi on 11/08/17.
 */

var defaultSettings={
    gameSpeed:80,
    blockSize:20,
    gameModeWithWalls:false,
    gameController:null

};

export class DataExtractor{
    gameSpeed:number;
    blockSize:number;
    gameModeWithWalls:boolean;
    gameController:GameController;

    constructor(element){
        this.extractGameSpeed(element);
        this.extractBlockSize(element);
        this.extractGameController(element);
        this.extractGameMode(element);

    }

    private extractGameSpeed(element){
        let gameSpeed:number=parseFloat(element.getAttribute("game-speed"));
        if(gameSpeed)
            this.gameSpeed=gameSpeed;
        else
            this.gameSpeed=defaultSettings.gameSpeed;
    }
    private extractBlockSize(element){
        let blockSize:number=parseFloat(element.getAttribute("block-size"));
        if(blockSize)
            this.blockSize=blockSize;
        else
            this.blockSize=defaultSettings.blockSize;

    }
    private extractGameController(element){
        let gameController:string=element.getAttribute("game-controller");

        if(gameController){
            if(gameController.toLowerCase()=="keyboard"){
                this.gameController=new KeyboardController();
            }
            else if(gameController.toLowerCase()=="touchscreen"){
                this.gameController=new TouchScreenController();
            }
            else{
                this.gameController=this.getRightController();
            }
        }
        else
            this.gameController=this.getRightController();

    }
    private extractGameMode(element){
        let gameMode:string=element.getAttribute("game-mode");
        if(gameMode && gameMode.toLowerCase()=="walls")
            this.gameModeWithWalls=true;

        else
            this.gameModeWithWalls=false;

    }

    private getRightController():GameController{
        if('ontouchstart' in window || navigator.maxTouchPoints)
            return new TouchScreenController;
        else
            return new KeyboardController;
    }

    public getGameSpeed():number{ return this.gameSpeed;}
    public getBlockSize():number{ return this.blockSize;}
    public getGameController():GameController{ return this.gameController; }
    public getGameMode():boolean{ return this.gameModeWithWalls; }
}