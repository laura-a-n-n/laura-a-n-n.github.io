function FrogHeaven() {
    generalState.envFunction = linearEnvironment;
    // generalState.drawBackground = function() {
    // 	background(0);
    // }
    generalState.bg = gfx['palms'];
    generalState.drawBackground = function() {
        bgScale = screenSizeX / gfx.bg.width;
        image(generalState.bg, 0, -0.225 * gfx.bg.height * bgScale, screenSizeX, gfx.bg.height * bgScale);
    };
    Object.assign(this, generalState);
    puzolsComplete = 0;
    this.particularSetup = function() {
        lilies.sprite = gfx['lilyDown'];
        //controlsEnabled = false;
        //player.gui.initialize(this.sceneArgs.initVals);
        //player.gui.calculate();
        // player.cam.guiOptions['helpLines'] = false;
        // player.gui.obj.quickFrog.draw = true;
        // player.specialOffX = player.character.environment.lilyDimX / 3;
        cam.anchored = true;
        lilies.negativeLilies = true;
        lilies.lilySpacingX = 80;
    //bugs.push(new Bug(lilies, gfx['snail'], this.sceneArgs.specialLily, .15, 'snail'));
    //bugs[0].posY -= bugs[0].dimY / 3;
    //bugs[0].isTouched = function(obj) { return this.lily % lilies.numLilies == obj.lily; };
    };
    this.particularDraw = function() {
        push();
        textFont(pixelFont);
        textSize(64);
        stroke(255);
        fill(255);
        text('To be continued...', screenSizeX / 3, 100);
        pop();
    };
}

//# sourceMappingURL=index.b927bf4c.js.map
