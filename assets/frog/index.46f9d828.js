class GUI{constructor(){this.initialize(),this.calculate(),this.cyclicMode=!1}initialize(t=[1,2,3,4]){this.init={},this.init.quickFrog={draw:!1,obj:{}};for(const[e,o]of Object.entries(["Q","W","E","R"])){const i=t[Number(e)];this.init.quickFrog.obj[o+"Button"]={frogBound:i,x:Number(e)/8+Number(e)/128,y:1/32,width:.125,aspect:"square",cornerRadius:25,image:gfx.button,fitImage:!0,imageScale:.95,stroke:color(0,0),color:color(0,0),textColor:"#000",textFont:pixelFont,textSize:32,textScaled:!0,text:"\n\n"+i.toString(),onOutside:function(){let t=mouseY<this.y||mouseY>2*this.y+this.height;(mouseX<this.x||mouseX>this.x+this.width||t)&&!buttonPressed&&puzzleMode&&(cursor("default"),this.image=gfx.button,this.stroke=color(0,0),this.color=color(0,0),this.imageScale=.95,this.y=screenSizeY/32,frog.type=0)},onHover:function(){!buttonPressed&&puzzleMode&&(cursor("grab"),this.image=gfx.buttonToggled,this.imageScale=.97,this.y=screenSizeY/64,frog.type=this.frogBound)},onPress:function(){!buttonPressed&&puzzleMode&&(buttonPressed=!0,frog.type=this.frogBound,this.stroke="rgba(100, 255, 100, 1)",this.color="rgba(100, 255, 100, 1)",this.imageScale=.98,controlsEnabled=!0)},extraDraw:function(){const t=2*PI/this.frogBound;for(let e=0;e<this.frogBound;e++){let o=this.x+this.width/5*(2.1+Math.cos(t*e)),i=this.y+this.width/5*(1.5+Math.sin(t*e));image(gfx.bby,o,i)}}}}this.init.buttons={draw:!1,obj:{inventoryButton:{x:1/64,y:1/32,width:1/24,aspect:"square",image:gfx.inventoryButton,fitImage:!0,text:"",onOutside:function(){this.color="#000"},onHover:function(){this.color="#222"},onRelease:function(){player.gui.obj.quickFrog.draw=!player.gui.obj.quickFrog.draw},extraDraw:function(){}}}}}calculate(){this.obj={};for(const[t,e]of Object.entries(this.init)){this.obj[t]={draw:e.draw,obj:{}};for(const[o,i]of Object.entries(e.obj))i.x*=screenSizeX,i.y*=screenSizeY,i.width*=screenSizeX,"square"==i.aspect?i.height=i.width:i.height*=screenSizeY,this.obj[t].obj[o]=new Clickable,Object.assign(this.obj[t].obj[o],i)}}draw(){for(const[t,e]of Object.entries(this.obj))if(e.draw)for(const[t,o]of Object.entries(e.obj))o.draw(),o.extraDraw()}}
//# sourceMappingURL=index.46f9d828.js.map