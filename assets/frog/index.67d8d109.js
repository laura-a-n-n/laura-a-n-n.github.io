class GUI {
    constructor(){
        this.initialize();
        this.calculate();
        this.cyclicMode = false;
    }
    initialize(vals = [
        1,
        2,
        3,
        4
    ]) {
        this.init = {};
        this.init['quickFrog'] = {
            'draw': false,
            'obj': {}
        };
        const guiRef = this;
        for (const [j, letter] of Object.entries([
            'Q',
            'W',
            'E',
            'R'
        ])){
            const i = vals[Number(j)];
            this.init['quickFrog']['obj'][letter + 'Button'] = {
                frogBound: i,
                x: Number(j) / 8 + Number(j) / 128,
                y: 1 / 32,
                width: 0.125,
                aspect: 'square',
                image: gfx['bby'],
                fitImage: false,
                imageScale: .25,
                stroke: color(0, 0),
                textColor: '#000',
                textFont: pixelFont,
                textSize: 32,
                textScaled: true,
                text: '\n\n' + i.toString(),
                onOutside: function() {
                    if (!buttonPressed && puzzleMode) {
                        cursor('default');
                        this.color = color(0, 0);
                        frog.type = 0;
                    }
                },
                onHover: function() {
                    if (!buttonPressed && puzzleMode) {
                        cursor('grab');
                        this.color = 'rgba(100, 100, 100, .8)';
                        frog.type = this.frogBound;
                    }
                },
                onPress: function() {
                    if (!buttonPressed && puzzleMode) {
                        buttonPressed = true;
                        frog.type = this.frogBound;
                        this.color = 'rgba(100, 255, 100, 1)';
                        //if (!guiRef.cyclicMode)
                        controlsEnabled = true;
                    }
                }
            };
        }
        this.init['buttons'] = {
            draw: false,
            obj: {
                'inventoryButton': {
                    x: 1 / 64,
                    y: 1 / 32,
                    width: 1 / 24,
                    aspect: 'square',
                    image: gfx['inventoryButton'],
                    fitImage: true,
                    text: '',
                    onOutside: function() {
                        this.color = '#000';
                    },
                    onHover: function() {
                        this.color = '#222';
                    },
                    onRelease: function() {
                        player.gui.obj.quickFrog.draw = !player.gui.obj.quickFrog.draw;
                    }
                }
            }
        };
    }
    calculate() {
        this.obj = {};
        for (const [typeName, objType] of Object.entries(this.init)){
            this.obj[typeName] = {
                draw: objType.draw,
                obj: {}
            };
            for (const [objName, obj] of Object.entries(objType.obj)){
                // scale to canvas size
                obj.x *= screenSizeX;
                obj.y *= screenSizeY;
                obj.width *= screenSizeX;
                if (obj.aspect == 'square') obj.height = obj.width;
                else obj.height *= screenSizeY;
                // copy properties to Clickable object
                this.obj[typeName]['obj'][objName] = new Clickable();
                Object.assign(this.obj[typeName]['obj'][objName], obj);
            }
        }
    }
    // frame() 
    draw() {
        for (const [typeName, objType] of Object.entries(this.obj)){
            if (objType.draw) for (const [objName, obj] of Object.entries(objType['obj']))obj.draw();
        }
    }
}

//# sourceMappingURL=index.67d8d109.js.map
