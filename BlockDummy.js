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
}

