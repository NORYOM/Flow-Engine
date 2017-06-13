function BlockDummy(canvas){
    Block.call(this, canvas);
    this.parentType = new Block(canvas);
    this.h=50;
    this.w=50;
    this.title="空白";
    this.titleColor = 'rgba(0,82,0,0.5)';

    this.inPt = [new ParamPoint(canvas)];
    this.outPt = [];
}

