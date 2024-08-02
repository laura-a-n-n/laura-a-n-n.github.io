function drawBackground() {
    if (envType == 'LinearLilies') {
        background(255);
        if (cam.x - cam.w / 2 <= background_x_0) {
            if (cam.x - cam.w / 2 <= background_x_1) background_x_0 = background_x_1;
            background_x_1 = background_x_0 - bgWidth;
        } else if (cam.x - cam.w / 2 >= background_x_0) {
            if (cam.x - cam.w / 2 >= background_x_1) background_x_0 = background_x_1;
            background_x_1 = background_x_0 + bgWidth;
        }
        bgScale = generalState.bgScale;
        if (bgScale != 1) backgroundY = -bgScale * screenSizeY / 2;
        else backgroundY = 0;
        image(bg, ...cam.toCamCoords(background_x_0, backgroundY, sX = false, sY = false), bgScale * bgWidth, bgScale * screenSizeY);
        image(bg, ...cam.toCamCoords(background_x_1, backgroundY, sX = false, sY = false), bgScale * bgWidth, bgScale * screenSizeY);
    /* ~ water ~ */ // stroke(0, 100, 255);
    // fill(0, 100, 255);
    // rect(0, screenSizeY * .5, screenSizeX, screenSizeY);
    } else if (envType == 'CyclicLilies') background(200);
    else if (envType == 'LinearLilies2D') background(0);
}
function linearEnvironment2D() {
    // camera
    cam = new Camera(screenSizeX / 2, screenSizeY / 2, screenSizeX, screenSizeY);
    currScale = cam.scale;
    envType = 'LinearLilies2D';
    // create lilies
    // lilies = new LinearLilies(cam, gfx['lily'], lilyScale, 60);
    // lilies.calcLeftLily();
    // lilies.calcStartLily();
    lilies = new LinearLilies2D(cam, gfx['lilyDown']);
    lilies.calcLeftLily();
    lilies.calcStartLily();
    // frog dimensions
    frogDimX = gfx['bby'].width;
    frogDimY = gfx['bby'].height;
    // frogOffX = lilies.trueLilySize[0] / 4;
    // frogOffY = -(frogDimY / 2 + lilies.lilyDimY / 2);
    // scene bounds
    boundLeft = 0;
    boundRight = screenSizeX;
    startLily = 0;
    [startLilyX, startLilyY] = lilies.getLilyPos(startLily, 5);
    // mark numbers
    lilyNumPosX = startLilyX;
    lilies.lilyDimX;
    lilyNumPosY = startLilyY;
    // physics
    gravity = 0;
    kerplunked = [];
    buoyancy = .2;
    kerplunkSpeed = 5;
    // arrays
    frogs = [];
    bugs = [];
    /* ~ bugs ~ */ // make an fly!
    // bugIndices = [];
    // for (let i = 0; i < 10; i++) {
    //   subtract = lilies.negativeLilies ? 25 : -startLily;
    //   bugIndex = Math.floor(Math.random() * 10) - subtract;
    //   if (bugIndices.indexOf(bugIndex) < 0 && bugIndex != startLily) {
    //       bugIndices.push(bugIndex);
    //       flyPos = lilies.getLilyPos(bugIndex);
    //       flyPos[1] -= 30;
    //       bugs.push(new Bug(gfx['fly'], ...flyPos));
    //       console.log(bugs[i], flyPos);
    //   }
    // }
    // player
    player = new Player(cam, Frog);
    player.characterProfile = [
        lilies,
        gfx['bby'],
        0,
        startLily
    ];
    frog = player.instantiateCharacter();
    frogs[0] = frog;
    cam.toggleLock(frog);
    //player.assignQuest(flyQuest)
    visibleFrogs = [
        0
    ];
}
function cyclicEnvironment() {
    environment = 'cyclic';
    // camera
    cam = new Camera(screenSizeX / 2, screenSizeY / 2, screenSizeX, screenSizeY);
    currScale = cam.scale;
    // create lilies
    // lilies = new LinearLilies(cam, gfx['lily'], lilyScale, 60);
    // lilies.calcLeftLily();
    // lilies.calcStartLily();
    lilies = new CyclicLilies(cam, gfx['lily']);
    // frog dimensions
    frogDimX = gfx['bby'].width;
    frogDimY = gfx['bby'].height;
    // scene bounds
    boundLeft = 0;
    boundRight = screenSizeX;
    startLily = 0;
    [startLilyX, startLilyY] = lilies.getLilyPos(startLily);
    // mark numbers
    lilyNumPosX = startLilyX;
    lilies.lilyDimX;
    lilyNumPosY = startLilyY;
    // physics
    gravity = 0;
    kerplunked = Array(lilies.numLilies).fill(0.);
    buoyancy = .2;
    kerplunkSpeed = 20;
    // arrays
    frogs = [];
    bugs = [];
    /* ~ bugs ~ */ // make an fly!
    // bugIndices = [];
    // for (let i = 0; i < 10; i++) {
    //   subtract = lilies.negativeLilies ? 25 : -startLily;
    //   bugIndex = Math.floor(Math.random() * 10) - subtract;
    //   if (bugIndices.indexOf(bugIndex) < 0 && bugIndex != startLily) {
    //       bugIndices.push(bugIndex);
    //       flyPos = lilies.getLilyPos(bugIndex);
    //       flyPos[1] -= 30;
    //       bugs.push(new Bug(gfx['fly'], ...flyPos));
    //       console.log(bugs[i], flyPos);
    //   }
    // }
    // player
    player = new Player(cam, Frog);
    player.characterProfile = [
        lilies,
        gfx['bby'],
        0,
        startLily
    ];
    frog = player.instantiateCharacter();
    frogs[0] = frog;
    //cam.toggleLock(frog);
    //player.assignQuest(flyQuest)
    visibleFrogs = [
        0
    ];
}
function linearEnvironment(lilyScale = 1) {
    // camera
    cam = new Camera(screenSizeX / 2, screenSizeY / 2, screenSizeX, screenSizeY);
    //cam.anchored = true;
    bg = generalState.bg;
    scaleRatio = screenSizeY / bg.height;
    bgWidth = scaleRatio * bg.width;
    // create lilies
    lilies = new LinearLilies(cam, gfx['lilyDown'], .2, 200);
    lilies.calcLeftLily();
    lilies.calcStartLily();
    startLily = lilies.startLily;
    [startLilyX, startLilyY] = lilies.getLilyPos(startLily);
    // mark numbers
    lilyNumPosX = startLilyX;
    lilies.lilyDimX;
    lilyNumPosY = startLilyY;
    // arrays
    frogs = [];
    bugs = [];
    // player
    player = new Player(cam, Frog);
    player.characterProfile = [
        lilies,
        gfx['bby'],
        0,
        startLily
    ];
    //sLily = lilies.startLily + 2;
    //[sLilyX, sLilyY] = lilies.getLilyPos(sLily);
    //frog2 = new Frog(lilies, gfx['bby'], 2, sLily, sLilyX, sLilyY, lilies.trueLilySpacingX);
    frog = player.instantiateCharacter();
    //frogs.push(frog2);
    cam.toggleLock(frog);
    background_x_0 = cam.x - cam.w / 2;
    background_x_1 = cam.x - cam.w / 2 - bgWidth;
    // scene bounds
    boundLeft = lilies.getLilyPos(lilies.leftLily) + frog.offX;
    boundRight = lilies.getLilyPos(lilies.rightLily) + frog.offX;
    visibleFrogs = [
        0
    ];
}

//# sourceMappingURL=index.022a19a6.js.map
