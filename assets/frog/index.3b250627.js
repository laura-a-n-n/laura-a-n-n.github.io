class Bug {
    constructor(environment, sprite, lily, bugScale = 1, type = 'fly'){
        this.environment = environment;
        this.type = type;
        this.sprite = sprite;
        this.bugScale = bugScale;
        // bug stuff > = <
        this.edible = true;
        this.nutrition = 20;
        this.destroyed = false;
        // position
        this.lily = lily;
        let position = this.environment.getLilyPos(this.lily);
        if (type == 'fly') this.offY = 30;
        else this.offY = this.dimY / 3;
        this.posY = position[1] - this.offY;
        // animation
        this.bugFrame = 0;
        this.bugMax = 1;
        this.bugToggle = 1;
        this.maxFrames = 60;
    }
    get posX() {
        return this.environment.getLilyPos(this.lily)[0] + this.environment.lilyDimX / 2 - this.dimX / 2;
    }
    get dimX() {
        return this.bugScale * this.sprite.width;
    }
    get dimY() {
        return this.bugScale * this.sprite.height;
    }
    isTouched(obj) {
        return obj.lily == this.lily; //rectTest(this.posX, this.posY, this.sprite.width, this.sprite.height,
    //         obj.posX, obj.posY, obj.sprite.width, obj.sprite.height);
    }
    frame(predators) {
        if (this.type == 'fly') this.posY += this.bugMax * this.bugToggle / 5;
        if (this.bugFrame > this.maxFrames - 2) this.bugToggle *= -1;
        this.bugFrame++;
        this.bugFrame %= 60;
        for (const predator of predators)if (this.isTouched(predator) && predator.canEat && this.edible) {
            predator.hunger -= this.nutrition;
            predator.ateThisFrame = true;
            predator.foodName = this.type;
            this.destroyed = true;
            this.edible = false;
        }
    }
}

//# sourceMappingURL=index.3b250627.js.map
