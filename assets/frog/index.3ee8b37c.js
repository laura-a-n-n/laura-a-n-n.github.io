function CyclicFactorsPuzzle() {
    generalState.envFunction = cyclicEnvironment;
    generalState.bg = gfx['bg'];
    generalState.drawBackground = function() {
        bgScale = 2 * screenSizeX / gfx.bg.width;
        image(generalState.bg, -gfx.bg.width / 5, -bgScale * gfx.bg.height * .6, 2 * screenSizeX, bgScale * gfx.bg.height);
    };
    Object.assign(this, generalState);
    puzolsComplete = 0;
    this.particularSetup = function() {
        puzzleMode = true;
        lilies.sprite = gfx['lily'];
        lilies.lilyScale = .5;
        lilies.radiusX = screenSizeX * .18;
        lilies.radiusY = screenSizeY * .1;
        lilies.lilyCenterX = screenSizeX * .4;
        lilies.lilyCenterY = screenSizeY * .8;
        player.specialLily = this.sceneArgs.specialLily;
        player.specialNumber = true;
        player.numberColor = color(0);
        player.numOffsetY = 50;
        player.numOffsetX = 5;
        player.sizeSpecial = 30;
        player.specialOffY = 35;
        player.gui.cyclicMode = true;
        frog = player.instantiateCharacter();
        buttonPressed = false;
        waitFrames = 0;
        maxWaitFrames = 4;
        levelFailed = false;
        levelWon = false;
        frog.type = 0;
        controlsEnabled = false;
        player.gui.initialize(this.sceneArgs.initVals);
        player.gui.calculate();
        player.cam.guiOptions['helpLines'] = false;
        player.gui.obj.quickFrog.draw = true;
        player.specialOffX = player.character.environment.lilyDimX / 3;
        cam.anchored = true;
        lilies.negativeLilies = false;
        lilies.lilySpacingX = 80;
        bugs.push(new Bug(lilies, gfx['snail'], this.sceneArgs.specialLily, .15, 'snail'));
        bugs[0].posY -= bugs[0].dimY / 3;
        bugs[0].isTouched = function(obj) {
            return this.lily % lilies.numLilies == obj.lily;
        };
    };
    this.resetLevel = function() {
        levelFailed = false;
        buttonPressed = false;
        waitFrames = 0;
        frog = player.instantiateCharacter();
    };
    this.particularFrame = function() {
        //controlsEnabled = false;
        frog.scale = .5;
        if (levelFailed || levelWon) {
            frog.type = 0;
            waitFrames += deltaTime / 1000;
            if (waitFrames > maxWaitFrames) {
                this.resetLevel();
                if (levelWon) mgr.showScene(FrogHeaven);
            }
        }
        if (!levelFailed && frog.lily > player.specialLily && bugs.length > 0) {
            controlsEnabled = false;
            levelFailed = true;
            frog.number += frog.type;
            frog.drawType = false;
        } else if (!levelWon && bugs.length == 0) {
            player.specialNumber = false;
            // epic! wonned!
            frog.number -= frog.type * 2;
            frog.showHeart.push(1);
            levelWon = true;
            puzolsComplete++;
            frog.drawType = false;
        }
    };
    this.particularDraw = function() {
        image(gfx['snail'], 5, 0, gfx['snail'].width * .1, gfx['snail'].height * .1);
        text(puzolsComplete.toString(), 15 + gfx['snail'].width * .1, gfx['snail'].height * .1 / 2 + 10);
    };
}

//# sourceMappingURL=index.3ee8b37c.js.map
