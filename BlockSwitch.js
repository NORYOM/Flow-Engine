function BlockSwitch(canvas){
    BaseObj.call(this, canvas);
    this.prototype = new BaseObj(canvas);
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
    this.btnObj.onmousedown(e);
        this.prototype.onmousedown.call(this,e);
        
    };
    this.onmousedownOutPt = function(e){
        for(var i=0;i<this.outPt.length;i++){
            this.outPt[i].onmousedown(e);
        }
    };
    this.onmousemovewhendown = function(e){
        this.prototype.onmousemovewhendown.call(this,e);

        for(var i=0;i<this.inPt.length;i++){
            this.inPt[i].onmousemovewhendown(e);
        }
    };
    this.onmouseup = function(e){
        this.prototype.onmouseup.call(this,e);

        for(var i=0;i<this.inPt.length;i++){
            this.inPt[i].onmouseup(e);
        }
        for(var i=0;i<this.outPt.length;i++){
            this.outPt[i].onmouseup(e);
        }
        this.btnObj.onmouseup(e);
    };
    this.onmousemove = function(e){
        this.prototype.onmousemove.call(this,e);
        this.btnObj.onmousemove(e);
    };

    this.rend = function(ctx){
        this.prototype.rend.call(this,ctx);

/////////////////////////////////////////////// DEBUG
// add html element for input
        // layer.style.left = this.x+this.w-24 + "px";
        // layer.style.top = this.y+this.h + "px";
/////////////////////////////////////////////// 

        // in
        this.inPt[0].setPos(this.x-this.r,this.y+this.r);
        for(var i=0;i<this.inPt.length;i++){
            this.inPt[i].rend(ctx);
        }

        // out
        for(var i=0;i<this.outPt.length;i++){
            this.outPt[i].setPos(this.x+this.w+this.r,this.y+this.h-this.r*i);
            this.outPt[i].rend(ctx);
        }

        // button
        this.btnObj.setPos(this.x+this.w-this.r,this.y+this.r/2);
        this.btnObj.rend(ctx);
    };
}

