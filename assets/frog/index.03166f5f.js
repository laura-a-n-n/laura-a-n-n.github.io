class Player{constructor(t,s){this.cam=t,this.characterProfile=[],this.characterClass=s,this.mouseMode="split",this.pointingLeft=!1,this.inventory={},this.initQuests(),this.gui=new GUI,this.numberColor=color(255),this.numOffsetY=70,this.numOffsetX=0,this.drawNumberBelow=!0,this.specialNumber=!1,this.specialLily=0,this.sizeSpecial=40,this.specialOffX=30,this.specialOffY=80,this.isFading=!1,this.fadeFrames=0,this.fadeTime=3}get hasQuest(){return this.currentQuest>-1}instantiateCharacter(t=0){return this.character=new this.characterClass(...this.characterProfile),this.character.scale=this.cam.scale,frogs[t]=this.character,this.binds={Q:this.character.typeBind(1),W:this.character.typeBind(2),E:this.character.typeBind(3),R:this.character.typeBind(4)},this.character}resetCharacter(){this.instantiateCharacter(),this.initQuests(),this.cam.target=this.character}assignQuest(t){this.questList.push(new t(player)),this.currentQuest=0}initQuests(){this.questList=[],this.currentQuest=-1,this.questDecayFrames=0,this.maxQuestFrames=100}frame(){const t=this.cam.toCamCoords(this.character.posX,this.character.posY);if(this.pointingLeft=mouseX<t[0],this.character.environment.envDependentFrame(this),this.hasQuest&&(this.questList[this.currentQuest].frame()&&this.questDecayFrames++,this.questDecayFrames>0&&this.questDecayFrames++,this.questDecayFrames>this.maxQuestFrames&&(this.questDecayFrames=0,this.questList.slice(this.currentQuest,1),this.currentQuest=-1)),this.character.tooHungry&&!this.isFading){controlsEnabled=!1,this.cam.guiOptions.helpLines=!1,this.isFading=!0,this.bugsN=4,this.bugsX=Array(this.bugsN).fill(0),this.bugsY=Array(this.bugsN).fill(0),this.bugsTX=Array(this.bugsN).fill(1),this.bugsTY=Array(this.bugsN).fill(-1),this.beeSprite=Array(this.bugsN);for(let t=0;t<this.bugsN;t++)this.bugsX[t]=Math.floor(Math.random()*screenSizeX),this.bugsY[t]=Math.floor(Math.random()*screenSizeY),this.bugsTX[t]=Math.random()>.5?1:-1,this.bugsTY[t]=Math.random()>.5?1:-1}if(this.isFading&&this.fadeFrames<this.fadeTime&&(this.fadeFrames+=deltaTime/1e3,this.character.posY+=10,this.quitReady=!0),this.isFading)for(let t=0;t<this.bugsN;t++){this.bugsX[t]+=this.bugsTX[t],this.bugsY[t]+=this.bugsTY[t],this.bugsX[t]>screenSizeX?this.bugsTX[t]=-1:this.bugsX[t]<0&&(this.bugsTX[t]=1),this.bugsY[t]>screenSizeY?this.bugsTY[t]=-1:this.bugsY[t]<0&&(this.bugsTY[t]=1);let s=Math.floor(frameCount/60)%2==0?"smallBee":"smallBeeWing",e=1==this.bugsTX[t]?"Right":"Left";this.beeSprite[t]=s+e}}drawHunger(){const t=this.cam.toCamCoords(this.character.posX,this.character.posY),s=gfx.flyBar.width,e=gfx.flyBar.height,i=1-frog.hunger/frog.maxHunger;fill(0),stroke(0),frog.hungry&&(push(),tint(255,255*Math.cos(2*frameCount/60)),image(gfx.flyBubble,t[0]+frog.dimX,t[1]-frog.dimY,gfx.flyBubble.width*cam.scale,gfx.flyBubble.height*cam.scale),pop()),frog.ateThisFrame&&frog.showHeart.push(1);for(const s in frog.showHeart)frog.showHeart[s]>0?(frog.showHeart[s]++,image(gfx.heart,t[0]+frog.dimX,t[1]-frog.dimY-frog.showHeart[s]/2,gfx.heart.width*cam.scale,gfx.heart.height*cam.scale),frog.showHeart[s]%=frog.heartFrames):frog.showHeart.splice(s,1);if(push(),translate(screenSizeX-gfx.flyBar.width-5,10),fill(255),stroke(0),rect(-5,-10,s+10,e+20,20),image(gfx.flyBarGrey,0,0),i*s>=1){const t=gfx.flyBar.get(0,0,Math.floor(i*s),e);image(t,0,0)}pop()}drawQuest(t){const s=255*(1-this.questDecayFrames/this.maxQuestFrames);t.gui.draw(s),push(),t.draw(gfx,s),pop()}draw(){if(push(),this.gui.draw(),this.character.tooHungry){let t=this.fadeFrames/this.fadeTime;background(0,255*t),push(),translate(screenSizeX/2,0);let s=color(255,255*Math.pow(t,8));fill(s),stroke(s),textSize(64),textAlign(CENTER),textFont(pixelFont),text("Oh dear! :(",0,screenSizeY/5),text("You're too hungry.",0,screenSizeY/3),textSize(32),text("Crab says it's okay! Try again later?",0,screenSizeY/2+1.25*gfx.crab.height),text("Click to restart the demo...",0,screenSizeY-32),tint(255,255*t),image(gfx.crab,-gfx.crab.width/2,screenSizeY/2),pop(),push(),this.fadeFrames<this.fadeTime&&tint(255,255*t),scale(.25);for(let t=0;t<this.bugsN;t++)image(gfx[this.beeSprite[t]],this.bugsX[t]/.25,this.bugsY[t]/.25);pop()}if(this.drawHunger(),this.currentQuest>-1&&this.drawQuest(this.questList[this.currentQuest]),this.character.scale=this.cam.scale,this.cam.guiOptions.helpLines&&lilies.frogWithinBounds()&&0!=this.character.type){if(!this.character.isJumping||puzzleMode&&!buttonPressed){let t,s;"CyclicLilies"==envType?(t=1,s=this.character.dimY/2-this.character.offY):(t=this.character.pointingLeft?-1:1,s=0);let e=this.character.posX+this.character.dimX/2,i=lilies.getLilyPos(this.character.lily+t*this.character.type),r=i[0]+this.character.dimX/2+this.character.offX,a=i[1]+this.character.offY,h=this.character.posY<a?this.character.posY:a;this.curveParams=[e,this.character.posY+this.character.dimY/2,(e+r)/2,h-this.character.jumpHeight+this.character.dimY/2+s,r,a+this.character.dimY]}const t=[];for(let s=0;s<3;s++){let e=[this.curveParams[2*s],this.curveParams[2*s+1]];[t[2*s],t[2*s+1]]=this.cam.toCamCoords(...e)}const s=[t];push(),setLineDash([5,5]),stroke(255,128),strokeWeight(3),fill(0,0,0,0);let e=!0;for(const t of s){switch(envType){case"LinearLilies":case"CyclicLilies":beginShape(),curveVertex(t[0],t[1]),curveVertex(t[0],t[1]),curveVertex(t[2],t[3]),curveVertex(t[4],t[5]),curveVertex(t[4],t[5]),endShape()}e&&(strokeWeight(7*this.cam.scale),point(t[4],t[5]))}pop()}if(!this.character.tooHungry){if(push(),this.character.changeNumber&&(this.numText=str(this.character.number),this.lilyCamDiff=this.character.lilyPos,this.lilyCamDiff[0]+=this.character.dimX/2+this.numOffsetX,this.character.changeNumber=!1),textFont(pixelFont),stroke(this.numberColor),fill(this.numberColor),textSize(this.sizeSpecial*this.cam.scale*.9),push(),textAlign(CENTER),this.drawNumberBelow&&text(this.numText,...this.cam.toCamCoords(this.lilyCamDiff[0],this.lilyCamDiff[1]+this.numOffsetY*this.cam.scale)),pop(),this.specialNumber){let t=this.cam.toCamCoords(...this.character.environment.getLilyPos(this.specialLily));t[0]+=this.specialOffX-2*this.specialLily.toString().length,t[1]+=this.specialOffY*cam.scale,text(this.specialLily.toString(),...t)}pop()}}}
//# sourceMappingURL=index.03166f5f.js.map
