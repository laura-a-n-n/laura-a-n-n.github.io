function General(){this.particularSetup=function(){},this.particularFrame=function(){},this.particularDraw=function(){},this.setup=function(){gfx=this.sceneManager.gfx,sfx=this.sceneManager.sfx,pixelFont=this.sceneManager.pixelFont,frogShader=this.sceneManager.frogShader,hueVal=this.sceneManager.hueVal,satVal=this.sceneManager.satVal,valVal=this.sceneManager.valVal,mgr=this.sceneManager,calcWindowBounds(),this.envFunction(),envType=lilies.constructor.name,controlsEnabled=!0,buttonPressed=!1,puzzleMode=!1,createCanvas(screenSizeX,screenSizeY).parent("game-container"),fadeIn=255,fadingIn=!0,pg=createGraphics(gfx.bby.width,gfx.bby.height,WEBGL),pg.setAttributes("alpha",!0),this.particularSetup()},this.windowResized=function(){calcWindowBounds(),player.hasQuest&&player.questList[player.currentQuest].calcGUIBounds(),[cam.w,cam.h]=[screenSizeX,screenSizeY],resizeCanvas(screenSizeX,screenSizeY)},this.mouseClicked=function(e){!controlsEnabled||frog.isJumping||cl_lastClicked?player.quitReady&&window.location.reload():frog.jumpNextFrame=!0},this.keyPressed=function(){if(controlsEnabled){frog.isJumping||(keyCode==UP_ARROW?frog.type+=1:keyCode==DOWN_ARROW&&(frog.type-=1)),"y"==key?cam.toggleLock(frog):"u"==key?cam.anchored=!cam.anchored:"Escape"==key||"h"==key&&(cam.guiOptions.helpLines=!cam.guiOptions.helpLines);for(const e in player.binds)key==e.toLowerCase()&&player.binds[e]()}else player.quitReady&&window.location.reload()},this.mouseWheel=function(e){},this.frame=function(){if(player.frame(),!player.character.tooHungry){frogs.forEach((e=>e.frame(cam)));for(const e in bugs)bugs[e].frame(frogs),bugs[e].destroyed&&bugs.splice(e,1);cam.frame(),this.particularFrame()}},this.wizardAnim=function(){frog.type=0,frog.drawType=!1,controlsEnabled=!1,wizard=new Frog(lilies,gfx.frogStand,frog.number+3,frog.lily+3),wizard.pointingLeft=!0,wizard.isBby=!1,frogs.push(wizard),visibleFrogs=[0,1],wizard.jumpNextFrame=!0,sfx.soso.stop(),sfx.wizard.setVolume(.5),sfx.wizard.play(),wizard.special=function(){wizard.stoppedJumping&&wizard.number!=frog.number+1?wizard.jumpNextFrame=!0:wizard.number==frog.number+1&&(wizard.deleteSpecial(),wizard.drawSpecial=!0,wizard.specialFrames=0,wizard.specialDraw=function(){wizard.specialFrames+=deltaTime/1e3,image(gfx.alertBubble,gfx.alertBubble.width/2,0),wizard.specialFrames>5&&(sfx.toyTown.setVolume(.3),sfx.toyTown.loop(),mgr.showScene(FactorsPuzzle,{specialLily:9,initVals:[2,3,4,5]}))})}},this.draw=function(){this.frame(),this.drawBackground(this.bg),lilies.draw();for(const e of bugs)push(),camBugPos=cam.toCamCoords(e.posX,e.posY),translate(...camBugPos),image(e.sprite,0,0,cam.scale*e.dimX,cam.scale*e.dimY),pop();player.draw();for(const e of visibleFrogs)frogs[e].draw();fadingIn&&(background(0,fadeIn),fadeIn-=deltaTime/10,fadingIn=fadeIn>=0),this.particularDraw()}}generalState=new General;
//# sourceMappingURL=index.05f8f27f.js.map
