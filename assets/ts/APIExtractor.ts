import {TouchScreenController} from "./GameControllers/TouchScreenController";
import {GameControllerInterface} from "./GameControllers/GameControllerInterface";
import {KeyboardController} from "./GameControllers/KeyboardController";
/**
 * Created by mehdi on 24/12/17.
 */

var defaultSettings={
    gameSpeed:80,
    blockSize:20,
    gameModeWithWalls:false,
    gameController:null

};

export class APIExtractor{

    gameSpeed:number;
    blockSize:number;
    gameModeWithWalls:boolean;
    gameController:GameControllerInterface;




    constructor(element:HTMLElement){
        this.extractGameSpeed(element);
        this.extractBlockSize(element);
        this.extractGameController(element);
        this.extractGameMode(element);

    }


    private extractGameSpeed(element:HTMLElement):void{
        let gameSpeed:number=parseFloat(element.getAttribute("game-speed"));
        this.gameSpeed = gameSpeed ? gameSpeed : defaultSettings.gameSpeed;

    }
    private extractBlockSize(element:HTMLElement):void{
        let blockSize:number=parseFloat(element.getAttribute("block-size"));
        this.blockSize = blockSize ? blockSize : defaultSettings.blockSize;

    }
    private extractGameController(element:HTMLElement):void{
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
    private extractGameMode(element:HTMLElement):void{
        let gameMode:string=element.getAttribute("game-mode");
        this.gameModeWithWalls = (gameMode && gameMode.toLowerCase()=="walls");

    }

    private getRightController():GameControllerInterface{
        if('ontouchstart' in window || navigator.maxTouchPoints)
            return new TouchScreenController;
        else
            return new KeyboardController;
    }

    public getGameSpeed():number{ return this.gameSpeed;}
    public getBlockSize():number{ return this.blockSize;}
    public getGameController():GameControllerInterface{ return this.gameController; }
    public getGameMode():boolean{ return this.gameModeWithWalls; }
}