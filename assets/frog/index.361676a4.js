class Quest{constructor(s,e,t,i,a,h){this.assignee=s,this.initializer=e,this.handler=t,this.successHandler=i,this.questMessage=a,this.message=a,this.draw=h,this.success=!1,this.successHandled=!1,this.calcGUIBounds(),this.initializer()}calcGUIBounds(){this.questBoxPos=[screenSizeX-gfx.flyBar.width-5,1*screenSizeY/16],this.questBoxSize=[gfx.flyBar.width,screenSizeY/4],this.questBoxMargin=6,this.gui=new GUIWindow(...this.questBoxPos,...this.questBoxSize,this.questBoxMargin,"Quest",this.message)}frame(){return this.gui.message=this.message,this.success?this.successHandler():this.handler(),this.success}}class FlyQuest extends Quest{constructor(s){super(s,(function(){this.fliesEaten=0,this.needToEat=3,this.flyEaten=!1}),(function(){!this.flyEaten&&this.assignee.character.ateThisFrame&&"fly"==this.assignee.character.foodName?(this.flyEaten=!0,this.fliesEaten++):this.flyEaten&&!this.assignee.character.ateThisFrame&&(this.flyEaten=!1),this.fliesEaten>=this.needToEat&&(this.success=!0,this.successHandler()),this.message=this.questMessage+`\n${this.fliesEaten} / ${this.needToEat}`}),(function(){this.successHandled||(this.successHandled=!0,this.message="Blessed!",generalState.wizardAnim())}),"Eat 3 flies!",(function(s,e){for(let t=0;t<this.needToEat;t++)push(),translate(this.gui.x+this.gui.w/2-1.5*s.fly.width,this.gui.y+4*this.gui.h/5),tint(255,e*(.5+.5*(t<this.fliesEaten))),image(s.fly,s.fly.width*t,0),pop()}))}}class CrabQuest extends Quest{constructor(s){super(s,(function(){frog.type=2;let s=new Bug(lilies,gfx.crab,13,.2,"crab");s.edible=!1,bugs.push(s);let e=new Frog(lilies,gfx.frogStand,23,23);frogs.push(e),visibleFrogs.push(1)}),(function(){22==frog.lily&&frog.isJumping}),(function(){this.successHandled||(this.successHandled=!0,this.message="Blessed!",generalState.wizardAnim())}),"Find the crab.",(function(s,e){push(),translate(this.gui.x+this.gui.w/2-.3*s.crab.width/2,this.gui.y+1*this.gui.h/2),tint(255,e*(.5+.5*this.success)),image(s.crab,0,0,.3*s.crab.width,.3*s.crab.width),pop()}))}}
//# sourceMappingURL=index.361676a4.js.map