const assets="assets",gfxNames=["frog-stand","water","lily","lily-down","lily-up","fly","bee-left","bee-right","snail","crab","small-bee-left","small-bee-wing-left","small-bee-right","small-bee-wing-right","fly-bar","fly-bar-grey","fly-bubble","alert-bubble","heart","alt-frog-stand","bby","bby-body","bby-frame","quest-box","inventory-button","button","button-toggled","bg","bg-2","bg-3","menu-bg","palms"],gfxSheets=["bby-spritesheet"];let gfx={};function preload(){for(const e of gfxNames){const t=camelizeDashes(e);gfx[t]=loadImage(`assets/img/${e}.png`)}for(const e of gfxSheets){camelizeDashes(e);const t=loadImage(`assets/img/${e}.png`);gfx.bbySpritesheet=t}pixelFont=loadFont("assets/font/VT323-Regular.ttf"),frogShader=loadShader("assets/shader/frog.vert","assets/shader/frog.frag")}function calcWindowBounds(){screenSizeX=1024,screenSizeY=700}function setup(){let e=new SceneManager;e.gfx=gfx,e.pixelFont=pixelFont,e.frogShader=frogShader,generalState.envFunction=linearEnvironment,e.wire(),e.showScene(Menu)}
//# sourceMappingURL=index.6fbeb1a7.js.map
