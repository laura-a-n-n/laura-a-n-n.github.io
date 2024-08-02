class GUIWindow {
    constructor(x, y, w, h, margin, title, message){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.margin = margin;
        this.title = title;
        this.message = message;
    }
    draw(opacity) {
        push();
        stroke(0, opacity);
        fill(0, opacity);
        rect(this.x, this.y, this.w, this.h);
        fill(255, opacity);
        textSize(24);
        textFont(pixelFont);
        text(this.title, this.x + this.margin, this.y + 3 * this.margin);
        fill(255, opacity);
        rect(this.x, this.y + 5 * this.margin, this.w, this.h - 5 * this.margin);
        fill(0, opacity);
        textSize(24);
        textAlign(CENTER);
        text(this.message, this.x + this.w / 2, this.y + this.h / 3 + 2 * this.margin);
        pop();
    }
}

//# sourceMappingURL=index.eaa31969.js.map
