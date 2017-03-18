/**
 * Created by mehdi on 17/03/17.
 */
var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

function listenKeyboard(){
    document.addEventListener('keydown',function(e){
        var code=e.keyCode;
        if(code=="37"){ //gauche
            if(direction!="R")
                direction="L";
        }
        else if(code=="38"){ //haut
            if(direction!="D")
                direction="U";
        }
        else if(code=="39"){ //droite
            if(direction!="L")
                direction="R";
        }
        else if(code=="40"){ //bas
            if(direction!="U")
                direction="D";
        }

    },false);
}
function draw(toDraw){
    var x,y;
    for(var i=0;i<toDraw.length;i++){

        x=parseInt(toDraw[i].x)*parseInt(blocSize)+"px";
        y=parseInt(toDraw[i].y)*parseInt(blocSize)+"px";
        var Div=document.createElement('div');
        Div.className="bloc";
        Div.style.top=y;
        Div.style.left=x;
        Div.innerHTML=' ';
        document.getElementById('snake').appendChild(Div);
    }
}

function cleanScreen(){

    var oldDiv=document.getElementById('snake');
    var newDiv=document.createElement('div');
    newDiv.id="snake";
    document.body.replaceChild(newDiv,oldDiv);


}

function play() {
    var head;

    if (direction == "R") {
        if(snake[0].x<rightLimit)
            head = {x: snake[0].x + 1, y: snake[0].y};
        else
            head = {x: leftLimit, y: snake[0].y};
    }
    else if (direction == "L") {
        if(snake[0].x>leftLimit)
            head = {x: snake[0].x - 1, y: snake[0].y};
        else
            head = {x: rightLimit, y: snake[0].y};
    }
    else if (direction == "U") {
        if(snake[0].y>topLimit)
            head = {x: snake[0].x, y: snake[0].y - 1};
        else
            head = {x: snake[0].x, y: downLimit};
    }
    else if (direction == "D") {
        if(snake[0].y<downLimit)
            head = {x: snake[0].x, y: snake[0].y + 1};
        else
            head = {x: snake[0].x, y: topLimit};
    }

    snake.pop();
    snake.unshift(head);
    cleanScreen();
    draw(snake);

}

var blocSize=20;
var leftLimit=0;
var rightLimit=windowWidth/blocSize;
var topLimit=0;
var downLimit=windowHeight/blocSize;
var snake=[{x:2,y:2},{x:2,y:1},{x:1,y:1},{x:0,y:1},{x:0,y:0}];
var direction="R";
draw(snake);
listenKeyboard();

var kda=play;
setInterval(kda, 200);

