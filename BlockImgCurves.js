function BlockImgCurves(){
    Block.call(this);
    var cvs = canvas;

    var curvePadSize = 127;
    var curvePtSize = 10;
    var controlPtSize = 5;

    this.parentType = new Block();
    this.id = (new Date()).getTime()+Math.random();
    this.h=curvePadSize+this.r;
    this.w=curvePadSize+this.r;
    this.title="Curves";
    this.titleColor = 'rgba(0,200,200,0.5)';

    this.inPt = [new ParamPoint()];
    this.outPt = [new ParamPoint()];

    var drag = false;
    var dragTitle = false;
    var mx,my,dx,dy;
    var ptS,ptE,ptC;

    this.isInPadW = function(e){
        mx = e.clientX-cvsRect.left*(cvs.width/cvsRect.width);
        if(mx>=this.x+this.r/2+controlPtSize/2 && mx<=this.x+this.r/2+curvePadSize-controlPtSize/2){
            return true;
        }
        return false;
    };
    this.isInPadH = function(e){
        my = e.clientY-cvsRect.top*(cvs.height/cvsRect.height);
        if(my>=this.y+this.r/2+controlPtSize/2 && my<=this.y+this.r/2+curvePadSize-controlPtSize/2){
            return true;
        }
        return false;
    };
    this.onmousedown = function(e){
        this.parentType.onmousedown.call(this,e);
        if(!this.isInTitleBar(e.clientX,e.clientY)){
            if(this.isInPadW(e) && this.isInPadH(e)){
                drag = true;
                ptC.x = e.clientX-cvsRect.left*(cvs.width/cvsRect.width);
                ptC.y = e.clientY-cvsRect.top*(cvs.height/cvsRect.height);
            }
        }else{
            dragTitle = true;
            dx = e.clientX - ptC.x;
            dy = e.clientY - ptC.y;
        }
    };

    this.onmouseup = function(e){
        this.parentType.onmouseup.call(this,e);
        drag = false;
        dragTitle = false;
    };
    this.onmousemove = function(e){
        this.parentType.onmousemove.call(this,e);
        if(drag){
            if(this.isInPadW(e)){
                ptC.x = e.clientX-cvsRect.left*(cvs.width/cvsRect.width);
                if(ptC.x<this.x+this.r/2+controlPtSize){
                    ptC.x = this.x+this.r/2+controlPtSize;
                }
                if(ptC.x>this.x+this.r/2+curvePadSize-controlPtSize){
                    ptC.x = this.x+this.r/2+curvePadSize-controlPtSize;
                }
            }
            if(this.isInPadH(e)){
                ptC.y = e.clientY-cvsRect.top*(cvs.height/cvsRect.height);
                if(ptC.y<this.y+this.r/2+controlPtSize){
                    ptC.y = this.y+this.r/2+controlPtSize;
                }
                if(ptC.y>this.y+this.r/2+curvePadSize-controlPtSize){
                    ptC.y = this.y+this.r/2+curvePadSize-controlPtSize;
                }
            }
        }
        if(dragTitle){
            ptC.x = e.clientX - dx;
            ptC.y = e.clientY - dy;
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

        ctx.save();

        ctx.lineWidth=1;
        ctx.fillStyle="#aaaaaa";
        ctx.fillRect(this.x+this.r/2,this.y+this.r/2,curvePadSize,curvePadSize);

        ctx.beginPath();
        ctx.moveTo(ptS.x,ptS.y);
        ctx.bezierCurveTo(ptS.x,ptS.y,
                          ptC.x-curvePtSize,ptC.y+curvePtSize,
                          ptC.x,ptC.y);
        ctx.bezierCurveTo(ptC.x+curvePtSize,ptC.y-curvePtSize,
                          ptE.x,ptE.y,
                          ptE.x,ptE.y);
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle="#ffff77";
        ctx.fillRect(ptC.x-controlPtSize/2,ptC.y-controlPtSize/2,controlPtSize,controlPtSize);
        ctx.restore();
    };
}

