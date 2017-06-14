function BlockSwitch(canvas){
    Block.call(this, canvas);
    this.parentType = new Block(canvas);
    this.id = (new Date()).getTime()+Math.random();
    this.h=70;
    this.w=150;
    this.title="Switch";
    this.titleColor = 'rgba(80,0,0,0.5)';

    this.inPt = [new ParamPoint(canvas)];
    this.outPt = [new ParamPoint(canvas),new ParamPoint(canvas),new ParamPoint(canvas)];
    this.btnObj = new Button(canvas);
    this.btnObj.doAction = function(){
        console.log("button down");
    };

/////////////////////////////////////////////// DEBUG
// add html element for input
    // var layer = document.createElement("div");
    // layer.style.border = "solid 1px red";
    // layer.style.position = "absolute";
    //     layer.style.width = 24 + "px";
    //     layer.style.height = 12 + "px";
    //     layer.style.color = "#00ff00";
    //     layer.innerHTML = "<select><option>-1-</option><option>-2-</option></select>";
    // //layer.style.left = this.x+this.w + "px";
    // //layer.style.top = this.y+this.h + "px";
    // document.body.appendChild(layer);
///////////////////////////////////////////////

    this.onmousedown = function(e){
        this.parentType.onmousedown.call(this,e);
        this.btnObj.onmousedown(e);
    };

    this.onmouseup = function(e){
        this.parentType.onmouseup.call(this,e);
        this.btnObj.onmouseup(e);
    };
    this.onmousemove = function(e){
        this.parentType.onmousemove.call(this,e);
        this.btnObj.onmousemove(e);
    };

    this.rend = function(ctx){
        this.parentType.rend.call(this,ctx);
        // button
        this.btnObj.setPos(this.x+this.w-this.r,this.y+this.r/2);
        this.btnObj.rend(ctx);
    };
}

