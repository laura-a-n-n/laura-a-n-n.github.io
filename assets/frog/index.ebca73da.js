function FactorsPuzzle(){this.envFunction=linearEnvironment,generalState.bg=gfx.bg,generalState.drawBackground=function(){bgScale=screenSizeX/gfx.bg.width,image(generalState.bg,0,-bgScale*gfx.bg.height*.225,screenSizeX,bgScale*gfx.bg.height)},generalState.song=sfx.toyTown,generalState.songVol=.3,Object.assign(this,generalState),puzolsComplete=0,this.particularSetup=function(){puzzleMode=!0,player.specialLily=this.sceneArgs.specialLily,player.specialNumber=!0,player.numberColor=color(0),player.numOffsetX=.2*frog.dimX,player.numOffsetY=78,player.drawNumberBelow=!0,buttonPressed=!1,waitFrames=0,maxWaitFrames=4,levelFailed=!1,levelWon=!1,frog.levelWon=!1,frog.type=0,controlsEnabled=!1,player.gui.initialize(this.sceneArgs.initVals),player.gui.calculate(),player.gui.obj.quickFrog.draw=!0,player.specialOffX=player.character.environment.lilyDimX/4,player.specialOffY=68,cam.scale=cam.minScale,cam.targetOffsetX=6*cam.w/13,cam.toggleLock(frog),cam.anchored=!0,cam.toggleLock(frog),lilies.negativeLilies=!1,lilies.lilySpacingX=80,bugs.push(new Bug(lilies,gfx.snail,this.sceneArgs.specialLily,.2,"snail"))},this.resetLevel=function(){levelFailed=!1,buttonPressed=!1,waitFrames=0,lastHunger=frog.hunger,frog=player.instantiateCharacter(),frog.hunger=lastHunger},this.particularFrame=function(){(levelFailed||levelWon)&&(frog.type=0,waitFrames+=deltaTime/1e3,waitFrames>maxWaitFrames&&(this.resetLevel(),levelWon&&(puzolsComplete>1?mgr.showScene(CyclicFactorsPuzzle,{specialLily:9,initVals:[2,3,4,5]}):(this.sceneArgs.specialLily=12,this.sceneArgs.initVals=[5,7,8,6],this.particularSetup())))),!levelFailed&&frog.lily>player.specialLily&&bugs.length>0?(controlsEnabled=!1,levelFailed=!0,frog.drawType=!1):levelWon||0!=bugs.length||(frog.type=0,frog.levelWon=!0,player.drawNumberBelow=!1,frog.showHeart.push(1),levelWon=!0,puzolsComplete++,frog.drawType=!1)},this.particularDraw=function(){image(gfx.snail,5,0,.1*gfx.snail.width,.1*gfx.snail.height),text(puzolsComplete.toString(),15+.1*gfx.snail.width,.1*gfx.snail.height/2+10)}}
//# sourceMappingURL=index.ebca73da.js.map
