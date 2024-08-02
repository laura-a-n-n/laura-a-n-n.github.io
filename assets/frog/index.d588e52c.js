function OpenLinear() {
    generalState.bg = gfx['bg-2'];
    generalState.bgScale = 1;
    generalState.drawBackground = drawBackground;
    Object.assign(this, generalState);
    this.envFunction = linearEnvironment;
    this.particularSetup = function() {
        player.assignQuest(FlyQuest);
        /* ~ bugs ~ */ // make an fly!
        bugIndices = [];
        for(let i = 0; i < 10; i++){
            subtract = lilies.negativeLilies ? 25 : -startLily;
            bugIndex = Math.floor(Math.random() * 50) - subtract;
            if (bugIndices.indexOf(bugIndex) < 0 && bugIndex != startLily) {
                bugIndices.push(bugIndex);
                bugs.push(new Bug(lilies, gfx['fly'], bugIndex));
            }
        }
    };
}

//# sourceMappingURL=index.d588e52c.js.map
