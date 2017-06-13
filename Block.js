function Block(canvas){
    BaseObj.call(this, canvas);
    this.prototype = new BaseObj(canvas);
    this.h=100;

    this.inPt = [new ParamPoint(canvas),new ParamPoint(canvas)];
    this.outPt = [new ParamPoint(canvas),new ParamPoint(canvas)];

    this.onmousedown = function(e){
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
    };
    this.onmousemove = function(e){
        this.prototype.onmousemove.call(this,e);
    };

    this.rend = function(ctx){
        this.prototype.rend.call(this,ctx);

        // in
        this.inPt[0].setPos(this.x-this.r,this.y+this.r);
        this.inPt[1].setPos(this.x-this.r,this.y+this.h);
        for(var i=0;i<this.inPt.length;i++){
            this.inPt[i].rend(ctx);
        }

        // out
        this.outPt[0].setPos(this.x+this.w+this.r,this.y+this.h-this.r);
        this.outPt[1].setPos(this.x+this.w+this.r,this.y+this.h);
        for(var i=0;i<this.outPt.length;i++){
            this.outPt[i].rend(ctx);
        }
    };
}

