class GUI{constructor(){this.initialize(),this.calculate(),this.cyclicMode=!1}initialize(t=[1,2,3,4]){this.init={},this.init.quickFrog={draw:!1,obj:{}};for(const[o,e]of Object.entries(["Q","W","E","R"])){const i=t[Number(o)];this.init.quickFrog.obj[e+"Button"]={frogBound:i,x:Number(o)/8+Number(o)/128,y:1/32,width:.125,aspect:"square",cornerRadius:25,image:gfx.button,fitImage:!0,imageScale:.95,stroke:color(0,0),color:color(0,0),textColor:"#000",textFont:pixelFont,textSize:32,textScaled:!0,text:"\n\n"+i.toString(),onOutside:function(){!buttonPressed&&puzzleMode&&(cursor("default"),this.image=gfx.button,this.stroke=color(0,0),this.color=color(0,0),this.imageScale=.95,this.y=screenSizeY/32,frog.type=0)},onHover:function(){!buttonPressed&&puzzleMode&&(cursor("grab"),this.image=gfx.buttonToggled,this.imageScale=.97,this.y=screenSizeY/64,frog.type=this.frogBound)},onPress:function(){!buttonPressed&&puzzleMode&&(buttonPressed=!0,frog.type=this.frogBound,this.stroke="rgba(100, 255, 100, 1)",this.color="rgba(100, 255, 100, 1)",this.imageScale=.98,controlsEnabled=!0)},extraDraw:function(){const t=2*PI/this.frogBound;for(let o=0;o<this.frogBound;o++){let e=this.x+this.width/5*(2.1+Math.cos(t*o)),i=this.y+this.width/5*(1.5+Math.sin(t*o));image(gfx.bby,e,i)}}}}this.init.buttons={draw:!1,obj:{inventoryButton:{x:1/64,y:1/32,width:1/24,aspect:"square",image:gfx.inventoryButton,fitImage:!0,text:"",onOutside:function(){this.color="#000"},onHover:function(){this.color="#222"},onRelease:function(){player.gui.obj.quickFrog.draw=!player.gui.obj.quickFrog.draw},extraDraw:function(){}}}}}calculate(){this.obj={};for(const[t,o]of Object.entries(this.init)){this.obj[t]={draw:o.draw,obj:{}};for(const[e,i]of Object.entries(o.obj))i.x*=screenSizeX,i.y*=screenSizeY,i.width*=screenSizeX,"square"==i.aspect?i.height=i.width:i.height*=screenSizeY,this.obj[t].obj[e]=new Clickable,Object.assign(this.obj[t].obj[e],i)}}draw(){for(const[t,o]of Object.entries(this.obj))if(o.draw)for(const[t,e]of Object.entries(o.obj))e.draw(),e.extraDraw()}}
//# sourceMappingURL=index.095a175a.js.map