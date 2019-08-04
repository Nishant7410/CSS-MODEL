function Snake()
{
    this.x=0;
    this.y=0;
    this.xspeed=scale*1;
    this.yspeed=0;
    this.total=0;
    this.tail=[];
    this.draw=function()
    {
        ctx.fillStyle="#FFFFFF";
        for(let i=0;i<this.tail.length;i++)
            {
                ctx.fillRect(this.tail[i].x,this.tail[i].y,scale,scale);
                
            }
        ctx.fillRect(this.x,this.y,scale,scale);
    }
    this.update=function()
    {
        for(let i=0;i<this.tail.length-1;i++)
            {
                this.tail[i]=this.tail[i+1];
                
            }
        this.tail[this.total-1]={x:this.x,y:this.y};
        this.x+=this.xspeed;
        this.y+=this.yspeed;
        for(var j=0;j<this.tail.length;j++)
            if(this.x==this.tail[j].x&&this.y==this.tail[j].y)
                {
                    clearInterval(interval);
                    alert("Game over");
                }
        if(this.x>canvas.width)
            this.x=0;
        else if(this.y>canvas.height)
            this.y=0;
        else if(this.x<0)
            this.x=canvas.width;
        else if(this.y<0)
            this.y=canvas.height;
    }
    this.changedirection=function(direction)
    {
        console.log("move");
        switch(direction){
            case 'Up':
            this.xspeed=0;
            this.yspeed=-scale*1;
                break;
            case 'Down':
            this.xspeed=0;
            this.yspeed=scale*1;
                break;
            case 'Left':
            this.xspeed=-scale*1;
            this.yspeed=0;
                break;
            case 'Right':
            this.xspeed=scale*1;
            this.yspeed=0; 
                break;
        }
    }
    this.eat=function(fruit)
    {
        if(this.x==fruit.x&&this.y==fruit.y)
            {
            this.total++;
            score.innerHTML="Score: ";    
            score.append(this.total*5);    
            return true;
            }
        else
            return false;
    }
}