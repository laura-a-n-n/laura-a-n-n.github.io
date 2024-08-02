const assets="/assets/frog/assets",gfxNames=["frog-stand","water","lily","lily-down","lily-up","fly","bee-left","bee-right","snail","crab","small-bee-left","small-bee-wing-left","small-bee-right","small-bee-wing-right","fly-bar","fly-bar-grey","fly-bubble","alert-bubble","heart","alt-frog-stand","bby","bby-body","bby-frame","quest-box","inventory-button","button","button-toggled","sound-off","sound-on","speaker","speaker-off","bg","bg-2","bg-3","menu-bg","palms"],gfxSheets=["bby-spritesheet"],sfxNames=["may-your-night-be-at-peace.mp3","wizard.wav","soso.mp3","toy-town.mp3","the-moon.mp3","heart.wav","hop.wav","hop-left.wav","tick.wav"];let gfx={},sfx={};function preload(){for(const e of gfxNames){const t=camelizeDashes(e);gfx[t]=loadImage(`${assets}/img/${e}.png`)}for(const e of gfxSheets){camelizeDashes(e);const t=loadImage(`${assets}/img/${e}.png`);gfx.bbySpritesheet=t}pixelFont=loadFont(`${assets}/font/VT323-Regular.ttf`),frogShader=loadShader(`${assets}/shader/frog.vert`,`${assets}/shader/frog.frag`);for(const e of sfxNames){const t=camelizeDashes(e.slice(0,-4));sfx[t]=loadSound(`${assets}/sfx/${e}`)}sfx.hop.setVolume(.7)}function outerHeight(e){const t=e.offsetHeight,n=window.getComputedStyle(e);return["top","bottom"].map((e=>parseInt(n[`margin-${e}`]))).reduce(((e,t)=>e+t),t)}function calcWindowBounds(){const e=document.getElementsByTagName("header")[0],t=(document.getElementById("game-container"),document.getElementById("game-details")),n=window.innerHeight-(outerHeight(e)+100+outerHeight(t)),s=n/700;screenSizeX=Math.min(1024,1024*s),screenSizeY=Math.min(n,700)}function Begin(){this.setup=function(){calcWindowBounds(),createCanvas(screenSizeX,screenSizeY).parent("game-container"),document.getElementById("game-details").style.display="block"},this.draw=function(){push(),stroke(255),fill(255),textSize(64),textAlign(CENTER),textFont(pixelFont),text("Click or press a key to begin!",screenSizeX/2,screenSizeY/2),textSize(32),stroke(255,0),text("warning: not yet optimized for mobile!",screenSizeX/2,5*screenSizeY/7),pop()},this.onAction=function(){this.sceneManager.showScene(Menu)},this.mousePressed=this.onAction,this.keyPressed=this.onAction}function setup(){document.getElementById("game-container").oncontextmenu=function(){if(mouseX>0&&mouseX<screenSizeX&&mouseY>0&&mouseY<screenSizeY)return!1};let e=new SceneManager;e.gfx=gfx,e.sfx=sfx,e.pixelFont=pixelFont,e.frogShader=frogShader,e.prop={song:sfx.mayYourNightBeAtPeace,musicVol:1,fxVol:1},generalState.envFunction=linearEnvironment,e.wire(),e.showScene(Begin)}
//# sourceMappingURL=index.5951f983.js.map
