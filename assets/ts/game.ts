import {Screen} from './screen';

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
    screen:Screen;

    constructor(screen:Screen,initialPosition){
        this.body=[];
        this.screen=screen;
        this.direction=Direction.right;
        for(let i=0;i<initialPosition.length;i++){
            this.body.push(new Coordonates(initialPosition[i].x,initialPosition[i].y));
        }

    }
    draw(){
        let x:string,y:string;
        for(let i=0;i<this.body.length;i++){
            x=parseInt(String(this.body[i].x))*parseInt(String(this.screen.blocSize))+"px";
            y=parseInt(String(this.body[i].y))*parseInt(String(this.screen.blocSize))+"px";
            var Div=document.createElement('div');
            Div.className="bloc";
            Div.style.top=y;
            Div.style.left=x;
            Div.innerHTML=' ';
            this.screen.element.appendChild(Div);
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
    screen:Screen;
    constructor(screen:Screen){
        this.screen=screen;
        this.position=new Coordonates(null,null);
    }

    randomIntFromInterval (min:number,max:number) {
        return (Math.random()*(max-min)+min);
    }

    getRandomBloc(){
        var px=parseInt(String(this.randomIntFromInterval(this.screen.border.left,this.screen.border.right)));
        var py=parseInt(String(this.randomIntFromInterval(this.screen.border.top,this.screen.border.down)));
        this.position.x=px;
        this.position.y=py;
    }
    draw(){
        var x=parseInt(""+this.position.x)*parseInt(""+this.screen.blocSize)+"px";
        var y=parseInt(""+this.position.y)*parseInt(""+this.screen.blocSize)+"px";
        var Div=document.createElement('div');
        Div.className="bloc";
        Div.style.top=y;
        Div.style.left=x;
        Div.innerHTML=' ';
        this.screen.element.appendChild(Div);
    }
}


 export class Game{
    score:number;
     gameOver:boolean;
    screen:Screen;
    snake:Snake;
    food:Food;
    constructor(element,scoreElement){
        this.score=0;
        this.gameOver=false;
        this.screen=new Screen(element,scoreElement);
        this.snake=new Snake(this.screen,[{x:2,y:2},{x:2,y:1},{x:1,y:1},{x:0,y:1},{x:0,y:0}]);
        this.food=new Food(this.screen);
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

        if(this.snake.checkGameOver()){
            this.gameOver=true;
        }
        else {
            if (this.snake.body[0].x == this.food.position.x && this.snake.body[0].y == this.food.position.y) {
                this.snake.eatFood(this.food);
                this.score += this.snake.body.length;
                this.screen.scoreElement.innerHTML = "Score: " + this.score;
                this.food.getRandomBloc();

            }
            this.food.draw();
        }
        return this.gameOver;
    }




}