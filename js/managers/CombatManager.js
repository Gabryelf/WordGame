class CombatManager {
    constructor(gameManager) {
        this.gameManager = gameManager;
    }

    resolveCombat(hero, enemy, onWin, onLose, effectManager) {
        console.log('Combat started with', enemy.name);
        
        let heroDamage = hero.getAttackDamage();
        let enemyDied = enemy.takeDamage(heroDamage);
        
        Utils.showToast(`⚔️ You hit ${enemy.name} for ${heroDamage} damage!`);
        
        if (enemyDied) {
            Utils.showToast(`✅ ${enemy.name} defeated! +${enemy.exp} points`);
            hero.addScore(enemy.exp);
            hero.addKill();
            onWin();
            return;
        }
        
        // Враг атакует
        let enemyDamage = Utils.randomRange(enemy.attack - 2, enemy.attack + 2);
        let heroDied = hero.takeDamage(enemyDamage);
        hero.updateUI();
        Utils.showToast(`💥 ${enemy.name} hits you for ${enemyDamage} damage!`);
        
        if (heroDied) {
            Utils.showToast(`💀 You were slain by ${enemy.name}...`);
            this.gameManager.gameOver();
            onLose();
            return;
        }
        
        Utils.showToast(`You retreat from ${enemy.name}`);
        onLose();
    }
}