class Camera {
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.baseW = w;
        this.baseH = h;
        this.anchored = false;
        this.locked = false;
        this.lockedY = true;
        this.target = null;
        this.targetOffsetX = 0;
        this.panning = false;
        this.panSpeed = 10;
        this.scale = 1;
        this.maxScale = 1;
        this.minScale = .5;
        this.mouseBoundsX = [
            screenSizeX / 50,
            screenSizeX - screenSizeX / 50
        ];
        this.mouseBoundsY = [
            screenSizeY / 50,
            screenSizeY - screenSizeY / 50
        ];
        this.guiOptions = {
            'helpLines': true
        };
    }
    get w() {
        return this.baseW / this.scale;
    }
    get h() {
        return this.baseH / this.scale;
    }
    zoom(delta) {
        if (!this.anchored) {
            this.scale -= Math.sign(delta) * .1;
            this.scale = clamp(this.scale, this.minScale, this.maxScale);
        }
    }
    toggleLock(target) {
        this.locked = !this.locked;
        this.target = target;
        this.lockX();
    }
    lockX() {
        this.x = this.target.posX + this.targetOffsetX;
    }
    pointTest(x, y) {
        return pointTest(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h, x, y);
    }
    rectTest(x, y, w, h) {
        return rectTest(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h, x, y, w, h);
    }
    toCamCoords(x, y, sX = true, sY = false) {
        sX = sX ? this.scale : 1;
        sY = sY ? this.scale : 1;
        x = -(this.x - this.baseW / 2) + x;
        y = -(this.y - this.baseH / 2) + y;
        x = (x - screenSizeX / 2) * sX + screenSizeX / 2;
        y = (y - screenSizeY / 2) * sY + screenSizeY / 2;
        return [
            Math.floor(x),
            Math.floor(y)
        ];
    }
    toWorldCoords(x, y, sX = true, sY = true) {
        sX = sX ? this.scale : 1;
        sY = sY ? this.scale : 1;
        x = (x - screenSizeX / 2) / sX + screenSizeX / 2;
        y = (y - screenSizeY / 2) / sY + screenSizeY / 2;
        x = this.x - this.baseW / 2 + x;
        y = this.y - this.baseH / 2 + y;
        return [
            x,
            y
        ];
    }
    frame() {
        if (!this.anchored) {
            if (!this.locked) {
                if (mouseX <= this.mouseBoundsX[0]) this.x -= this.panSpeed;
                else if (mouseX >= this.mouseBoundsX[1]) this.x += this.panSpeed;
                if (!this.lockedY) {
                    if (mouseY <= this.mouseBoundsY[0]) this.y -= this.panSpeed;
                    else if (mouseY >= this.mouseBoundsY[1]) this.y += this.panSpeed;
                }
            } else this.lockX();
        }
    }
}

//# sourceMappingURL=index.8d42f469.js.map
