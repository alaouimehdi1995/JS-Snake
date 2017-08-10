import {Screen} from './Screen';
import {GameController} from "./GameController";
/*
* TODO:setScore() method in which we access to element and modify it's score content
* */
export enum Direction{
    right,
    left,
    up,
    down
}
 export class Coordonates{
    x:number;
    y:number;
    constructor(x:number,y:number){
        this.x=x;
        this.y=y;
    }
}

 export class Snake{
    body:Coordonates[];
    direction:Direction;
    game:Game;

    constructor(game:Game,initialPosition){
        this.body=[];
        this.game=game;
        this.direction=Direction.right;
        for(let i=0;i<initialPosition.length;i++){
            this.body.push(new Coordonates(initialPosition[i].x,initialPosition[i].y));
        }

    }
    check(x:number,y:number):boolean{
        for(let i=0;i<this.body.length;i++){
            if(this.body[i].x==x && this.body[i].y==y)
                return true;
        }
        return false;
    }
    draw(){
        let x:string,y:string;
        for(let i=0;i<this.body.length;i++){
            x=parseInt(String(this.body[i].x))*parseInt(String(this.game.screen.blocSize))+"px";
            y=parseInt(String(this.body[i].y))*parseInt(String(this.game.screen.blocSize))+"px";
            var Div=document.createElement('div');
            Div.className="bloc";
            Div.style.width= this.game.screen.blocSize+"px";
            Div.style.height= this.game.screen.blocSize+"px";
            Div.style.top=y;
            Div.style.left=x;
            Div.innerHTML=' ';
            this.game.screen.element.appendChild(Div);
        }
    }
    move(head){
        this.body.pop();
        this.body.unshift(head);
    }
    eatFood(food){
        this.body.unshift(new Coordonates(food.position.x,food.position.y));
    }

    checkGameOver():boolean{
        for(let i=1;i<this.body.length;i++){
            if(this.body[i].x==this.body[0].x && this.body[i].y==this.body[0].y){
                return true;
            }
        }
        return false;
    }
}

 export class Food{
    position:Coordonates;
    game:Game;
    constructor(game:Game){
        this.game=game;
        this.position=new Coordonates(null,null);
    }

    randomIntFromInterval (min:number,max:number) {
        return (Math.random()*(max-min)+min);
    }

    getRandomBloc(){
        do {
            var px = parseInt(String(this.randomIntFromInterval(this.game.screen.border.left, this.game.screen.border.right)));
            var py = parseInt(String(this.randomIntFromInterval(this.game.screen.border.top, this.game.screen.border.down)));
        }while(this.game.snake.check(px,py));
        this.position.x=px;
        this.position.y=py;
    }
    draw(){
        var x=parseInt(String(this.position.x))*parseInt(String(this.game.screen.blocSize))+"px";
        var y=parseInt(String(this.position.y))*parseInt(String(this.game.screen.blocSize))+"px";
        let Div=document.createElement('div');
        Div.className="bloc";
        Div.style.width= this.game.screen.blocSize+"px";
        Div.style.height= this.game.screen.blocSize+"px";
        Div.style.top=y;
        Div.style.left=x;
        Div.innerHTML=' ';
        this.game.screen.element.appendChild(Div);
    }
}


 export class Game{
    score:number;
    gameOver:boolean;
    screen:Screen;
    snake:Snake;
    food:Food;
    controller:GameController;
    constructor(element,gameController?:GameController,blockSize?:number){
        this.score=0;
        this.gameOver=false;
        if(blockSize)
            this.screen=new Screen(element,blockSize);
        else
            this.screen=new Screen(element);
        this.snake=new Snake(this,[{x:2,y:2},{x:2,y:1},{x:1,y:1},{x:0,y:1},{x:0,y:0}]);
        if(gameController)
            this.controller=gameController;
        else
            this.controller=this.screen.getRightController();
        this.controller.setSnake(this.snake);
        this.food=new Food(this);
        this.food.getRandomBloc();
    }
    restartGame(){
        this.score=0;
        this.gameOver=false;
        this.screen.cleanScreen();
        this.snake=new Snake(this,[{x:2,y:2},{x:2,y:1},{x:1,y:1},{x:0,y:1},{x:0,y:0}]);
        this.controller.setSnake(this.snake);
        this.food=new Food(this);
        this.food.getRandomBloc();
    }
    setScreen(screen:Screen){
        this.screen=screen;
    }
    setSnake(snake:Snake){
        this.snake=snake;
    }
    setFood(food:Food){
        this.food=food;
    }
    updateScore(){
        this.screen.scoreElement.innerHTML="Score: "+String(this.score);
    }
    start():boolean{
        let head:Coordonates;
        if (this.snake.direction == Direction.right) {

            if(this.snake.body[0].x<this.screen.border.right-1)
                head = new Coordonates( this.snake.body[0].x + 1,this.snake.body[0].y);
            else
                head = new Coordonates(  this.screen.border.left, this.snake.body[0].y);
        }

        else if (this.snake.direction == Direction.left) {

            if(this.snake.body[0].x>this.screen.border.left)
                head = new Coordonates(  this.snake.body[0].x - 1, this.snake.body[0].y);
            else
                head = new Coordonates(  this.screen.border.right-1, this.snake.body[0].y);
        }

        else if (this.snake.direction == Direction.up) {

            if(this.snake.body[0].y>this.screen.border.top)
                head = new Coordonates(  this.snake.body[0].x, this.snake.body[0].y - 1);
            else
                head = new Coordonates( this.snake.body[0].x, this.screen.border.down-1);
        }

        else if (this.snake.direction == Direction.down) {

            if(this.snake.body[0].y<this.screen.border.down-1)
                head = new Coordonates(  this.snake.body[0].x,  this.snake.body[0].y + 1);
            else
                head = new Coordonates(  this.snake.body[0].x, this.screen.border.top);
        }

        this.snake.move(head);
        this.screen.cleanScreen();
        this.snake.draw();
        this.updateScore();

        if(this.snake.checkGameOver()){
            this.gameOver=true;
            let str:string="Game Over\nWould you like replay a new game ?";
            let startGame=confirm(str);
            if (startGame){
                this.restartGame();
            }
        }
        else {
            if (this.snake.body[0].x == this.food.position.x && this.snake.body[0].y == this.food.position.y) {
                this.snake.eatFood(this.food);
                this.score += this.snake.body.length;
                this.updateScore();
                this.food.getRandomBloc();

            }
            this.food.draw();
        }
        return this.gameOver;
    }




}