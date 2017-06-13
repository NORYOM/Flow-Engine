// for bg.js
var gridW = 20;
// for bg.js end
var cleanBgW;
var cleanBgH;

var objExclusiveLock = false;
var objArr = [];
var bezierArr = [];
var mouseInPanel = 0;

function initCanvas(canvasId,width,height){
	theCanvas = document.getElementById(canvasId);
	theCanvas.width = width + width/gridW;
	theCanvas.height = height + height/gridW;
	if(!theCanvas || !theCanvas.getContext){
		alert("not support canvas");
		return;
	}
	var context = theCanvas.getContext("2d");
	ctx = context;

	cleanBgW = width;
	cleanBgH = height;
	setInterval(render,1000/fps);
}

function addObj(){
	//var objTemp = new BaseObj(theCanvas);
	var objTemp = new Block(theCanvas);
	objTemp.setX(100);
	objTemp.setY(100);
	objTemp.priority = objArr.length;
	objArr.push(objTemp);
}
function addSwitchObj(){
	var objSwitch = new BlockSwitch(theCanvas);
	objSwitch.setX(100);
	objSwitch.setY(100);
	objSwitch.priority = objArr.length;
	objArr.push(objSwitch);
}
function addDummyObj(){
	var objDummy = new BlockDummy(theCanvas);
	objDummy.setX(100);
	objDummy.setY(100);
	objDummy.priority = objArr.length;
	objArr.push(objDummy);
}

function reOrder(){
	var tempPriority;
	for(var i=0;i<objArr.length;i++){
		for(var j=i;j<objArr.length-1;j++){
			if(objArr[i].priority>objArr[j+1].priority){
				tempPriority = objArr[i];
				objArr[i] = objArr[j+1];
				objArr[j+1] = tempPriority;
			}
		}
	}
}

var bezierTemp;
function clear(w,h){
	ctx.fillStyle = "#777777";
	ctx.fillRect(0,0,cleanBgW+gridW+w,cleanBgH+gridW+h);
}
function removeBezierFromList(bezier){
	for(var i=0;i<bezierArr.length;i++){
		if(bezier && bezier==bezierArr[i]){
			bezierArr.splice(i,1);
			break;
		}
	}
}
var mouseCanDrag = false;
function render(){
	clear(30,40);
	drawGrid(ctx,30,40);

	theCanvas.onmousedown = function(e){
		mouseInPanel = 0;
		// for block
		//for showing order, high priority will render first
    	for(var i=objArr.length-1;i>=0;i--){
    		if(!objExclusiveLock && objArr[i].isInArea(e.clientX,e.clientY)){
				objArr[i].onmousedown(e);
				objExclusiveLock = true;
    		}
    		mouseInPanel += objArr[i].isInArea(e.clientX,e.clientY)?1:0;
    		objArr[i].onmousedownOutPt(e);
    	}
    	//reorder showing order, high priority will render first
    	reOrder();

    	// for bezier
    	/*if(mouseInPanel==0){//mouse not in panel or on point can draw bezier, ONLY DEBUG
	    	bezierTemp = new Bezier(theCanvas);
	    	bezierTemp.startBezier(true);
	    	bezierTemp.onmousedown(e);
    	}*/

    	var bezierStarted = false;// check if start draw bezier to show color of inPoint when mouse over
    	for(var i=0;i<objArr.length;i++){
    		// in
    		for(var j=0;j<objArr[i].inPt.length;j++){
	    		if(objArr[i].inPt[j].isInParamPos(e.clientX,e.clientY)){
	    			bezierTemp = objArr[i].inPt[j].getLink();
	    			if(bezierTemp){
	    				objArr[i].inPt[j].setLink(null);
		    			objArr[i].inPt[j].removeLink();
		    			bezierTemp.setEndObj(null);
		    			bezierTemp.setStart(bezierTemp.getStart().x,bezierTemp.getStart().y);
		    			bezierTemp.startBezier(true);
		    			removeBezierFromList(bezierTemp);
		    			bezierStarted = true;
		    			break;
	    			}
	    		}
    		}
    		// out
    		for(var j=0;j<objArr[i].outPt.length;j++){
	    		if(objArr[i].outPt[j].isOutStart()){
	    			bezierTemp = new Bezier(theCanvas);
	    			objArr[i].outPt[j].addLink();
	    			bezierTemp.setStartObj(objArr[i].outPt[j]);
	    			bezierTemp.startBezier(true);
	    			bezierTemp.onmousedown(e);
	    			bezierStarted = true;
	    			break;
	    		}
    		}
    	}

    	// all in point ready for link(show color when mouse over)
		for(var i=0;i<objArr.length;i++){
			if(bezierStarted){
	    		for(var k=0;k<objArr[i].inPt.length;k++){
		    		objArr[i].inPt[k].readyForLink();
	    		}
			}
		}

		mouseCanDrag = true;
	};
	theCanvas.onmouseup = function(e){
		mouseCanDrag = false;
		theCanvas.onmousedown = null;
		theCanvas.onmousemove = null;
		objExclusiveLock = false;
    	for(var i=0;i<objArr.length;i++){
    		objArr[i].onmouseup(e);
    		// in
    		for(var j=0;j<objArr[i].inPt.length;j++){
    			objArr[i].inPt[j].holdForLink();
	    		if(objArr[i].inPt[j].isInParamPos(e.clientX,e.clientY)){
	    			if(bezierTemp){
	    				if(!objArr[i].inPt[j].getLink()){
		    				bezierTemp.setEndObj(objArr[i].inPt[j]);
		    				objArr[i].inPt[j].setLink(bezierTemp);
		    				objArr[i].inPt[j].addLink();
	    				}else{
	    					console.log("already occupied!");
	    				}
	    			}
	    		}
    		}
    	}
		if(bezierTemp){
			if(!bezierTemp.getEndObj()){
				// if bezier has no end point, remove start point
				(bezierTemp.getStartObj()).removeLink();
				bezierTemp.setStartObj(null);
				bezierTemp = null;
			}else{
				var existed = false;
				for(var i=0;i<bezierArr.length;i++){
					if(bezierTemp==bezierArr[i]){
						existed = true;
						bezierTemp = null;
						break;
					}
				}
				if(!existed){
					bezierArr.push(bezierTemp);
					bezierTemp = null;
				}
			}
		}
	};

	theCanvas.onmousemove = function (e){
        var e = e || window.event;

        // move on block
    	for(var i=0;i<objArr.length;i++){
    		objArr[i].onmousemove(e);
    	}

	    // for bezier
	    if(bezierTemp){
	    	bezierTemp.onmousemove(e);
	    }
		
		// for drag
	    if(mouseCanDrag){
	        // move block
	    	for(var i=0;i<objArr.length;i++){
	    		objArr[i].onmousemovewhendown(e);
	    	}

		    // for bezier
		    if(bezierTemp){
		    	bezierTemp.onmousemovewhendown(e);
		    }
	    }
    };

	// for bezier
	if(bezierTemp){
		bezierTemp.rend(ctx);
	}
	for(var i=0;i<bezierArr.length;i++){
		if(bezierTemp && bezierTemp==bezierArr[i]){
			continue;// already drawn, no need draw again
		}
		bezierArr[i].rend(ctx);
	}

	// move block
	for(var i=0;i<objArr.length;i++){
		objArr[i].rend(ctx);
	}
}