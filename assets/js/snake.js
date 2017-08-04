/**
 * Created by mehdi on 17/03/17.
 */


var screen={
    blocSize:20,

    leftBorder:0,

    rightBorder:0,

    topBorder:0,

    downBorder:0,

    adaptedWidth:0,

    adaptedHeight:0,

    adaptToScreen:function (){

        this.adaptedWidth=parseInt(parseFloat(getComputedStyle(element,null).width)/this.blocSize)*this.blocSize+"px";
        this.adaptedHeight=parseInt(parseFloat(getComputedStyle(element,null).height)/this.blocSize)*this.blocSize+"px";
        this.leftBorder=0;
        this.topBorder=0;
        this.rightBorder=parseFloat(this.adaptedWidth)/this.blocSize;
        this.downBorder=parseFloat(this.adaptedHeight)/this.blocSize;
    }
};


var game={

    score:0,

    snake:[{x:2,y:2},{x:2,y:1},{x:1,y:1},{x:0,y:1},{x:0,y:0}],

    direction:"R",

    meal:{

        x:0,
        y:0,

        randomIntFromInterval:function (min,max) {
            return (Math.random()*(max-min)+min);
        },


        getRandomBloc:function (){
            var px=parseInt(this.randomIntFromInterval(screen.leftBorder,screen.rightBorder));
            var py=parseInt(this.randomIntFromInterval(screen.topBorder,screen.downBorder));
            this.x=px;this.y=py;
        },
        draw:function(){
            var x=parseInt(this.x)*parseInt(screen.blocSize)+"px";
            var y=parseInt(this.y)*parseInt(screen.blocSize)+"px";
            var Div=document.createElement('div');
            Div.className="bloc";
            Div.style.top=y;
            Div.style.left=x;
            Div.innerHTML=' ';
            element.appendChild(Div);
        }
    },

    draw:function (){
        var x,y;
        for(var i=0;i<this.snake.length;i++){
            x=parseInt(this.snake[i].x)*parseInt(screen.blocSize)+"px";
            y=parseInt(this.snake[i].y)*parseInt(screen.blocSize)+"px";
            var Div=document.createElement('div');
            Div.className="bloc";
            Div.style.top=y;
            Div.style.left=x;
            Div.innerHTML=' ';
            element.appendChild(Div);
        }
    },

    cleanScreen:function (){
        var oldDiv=element;
        var parent=oldDiv.parentNode;
        var newDiv=document.createElement('div');
        newDiv.id="snake";
        newDiv.style.width=screen.adaptedWidth;
        newDiv.style.height=screen.adaptedHeight;
        newDiv.className="snake";
        parent.replaceChild(newDiv,oldDiv);
        element=newDiv;
    
    },

    play:function () {
        var head;
        if (this.direction == "R") {
            if(this.snake[0].x<screen.rightBorder-1)
                head = {x: this.snake[0].x + 1, y: this.snake[0].y};
            else
                head = {x: screen.leftBorder, y: this.snake[0].y};
        }
        else if (this.direction == "L") {
            if(this.snake[0].x>screen.leftBorder)
                head = {x: this.snake[0].x - 1, y: this.snake[0].y};
            else
                head = {x: screen.rightBorder-1, y: this.snake[0].y};
        }
        else if (this.direction == "U") {
            if(this.snake[0].y>screen.topBorder)
                head = {x: this.snake[0].x, y: this.snake[0].y - 1};
            else
                head = {x: this.snake[0].x, y: screen.downBorder-1};
        }
        else if (this.direction == "D") {
            if(this.snake[0].y<screen.downBorder-1)
                head = {x: this.snake[0].x, y: this.snake[0].y + 1};
            else
                head = {x: this.snake[0].x, y: screen.topBorder};
        }
        this.snake.pop();
        this.snake.unshift(head);
        this.cleanScreen();
        this.draw();
        if(this.checkGameOver()){
            alert("Game Over");
        }
        if(this.snake[0].x==this.meal.x && this.snake[0].y==this.meal.y){
            this.snake.unshift({x:this.meal.x,y:this.meal.y});
            this.score+=this.snake.length;
            document.getElementById("score").innerHTML="Score: "+this.score;
            this.meal.getRandomBloc();

        }
        this.meal.draw();
    },

    checkGameOver:function (){
        for(i=1;i<this.snake.length;i++){
            if(this.snake[i].x==this.snake[0].x && this.snake[i].y==this.snake[0].y){
                return true;
            }
        }
        return false;
    }
};






function listenKeyboard(){
    document.addEventListener('keydown',function(e){
        var code=e.keyCode;
        if(code=="37"){ //gauche
            if(game.direction!="R")
                game.direction="L";
        }
        else if(code=="38"){ //haut
            if(game.direction!="D")
                game.direction="U";
        }
        else if(code=="39"){ //droite
            if(game.direction!="L")
                game.direction="R";
        }
        else if(code=="40"){ //bas
            if(game.direction!="U")
                game.direction="D";
        }

    },false);
}







/*
* Important: we should recalculate div width and height in order to be a multiple of blocSize
* */

var element=document.getElementById('snake');
screen.adaptToScreen();
listenKeyboard();
game.meal.getRandomBloc();
element.style.width=screen.adaptedWidth;
element.style.height=screen.adaptedHeight;
setInterval(function(){game.play()}, 80);