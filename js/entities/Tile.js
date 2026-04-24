class Tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = 'empty';
        this.icon = '⬜';
        this.content = null;
    }
    generateContent(floor) {
        const r = Utils.randomRange(1, 100);
        if (r <= 45) {
            this.type = 'empty';
            this.icon = '⬜';
        } else if (r <= 65) {
            this.type = 'treasure';
            this.icon = '💰';
            this.content = { gold: Utils.randomRange(10, 50) + floor * 5 };
        } else if (r <= 85) {
            this.type = 'monster';
            this.icon = '👾';
            this.content = Enemy.generateRandom(floor);
        } else if (r <= 95) {
            this.type = 'trap';
            this.icon = '⚠️';
            this.content = { damage: Utils.randomRange(5, 15) + floor };
        } else {
            this.type = 'potion';
            this.icon = '🧪';
            this.content = { heal: Utils.randomRange(10, 30) };
        }
    }
}