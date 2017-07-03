function ImageView(canvas){
    var ctx = canvas.getContext("2d");
    this.x = 0;
    this.y = 0;
    this.img = null;
    this.imgData = null;

    var w = 10;
    var h = 10;

    this.setX = function(n){
        this.x = n;
    };
    this.setY = function(n){
        this.y = n;
    };
    this.setPos = function(x,y){
        this.x = x;
        this.y = y;
    };
    this.getW = function(){
        return w;
    };
    this.getH = function(){
        return h;
    };
    this.initImg = function(imgObj, borderW, borderH){
        this.img = imgObj;

        w = this.img.width;
        h = this.img.height;
        if(w>h){
            while(w>=borderW*0.7){
                w *= 0.9;
                h *= 0.9;
            }
        }else{
            while(h>=borderH*0.7){
                w *= 0.9;
                h *= 0.9;
            }
        }
    };

    this.rend = function(){
        if(this.img){
            ctx.save();
            ctx.drawImage(this.img, this.x, this.y, w, h);
            if(!this.imgData){
                this.imgData = ctx.getImageData(this.x, this.y, w, h);
            }
            ctx.restore();
        }
    };
}

