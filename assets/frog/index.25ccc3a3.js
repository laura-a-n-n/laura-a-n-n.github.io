class Frog {
    constructor(environment, sprite, startNumber, startLily, startLilyX, startLilyY, scale = 1){
        // environment
        this.environment = environment;
        // image
        this.sprite = sprite;
        this.scale = scale;
        this.isBby = true;
        // numerical properties!
        this.type = 1;
        this.number = startNumber;
        this.lily = startLily;
        this.startLily = startLily;
        this.changeNumber = true;
        // frog hungy
        this.hunger = 0;
        this.hungry = false;
        this.jumpHungerCost = 2;
        this.frameHungerCost = .001;
        this.minHunger = 0;
        this.maxHunger = 100;
        this.hungerWarning = 0.2;
        this.ateThisFrame = false;
        this.foodName = '';
        this.showHeart = [];
        this.heartFrames = 60;
        // animation
        this.animLilyNumber = startLily;
        this.drawType = true;
        // jump properties
        this.isJumping = false;
        this.stoppedJumping = false;
        this.jumpNextFrame = false;
        this.jumpFrames = 0;
        this.baseJumpFrames = 40;
        this.baseJumpStore = 80;
        this.baseJumpHeight = 80;
        this.jumpTime = 80;
        // position 
        [startLilyX, startLilyY] = this.environment.getLilyPos(startLily);
        this.posX = startLilyX + this.offX;
        this.posY = startLilyY + this.offY; // spawn height
        this.lilyPos = [
            this.posX,
            this.posY
        ];
        // velocity
        this.velX = 0.;
        this.velY = 0.;
        // direction
        this.pointingLeft = false;
        this.direction = 1;
    }
    /* properties */ get dimX() {
        return this.sprite.width * this.scale;
    }
    get dimY() {
        return this.sprite.height * this.scale;
    }
    get offX() {
        return -this.dimX / 2 + this.environment.lilyDimX / 2;
    }
    get offY() {
        return -this.dimY + this.scale * this.environment.lilyDimY / 2;
    }
    get maxJumpFrames() {
        return this.baseJumpFrames + Math.floor(Math.abs(this.type) / 5);
    }
    get travelDist() {
        return this.type * this.direction;
    }
    get jumpProgress() {
        return this.jumpFrames / this.maxJumpFrames;
    }
    get jumpHeight() {
        return this.scale * this.baseJumpHeight;
    }
    get jumpY() {
        return 4 * this.jumpHeight * this.jumpProgress * (this.jumpProgress - 1);
    }
    get canJump() {
        return !this.isJumping && this.envCondition('jump');
    }
    get canEat() {
        return !this.isJumping && !this.ateThisFrame;
    }
    /* methods */ envCondition(request) {
        return this.environment.envCondition(this, request);
    }
    typeBind(num) {
        return ()=>this.type = num
        ;
    }
    linearJump() {
        this.posX = lerp(this.jumpStartX, this.jumpDestX, this.jumpProgress);
        this.posY = lerp(this.jumpStartY, this.jumpDestY, this.jumpProgress);
        this.posY += this.jumpY;
    }
    jump() {
        if (this.canJump) {
            // handle jump
            this.isJumping = true;
            this.jumpStartX = this.posX;
            this.jumpStartY = this.posY;
            let jumpDest = this.environment.getLilyPos(this.lily);
            this.jumpDestX = jumpDest[0] + this.offX;
            this.jumpDestY = jumpDest[1] + this.offY;
            // hunger
            this.hunger += this.jumpHungerCost;
        }
    }
    special() {
        this.drawSpecial = false;
    }
    deleteSpecial() {
        this.special = function() {};
    }
    /* ~ frame ~ */ frame(cam) {
        this.special();
        if (this.jumpNextFrame) {
            this.jump();
            this.jumpNextFrame = false;
        }
        // frog hop
        if (this.isJumping) {
            this.jumpFrames += this.jumpTime * deltaTime / 1000;
            this.jumpFrames = Math.min(this.jumpFrames, this.maxJumpFrames);
            if (this.isBby) {
                let i = Math.floor(10 * this.jumpProgress) % 10;
                gfx['bbySpritesheet' + i.toString()] = gfx['bbySpritesheet'].get(24 * i, 0, 24, 24);
                this.sprite = gfx['bbySpritesheet' + i.toString()];
            }
            this.environment.envJump(this);
        } else if (controlsEnabled && keyIsDown(UP_ARROW) && frameCount % 16 == 0) this.type++;
        else if (controlsEnabled && keyIsDown(DOWN_ARROW) && frameCount % 16 == 0) this.type--;
        // jump frames
        if (this.jumpFrames == this.maxJumpFrames) {
            // handle number
            this.number += this.travelDist;
            // stop jumping
            this.jumpFrames = 0;
            this.stoppedJumping = true;
            this.isJumping = false;
            lilies.kerplunkAnim(this.lily);
        }
        if (!this.isJumping) {
            this.lilyPos = [
                this.posX,
                this.posY
            ];
            this.changeNumber = true;
        }
        // food
        this.ateThisFrame = false;
        this.foodName = '';
        // hunger
        if (this.hunger < this.maxHunger) this.hunger += this.frameHungerCost;
        else resetFrog();
        this.hunger = clamp(this.hunger, this.minHunger, this.maxHunger);
        if (this.hunger > (1 - this.hungerWarning) * this.maxHunger) this.hungry = true;
        else this.hungry = false;
    }
    /* ~ draw ~ */ draw() {
        const frogPos = cam.toCamCoords(this.posX, this.posY, true, false);
        push();
        translate(frogPos[0], frogPos[1]);
        // text
        if (this.drawType) {
            push();
            stroke(player.numberColor);
            fill(player.numberColor);
            textFont(pixelFont);
            textSize(24);
            scale(cam.scale);
            text(this.type, this.dimX * .5, -20);
            pop();
        }
        // follow the mouse
        applyMatrix(this.pointingLeft ? -1 : 1, 0, 0, 1, this.pointingLeft ? this.dimX : 0, 0);
        image(this.sprite, 0, 0, this.dimX, this.dimY);
        if (this.drawSpecial) this.specialDraw();
        /*
				push();
	    pg.shader(frogShader);
	    frogShader.setUniform('tex0', gfx['bbyBody']);
	    frogShader.setUniform('hueVal', hueVal);
	    frogShader.setUniform('satVal', satVal);
	    frogShader.setUniform('valVal', valVal);
	    pg.rect(0, 0, this.sprite.width, this.sprite.height);
	    image(pg, 0, 0);
	    image(gfx['bbyFrame'], 0, 0, gfx['bby'].width, gfx['bby'].height);
		pop();
		*/ pop();
    }
}

//# sourceMappingURL=index.25ccc3a3.js.map
