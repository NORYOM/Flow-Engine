function BlockImgFile(canvas){
    Block.call(this, canvas);
    this.parentType = new Block(canvas);
    this.id = (new Date()).getTime()+Math.random();
    this.h=120;
    this.w=120;
    this.title="Image File";
    this.titleColor = 'rgba(180,180,0,0.5)';

    var img = new Image();

    this.inPt = [];
    this.outPt = [new ParamPoint(canvas)];
    var imageView = new ImageView(canvas);

    this.btnObj = new Button(canvas);
    this.btnObj.label = "选择文件";
    this.btnObj.doAction = function(){
        var fileLoader = document.getElementById("loadFile"+fileId);
        // change file
        fileLoader.onchange = function(event) {
            var reader = new FileReader();
            // load file
            reader.onload = function(event){
                ////////// debug to see img
                //document.getElementById("loadedImg").src = event.target.result;
                //////////
                img.src = event.target.result;
                img.onload = function(){
                    imageView.initImg(img,borderW,borderH);
                };
            };
            reader.readAsDataURL(event.target.files[0]);
        };
        // open dialog for choose file
        fileLoader.click();
    };

/////////////////////////////////////////////// create file element
// add html element for input
     var fileLayer = document.createElement("div");
     var fileId = this.id;
     var borderW = this.w;
     var borderH = this.h;
     fileLayer.innerHTML = "<input type='file' id='loadFile"+fileId+"' hidden='true' accept='image/*'>";
     ///////// debug to see img
     //fileLayer.innerHTML += "<img id='loadedImg'>";
     //////////
     document.body.appendChild(fileLayer);
///////////////////////////////////////////////

    this.onmousedown = function(e){
        this.parentType.onmousedown.call(this,e);
        this.btnObj.onmousedown(e);
    };

    this.onmouseup = function(e){
        this.parentType.onmouseup.call(this,e);
        this.btnObj.onmouseup(e);
    };
    this.onmousemove = function(e){
        this.parentType.onmousemove.call(this,e);
        this.btnObj.onmousemove(e);
    };

    this.rend = function(ctx){
        this.parentType.rend.call(this,ctx);
        // button
        this.btnObj.setPos(this.x+this.r*5/4,this.y+this.r/2);
        this.btnObj.rend(ctx);

        // image view
        imageView.setPos(this.x+this.w/2-imageView.getW()/2,this.y+this.r/2+this.h/2-imageView.getH()/2);
        imageView.rend(ctx);
    };
}

