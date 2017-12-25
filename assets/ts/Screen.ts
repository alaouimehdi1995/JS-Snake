import {Snake} from "./GameElements/Snake";
import {Food} from "./GameElements/Food";
/**
 * Created by mehdi on 24/12/17.
 */


var defaultBlocSize:number = 20;

export class Border{
    left:number;
    right:number;
    top:number;
    down:number;
}

export class Screen{

    blockSize:number;
    private border:Border;
    initialWidth:string;
    initialHeight:string;
    width:string;
    height:string;
    element:HTMLElement;
    scoreElement:HTMLElement;

    constructor(element:HTMLElement,blockSize?:number){
        this.element = element;
        this.initialWidth = getComputedStyle(this.element,null).width;
        this.initialHeight = getComputedStyle(this.element,null).height;
        this.blockSize = blockSize ? blockSize : defaultBlocSize;

        this.border=new Border();
        this.border.left=0;
        this.border.right=0;
        this.border.top=0;
        this.border.down=0;
        this.width="0";
        this.height="0";

        this.adapt();
        this.element.style.width=this.width;
        this.element.style.height=this.height;


    }
    public adapt():void{
        this.width=parseInt(String(parseFloat(getComputedStyle(this.element,null).width)/this.blockSize))*this.blockSize+"px";
        this.height=parseInt(String(parseFloat(getComputedStyle(this.element,null).height)/this.blockSize))*this.blockSize+"px";
        this.border.left=0;
        this.border.top=0;
        this.border.right=parseFloat(this.width)/this.blockSize;
        this.border.down=parseFloat(this.height)/this.blockSize;

        let Div=document.createElement('div');
        Div.className="scoreBlock";
        Div.style.left=(parseInt(String(this.border.left))+5)*parseInt(String(this.blockSize))+"px";
        Div.style.top=(parseInt(String(this.border.top))-2)*parseInt(String(this.blockSize))+"px";
        Div.style.width=5*this.blockSize+"px";
        Div.style.height=this.blockSize+"px";

        this.scoreElement=Div;
    }
    public cleanScreen():void{

        let parent=this.element.parentNode;
        let newDiv=document.createElement('div');
        newDiv.id="snake";
        newDiv.style.width=this.width;
        newDiv.style.height=this.height;
        newDiv.className="snake";
        parent.replaceChild(newDiv,this.element);
        this.element=newDiv;
        this.element.appendChild(this.scoreElement);

    }

    public drawFood(food:Food):void{
        var x=parseInt(String(food.position.x))*parseInt(String(this.blockSize))+"px";
        var y=parseInt(String(food.position.y))*parseInt(String(this.blockSize))+"px";
        let Div=document.createElement('div');
        Div.className="foodBloc";
        Div.style.width= this.blockSize+"px";
        Div.style.height= this.blockSize+"px";
        Div.style.top=y;
        Div.style.left=x;
        Div.innerHTML=' ';
        this.element.appendChild(Div);
    }

    public drawSnake(snake:Snake):void{
        let x:string,y:string;
        for(let i=0;i<snake.body.length;i++){
            x=parseInt(String(snake.body[i].x))*parseInt(String(this.blockSize))+"px";
            y=parseInt(String(snake.body[i].y))*parseInt(String(this.blockSize))+"px";
            var Div=document.createElement('div');
            Div.className="snakeBloc";
            Div.style.width= this.blockSize+"px";
            Div.style.height= this.blockSize+"px";
            Div.style.top=y;
            Div.style.left=x;
            Div.innerHTML=' ';
            this.element.appendChild(Div);
        }
    }

    public getBorder():Border{
        return this.border;
    }


}