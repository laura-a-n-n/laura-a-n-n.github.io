function Menu(){this.setup=function(){gfx=this.sceneManager.gfx,pixelFont=this.sceneManager.pixelFont,calcWindowBounds(),bgRatio=screenSizeX/gfx.menuBg.width,bgScale=2,trajX=1,trajY=1,locX=gfx.menuBg.width/3,locY=gfx.menuBg.height/3,globalOpacity=0,nothingDt=4,countTime=0,exiting=!1,displayFrogress=!1,bugsN=5,bugsX=Array(bugsN).fill(0),bugsY=Array(bugsN).fill(0),bugsTX=Array(bugsN).fill(1),bugsTY=Array(bugsN).fill(-1),beeSprite=Array(bugsN);for(let e=0;e<bugsN;e++)bugsX[e]=Math.floor(Math.random()*screenSizeX),bugsY[e]=Math.floor(Math.random()*screenSizeY),bugsTX[e]=Math.random()>.5?1:-1,bugsTY[e]=Math.random()>.5?1:-1;createCanvas(screenSizeX,screenSizeY).parent("game-container")},this.windowResized=function(){calcWindowBounds(),imX=screenSizeX,imY=bgRatio*gfx.menuBg.height,resizeCanvas(screenSizeX,screenSizeY)},this.goToFade=function(){exiting=!0},this.goToGame=function(){this.sceneManager.showScene(OpenLinear,{step:0})},this.mouseClicked=this.goToFade,this.keyPressed=this.goToFade,this.frame=function(){locX+=trajX*Math.ceil(deltaTime/1e3),locY+=trajY*Math.ceil(deltaTime/2e3),imX=screenSizeX,imY=bgRatio*gfx.menuBg.height,locX+bgScale*imX>gfx.menuBg.width?trajX=-1:locX<=0&&(trajX=1),locY+bgScale*imY>gfx.menuBg.height?trajY=-1:locY<=0&&(trajY=1);for(let e=0;e<bugsN;e++)bugsX[e]+=bugsTX[e],bugsY[e]+=bugsTY[e],bugsX[e]>screenSizeX?bugsTX[e]=-1:bugsX[e]<0&&(bugsTX[e]=1),bugsY[e]>screenSizeY?bugsTY[e]=-1:bugsY[e]<0&&(bugsTY[e]=1),beeSprite[e]=1==bugsTX[e]?"beeRight":"beeLeft";exiting&&(globalOpacity+=deltaTime/10,globalOpacity>=255&&(countTime+=deltaTime/1e3,displayFrogress=!0,countTime>=nothingDt&&this.goToGame()))},this.draw=function(){this.frame(),bg=gfx.menuBg.get(locX,locY,bgScale*imX,bgScale*imY),image(bg,0,0,imX,imY);for(let e=0;e<bugsN;e++)push(),scale(.1),translate(bugsX[e]/.1,bugsY[e]/.1),image(gfx[beeSprite[e]],0,0),pop();stroke(255),fill(255),textFont(pixelFont),push(),textSize(128),text("Frog World",1.8*screenSizeX/7,screenSizeY/6),pop(),push(),textSize(64),strokeWeight(1),c=color(255,127+127*Math.sin(frameCount/50)),fill(c),stroke(c),text("begin?",4*screenSizeX/5,3*screenSizeY/4),pop(),textSize(32),text("lead artist: kyle lynn",5,screenSizeY-48),text("developer/frog artist: laura ann",5,screenSizeY-16),background(0,globalOpacity),displayFrogress&&(image(gfx.snail,screenSizeX*(2*countTime/nothingDt-.1)-gfx.snail.width/2,screenSizeY/2-gfx.snail.height/2),text("Loading in frogress...",screenSizeX/2-gfx.snail.width/2-20,screenSizeY/2+gfx.snail.height/2+20))}}
//# sourceMappingURL=index.4b9f8caa.js.map
