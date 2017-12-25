/**
 * Created by mehdi on 24/12/17.
 */

export class ScoreListener{

    constructor(private element:HTMLElement){}


    updateScore(newScore:number){
        this.element.innerHTML="Score: "+newScore;
    }


}