function BlockDummy(){
    Block.call(this);
    this.parentType = new Block();
    this.id = (new Date()).getTime()+Math.random();
    this.h=50;
    this.w=50;
    this.title="空白";
    this.titleColor = 'rgba(0,82,0,0.5)';

    this.inPt = [new ParamPoint()];
    this.outPt = [];

    var sel = new Selector();
    for(var i=0;i<5;i++){
        sel.addOption(i+2,"测试"+i+2);
    }
    sel.setDefaultOption(4);
    sel.setEvtName("selChanged-"+this.id);

    this.onmousemove = function(e){
        this.parentType.onmousemove.call(this,e);
        sel.onmousemove(e);
    };
    this.passEvent = function(e){
        this.parentType.onmousedown.call(this,e);
        sel.onmousedown(e);
    }

    this.rend = function(){
        this.parentType.rend.call(this);

        sel.setPos(this.x,this.y+this.h-20);
        sel.rend();
    };
}

