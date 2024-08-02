function CharacterSelect(){this.setup=function(){gfx=this.sceneManager.gfx,pixelFont=this.sceneManager.pixelFont,frogShader=this.sceneManager.frogShader,mgr=this.sceneManager,calcWindowBounds(),globalOpacity=0,nothingDt=4,countTime=0,exiting=!1,displayFrogress=!1,imScale=2,pg=createGraphics(imScale*gfx.bby.width,imScale*gfx.bby.height,WEBGL),pg.setAttributes("alpha",!0),hueSlider=createSlider(-.8,.8,0,.01),hueSlider.center(),hueSlider.position(hueSlider.position().x,screenSizeY/2-10),hueSlider.addClass("slider"),satSlider=createSlider(-.8,.8,0,.01),satSlider.position(hueSlider.position().x,screenSizeY/2+20),satSlider.addClass("slider"),valSlider=createSlider(-.8,.8,0,.01),valSlider.position(hueSlider.position().x,screenSizeY/2+50),valSlider.addClass("slider"),goButton=new Clickable,goButton.locate(screenSizeX/2-58,screenSizeY/2+70),goButton.onOutside=function(){this.color="#0a0"},goButton.onHover=function(){this.color="#0f0"},goButton.onRelease=this.goToFade,goButton.text="✓",goButton.textColor="#fff",goButton.width=128,goButton.height=screenSizeY/32,createCanvas(screenSizeX,screenSizeY)},this.windowResized=function(){calcWindowBounds(),resizeCanvas(screenSizeX,screenSizeY)},this.goToFade=function(){exiting||(mgr.hueVal=hueSlider.value(),mgr.satVal=satSlider.value(),mgr.valVal=valSlider.value()),exiting=!0},this.goToGame=function(){this.sceneManager.showScene(OpenLinear)},this.frame=function(){exiting&&(globalOpacity+=deltaTime/10,globalOpacity>=255&&(countTime+=deltaTime/1e3,countTime>=nothingDt&&this.goToGame()))},this.draw=function(){this.frame(),background(0),push(),fill(50),stroke(50),rect(screenSizeX/3,screenSizeY/3,screenSizeX/3,screenSizeY/3,10,10,10,10),pop(),push(),pg.shader(frogShader),frogShader.setUniform("tex0",gfx.bbyBody),frogShader.setUniform("hueVal",hueSlider.value()),frogShader.setUniform("satVal",satSlider.value()),frogShader.setUniform("valVal",valSlider.value()),pg.rect(0,0,imScale*gfx.bby.width,imScale*gfx.bby.height),image(pg,screenSizeX/2-imScale*gfx.bby.width/3,2*screenSizeY/5),image(gfx.bbyFrame,screenSizeX/2-imScale*gfx.bby.width/3,2*screenSizeY/5,2*gfx.bby.width,2*gfx.bby.height),pop(),goButton.draw(),hueSlider.style("opacity",(1-globalOpacity/255).toString()),satSlider.style("opacity",(1-globalOpacity/255).toString()),valSlider.style("opacity",(1-globalOpacity/255).toString()),background(0,globalOpacity)}}
//# sourceMappingURL=index.d95c2443.js.map
