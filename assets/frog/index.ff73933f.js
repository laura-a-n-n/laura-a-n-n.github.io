function OpenLinear(){generalState.bg=gfx["bg-2"],generalState.bgScale=1,generalState.drawBackground=drawBackground,Object.assign(this,generalState),this.envFunction=linearEnvironment,this.particularSetup=function(){mgr.sfx.mayYourNightBeAtPeace.stop(),mgr.sfx.soso.loop(),player.assignQuest(FlyQuest),bugIndices=[];for(let e=0;e<10;e++)subtract=lilies.negativeLilies?25:-startLily,bugIndex=Math.floor(50*Math.random())-subtract,bugIndices.indexOf(bugIndex)<0&&bugIndex!=startLily&&(bugIndices.push(bugIndex),bugs.push(new Bug(lilies,gfx.fly,bugIndex)))}}
//# sourceMappingURL=index.ff73933f.js.map
