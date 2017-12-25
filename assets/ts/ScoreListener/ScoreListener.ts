/**
 * Created by mehdi on 24/12/17.
 */

export class ScoreListener{

    constructor(private element:HTMLElement,private blockSize:number){

        this.element.style.width=5*this.blockSize+"px";
        this.element.style.height=this.blockSize+"px";
        this.element.style.left=(window.innerWidth - parseFloat(this.element.style.width))/4+"px";

    }


    updateScore(newScore:number){
        this.element.innerHTML="Score: "+newScore;
    }


}