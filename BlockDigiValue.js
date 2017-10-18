function BlockDigiValue(){// single effect
    Block.call(this);
    this.parentType = new Block();
    this.id = (new Date()).getTime()+Math.random();
    this.h=90;
    this.w=120;
    this.title="数值";
    this.titleColor = 'rgba(20,20,20,0.5)';

    this.inPt = [];
    this.outPt = [new ParamPoint()];

    var n1 = 0;
    var n2 = 0;
    var n3 = 0;
    var dn1 = new DigiNum();
    var dn2 = new DigiNum();
    var dn3 = new DigiNum();

    dn1.colorOn = "#66ff99";
    dn2.colorOn = "#66ff99";
    dn3.colorOn = "#66ff99";

    var btn1Add = new Button();
    var btn1Del = new Button();
    var btn2Add = new Button();
    var btn2Del = new Button();
    var btn3Add = new Button();
    var btn3Del = new Button();

    btn1Add.label = "+";
    btn1Del.label = "-";
    btn2Add.label = "+";
    btn2Del.label = "-";
    btn3Add.label = "+";
    btn3Del.label = "-";

    btn1Add.doAction = function(){
        n1++;
        if(n1>9){n1 = 0;}
    };
    btn1Del.doAction = function(){
        n1--;
        if(n1<0){n1 = 9;}
    };
    btn2Add.doAction = function(){
        n2++;
        if(n2>9){n2 = 0;}
    };
    btn2Del.doAction = function(){
        n2--;
        if(n2<0){n2 = 9;}
    };
    btn3Add.doAction = function(){
        n3++;
        if(n3>9){n3 = 0;}
    };
    btn3Del.doAction = function(){
        n3--;
        if(n3<0){n3 = 9;}
    };

    this.doAction = function(){
        dn1.setNum(n1);
        dn2.setNum(n2);
        dn3.setNum(n3);
        this.outPt[0].value = n1*100+n2*10+n3;
    };

    this.onmousedown = function(e){
        this.parentType.onmousedown.call(this,e);
        btn1Add.onmousedown(e);
        btn1Del.onmousedown(e);
        btn2Add.onmousedown(e);
        btn2Del.onmousedown(e);
        btn3Add.onmousedown(e);
        btn3Del.onmousedown(e);
    };
    this.onmousemove = function(e){
        this.parentType.onmousemove.call(this,e);
        btn1Add.onmousemove(e);
        btn1Del.onmousemove(e);
        btn2Add.onmousemove(e);
        btn2Del.onmousemove(e);
        btn3Add.onmousemove(e);
        btn3Del.onmousemove(e);
    };
    this.onmouseup = function(e){
        this.parentType.onmouseup.call(this,e);
        btn1Add.onmouseup(e);
        btn1Del.onmouseup(e);
        btn2Add.onmouseup(e);
        btn2Del.onmouseup(e);
        btn3Add.onmouseup(e);
        btn3Del.onmouseup(e);
    };

    this.rend = function(){
        this.parentType.rend.call(this);
        var ox = this.x+this.w/3-dn1.getWidth()-9;
        var oy = this.y+dn1.getHeight()/2;

        // 1
        dn1.x = ox;
        dn1.y = oy;
        // button
        btn1Add.setPos(dn1.x-btn1Del.w,oy+dn1.getHeight()+btn1Add.h);
        btn1Add.rend();
        btn1Del.setPos(dn1.x+btn1Add.w*2,oy+dn1.getHeight()+btn1Del.h);
        btn1Del.rend();

        // 2
        dn2.x = this.x+this.w/3+dn1.getWidth()-3;
        dn2.y = this.y+dn2.getHeight()/2;
        // button
        btn2Add.setPos(dn2.x-btn2Del.w,oy+dn2.getHeight()+btn2Add.h);
        btn2Add.rend();
        btn2Del.setPos(dn2.x+btn2Add.w*2,oy+dn2.getHeight()+btn2Del.h);
        btn2Del.rend();

        // 3
        dn3.x = this.x+this.w/3+dn1.getWidth()+dn2.getWidth()*2+6;
        dn3.y = this.y+dn3.getHeight()/2;
        // button
        btn3Add.setPos(dn3.x-btn2Del.w,oy+dn3.getHeight()+btn3Add.h);
        btn3Add.rend();
        btn3Del.setPos(dn3.x+btn2Add.w*2,oy+dn3.getHeight()+btn3Del.h);
        btn3Del.rend();

        dn1.rend();
        dn2.rend();
        dn3.rend();



    };
}

