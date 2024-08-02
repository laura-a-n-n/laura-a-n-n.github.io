var cl_mouseWasPressed = !1, cl_lastHovered = null, cl_lastClicked = null, cl_clickables = [];
function getTextBounds(t, i, e) {
    let s = document.createElement("span");
    document.body.appendChild(s), s.style.font = i, s.style.fontSize = e + "px", s.style.height = "auto", s.style.width = "auto", s.style.position = "absolute", s.style.whiteSpace = "no-wrap", s.innerHTML = t;
    let h = Math.ceil(s.clientWidth), l = Math.ceil(s.clientHeight);
    return document.body.removeChild(s), [
        h,
        l
    ];
}
function Clickable() {
    this.x = 0, this.y = 0, this.width = 100, this.height = 50, this.color = "#FFFFFF", this.cornerRadius = 10, this.strokeWeight = 2, this.stroke = "#000000", this.text = "Press Me", this.textColor = "#000000", this.textSize = 12, this.textFont = "sans-serif", this.textScaled = !1, this.image = null, this.fitImage = !1, this.imageScale = 1, this.tint = null, this.noTint = !0, this.filter = null, this.updateTextSize = function() {
        if (this.textScaled) {
            for(let t = this.height; t > 0; t--)if (getTextBounds(this.text, this.textFont, t)[0] <= this.width && getTextBounds(this.text, this.textFont, t)[1] <= this.height) {
                console.log("textbounds: " + getTextBounds(this.text, this.font, t)), console.log("boxsize: " + this.width + ", " + this.height), this.textSize = t / 2;
                break;
            }
        }
    }, this.updateTextSize(), this.onHover = function() {}, this.onOutside = function() {}, this.onPress = function() {}, this.onRelease = function() {}, this.locate = function(t, i) {
        this.x = t, this.y = i;
    }, this.resize = function(t, i) {
        this.width = t, this.height = i, this.updateTextSize();
    }, this.drawImage = function() {
        push(), imageMode(CENTER);
        let t = this.x + this.width / 2, i = this.y + this.height / 2, e = this.width, s = this.height;
        if (this.fitImage) {
            let t = this.image.width / this.image.height, i = this.width / this.height;
            t > i ? (e = this.width, s = this.height * (i / t)) : (e = this.width * (t / i), s = this.height);
        }
        image(this.image, t, i, e * this.imageScale, s * this.imageScale), this.tint && !this.noTint ? tint(this.tint) : noTint(), this.filter && filter(this.filter), pop();
    }, this.draw = function() {
        push(), fill(this.color), stroke(this.stroke), strokeWeight(this.strokeWeight), rect(this.x, this.y, this.width, this.height, this.cornerRadius), fill(this.textColor), noStroke(), this.image && this.drawImage(), textAlign(CENTER, CENTER), textSize(this.textSize), textFont(this.textFont), text(this.text, this.x + this.width / 2, this.y + this.height / 2), mouseX >= this.x && mouseY >= this.y && mouseX < this.x + this.width && mouseY < this.y + this.height && (cl_lastHovered = this, mouseIsPressed && !cl_mouseWasPressed && (cl_lastClicked = this)), pop();
    }, cl_clickables.push(this);
}
p5.prototype.runGUI = function() {
    for(i = 0; i < cl_clickables.length; ++i)cl_lastHovered != cl_clickables[i] && cl_clickables[i].onOutside();
    null != cl_lastHovered && cl_lastClicked != cl_lastHovered && cl_lastHovered.onHover(), cl_mouseWasPressed || null == cl_lastClicked || cl_lastClicked.onPress(), cl_mouseWasPressed && !mouseIsPressed && null != cl_lastClicked && (cl_lastClicked == cl_lastHovered && cl_lastClicked.onRelease(), cl_lastClicked = null), cl_lastHovered = null, cl_mouseWasPressed = mouseIsPressed;
}, p5.prototype.registerMethod("post", p5.prototype.runGUI);

//# sourceMappingURL=index.2fbe35c8.js.map
