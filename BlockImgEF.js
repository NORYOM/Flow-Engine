function BlockImgEF(){
    Block.call(this);
    this.parentType = new Block();
    this.id = (new Date()).getTime()+Math.random();
    this.h=120;
    this.w=120;
    this.title="特效";
    this.titleColor = 'rgba(0,180,0,0.5)';

    var img = new Image();

    this.inPt = [new ParamPoint()];
    this.outPt = [new ParamPoint()];
    var imageView = new ImageView();

    var done = false;
    var oldImgSrc;
    this.doAction = function(){
        if(this.inPt[0].value){
            if(!oldImgSrc){
                oldImgSrc = this.inPt[0].value.src.substring(0,100);
            }else{
                if(oldImgSrc!=this.inPt[0].value.src.substring(0,100)){
                    done = false;
                    oldImgSrc = this.inPt[0].value.src.substring(0,100);
                }
            }
            if(!done){
                img = imageView.getImgClone(this.inPt[0].value,this.w*1.5,this.h*1.5);
                $AI(img).ps("复古").replace(img);
                done = true;
            }
        }else{
            done = false;
            img = null;
        }

        // make sure out value is the newest and will not lost
        this.outPt[0].value = img;
    };

    this.rend = function(){
        this.parentType.rend.call(this);

        // init image from input
        if(img){
            imageView.initImg(img,this.w*1.5,this.h*1.5);
        }else{
            imageView.clearImg();
        }

        // image view
        imageView.setPos(this.x+this.w/2-imageView.getW()/2,this.y+this.h/2-imageView.getH()/2);
        imageView.rend();
    };
}

