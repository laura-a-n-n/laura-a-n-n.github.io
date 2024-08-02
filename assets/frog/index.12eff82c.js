function FactorsPuzzle() {
    this.envFunction = linearEnvironment;
    generalState.bg = gfx['bg'];
    generalState.drawBackground = function() {
        bgScale = screenSizeX / gfx.bg.width;
        image(generalState.bg, 0, -bgScale * gfx.bg.height / 4, screenSizeX, bgScale * gfx.bg.height);
    };
    Object.assign(this, generalState);
    puzolsComplete = 0;
    this.particularSetup = function() {
        puzzleMode = true;
        player.specialLily = this.sceneArgs.specialLily;
        player.specialNumber = true;
        player.numberColor = color(0);
        buttonPressed = false;
        waitFrames = 0;
        maxWaitFrames = 4;
        levelFailed = false;
        levelWon = false;
        frog.type = 0;
        controlsEnabled = false;
        player.gui.initialize(this.sceneArgs.initVals);
        player.gui.calculate();
        player.gui.obj.quickFrog.draw = true;
        player.specialOffX = player.character.environment.lilyDimX / 4;
        player.specialOffY = 60;
        cam.scale = cam.minScale;
        cam.targetOffsetX = 6 * cam.w / 13;
        cam.toggleLock(frog);
        cam.anchored = true;
        cam.toggleLock(frog);
        lilies.negativeLilies = false;
        lilies.lilySpacingX = 80;
        bugs.push(new Bug(lilies, gfx['snail'], this.sceneArgs.specialLily, .2, 'snail'));
    };
    this.resetLevel = function() {
        levelFailed = false;
        buttonPressed = false;
        waitFrames = 0;
        frog = player.instantiateCharacter();
    };
    this.particularFrame = function() {
        if (levelFailed || levelWon) {
            frog.type = 0;
            waitFrames += deltaTime / 1000;
            if (waitFrames > maxWaitFrames) {
                this.resetLevel();
                if (levelWon) {
                    if (puzolsComplete > 1) // ok time to move on...
                    mgr.showScene(CyclicFactorsPuzzle, {
                        specialLily: 9,
                        initVals: [
                            2,
                            3,
                            4,
                            5
                        ]
                    });
                    else {
                        this.sceneArgs.specialLily = 12;
                        this.sceneArgs.initVals = [
                            5,
                            7,
                            8,
                            6
                        ];
                        this.particularSetup();
                    }
                }
            }
        }
        if (!levelFailed && frog.lily > player.specialLily && bugs.length > 0) {
            frog.number += frog.type;
            controlsEnabled = false;
            levelFailed = true;
            frog.drawType = false;
        } else if (!levelWon && bugs.length == 0) {
            player.specialNumber = false;
            // epic! wonned!
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

//# sourceMappingURL=index.12eff82c.js.map
