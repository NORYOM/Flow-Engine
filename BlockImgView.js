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

    var oldImgSrc;
    var imgChanged = false;
    this.doAction = function(){
        this.outPt[0].value = this.inPt[0].value;

        // init image from input
        if(this.inPt[0].value && this.inPt[0].value.src){
            if(!oldImgSrc){
                imgChanged = true;
            }else{
                if(oldImgSrc!=this.inPt[0].value.src.substring(0,100)){
                    imgChanged = true;
                }
            }
            if(imgChanged){
                oldImgSrc = this.inPt[0].value.src.substring(0,100);
                imageView.initImg(this.inPt[0].value,this.w*1.5,this.h*1.5);
                imgChanged = false;
            }
        }else{
            imageView.clearImg();
        }
    };

    this.rend = function(){
        this.parentType.rend.call(this);

        // image view
        imageView.setPos(this.x+this.w/2-imageView.getW()/2,this.y+this.h/2-imageView.getH()/2);
        imageView.rend();
    };
}

