class Quest {
    constructor(assignee, initializer, handler, successHandler, questMessage, draw){
        this.assignee = assignee;
        this.initializer = initializer;
        this.handler = handler;
        this.successHandler = successHandler;
        this.questMessage = questMessage;
        this.message = questMessage;
        this.draw = draw;
        this.success = false;
        this.successHandled = false;
        this.calcGUIBounds();
        this.initializer();
    }
    calcGUIBounds() {
        this.questBoxPos = [
            screenSizeX - gfx['flyBar'].width - 5,
            1 * screenSizeY / 16
        ];
        this.questBoxSize = [
            gfx['flyBar'].width,
            screenSizeY / 4
        ];
        this.questBoxMargin = 6;
        this.gui = new GUIWindow(...this.questBoxPos, ...this.questBoxSize, this.questBoxMargin, 'Quest', this.message);
    }
    frame() {
        this.gui.message = this.message;
        if (!this.success) this.handler();
        else this.successHandler();
        return this.success;
    }
}
class FlyQuest extends Quest {
    constructor(assignee){
        super(assignee, function() {
            this.fliesEaten = 0;
            this.needToEat = 3;
            this.flyEaten = false;
        }, function() {
            if (!this.flyEaten && this.assignee.character.ateThisFrame && this.assignee.character.foodName == 'fly') {
                this.flyEaten = true;
                this.fliesEaten++;
            } else if (this.flyEaten && !this.assignee.character.ateThisFrame) this.flyEaten = false;
            if (this.fliesEaten >= this.needToEat) {
                this.success = true;
                this.successHandler();
            }
            this.message = this.questMessage + `\n${this.fliesEaten} / ${this.needToEat}`;
        }, function() {
            if (!this.successHandled) {
                this.successHandled = true;
                this.message = 'Blessed!';
                generalState.wizardAnim();
            }
        }, 'Eat 3 flies!', function(gfx, opacity) {
            for(let i = 0; i < this.needToEat; i++){
                push();
                translate(this.gui.x + this.gui.w / 2 - 1.5 * gfx['fly'].width, this.gui.y + 4 * this.gui.h / 5);
                tint(255, opacity * (.5 + .5 * (i < this.fliesEaten ? 1 : 0)));
                image(gfx['fly'], gfx['fly'].width * i, 0);
                pop();
            }
        });
    }
}

//# sourceMappingURL=index.0e154989.js.map
