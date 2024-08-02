function isCyclic(obj1) {
    var seenObjects = [];
    function detect(obj) {
        if (obj && typeof obj === 'object') {
            if (seenObjects.indexOf(obj) !== -1) return true;
            seenObjects.push(obj);
            for(var key in obj)if (obj.hasOwnProperty(key) && detect(obj[key])) {
                console.log(obj, 'cycle at ' + key);
                return true;
            }
        }
        return false;
    }
    return detect(obj1);
}
class Player {
    constructor(cam, characterClass){
        // essentials
        this.cam = cam;
        this.characterProfile = [];
        this.characterClass = characterClass;
        // game properties
        this.mouseMode = 'split'; // 'split' or 'character'
        this.pointingLeft = false;
        // inventory
        this.inventory = {};
        // initialize quests
        this.initQuests();
        // gui
        this.gui = new GUI();
        // number style
        this.numberColor = color(255);
        this.numOffsetY = 70;
        this.numOffsetX = 0;
        // show special number?
        this.specialNumber = false;
        this.specialLily = 0;
        this.sizeSpecial = 40;
        this.specialOffX = 30;
        this.specialOffY = 70;
    }
    get hasQuest() {
        return this.currentQuest > -1;
    }
    instantiateCharacter() {
        this.character = new this.characterClass(...this.characterProfile);
        this.character.scale = this.cam.scale;
        frogs[0] = this.character;
        // number binds
        this.binds = {
            'Q': this.character.typeBind(1),
            'W': this.character.typeBind(2),
            'E': this.character.typeBind(3),
            'R': this.character.typeBind(4)
        };
        return this.character;
    }
    resetCharacter() {
        this.instantiateCharacter();
        this.initQuests();
        this.cam.target = this.character;
    }
    assignQuest(quest) {
        this.questList.push(new quest(player));
        this.currentQuest = 0;
    }
    initQuests() {
        this.questList = [];
        this.currentQuest = -1; // -1 is no quest
        this.questDecayFrames = 0;
        this.maxQuestFrames = 100;
    }
    /* frame */ frame() {
        const charCamCoords = this.cam.toCamCoords(this.character.posX, this.character.posY);
        this.pointingLeft = mouseX < charCamCoords[0]; // (mouseX < screenSizeX / 2) || ;
        this.character.environment.envDependentFrame(this);
        if (this.hasQuest) {
            if (this.questList[this.currentQuest].frame()) // if success, fade out quest window
            this.questDecayFrames++;
            if (this.questDecayFrames > 0) this.questDecayFrames++;
            if (this.questDecayFrames > this.maxQuestFrames) {
                this.questDecayFrames = 0;
                this.questList.slice(this.currentQuest, 1);
                this.currentQuest = -1;
            }
        }
    // server
    //if (this.character.isJumping) socket.emit('frame', [player.character.posX, player.character.posY]);
    }
    /* draw */ drawHunger() {
        const camFrogPos = this.cam.toCamCoords(this.character.posX, this.character.posY);
        const hungerBarWidth = gfx['flyBar'].width;
        const hungerBarHeight = gfx['flyBar'].height;
        const hungerRatio = 1 - frog.hunger / frog.maxHunger;
        fill(0);
        stroke(0);
        // textSize(24);
        // textFont(pixelFont);
        // text('Hunger', screenSizeX - 1.3 * gfx['flyBar'].width, 25);
        if (frog.hungry) {
            push();
            tint(255, 255 * Math.cos(2 * frameCount / 60));
            image(gfx['flyBubble'], camFrogPos[0] + frog.dimX, camFrogPos[1] - frog.dimY, gfx['flyBubble'].width * cam.scale, gfx['flyBubble'].height * cam.scale);
            pop();
        }
        if (frog.ateThisFrame) frog.showHeart.push(1);
        for(const heart in frog.showHeart)if (frog.showHeart[heart] > 0) {
            frog.showHeart[heart]++;
            image(gfx['heart'], camFrogPos[0] + frog.dimX, camFrogPos[1] - frog.dimY - frog.showHeart[heart] / 2, gfx['heart'].width * cam.scale, gfx['heart'].height * cam.scale);
            frog.showHeart[heart] %= frog.heartFrames;
        } else frog.showHeart.splice(heart, 1);
        push();
        translate(screenSizeX - gfx['flyBar'].width, 10);
        image(gfx['flyBarGrey'], 0, 0);
        const flyBar = gfx['flyBar'].get(0, 0, hungerRatio * hungerBarWidth, hungerBarHeight);
        image(flyBar, 0, 0);
        pop();
    }
    drawQuest(quest) {
        const opacity = 255 * (1 - this.questDecayFrames / this.maxQuestFrames);
        quest.gui.draw(opacity);
        push();
        quest.draw(gfx, opacity);
        pop();
    }
    draw() {
        // main gui
        this.gui.draw();
        // hunger gui
        this.drawHunger();
        // quest gui
        if (this.currentQuest > -1) this.drawQuest(this.questList[this.currentQuest]);
        // frog gui
        this.character.scale = this.cam.scale;
        // help lines
        if (this.cam.guiOptions['helpLines'] && this.character.type != 0) {
            if (!this.character.isJumping) {
                let pointDir = this.character.pointingLeft ? -1 : 1;
                let startPosX = this.character.posX + this.character.dimX / 2;
                let jumpDest = lilies.getLilyPos(this.character.lily + pointDir * this.character.type);
                let jumpDestX = jumpDest[0] + this.character.dimX / 2 + this.character.offX;
                let jumpDestY = jumpDest[1] + this.character.offY;
                this.curveParams = [
                    startPosX,
                    this.character.posY + this.character.dimY / 2,
                    (startPosX + jumpDestX) / 2,
                    (this.character.posY < jumpDestY ? this.character.posY : jumpDestY) - this.character.jumpHeight + this.character.dimY / 2,
                    jumpDestX,
                    jumpDestY + this.character.dimY
                ];
            }
            const camCurveParams = [];
            for(let k = 0; k < 3; k++){
                let pt = [
                    this.curveParams[2 * k],
                    this.curveParams[2 * k + 1]
                ];
                [camCurveParams[2 * k], camCurveParams[2 * k + 1]] = this.cam.toCamCoords(...pt);
            }
            const allCurves = [
                camCurveParams
            ];
            push();
            setLineDash([
                5,
                5
            ]);
            stroke(255, 128);
            strokeWeight(3);
            fill(0, 0, 0, 0);
            let drawDot = true;
            for (const params of allCurves){
                switch(envType){
                    case 'LinearLilies':
                        beginShape();
                        curveVertex(params[0], params[1]);
                        curveVertex(params[0], params[1]);
                        curveVertex(params[2], params[3]);
                        curveVertex(params[4], params[5]);
                        curveVertex(params[4], params[5]);
                        endShape();
                        break;
                    case 'CyclicLilies':
                        if (!this.character.isJumping) line(params[0], params[1], params[4], params[5]);
                        else drawDot = false;
                }
                if (drawDot) {
                    strokeWeight(7 * this.cam.scale);
                    point(params[4], params[5]);
                }
            }
            pop();
        }
        // number
        push();
        if (this.character.changeNumber) {
            this.numText = str(this.character.number);
            this.lilyCamDiff = this.character.lilyPos;
            this.lilyCamDiff[0] += 2 * this.numText.length + this.numOffsetX;
            this.character.changeNumber = false;
        }
        textFont(pixelFont);
        stroke(this.numberColor);
        fill(this.numberColor);
        textSize(this.sizeSpecial * this.cam.scale * (1 - this.numText.length / 10));
        text(this.numText, ...this.cam.toCamCoords(this.lilyCamDiff[0], this.lilyCamDiff[1] + this.numOffsetY * this.cam.scale));
        if (this.specialNumber) {
            let specialPos = this.cam.toCamCoords(...this.character.environment.getLilyPos(this.specialLily));
            specialPos[0] += this.specialOffX - 2 * this.specialLily.toString().length;
            specialPos[1] += this.specialOffY * cam.scale;
            text(this.specialLily.toString(), ...specialPos);
        }
        pop();
    }
}

//# sourceMappingURL=index.16cfa877.js.map
