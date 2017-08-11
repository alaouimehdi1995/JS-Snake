import {TouchScreenController, KeyboardController, GameController} from "./GameController";
/**
 * Created by mehdi on 04/08/17.
 */

 export class Border{
    left:number;
    right:number;
    top:number;
    down:number;
}

 export class Screen{

    blocSize:number;
    border:Border;
    initialWidth:string;
    initialHeight:string;
    width:string;
    height:string;
    element;
    scoreElement;

    constructor(element,blocSize?:number){
        this.element=element;
        this.initialWidth=getComputedStyle(this.element,null).width;
        this.initialHeight=getComputedStyle(this.element,null).height;

        if(blocSize){
            this.blocSize=blocSize;
            document.getElementsByClassName("bloc")
        }
        else
            this.blocSize=20;
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
    public adapt(){
        this.width=parseInt(String(parseFloat(getComputedStyle(this.element,null).width)/this.blocSize))*this.blocSize+"px";
        this.height=parseInt(String(parseFloat(getComputedStyle(this.element,null).height)/this.blocSize))*this.blocSize+"px";
        this.border.left=0;
        this.border.top=0;
        this.border.right=parseFloat(this.width)/this.blocSize;
        this.border.down=parseFloat(this.height)/this.blocSize;

        let Div=document.createElement('div');
        Div.className="scoreBlock";
        Div.style.left=(parseInt(String(this.border.left))+5)*parseInt(String(this.blocSize))+"px";
        Div.style.top=(parseInt(String(this.border.top))-2)*parseInt(String(this.blocSize))+"px";
        Div.style.width=5*this.blocSize+"px";
        Div.style.height=this.blocSize+"px";

        this.scoreElement=Div;
    }
    public cleanScreen(){

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




}
