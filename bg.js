function drawGrid(ctx,width,height){
	ctx.save();
	for(var i=0;i<height;i++){
		for(var j=0;j<width;j++){
			ctx.fillStyle = "#999999";
			ctx.fillRect(i*(gridW+1),j*(gridW+1),gridW,gridW);
		}
	}
	ctx.restore();
}