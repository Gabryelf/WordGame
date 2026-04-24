class Hero {
    constructor(type) {
        this.type = type;
        this.maxHp = 0;
        this.hp = 0;
        this.baseAttack = 0;
        this.attack = 0;
        this.icon = '';
        this.score = 0;
        this.enemiesKilled = 0;
        this.floor = 1;
        this.initStats();
    }
    initStats() {
        if (this.type === 'warrior') {
            this.maxHp = 30;
            this.baseAttack = 8;
            this.icon = '⚔️';
        } else if (this.type === 'rogue') {
            this.maxHp = 22;
            this.baseAttack = 10;
            this.icon = '🗡️';
        } else {
            this.maxHp = 18;
            this.baseAttack = 12;
            this.icon = '🔮';
        }
        this.hp = this.maxHp;
        this.attack = this.baseAttack;
    }
    takeDamage(amount) {
        this.hp -= amount;
        if (this.hp < 0) this.hp = 0;
        return this.hp <= 0;
    }
    heal(amount) {
        this.hp = Math.min(this.hp + amount, this.maxHp);
        Utils.showToast(`🧪 Healed +${amount} HP`);
    }
    addScore(points) {
        this.score += points;
        this.updateUI();
    }
    addKill() {
        this.enemiesKilled++;
        this.updateUI();
    }
    nextFloor() {
        this.floor++;
        const healAmount = Math.floor(this.maxHp * 0.1);
        this.heal(healAmount);
        Utils.showToast(`⬆️ Floor ${this.floor} (+${healAmount} HP)`);
        this.updateUI();
    }
    getAttackDamage() {
        let damage = this.attack;
        if (this.type === 'rogue' && Utils.chance(25)) {
            damage = Math.floor(damage * 1.5);
            Utils.showToast('🗡️ Critical strike!');
        }
        if (this.type === 'mage' && Utils.chance(20)) {
            damage = Math.floor(damage * 1.3);
            Utils.showToast('🔮 Magic surge!');
        }
        return damage;
    }
    updateUI() {
        const hpSpan = document.getElementById('hp-text');
        const atkSpan = document.getElementById('atk-value');
        const scoreSpan = document.getElementById('score-value');
        const floorSpan = document.getElementById('floor-num');
        if (hpSpan) hpSpan.innerText = this.hp;
        if (atkSpan) atkSpan.innerText = this.attack;
        if (scoreSpan) scoreSpan.innerText = this.score;
        if (floorSpan) floorSpan.innerText = this.floor;
        const hpMaxSpan = document.getElementById('hp-max');
        if (hpMaxSpan) hpMaxSpan.innerText = this.maxHp;
    }
    isAlive() {
        return this.hp > 0;
    }
}