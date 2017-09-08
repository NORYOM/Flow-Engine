function BlockImgCurves(){
    Block.call(this);
    var cvs = canvas;

    var curvePadSize = 125;
    var curvePtSize = 10;

    this.parentType = new Block();
    this.id = (new Date()).getTime()+Math.random();
    this.h=curvePadSize+this.r;
    this.w=curvePadSize+this.r;
    this.title="Curves";
    this.titleColor = 'rgba(0,200,200,0.5)';

    this.inPt = [new ParamPoint()];
    this.outPt = [new ParamPoint()];

    var drag = false;
    var centX,centY,cpX1,cpY1,cpX2,cpY2,x3,y3;
    var ptS,ptE,ptC;

    this.onmousedown = function(e){
        this.parentType.onmousedown.call(this,e);

        drag = true;

        ptC.x = e.clientX-cvsRect.left*(cvs.width/cvsRect.width);
        ptC.y = e.clientY-cvsRect.top*(cvs.height/cvsRect.height);
    };

    this.onmouseup = function(e){
        this.parentType.onmouseup.call(this,e);
        drag = false;
    };
    this.onmousemove = function(e){
        this.parentType.onmousemove.call(this,e);
        centX = this.x+this.r/2+curvePadSize/2;
        centY = this.y+this.r/2+curvePadSize/2;
        if(drag){
            startDraw = true;
            ptC.x = e.clientX-cvsRect.left*(cvs.width/cvsRect.width);
            ptC.y = e.clientY-cvsRect.top*(cvs.height/cvsRect.height);
        }
    };

    this.rend = function(){
        this.parentType.rend.call(this);

        ptS = {
            x:this.x+this.r/2,
            y:this.y+this.r/2+curvePadSize
        };
        ptE = {
            x:this.x+this.r/2+curvePadSize,
            y:this.y+this.r/2
        };
        if(!ptC){
            ptC = {
                x:this.x+this.r/2+curvePadSize/2,
                y:this.y+this.r/2+curvePadSize/2
            };
        }

                cpX1 = ptS.x + (ptC.x-ptS.x)/4;
                cpY1 = ptS.y - (ptC.y-ptS.y)/4;
                cpX2 = ptC.x-curvePtSize;
                cpY2 = ptC.y+curvePtSize;

        ctx.save();

        ctx.lineWidth=1;
        ctx.fillStyle="#aaaaaa";
        ctx.fillRect(this.x+this.r/2,this.y+this.r/2,curvePadSize,curvePadSize);
        ctx.fillStyle="#ffffff";
        ctx.fillRect(ptC.x-2,ptC.y-2,2,2);

        ctx.beginPath();
        ctx.moveTo(ptS.x,ptS.y);
        ctx.bezierCurveTo(cpX1,cpY1,cpX2,cpY2,ptE.x,ptE.y);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    };
}

