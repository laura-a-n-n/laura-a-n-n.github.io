class LinearLilies {
    constructor(cam, sprite, lilyScale = 1, lilySpacingX = 10, lilyMarginX = 20, lilyY = screenSizeY * .9, negativeLilies = true){
        this.cam = cam;
        this.sprite = sprite;
        this.lilySpacingX = lilySpacingX;
        this.lilyY = lilyY;
        this.lilyScale = lilyScale;
        this.negativeLilies = negativeLilies;
        if (!this.negativeLilies) this.cam.targetOffsetX = screenSizeX / 3;
        this.kerplunked = [];
        this.kerplunkSpeed = 5;
        this.buoyancy = .5;
    }
    get lilyDimX() {
        return this.lilyScale * this.sprite.width;
    }
    get lilyDimY() {
        return this.lilyScale * this.sprite.height;
    }
    get camLilySize() {
        return [
            this.cam.scale * this.lilyDimX,
            this.cam.scale * this.lilyDimY
        ];
    }
    get trueLilySpacingX() {
        return this.lilyDimX + this.lilySpacingX;
    }
    calcStartLily() {
        this.startLily = 0; //Math.floor(this.numLilies / 2);
        this.startLilyX = 0;
        this.leftLily = 0;
        this.rightLily = this.numLilies - 1;
    }
    calcLeftLily() {
        this.leftLily = Math.ceil((this.cam.x - this.cam.w / 2) / this.trueLilySpacingX) - this.startLily;
        this.numLilies = Math.ceil(this.cam.w / this.trueLilySpacingX) + 1;
    }
    getLilyPos(i) {
        let lilyX = this.startLilyX + this.trueLilySpacingX * i;
        if (!this.negativeLilies) {
            if (i < this.startLily) lilyX = this.startLilyX;
        }
        return [
            lilyX,
            this.lilyY
        ];
    }
    invertLilyX(x) {
        return Math.floor((x - this.leftLilyX) / this.trueLilySpacingX + 1.5);
    }
    kerplunkAnim(n) {
        this.kerplunked.push([
            n,
            this.kerplunkSpeed
        ]);
    }
    envCondition(frog, request) {
        if (request) {
            let dir = frog.pointingLeft ? -1 : 1;
            if (!this.negativeLilies) {
                let intendedLily = frog.number + dir * frog.type;
                // possible: special behavior when < 0
                if (intendedLily < 0 && (frog.pointingLeft || frog.type != 0)) return false;
            }
            frog.direction = dir;
            frog.lily += frog.travelDist;
            return true;
        }
    }
    envJump(frog) {
        frog.linearJump();
    }
    envDependentFrame(player) {
        player.character.pointingLeft = player.pointingLeft;
        if (player.character.jumpFrames == player.character.maxJumpFrames) this.number += this.travelDist;
    }
    draw() {
        this.calcLeftLily();
        for(let i = this.leftLily - 1; i <= this.leftLily + this.numLilies; i++){
            if (envType == 'LinearLilies2D') for(let j = this.topLily; j <= this.topLily + this.numLiliesY; j++){
                const lilyPos = cam.toCamCoords(...this.getLilyPos(i, j));
                image(this.sprite, ...lilyPos, ...this.camLilySize);
            }
            else {
                let kerplunkY = 0;
                for (let [k, kLily] of Object.entries(this.kerplunked))if (i == kLily[0]) {
                    kerplunkY = kLily[1];
                    kLily[1] = Math.max(0, kerplunkY - this.buoyancy);
                    if (kLily[1] == 0) this.kerplunked.splice(k, 1);
                }
                let lilyPos = this.getLilyPos(i);
                lilyPos[1] += kerplunkY;
                lilyPos = cam.toCamCoords(...lilyPos, true, false);
                image(this.sprite, ...lilyPos, ...this.camLilySize);
            }
        }
    }
}
class CyclicLilies {
    constructor(cam, sprite, numLilies = 11){
        this.cam = cam;
        this.sprite = sprite;
        this.numLilies = numLilies;
        this.radius = screenSizeX * .2;
        this.radiusX = this.radius;
        this.radiusY = this.radius;
        this.lilyCenterX = screenSizeX / 2;
        this.lilyCenterY = screenSizeY / 2;
        this.lilyScale = 1;
        this.kerplunked = [];
        this.kerplunkSpeed = 10;
        this.buoyancy = .5;
    }
    get lilyDimX() {
        return this.sprite.width * this.lilyScale;
    }
    get lilyDimY() {
        return this.sprite.height * this.lilyScale;
    }
    get angle() {
        return 2 * Math.PI / this.numLilies;
    }
    get camLilySize() {
        return [
            this.lilyDimX,
            this.lilyDimY
        ];
    }
    calcLeftLily() {
        this.leftLily = 0;
        this.leftLilyPos = this.getLilyPos(0);
        [this.leftLilyX, this.leftLilyY] = this.leftLilyPos;
    }
    kerplunkAnim(n) {
        this.kerplunked.push([
            n,
            this.kerplunkSpeed
        ]);
    }
    getCircleCoords(angle) {
        return [
            this.radiusX * Math.cos(angle),
            -this.radiusY * Math.sin(angle)
        ];
    }
    getLilyPos(i) {
        let angle = this.angle * i;
        let [lilyX, lilyY] = this.getCircleCoords(angle);
        return [
            this.lilyCenterX + lilyX,
            this.lilyCenterY + lilyY
        ];
    }
    envCondition(frog, request) {
        if (request == 'jump') {
            if (!frog.isJumping) {
                let dir = frog.mouseLeft ? -1 : 1;
                let theta = this.angle * (frog.lily + dir * frog.type * .5);
                frog.lastJumpedDir = dir;
                frog.direction = dir * Math.sign(-Math.sin(theta));
                frog.lily += dir * frog.type;
                return true;
            }
        }
    }
    envJump(frog) {
        if (frog.type > this.numLilies / 2) {
            let angle = lerp(this.angle * (frog.lily - frog.lastJumpedDir * frog.type), this.angle * frog.lily, frog.jumpProgress);
            let [frogX, frogY] = this.getCircleCoords(angle);
            let decayRate = Math.sqrt(frog.type);
            frog.baseJumpHeight = frog.baseJumpStore / decayRate;
            frog.posX = this.lilyCenterX + frogX + frog.offX;
            frog.posY = this.lilyCenterY + frogY + frog.jumpY + frog.offY;
        } else {
            frog.baseJumpHeight = frog.baseJumpStore;
            frog.linearJump();
        }
    }
    envDependentFrame(player) {
        player.character.pointingLeft = player.character.direction == -1;
        player.character.mouseLeft = player.pointingLeft;
        if (player.character.stoppedJumping) {
            player.character.number += 2 * player.character.lastJumpedDir * player.character.type;
            player.character.stoppedJumping = false;
        }
    }
    draw() {
        this.calcLeftLily();
        for(let i = this.leftLily - 1; i <= this.leftLily + this.numLilies; i++){
            if (envType == 'LinearLilies2D') for(let j = this.topLily; j <= this.topLily + this.numLiliesY; j++){
                const lilyPos = cam.toCamCoords(...this.getLilyPos(i, j));
                image(this.sprite, ...lilyPos, ...this.camLilySize);
            }
            else {
                let kerplunkY = 0;
                for (let [k, kLily] of Object.entries(this.kerplunked))if (i == kLily[0]) {
                    kerplunkY = kLily[1];
                    kLily[1] = Math.max(0, kerplunkY - this.buoyancy);
                    if (kLily[1] == 0) this.kerplunked.splice(k, 1);
                }
                let lilyPos = this.getLilyPos(i);
                lilyPos[1] += kerplunkY;
                lilyPos = cam.toCamCoords(...lilyPos, true, false);
                image(this.sprite, ...lilyPos, ...this.camLilySize);
            }
        }
    }
}
class LinearLilies2D extends LinearLilies {
    constructor(cam, sprite, lilyScale = .2, lilySpacingX = 1, lilyMarginX = 20, lilyY = screenSizeY * .82, negativeLilies = true){
        super(cam, sprite, lilyScale, lilySpacingX, lilyMarginX, lilyY, negativeLilies);
        this.jVal = 1;
        this.negativeLilies = true;
    }
    get lilyDimX() {
        return this.lilyScale * this.sprite.width;
    }
    get lilyDimY() {
        return this.lilyScale * this.sprite.height;
    }
    get camLilySize() {
        return [
            this.lilyDimX,
            this.lilyDimY
        ];
    }
    get trueLilySpacingX() {
        return this.sprite.width * this.lilyScale + this.lilySpacingX;
    }
    calcStartLily() {
        this.startLily = Math.floor(this.numLilies / 2);
        this.startLilyX = screenSizeX / 2;
        this.startLilyY = screenSizeY / 2;
        this.leftLily = 1;
        this.rightLily = this.numLilies - 1;
        this.jVal = 5;
    }
    calcLeftLily() {
        this.leftLily = Math.ceil((this.cam.x - this.cam.w / 2) / this.trueLilySpacingX) - this.startLily;
        this.numLilies = 5 * Math.ceil(this.cam.w / this.trueLilySpacingX) + 1;
        this.topLily = Math.ceil((this.cam.y + this.cam.h / 2) / this.trueLilySpacingX) - this.startLily;
        this.numLiliesY = 10 * Math.ceil(this.cam.h / this.trueLilySpacingX) + 1;
    }
    getLilyPos(i, j = -1) {
        if (j == -1) j = this.jVal;
        let lilyX = this.startLilyX + this.trueLilySpacingX * i;
        let lilyY = this.trueLilySpacingX * j;
        // if (!this.negativeLilies) {
        //   if (i < this.startLily) lilyX = this.startLilyX;
        // }
        return this.cam.toWorldCoords(lilyX, lilyY);
    }
    invertLilyX(x) {
        return Math.floor((x - this.leftLilyX) / this.trueLilySpacingX + 1.5);
    }
    envCondition(frog, request) {
        if (request) {
            let dir = frog.pointingLeft ? -1 : 1;
            if (!this.negativeLilies) {
                let intendedLily = frog.number + dir * frog.type;
                // possible: special behavior when < 0
                if (intendedLily < 0 && (frog.pointingLeft || frog.type != 0)) return false;
            }
            frog.direction = dir;
            frog.lily += frog.travelDist;
            return true;
        }
    }
    envJump(frog) {
        frog.linearJump();
    }
    envDependentFrame(player) {
        player.character.pointingLeft = player.pointingLeft;
        player.character.mouseLeft = player.character.pointingLeft;
        if (player.character.jumpFrames == player.character.maxJumpFrames) this.number += this.travelDist;
    }
}

//# sourceMappingURL=index.28e6d382.js.map
