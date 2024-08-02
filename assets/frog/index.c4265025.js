/* housekeeping */ function camelizeDashes(string) {
    return string.replace(/-([a-z])/g, (g)=>g[1].toUpperCase()
    );
}
function clamp(number, min, max) {
    return Math.min(Math.max(number, min), max);
}
function easeOutQuad(x) {
    return 1 - (1 - x) * (1 - x);
}
function setLineDash(list) {
    drawingContext.setLineDash(list);
}
function pointTest(x, y, w, h, x1, y1) {
    return x1 >= x && x1 <= x + w && y1 >= y && y1 <= y + h;
}
function rectTest(x1, y1, w1, h1, x2, y2, w2, h2) {
    rectangle = [
        x1,
        y1,
        w1,
        h1
    ];
    left = x2;
    right = x2 + w2;
    up = y2;
    bottom = y2 + h2;
    return pointTest(...rectangle, left, up) || pointTest(...rectangle, right, up) || pointTest(...rectangle, left, bottom) || pointTest(...rectangle, right, bottom);
}

//# sourceMappingURL=index.c4265025.js.map
