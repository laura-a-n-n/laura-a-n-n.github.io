function Menu() {
    /* setup (っ◔◡◔)っ ❤ */ this.setup = function() {
        // get injected properties
        gfx = this.sceneManager.gfx;
        pixelFont = this.sceneManager.pixelFont;
        // canvas
        calcWindowBounds();
        // background size
        bgRatio = screenSizeX / gfx['menuBg'].width;
        bgScale = 2;
        // background pan
        trajX = 1;
        trajY = 1;
        locX = gfx['menuBg'].width / 3;
        locY = gfx['menuBg'].height / 3;
        // global fade
        globalOpacity = 0;
        nothingDt = 4;
        countTime = 0;
        exiting = false;
        displayFrogress = false;
        // bugs
        bugsN = 5;
        bugsX = Array(bugsN).fill(0);
        bugsY = Array(bugsN).fill(0);
        bugsTX = Array(bugsN).fill(1);
        bugsTY = Array(bugsN).fill(-1);
        beeSprite = Array(bugsN);
        for(let i = 0; i < bugsN; i++){
            bugsX[i] = Math.floor(Math.random() * screenSizeX);
            bugsY[i] = Math.floor(Math.random() * screenSizeY);
            bugsTX[i] = Math.random() > .5 ? 1 : -1;
            bugsTY[i] = Math.random() > .5 ? 1 : -1;
        }
        // create game!
        createCanvas(screenSizeX, screenSizeY);
    };
    /* events (/◕ヮ◕)/ */ this.windowResized = function() {
        calcWindowBounds();
        imX = screenSizeX;
        imY = bgRatio * gfx['menuBg'].height;
        resizeCanvas(screenSizeX, screenSizeY);
    };
    this.goToFade = function() {
        exiting = true;
    };
    this.goToGame = function() {
        this.sceneManager.showScene(OpenLinear, {
            step: 0
        });
    };
    this.mouseClicked = this.goToFade;
    this.keyPressed = this.goToFade;
    /* main loop ✨(っ◔︣◡◔᷅)っc(◕︣◡◕᷅c)✨ */ this.frame = function() {
        // update background pan
        locX += trajX * Math.ceil(deltaTime / 1000);
        locY += trajY * Math.ceil(deltaTime / 2000);
        imX = screenSizeX;
        imY = bgRatio * gfx['menuBg'].height;
        if (locX + bgScale * imX > gfx['menuBg'].width) trajX = -1;
        else if (locX <= 0) trajX = 1;
        if (locY + bgScale * imY > gfx['menuBg'].height) trajY = -1;
        else if (locY <= 0) trajY = 1;
        // update bugs
        for(let i = 0; i < bugsN; i++){
            bugsX[i] += bugsTX[i];
            bugsY[i] += bugsTY[i];
            if (bugsX[i] > screenSizeX) bugsTX[i] = -1;
            else if (bugsX[i] < 0) bugsTX[i] = 1;
            if (bugsY[i] > screenSizeY) bugsTY[i] = -1;
            else if (bugsY[i] < 0) bugsTY[i] = 1;
            beeSprite[i] = bugsTX[i] == 1 ? 'beeRight' : 'beeLeft';
        }
        if (exiting) {
            globalOpacity += deltaTime / 10;
            if (globalOpacity >= 255) {
                countTime += deltaTime / 1000;
                displayFrogress = true;
                if (countTime >= nothingDt) this.goToGame();
            }
        }
    };
    this.draw = function() {
        this.frame();
        // background
        bg = gfx['menuBg'].get(locX, locY, bgScale * imX, bgScale * imY);
        image(bg, 0, 0, imX, imY);
        // bugs >-<
        for(let i = 0; i < bugsN; i++){
            push();
            scale(.1);
            translate(bugsX[i] / .1, bugsY[i] / .1);
            image(gfx[beeSprite[i]], 0, 0);
            pop();
        }
        // text
        stroke(255);
        fill(255);
        textFont(pixelFont);
        push();
        textSize(128);
        text('Frog World', 1.8 * screenSizeX / 7, screenSizeY / 6);
        pop();
        push();
        textSize(64);
        strokeWeight(1);
        c = color(255, 127 + Math.sin(frameCount / 50) * 127);
        fill(c);
        stroke(c);
        text('begin?', 4 * screenSizeX / 5, 3 * screenSizeY / 4);
        pop();
        textSize(32);
        text('lead artist: kyle lynn', 5, screenSizeY - 48);
        text('developer/frog artist: laura ann', 5, screenSizeY - 16);
        background(0, globalOpacity);
        if (displayFrogress) {
            image(gfx['snail'], screenSizeX * (-0.1 + 2 * countTime / nothingDt) - gfx['snail'].width / 2, screenSizeY / 2 - gfx['snail'].height / 2);
            text('Loading in frogress...', screenSizeX / 2 - gfx['snail'].width / 2 - 20, screenSizeY / 2 + gfx['snail'].height / 2 + 20);
        }
    };
}

//# sourceMappingURL=index.455ee1a8.js.map
