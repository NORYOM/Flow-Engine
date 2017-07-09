function BlockImgView(){
    Block.call(this);
    this.parentType = new Block();
    this.id = (new Date()).getTime()+Math.random();
    this.h=120;
    this.w=120;
    this.title="预览";
    this.titleColor = 'rgba(0,0,180,0.5)';

    var img = new Image();

    this.inPt = [new ParamPoint()];
    this.outPt = [new ParamPoint()];
    var imageView = new ImageView();

    this.doAction = function(){
        this.outPt[0].value = this.inPt[0].value;
    };

    this.rend = function(){
        this.parentType.rend.call(this);

        // init image from input
        if(this.inPt[0].value){
            imageView.showImg(this.inPt[0].value,this.w*1.5,this.h*1.5);
        }else{
            imageView.clearImg();
        }

        // image view
        imageView.setPos(this.x+this.w/2-imageView.getW()/2,this.y+this.h/2-imageView.getH()/2);
        imageView.rend();
    };
}

