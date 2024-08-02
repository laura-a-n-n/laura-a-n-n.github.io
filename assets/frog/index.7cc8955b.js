function General() {
    /* setup (っ◔◡◔)っ ❤ */ this.particularSetup = function() {};
    this.particularFrame = function() {};
    this.particularDraw = function() {};
    this.setup = function() {
        // get injected properties
        gfx = this.sceneManager.gfx;
        pixelFont = this.sceneManager.pixelFont;
        frogShader = this.sceneManager.frogShader;
        hueVal = this.sceneManager.hueVal;
        satVal = this.sceneManager.satVal;
        valVal = this.sceneManager.valVal;
        mgr = this.sceneManager;
        // canvas
        calcWindowBounds();
        // environment
        this.envFunction();
        envType = lilies.constructor.name;
        // global controls
        controlsEnabled = true;
        buttonPressed = false;
        puzzleMode = false;
        // create game!
        createCanvas(screenSizeX, screenSizeY);
        // fade in!
        fadeIn = 255;
        fadingIn = true;
        // frog drawer
        pg = createGraphics(gfx.bby.width, gfx.bby.height, WEBGL);
        pg.setAttributes('alpha', true);
        this.particularSetup();
    };
    /* events (/◕ヮ◕)/ */ this.windowResized = function() {
        calcWindowBounds();
        if (player.hasQuest) player.questList[player.currentQuest].calcGUIBounds();
        [cam.w, cam.h] = [
            screenSizeX,
            screenSizeY
        ];
        resizeCanvas(screenSizeX, screenSizeY);
    };
    this.mouseClicked = function(e) {
        if (controlsEnabled && !frog.isJumping && !cl_lastClicked) frog.jumpNextFrame = true;
    };
    this.keyPressed = function() {
        if (controlsEnabled) {
            if (!frog.isJumping) {
                if (keyCode == UP_ARROW) frog.type += 1;
                else if (keyCode == DOWN_ARROW) frog.type -= 1;
            }
            if (key == 'y') cam.toggleLock(frog);
            else if (key == 'u') cam.anchored = !cam.anchored;
            else if (key == 'Escape') {
                player.resetCharacter();
                frog = player.character;
            } else if (key == 'h') cam.guiOptions['helpLines'] = !cam.guiOptions['helpLines'];
            for(const letter in player.binds)if (key == letter.toLowerCase()) player.binds[letter]();
        }
    };
    this.mouseWheel = function(event) {};
    this.frame = function() {
        player.frame();
        frogs.forEach((frog)=>frog.frame(cam)
        );
        for(const bug in bugs){
            bugs[bug].frame(frogs);
            if (bugs[bug].destroyed) bugs.splice(bug, 1);
        }
        cam.frame();
        this.particularFrame();
    };
    /* ~ other stuff ~ */ this.wizardAnim = function() {
        frog.type = 0;
        frog.drawType = false;
        controlsEnabled = false;
        wizard = new Frog(lilies, gfx['frogStand'], frog.number + 3, frog.lily + 3);
        wizard.pointingLeft = true;
        wizard.isBby = false;
        frogs.push(wizard);
        visibleFrogs = [
            0,
            1
        ];
        wizard.jumpNextFrame = true;
        wizard.special = function() {
            if (wizard.stoppedJumping && wizard.number != frog.number + 1) wizard.jumpNextFrame = true;
            else if (wizard.number == frog.number + 1) {
                wizard.deleteSpecial();
                wizard.drawSpecial = true;
                wizard.specialFrames = 0;
                wizard.specialDraw = function() {
                    wizard.specialFrames += deltaTime / 1000;
                    image(gfx.alertBubble, gfx.alertBubble.width / 2, 0);
                    if (wizard.specialFrames > 5) mgr.showScene(FactorsPuzzle, {
                        specialLily: 9,
                        initVals: [
                            2,
                            3,
                            4,
                            5
                        ]
                    });
                };
            }
        };
    };
    /* main loop ✨(っ◔︣◡◔᷅)っc(◕︣◡◕᷅c)✨ */ this.draw = function() {
        this.frame();
        /* ~ background ~ */ this.drawBackground(this.bg);
        /* ~ lilies ~ */ lilies.draw();
        /* ~ gui ~ */ player.draw();
        /* ~ bugs ~ */ for (const bug of bugs){
            push();
            camBugPos = cam.toCamCoords(bug.posX, bug.posY);
            translate(...camBugPos);
            image(bug.sprite, 0, 0, cam.scale * bug.dimX, cam.scale * bug.dimY);
            pop();
        }
        /* ~ frog ~ */ for (const frog of visibleFrogs)// all frogs!
        frogs[frog].draw();
        /* ~ fade in ~ */ if (fadingIn) {
            background(0, fadeIn);
            fadeIn -= deltaTime / 10;
            fadingIn = fadeIn >= 0;
        }
        // level-specific draw
        this.particularDraw();
    };
}
generalState = new General();

//# sourceMappingURL=index.7cc8955b.js.map
