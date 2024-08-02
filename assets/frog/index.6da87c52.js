function drawBackground(){"LinearLilies"==envType?(cam.x-cam.w/2<background_x_0?(cam.x-cam.w/2<=background_x_1&&(background_x_0=background_x_1),background_x_1=background_x_0-bgWidth):cam.x-cam.w/2>=background_x_0&&(cam.x-cam.w/2>=background_x_1&&(background_x_0=background_x_1),background_x_1=background_x_0+bgWidth),bgScale=generalState.bgScale,1!=bgScale?backgroundY=-bgScale*screenSizeY/2:backgroundY=0,image(bg,...cam.toCamCoords(background_x_0,backgroundY,sX=!1,sY=!1),bgScale*bgWidth,bgScale*screenSizeY),image(bg,...cam.toCamCoords(background_x_1,backgroundY,sX=!1,sY=!1),bgScale*bgWidth,bgScale*screenSizeY)):"CyclicLilies"==envType?background(200):"LinearLilies2D"==envType&&background(0)}function linearEnvironment2D(){cam=new Camera(screenSizeX/2,screenSizeY/2,screenSizeX,screenSizeY),currScale=cam.scale,envType="LinearLilies2D",lilies=new LinearLilies2D(cam,gfx.lilyDown),lilies.calcLeftLily(),lilies.calcStartLily(),frogDimX=gfx.bby.width,frogDimY=gfx.bby.height,boundLeft=0,boundRight=screenSizeX,startLily=0,[startLilyX,startLilyY]=lilies.getLilyPos(startLily,5),lilyNumPosX=startLilyX,lilies.lilyDimX,lilyNumPosY=startLilyY,gravity=0,kerplunked=[],buoyancy=.2,kerplunkSpeed=5,frogs=[],bugs=[],player=new Player(cam,Frog),player.characterProfile=[lilies,gfx.bby,0,startLily],frog=player.instantiateCharacter(),frogs[0]=frog,cam.toggleLock(frog),visibleFrogs=[0]}function cyclicEnvironment(){environment="cyclic",cam=new Camera(screenSizeX/2,screenSizeY/2,screenSizeX,screenSizeY),currScale=cam.scale,lilies=new CyclicLilies(cam,gfx.lily),frogDimX=gfx.bby.width,frogDimY=gfx.bby.height,boundLeft=0,boundRight=screenSizeX,startLily=0,[startLilyX,startLilyY]=lilies.getLilyPos(startLily),lilyNumPosX=startLilyX,lilies.lilyDimX,lilyNumPosY=startLilyY,gravity=0,kerplunked=Array(lilies.numLilies).fill(0),buoyancy=.2,kerplunkSpeed=20,frogs=[],bugs=[],player=new Player(cam,Frog),player.characterProfile=[lilies,gfx.bby,0,startLily],frog=player.instantiateCharacter(),frogs[0]=frog,visibleFrogs=[0]}function linearEnvironment(e=1){cam=new Camera(screenSizeX/2,screenSizeY/2,screenSizeX,screenSizeY),bg=generalState.bg,scaleRatio=screenSizeY/bg.height,bgWidth=scaleRatio*bg.width,lilies=new LinearLilies(cam,gfx.lilyDown,.2,200),lilies.calcLeftLily(),lilies.calcStartLily(),startLily=lilies.startLily,[startLilyX,startLilyY]=lilies.getLilyPos(startLily),lilyNumPosX=startLilyX,lilies.lilyDimX,lilyNumPosY=startLilyY,frogs=[],bugs=[],player=new Player(cam,Frog),player.characterProfile=[lilies,gfx.bby,0,startLily],frog=player.instantiateCharacter(),cam.toggleLock(frog),background_x_0=cam.x-cam.w/2,background_x_1=cam.x-cam.w/2-bgWidth,boundLeft=lilies.getLilyPos(lilies.leftLily)+frog.offX,boundRight=lilies.getLilyPos(lilies.rightLily)+frog.offX,visibleFrogs=[0]}
//# sourceMappingURL=index.6da87c52.js.map