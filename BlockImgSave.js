function BlockImgSave(){
    Block.call(this);
    this.parentType = new Block();
    this.id = (new Date()).getTime()+Math.random();
    this.h=50;
    this.w=100;
    this.title="保存";
    this.titleColor = 'rgba(200,0,0,0.5)';

    this.inPt = [new ParamPoint()];
    this.outPt = [];
    this.btnPng = new Button();
    this.btnPng.label = "保存新图片";
    this.btnPng.doAction = function(){
        asyncFunc.then(() => {
            decodeOperation();
            saveImg();
        });
    };

    var imageView = new ImageView();
    var img;
    var done = false;
    var opArr;
    var saveCvs;
    var saveLnk;

    var asyncFunc = new Promise((resolve, reject) => {
        resolve();
    });
    this.doAction = function(){
        if(this.inPt[0].value){
            opArr = this.inPt[0].operation;
        }else{
            opArr = null;
        }
    };

    function decodeOperation(){
        if(opArr){
            for(var i=0;i<opArr.length;i++){
                if(opArr[i].type=="src"){
                    img = opArr[i].value;
                }
                if(img){
                    if(opArr[i].type=="ps"){
                        $AI(img).ps(opArr[i].value).replace(img);
                    }
                    if(opArr[i].type=="act"){
                        var act = opArr[i].value;
                        if(act){
                            if(act.action=="curve"){
                                $AI(img).act("curve",act.param[0],act.param[1]).replace(img);
                            }
                        }
                    }
                }
            }
        }else{
            img = null;
        }
    }

    function saveImg(){
        if(img){
            if(!saveCvs){
                saveCvs = document.createElement("canvas");
            }
            saveCvs.width = img.width;
            saveCvs.height = img.height;
            saveCvs.getContext("2d").clearRect(0,0,img.width,img.height);
            saveCvs.getContext("2d").drawImage(img,0,0,img.width,img.height);
            if(!saveLnk){
                saveLnk = document.createElement("a");
                saveLnk.download = "新图片.jpg";
                var saveImg = document.createElement("img");
                saveImg.src = saveCvs.toDataURL("image/jpeg");
                if(saveImg.width==0 || saveImg.height==0){
                    saveLnk.href = img.src;
                    saveLnk.target = "_blank";
                }else{
                    saveLnk.href = saveCvs.toDataURL("image/jpeg").replace("image/jpeg",'image/octet-stream');
                }
                saveLnk.click();
                saveLnk.remove();
                saveLnk = null;
            }
        }else{
            console.log("no image can save");
        }
    }

    this.onmousedown = function(e){
        this.parentType.onmousedown.call(this,e);
        this.btnPng.onmousedown(e);
    };

    this.onmouseup = function(e){
        this.parentType.onmouseup.call(this,e);
        this.btnPng.onmouseup(e);
    };
    this.onmousemove = function(e){
        this.parentType.onmousemove.call(this,e);
        this.btnPng.onmousemove(e);
    };
    this.rend = function(){
        this.parentType.rend.call(this);
        // button
        this.btnPng.setPos(this.x+this.r,this.y+this.r/2);
        this.btnPng.rend();
    };
}

