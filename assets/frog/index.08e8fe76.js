function CyclicFactorsPuzzle(){generalState.envFunction=cyclicEnvironment,generalState.bg=gfx.bg,generalState.drawBackground=function(){bgScale=2*screenSizeX/gfx.bg.width,image(generalState.bg,-gfx.bg.width/5,-bgScale*gfx.bg.height*.6,2*screenSizeX,bgScale*gfx.bg.height)},Object.assign(this,generalState),puzolsComplete=0,this.particularSetup=function(){puzzleMode=!0,lilies.sprite=gfx.lily,lilies.lilyScale=.5,lilies.radiusX=.18*screenSizeX,lilies.radiusY=.1*screenSizeY,lilies.lilyCenterX=.4*screenSizeX,lilies.lilyCenterY=.8*screenSizeY,player.specialLily=this.sceneArgs.specialLily,player.specialNumber=!0,player.numberColor=color(0),player.numOffsetY=50,player.numOffsetX=5,player.sizeSpecial=30,player.specialOffY=35,player.gui.cyclicMode=!0,frog=player.instantiateCharacter(),buttonPressed=!1,waitFrames=0,maxWaitFrames=4,levelFailed=!1,levelWon=!1,frog.type=0,controlsEnabled=!1,player.gui.initialize(this.sceneArgs.initVals),player.gui.calculate(),player.cam.guiOptions.helpLines=!1,player.gui.obj.quickFrog.draw=!0,player.specialOffX=player.character.environment.lilyDimX/3,cam.anchored=!0,lilies.negativeLilies=!1,lilies.lilySpacingX=80,bugs.push(new Bug(lilies,gfx.snail,this.sceneArgs.specialLily,.15,"snail")),bugs[0].posY-=bugs[0].dimY/3,bugs[0].isTouched=function(e){return this.lily%lilies.numLilies==e.lily}},this.resetLevel=function(){levelFailed=!1,buttonPressed=!1,waitFrames=0,frog=player.instantiateCharacter()},this.particularFrame=function(){frog.scale=.5,(levelFailed||levelWon)&&(frog.type=0,waitFrames+=deltaTime/1e3,waitFrames>maxWaitFrames&&(this.resetLevel(),levelWon&&mgr.showScene(FrogHeaven))),!levelFailed&&frog.lily>player.specialLily&&bugs.length>0?(controlsEnabled=!1,levelFailed=!0,frog.number+=frog.type,frog.drawType=!1):levelWon||0!=bugs.length||(player.specialNumber=!1,frog.number-=2*frog.type,frog.showHeart.push(1),levelWon=!0,puzolsComplete++,frog.drawType=!1)},this.particularDraw=function(){image(gfx.snail,5,0,.1*gfx.snail.width,.1*gfx.snail.height),text(puzolsComplete.toString(),15+.1*gfx.snail.width,.1*gfx.snail.height/2+10)}}
//# sourceMappingURL=index.08e8fe76.js.map
