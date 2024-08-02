class Quest{constructor(s,e,t,i,r,a){this.assignee=s,this.initializer=e,this.handler=t,this.successHandler=i,this.questMessage=r,this.message=r,this.draw=a,this.success=!1,this.successHandled=!1,this.tick=0,this.tickGoal=0,this.tickForceDebounce=!1,this.progress=0,this.calcGUIBounds(),this.initializer()}calcGUIBounds(){this.questBoxPos=[screenSizeX-gfx.flyBar.width-5,1*screenSizeY/16],this.questBoxSize=[gfx.flyBar.width,screenSizeY/4],this.questBoxMargin=6,this.gui=new GUIWindow(...this.questBoxPos,...this.questBoxSize,this.questBoxMargin,"Quest",this.message)}sleep(s,e=!1){return(this.tickGoal!=s||e&&!this.tickForceDebounce)&&(this.tick=0,this.tickGoal=s,this.tickForceDebounce=!0),this.tick<this.tickGoal?(this.tick+=deltaTime/1e3,!1):(this.tickForceDebounce=!1,!0)}frame(){return this.gui.message=this.message,this.success?this.successHandler():this.handler(),this.success}}class FlyQuest extends Quest{constructor(s){super(s,(function(){this.fliesEaten=0,this.needToEat=3,this.flyEaten=!1}),(function(){!this.flyEaten&&this.assignee.character.ateThisFrame&&"fly"==this.assignee.character.foodName?(this.flyEaten=!0,this.fliesEaten++):this.flyEaten&&!this.assignee.character.ateThisFrame&&(this.flyEaten=!1),this.fliesEaten>=this.needToEat&&(this.success=!0,this.successHandler()),this.message=this.questMessage+`\n${this.fliesEaten} / ${this.needToEat}`}),(function(){this.successHandled||(this.successHandled=!0,this.message="Blessed!",generalState.wizardAnim())}),"Eat 3 flies!",(function(s,e){for(let t=0;t<this.needToEat;t++)push(),translate(this.gui.x+this.gui.w/2-1.5*s.fly.width,this.gui.y+4*this.gui.h/5),tint(255,e*(.5+.5*(t<this.fliesEaten))),image(s.fly,s.fly.width*t,0),pop()}))}}class CrabQuest extends Quest{constructor(s){super(s,(function(){frog.type=2;let s=new Bug(lilies,gfx.crab,13,.2,"crab");s.edible=!1,bugs.push(s),this.crab=s;let e=new Frog(lilies,gfx.frogStand,23,23);frogs.push(e),this.wizard=e,visibleFrogs.push(1),this.given=!1,this.vignette=createGraphics(screenSizeX,screenSizeY),this.vignette.fill(255,0),this.vignette.stroke(255,0),this.vignetteSize=400,this.vignetteFunction=function(){let s=player.questList[player.currentQuest],e=s.vignette,t=s.midpoint;s.ctr+=deltaTime/2e3,push(),e.background(0,255*s.ctr),e.erase(),e.circle(t.x,t.y,s.vignetteSize),e.noErase(),image(e,0,0),pop()},lilies.lilyBounds=[-22,22]}),(function(){switch(13!=frog.lily||frog.isJumping||(this.progress=2),this.progress){case 0:if(22==frog.lily&&!frog.isJumping&&!this.given){controlsEnabled=!1,player.cam.guiOptions.helpLines=!1,this.given=!0,this.wizard.pointingLeft=!0,this.ctr=0;let s=this.wizard.lastCamFrogPos;s=createVector(...s);let e=frog.lastCamFrogPos;e=createVector(...e),this.midpoint=p5.Vector.add(s,e),this.midpoint.div(2),mgr.scene.oScene.particularDraw=this.vignetteFunction}this.given&&this.sleep(5)&&(this.wizard.type--,this.wizard.sprite=gfx.bby,this.wizard.jumpOverride=!0,this.wizard.jumpNextFrame=!0,frog.type++,this.progress++,controlsEnabled=!0,player.cam.guiOptions.helpLines=!0),Math.abs(frog.lily-this.crab.lily)<2&&(this.message="...crab?");break;case 1:if(!this.sleep(2))return;mgr.scene.oScene.particularDraw=function(){};break;case 2:player.cam.guiOptions.helpLines=!1,controlsEnabled=!1,frog.type=1,frog.pointingLeft=!0,frog.jumpNextFrame=!0,this.progress++;break;case 3:if(frog.type=3,frog.pointingLeft=!1,!frog.isJumping){let s=cam.toCamCoords(this.crab.posX,this.crab.posY);s=createVector(...s);let e=frog.lastCamFrogPos;e=createVector(...e),this.midpoint=p5.Vector.add(s,e),this.midpoint.div(2),this.crabPos=s,this.vignetteSize=500,mgr.scene.oScene.particularDraw=function(){let s=player.questList[player.currentQuest];s.vignetteFunction(),image(gfx.alertBubble,s.crabPos.x+gfx.alertBubble.width/2,s.crabPos.y)},this.progress++}break;case 4:if(!this.sleep(2.1))return;this.progress++;break;case 5:mgr.scene.oScene.particularDraw=function(){},player.cam.guiOptions.helpLines=!0,controlsEnabled=!0,this.success=!0}}),(function(){this.successHandled||(this.successHandled=!0,this.message="Crab get!",this.crab.destroyed=!0)}),"Find the crab.",(function(s,e){push(),translate(this.gui.x+this.gui.w/2-.3*s.crab.width/2,this.gui.y+1*this.gui.h/2),tint(255,e*(.5+.5*this.success)),image(s.crab,0,0,.3*s.crab.width,.3*s.crab.width),pop()}))}}
//# sourceMappingURL=index.aaa081ba.js.map
