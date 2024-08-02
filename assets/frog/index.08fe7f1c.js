/*         _
  __   ___.--'_`.     .'_`--.___   __
 ( _`.'. -   'o` )   ( 'o`   - .`.'_ )
 _\.'_'      _.-'     `-._      `_`./_
( \`. )    //\`         '/\\    ( .'/ )
 \_`-'`---'\\__,       ,__//`---'`-'_/
  \`        `-\         /-'        '/
   `                               '  
  */ const gfxNames = [
    'frog-stand',
    'water',
    'lily',
    'lily-down',
    'lily-up',
    'fly',
    'bee-left',
    'bee-right',
    'snail',
    'fly-bar',
    'fly-bar-grey',
    'fly-bubble',
    'alert-bubble',
    'heart',
    'alt-frog-stand',
    'bby',
    'bby-body',
    'bby-frame',
    'inventory-button',
    'bg',
    'bg-2',
    'bg-3',
    'menu-bg',
    'palms'
];
const gfxSheets = [
    'bby-spritesheet'
];
let gfx = {};
/* setup (っ◔◡◔)っ ❤ */ function preload() {
    // images
    for (const obj of gfxNames){
        const key = camelizeDashes(obj);
        gfx[key] = loadImage(`assets/img/${obj}.png`);
    }
    for (const obj1 of gfxSheets){
        const key = camelizeDashes(obj1);
        const img = loadImage(`assets/img/${obj1}.png`);
        gfx['bbySpritesheet'] = img;
    // for (let i = 0; i < 10; i++) {
    // }
    }
    // font
    pixelFont = loadFont('assets/font/VT323-Regular.ttf');
    // shaders
    frogShader = loadShader('assets/shader/frog.vert', 'assets/shader/frog.frag');
}
function calcWindowBounds() {
    //marginX = 0;
    //marginY = 0;
    screenSizeX = 1024; //windowWidth;// - marginX;
    screenSizeY = 700; //windowHeight;// - marginY;
}
function setup() {
    /* ~ scene manager ~ */ let mgr = new SceneManager();
    // inject properties
    mgr.gfx = gfx;
    mgr.pixelFont = pixelFont;
    mgr.frogShader = frogShader;
    // environment
    generalState.envFunction = linearEnvironment;
    // setup
    mgr.wire();
    //mgr.showScene(FactorsPuzzle, {specialLily: 9, initVals: [2, 3, 4, 5]});
    //mgr.showScene(CyclicFactorsPuzzle, {specialLily: 9, initVals: [2, 3, 4, 5]})
    //mgr.showScene(FrogHeaven);
    mgr.showScene(Menu);
}

//# sourceMappingURL=index.08fe7f1c.js.map
