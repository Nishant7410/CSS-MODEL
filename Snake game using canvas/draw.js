var canvas=document.querySelector('.mycanvas');
var  ctx=canvas.getContext('2d');
var scale=10;
var row=canvas.height/scale;
var col=canvas.width/scale;
var snake;
var fruit;
var interval,x=150;
var pause=true;
var score=document.querySelector('#score');
var mypause=document.querySelector('#mypause');
(function setup(){
    snake =new Snake();
    fruit=new Fruit();
    fruit.piclocation();
    start();
    function start()
    {
    interval=window.setInterval(()=>{
        ctx.clearRect(0,0,canvas.width,canvas.height);
        fruit.draw();
        snake.update();
        snake.draw();
        if(snake.eat(fruit))
            fruit.piclocation();
    },x)}
    window.addEventListener('keydown',((e)=>{
    if(e.keyCode==32)
        {
            if(pause)
                {
                    clearInterval(interval);
                    pause=false;
                    score.setAttribute("style","display:none");
                    mypause.setAttribute("style","display:block");
                }
            else
                {
                pause=true;
                score.setAttribute("style","display:block");
                mypause.setAttribute("style","display:none");    
                start();    
                }
        }
    else{
    const dir=e.key.replace('Arrow','');
    snake.changedirection(dir);
    }
}));
}());
