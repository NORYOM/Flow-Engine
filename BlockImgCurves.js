function BlockImgCurves(){
    Block.call(this);
    var cvs = canvas;

    var curvePadSize = 127;
    var curvePtDistance = 10;
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
    var mx,my;
    var dx = [],dy = [];
    var ptS,ptE,ptC;
    var currentPtCNum;
    var dragPt = false;

    this.btnAddCtlPt = new Button();
    this.btnDelCtlPt = new Button();
    this.btnAddCtlPt.label = "+";
    this.btnDelCtlPt.label = "-";
    var addCtlPt = false;
    var delCtlPt = false;
    this.btnAddCtlPt.doAction = function(){
        addCtlPt = true;
    };
    this.btnDelCtlPt.doAction = function(){
        delCtlPt = true;
    };

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
    this.isInControlPt = function(ctlPt,ex,ey){
        var tempX = ex-cvsRect.left*(cvs.width/cvsRect.width);
        var tempY = ey-cvsRect.top*(cvs.height/cvsRect.height);
        if(tempX>=ctlPt.x-controlPtSize/2 && tempX<=ctlPt.x+controlPtSize/2 &&
           tempY>=ctlPt.y-controlPtSize/2 && tempY<=ctlPt.y+controlPtSize/2){
            return true;
        }
        return false;
    };

    this.onmousedown = function(e){
        this.parentType.onmousedown.call(this,e);
        this.btnAddCtlPt.onmousedown(e);
        this.btnDelCtlPt.onmousedown(e);
        if(!this.isInTitleBar(e.clientX,e.clientY)){
            if(this.isInPadW(e) && this.isInPadH(e)){
                drag = true;
                for(var i=0;i<ptC.length;i++){
                    if(this.isInControlPt(ptC[i],e.clientX,e.clientY)){
                        ptC[i].x = e.clientX-cvsRect.left*(cvs.width/cvsRect.width);
                        ptC[i].y = e.clientY-cvsRect.top*(cvs.height/cvsRect.height);
                        currentPtCNum = i;
                        dragPt = true;
                        break;
                    }
                }
            }
        }else{
            dragTitle = true;
            for(var i=0;i<ptC.length;i++){
                dx[i] = e.clientX - ptC[i].x;
                dy[i] = e.clientY - ptC[i].y;
            }
        }
    };
    this.onmouseup = function(e){
        this.parentType.onmouseup.call(this,e);
        this.btnAddCtlPt.onmouseup(e);
        this.btnDelCtlPt.onmouseup(e);
        drag = false;
        dragTitle = false;
        dragPt = false;
    };
    this.onmousemove = function(e){
        this.parentType.onmousemove.call(this,e);
        this.btnAddCtlPt.onmousemove(e);
        this.btnDelCtlPt.onmousemove(e);
        if(drag){
            if(dragPt){
                if(this.isInPadW(e)){
                    ptC[currentPtCNum].x = e.clientX-cvsRect.left*(cvs.width/cvsRect.width);
                    if(ptC[currentPtCNum].x<this.x+this.r/2+controlPtSize){
                        ptC[currentPtCNum].x = this.x+this.r/2+controlPtSize;
                    }
                    if(ptC[currentPtCNum].x>this.x+this.r/2+curvePadSize-controlPtSize){
                        ptC[currentPtCNum].x = this.x+this.r/2+curvePadSize-controlPtSize;
                    }
                }
                if(this.isInPadH(e)){
                    ptC[currentPtCNum].y = e.clientY-cvsRect.top*(cvs.height/cvsRect.height);
                    if(ptC[currentPtCNum].y<this.y+this.r/2+controlPtSize){
                        ptC[currentPtCNum].y = this.y+this.r/2+controlPtSize;
                    }
                    if(ptC[currentPtCNum].y>this.y+this.r/2+curvePadSize-controlPtSize){
                        ptC[currentPtCNum].y = this.y+this.r/2+curvePadSize-controlPtSize;
                    }
                }
            }
        }
        if(dragTitle){
            for(var i=0;i<ptC.length;i++){
                ptC[i].x = e.clientX - dx[i];
                ptC[i].y = e.clientY - dy[i];
            }
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
            ptC = [
                {
                    x:this.x+this.r/2+curvePadSize/2,
                    y:this.y+this.r/2+curvePadSize/2
                }
            ];
        }
        if(addCtlPt){
            addCtlPt = false;
            ptC.push(
                {
                    x:this.x+this.r/2+curvePadSize/2,
                    y:this.y+this.r/2+curvePadSize/2
                }
            );
            currentPtCNum = ptC.length-1;
        }
        if(delCtlPt){
            delCtlPt = false;
            ptC.splice(ptC.length-1,1);
            currentPtCNum = ptC.length-1;
        }

        ctx.save();

        ctx.lineWidth=1;
        ctx.fillStyle="#aaaaaa";
        ctx.fillRect(this.x+this.r/2,this.y+this.r/2,curvePadSize,curvePadSize);

        ctx.beginPath();
        ctx.moveTo(ptS.x,ptS.y);
        for(var i=0;i<ptC.length;i++){
            if(i==0){
                ctx.bezierCurveTo(ptS.x+curvePtDistance,ptS.y-curvePtDistance,
                                  ptC[0].x-curvePtDistance,ptC[0].y+curvePtDistance,
                                  ptC[0].x,ptC[0].y);
            }
            if(i!=ptC.length-1 && ptC.length>1){
                ctx.bezierCurveTo(ptC[i].x+curvePtDistance,ptC[i].y-curvePtDistance,
                              ptC[i+1].x-curvePtDistance,ptC[i+1].y+curvePtDistance,
                              ptC[i+1].x,ptC[i+1].y);
            }
            if(i==ptC.length-1){
                ctx.bezierCurveTo(ptC[ptC.length-1].x+curvePtDistance,ptC[ptC.length-1].y-curvePtDistance,
                          ptE.x-curvePtDistance,ptE.y+curvePtDistance,
                          ptE.x,ptE.y);
            }
        }
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle="#999977";
        for(var i=0;i<ptC.length;i++){
            ctx.strokeRect(ptC[i].x-controlPtSize/2,ptC[i].y-controlPtSize/2,controlPtSize,controlPtSize);
        }
        ctx.fillStyle="#ffff77";
        if(ptC.length>0){
            if(ptC.length==1){
                currentPtCNum = 0;
            }
            ctx.fillRect(ptC[currentPtCNum].x-controlPtSize/2,ptC[currentPtCNum].y-controlPtSize/2,controlPtSize,controlPtSize);
        }
        ctx.restore();

        // add button
        this.btnAddCtlPt.setPos(this.x+this.w-this.r*2,this.y+this.h);
        this.btnAddCtlPt.rend();
        this.btnDelCtlPt.setPos(this.x+this.w-this.r,this.y+this.h);
        this.btnDelCtlPt.rend();
    };
}

