function CharacterSelect() {
    /* setup (っ◔◡◔)っ ❤ */ this.setup = function() {
        // get injected properties
        gfx = this.sceneManager.gfx;
        pixelFont = this.sceneManager.pixelFont;
        frogShader = this.sceneManager.frogShader;
        mgr = this.sceneManager;
        // canvas
        calcWindowBounds();
        // global fade
        globalOpacity = 0;
        nothingDt = 4;
        countTime = 0;
        exiting = false;
        displayFrogress = false;
        // frog renderer
        imScale = 2;
        pg = createGraphics(imScale * gfx['bby'].width, imScale * gfx['bby'].height, WEBGL);
        pg.setAttributes('alpha', true);
        // color picker
        hueSlider = createSlider(-0.8, .8, 0., .01);
        hueSlider.center();
        hueSlider.position(hueSlider.position().x, screenSizeY / 2 - 10);
        hueSlider.addClass('slider');
        satSlider = createSlider(-0.8, .8, 0., .01);
        satSlider.position(hueSlider.position().x, screenSizeY / 2 + 20);
        satSlider.addClass('slider');
        valSlider = createSlider(-0.8, .8, 0., .01);
        valSlider.position(hueSlider.position().x, screenSizeY / 2 + 50);
        valSlider.addClass('slider');
        // OK button
        goButton = new Clickable();
        goButton.locate(screenSizeX / 2 - 58, screenSizeY / 2 + 70);
        goButton.onOutside = function() {
            this.color = '#0a0';
        };
        goButton.onHover = function() {
            this.color = '#0f0';
        };
        goButton.onRelease = this.goToFade;
        goButton.text = '✓';
        goButton.textColor = '#fff';
        goButton.width = 128;
        goButton.height = screenSizeY / 32;
        // create game!
        createCanvas(screenSizeX, screenSizeY);
    };
    /* events (/◕ヮ◕)/ */ this.windowResized = function() {
        calcWindowBounds();
        resizeCanvas(screenSizeX, screenSizeY);
    };
    this.goToFade = function() {
        if (!exiting) {
            // inject properties for custom frog
            mgr.hueVal = hueSlider.value();
            mgr.satVal = satSlider.value();
            mgr.valVal = valSlider.value();
        }
        exiting = true;
    };
    this.goToGame = function() {
        this.sceneManager.showScene(OpenLinear);
    };
    //this.mouseClicked = this.goToFade;
    //this.keyPressed = this.goToFade;
    /* main loop ✨(っ◔︣◡◔᷅)っc(◕︣◡◕᷅c)✨ */ this.frame = function() {
        // fade out
        if (exiting) {
            globalOpacity += deltaTime / 10;
            if (globalOpacity >= 255) {
                countTime += deltaTime / 1000;
                if (countTime >= nothingDt) this.goToGame();
            }
        }
    };
    this.draw = function() {
        this.frame();
        // background
        background(0);
        push();
        fill(50);
        stroke(50);
        rect(screenSizeX / 3, screenSizeY / 3, screenSizeX / 3, screenSizeY / 3, 10, 10, 10, 10);
        pop();
        push();
        pg.shader(frogShader);
        frogShader.setUniform('tex0', gfx['bbyBody']);
        frogShader.setUniform('hueVal', hueSlider.value());
        frogShader.setUniform('satVal', satSlider.value());
        frogShader.setUniform('valVal', valSlider.value());
        pg.rect(0, 0, imScale * gfx['bby'].width, imScale * gfx['bby'].height);
        image(pg, screenSizeX / 2 - imScale * gfx['bby'].width / 3, 2 * screenSizeY / 5);
        image(gfx['bbyFrame'], screenSizeX / 2 - imScale * gfx['bby'].width / 3, 2 * screenSizeY / 5, 2 * gfx['bby'].width, 2 * gfx['bby'].height);
        pop();
        goButton.draw();
        // fade out
        hueSlider.style('opacity', (1 - globalOpacity / 255).toString());
        satSlider.style('opacity', (1 - globalOpacity / 255).toString());
        valSlider.style('opacity', (1 - globalOpacity / 255).toString());
        background(0, globalOpacity);
    };
}

//# sourceMappingURL=index.4598e768.js.map
