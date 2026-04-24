class Enemy {
    constructor(name, hp, attack, exp, icon) {
        this.name = name;
        this.maxHp = hp;
        this.hp = hp;
        this.attack = attack;
        this.exp = exp;
        this.icon = icon;
    }
    static generateRandom(floor) {
        const enemies = [
            { name: 'Goblin', baseHp: 15, baseAtk: 5, exp: 20, icon: '👺' },
            { name: 'Skeleton', baseHp: 20, baseAtk: 7, exp: 30, icon: '💀' },
            { name: 'Orc', baseHp: 30, baseAtk: 10, exp: 50, icon: '👹' },
            { name: 'Dark Knight', baseHp: 40, baseAtk: 12, exp: 70, icon: '🗡️' }
        ];
        let idx = 0;
        if (floor >= 3) idx = Math.min(floor - 2, enemies.length-1);
        const e = enemies[idx];
        const hpScale = 1 + (floor-1)*0.15;
        const atkScale = 1 + (floor-1)*0.1;
        return new Enemy(e.name, Math.floor(e.baseHp*hpScale), Math.floor(e.baseAtk*atkScale), Math.floor(e.exp*(1+floor*0.1)), e.icon);
    }
    takeDamage(amount) {
        this.hp -= amount;
        return this.hp <= 0;
    }
}