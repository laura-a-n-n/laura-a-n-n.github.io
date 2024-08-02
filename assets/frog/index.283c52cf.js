class Frog{constructor(t,i,s,e,h,r,n=1){this.environment=t,this.sprite=i,this.scale=n,this.isBby=!0,this.type=1,this.number=s,this.lily=e,this.startLily=e,this.changeNumber=!0,this.hunger=0,this.hungry=!1,this.jumpHungerCost=2,this.frameHungerCost=.001,this.minHunger=0,this.maxHunger=100,this.hungerWarning=.2,this.tooHungry=!1,this.ateThisFrame=!1,this.foodName="",this.showHeart=[],this.heartFrames=60,this.animLilyNumber=e,this.drawType=!0,this.isJumping=!1,this.stoppedJumping=!1,this.jumpNextFrame=!1,this.jumpFrames=0,this.baseJumpFrames=40,this.baseJumpStore=80,this.baseJumpHeight=80,this.jumpTime=80,this.levelWon=!1,[h,r]=this.environment.getLilyPos(e),this.posX=h+this.offX,this.posY=r+this.offY,this.lilyPos=[this.posX,this.posY],this.velX=0,this.velY=0,this.pointingLeft=!1,this.direction=1}get dimX(){return this.sprite.width*this.scale}get dimY(){return this.sprite.height*this.scale}get offX(){return-this.dimX/2+this.environment.lilyDimX/2}get offY(){return-this.dimY+this.scale*this.environment.lilyDimY/2}get maxJumpFrames(){return this.baseJumpFrames+Math.floor(Math.abs(this.type)/5)}get travelDist(){return this.type*this.direction}get jumpProgress(){return this.jumpFrames/this.maxJumpFrames}get jumpHeight(){return this.scale*this.baseJumpHeight}get jumpY(){return 4*this.jumpHeight*this.jumpProgress*(this.jumpProgress-1)}get canJump(){return this.hunger+this.jumpHungerCost>this.maxHunger?(this.hunger+=this.jumpHungerCost,!1):this.jumpOverride||!this.isJumping&&this.envCondition("jump")&&(!this.levelWon||0==this.type)}get canEat(){return!this.isJumping&&!this.ateThisFrame}envCondition(t){return this.environment.envCondition(this,t)}typeBind(t){return()=>this.type=t}linearJump(){this.posX=lerp(this.jumpStartX,this.jumpDestX,this.jumpProgress),this.posY=lerp(this.jumpStartY,this.jumpDestY,this.jumpProgress),this.posY+=this.jumpY}jump(){if(this.canJump){this.isJumping=!0,this.jumpStartX=this.posX,this.jumpStartY=this.posY;let t=this.environment.getLilyPos(this.lily);this.jumpDestX=t[0]+this.offX,this.jumpDestY=t[1]+this.offY,this.hunger+=this.jumpHungerCost,"LinearLilies"==this.environment.constructor.name&&-1==this.direction?mgr.sfx.hopLeft.play():mgr.sfx.hop.play()}}special(){this.drawSpecial=!1}deleteSpecial(){this.special=function(){}}frame(t){if(this.special(),this.jumpNextFrame&&(this.jump(),this.jumpNextFrame=!1),this.isJumping){if(this.jumpFrames+=this.jumpTime*deltaTime/1e3,this.jumpFrames=Math.min(this.jumpFrames,this.maxJumpFrames),this.isBby){let t=Math.floor(10*this.jumpProgress)%10;gfx["bbySpritesheet"+t.toString()]=gfx.bbySpritesheet.get(24*t,0,24,24),this.sprite=gfx["bbySpritesheet"+t.toString()]}this.environment.envJump(this)}else!snailPuzzle&&controlsEnabled&&keyIsDown(UP_ARROW)&&frameCount%16==0?this.type++:!snailPuzzle&&controlsEnabled&&keyIsDown(DOWN_ARROW)&&frameCount%16==0&&this.type--;this.jumpFrames==this.maxJumpFrames&&(this.environment.envJumpEnd(this),this.jumpFrames=0,this.stoppedJumping=!0,this.isJumping=!1,lilies.kerplunkAnim(this.lily)),this.isJumping||(this.lilyPos=[this.posX,this.posY],this.changeNumber=!0),this.ateThisFrame=!1,this.foodName="",this.hunger<this.maxHunger?this.hunger+=this.frameHungerCost:(this.tooHungry=!0,controlsEnabled=!1),this.hunger=clamp(this.hunger,this.minHunger,this.maxHunger),this.hunger>(1-this.hungerWarning)*this.maxHunger?this.hungry=!0:this.hungry=!1}draw(){const t=cam.toCamCoords(this.posX,this.posY,!0,!1);this.lastCamFrogPos=t,push(),translate(t[0],t[1]),this.drawType&&(push(),stroke(player.numberColor),fill(player.numberColor),textFont(pixelFont),textSize(24),scale(cam.scale),text(this.type,.5*this.dimX,-20),pop()),applyMatrix(this.pointingLeft?-1:1,0,0,1,this.pointingLeft?this.dimX:0,0),image(this.sprite,0,0,this.dimX,this.dimY),this.drawSpecial&&this.specialDraw(),pop()}}
//# sourceMappingURL=index.283c52cf.js.map
