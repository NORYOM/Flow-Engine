function BlockDummy(canvas){
    BaseObj.call(this, canvas);
    this.prototype = new BaseObj(canvas);
    this.h=50;
    this.w=50;
    this.title="空白";
    this.titleColor = 'rgba(0,82,0,0.5)';

    this.inPt = [new ParamPoint(canvas)];
    this.outPt = [];

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
        for(var i=0;i<this.inPt.length;i++){
            this.inPt[i].rend(ctx);
        }

        // out
        for(var i=0;i<this.outPt.length;i++){
            this.outPt[i].rend(ctx);
        }
    };
}

