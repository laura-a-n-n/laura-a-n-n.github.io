function Menu(){this.setup=function(){calcWindowBounds(),mgr=this.sceneManager,gfx=mgr.gfx,pixelFont=mgr.pixelFont,controlsEnabled=!1,puzzleMode=!1,snailPuzzle=!1,muted=!1,levelFailed=!1,levelWon=!1,buttonPressed=!1,tempPlayer=new Player,bgRatio=screenSizeX/gfx.bgMenu.width,bgScale=2,trajX=.5,trajY=.5,locX=-500,locY=-500,globalOpacity=0,nothingDt=4,countTime=0,exiting=!1,displayFrogress=!1,startTime=millis(),bugsN=5,bugsX=Array(bugsN).fill(0),bugsY=Array(bugsN).fill(0),bugsTX=Array(bugsN).fill(1),bugsTY=Array(bugsN).fill(-1),beeSprite=Array(bugsN);for(let e=0;e<bugsN;e++)bugsX[e]=Math.floor(Math.random()*screenSizeX),bugsY[e]=Math.floor(Math.random()*screenSizeY),bugsTX[e]=Math.random()>.5?1:-1,bugsTY[e]=Math.random()>.5?1:-1;createCanvas(screenSizeX,screenSizeY).parent("game-container"),imX=screenSizeX,imY=bgRatio*gfx.bgMenu.height,mgr.prop.song.setVolume(mgr.prop.musicVol),mgr.prop.song.loop()},this.windowResized=function(){calcWindowBounds(),imX=screenSizeX,imY=bgRatio*gfx.bgMenu.height,resizeCanvas(screenSizeX,screenSizeY)},this.goToFade=function(){"undefined"!=typeof startTime&&millis()-startTime>1e3&&!cl_lastClicked&&(exiting=!0)},this.goToGame=function(){this.sceneManager.showScene(OpenLinear,{step:0})},this.mouseClicked=this.goToFade,this.keyPressed=this.goToFade,this.frame=function(){[velX,velY]=[trajX,trajY],[destX,destY]=[locX+velX,locY+velY],destX>=0||destX<=.24*-gfx.bgMenu.width?trajX*=-1:locX=destX,destY>=0||destY<=-gfx.bgMenu.height/4?trajY*=-1:locY=destY;for(let e=0;e<bugsN;e++)bugsX[e]+=bugsTX[e],bugsY[e]+=bugsTY[e],bugsX[e]>screenSizeX?bugsTX[e]=-1:bugsX[e]<0&&(bugsTX[e]=1),bugsY[e]>screenSizeY?bugsTY[e]=-1:bugsY[e]<0&&(bugsTY[e]=1),beeSprite[e]=1==bugsTX[e]?"beeRight":"beeLeft";exiting&&(globalOpacity+=deltaTime/10,globalOpacity>=255&&(countTime+=deltaTime/1e3,displayFrogress=!0,countTime>=nothingDt&&this.goToGame()))},this.draw=function(){this.frame(),background(0),isMobile?(bg=gfx.bgMenu.get(0,0,gfx.bgMenu.width,gfx.bgMenu.height),image(bg,0,0,imX,imY)):image(gfx.bgMenu,locX,locY,.5*gfx.bgMenu.width,.5*gfx.bgMenu.height);for(let e=0;e<bugsN;e++)push(),scale(.1),translate(bugsX[e]/.1,bugsY[e]/.1),image(gfx[beeSprite[e]],0,0),pop();tempPlayer.gui.draw(),stroke(255),fill(255),textFont(pixelFont),push(),textSize(128),text("Frog World",1.8*screenSizeX/7,screenSizeY/6),pop(),push(),textSize(64),strokeWeight(1),c=color(255,127+127*Math.sin(frameCount/50)),fill(c),stroke(c),text("begin?",4*screenSizeX/5,3*screenSizeY/4),pop(),textSize(32),text("lead artist: kyle lynn",5,screenSizeY-48),text("developer/frog artist: laura ann",5,screenSizeY-16),background(0,globalOpacity),displayFrogress&&(image(gfx.snail,screenSizeX*(2*countTime/nothingDt-.1)-gfx.snail.width/2,screenSizeY/2-gfx.snail.height/2),text("Loading in frogress...",screenSizeX/2-gfx.snail.width/2-20,screenSizeY/2+gfx.snail.height/2+20))}}
//# sourceMappingURL=index.7e380748.js.map
