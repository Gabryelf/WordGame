class GridManager {
    constructor(gameManager) {
        this.gameManager = gameManager;
        this.size = 3;
        this.grid = [];
        this.heroX = 1;
        this.heroY = 1;
        this.combatManager = new CombatManager(gameManager);
        this.effectManager = new EffectManager();
        this.isMoving = false;
    }

    generateGrid() {
        this.grid = [];
        for (let y = 0; y < this.size; y++) {
            this.grid[y] = [];
            for (let x = 0; x < this.size; x++) {
                const tile = new Tile(x, y);
                if (x === this.heroX && y === this.heroY) {
                    tile.type = 'hero';
                    tile.content = null;
                } else {
                    tile.generateContent(this.gameManager.hero.floor);
                }
                this.grid[y][x] = tile;
            }
        }
        this.renderGrid();
    }

    renderGrid() {
        const container = document.getElementById('game-grid');
        if (!container) return;
        container.innerHTML = '';
        
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                const tile = this.grid[y][x];
                const div = document.createElement('div');
                div.className = 'tile';
                div.setAttribute('data-x', x);
                div.setAttribute('data-y', y);
                
                if (x === this.heroX && y === this.heroY) {
                    div.classList.add('hero-tile');
                    const hero = this.gameManager.hero;
                    const heroConfig = GameConfig.heroes[hero.type];
                    div.innerHTML = `
                        <img class="tile-image" src="${heroConfig.avatar}" 
                             onerror="this.style.display='none'; this.parentElement.querySelector('.tile-content-fallback').style.display='flex'">
                        <div class="tile-content-fallback" style="display:none; font-size:2rem;">🐭</div>
                        <div class="hero-stats-on-tile">
                            <span>❤️ ${hero.hp}</span>
                            <span>⚔️ ${hero.attack}</span>
                        </div>
                    `;
                } else {
                    let statsHtml = '';
                    let avatarUrl = '';
                    let fallbackIcon = '';
                    
                    if (tile.type === 'monster' && tile.content) {
                        const enemyConfig = this.getEnemyConfig(tile.content.name);
                        avatarUrl = enemyConfig.avatar;
                        fallbackIcon = enemyConfig.icon;
                        statsHtml = `<div class="tile-stats"><span>❤️ ${tile.content.hp}</span> <span>⚔️ ${tile.content.attack}</span></div>`;
                    } else if (tile.type === 'treasure') {
                        avatarUrl = GameConfig.tiles.treasure.avatar;
                        fallbackIcon = '💰';
                        statsHtml = `<div class="tile-stats"><span>💰 ${tile.content.gold}</span></div>`;
                    } else if (tile.type === 'potion') {
                        avatarUrl = GameConfig.tiles.potion.avatar;
                        fallbackIcon = '🧪';
                        statsHtml = `<div class="tile-stats"><span>🧪 +${tile.content.heal}</span></div>`;
                    } else if (tile.type === 'trap') {
                        avatarUrl = GameConfig.tiles.trap.avatar;
                        fallbackIcon = '⚠️';
                        statsHtml = `<div class="tile-stats"><span>⚠️ ${tile.content.damage}</span></div>`;
                    } else {
                        avatarUrl = GameConfig.tiles.empty.avatar;
                        fallbackIcon = '⬜';
                    }
                    
                    div.innerHTML = `
                        <img class="tile-image" src="${avatarUrl}" 
                             onerror="this.style.display='none'; this.parentElement.querySelector('.tile-content-fallback').style.display='flex'">
                        <div class="tile-content-fallback" style="display:none; font-size:2rem;">${fallbackIcon}</div>
                        ${statsHtml}
                    `;
                }
                
                const isAdjacent = (Math.abs(x - this.heroX) + Math.abs(y - this.heroY)) === 1;
                if (isAdjacent && this.gameManager.gameActive && !this.gameManager.inCombat && !this.isMoving) {
                    div.style.cursor = 'pointer';
                    div.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.moveHeroTo(x, y);
                    });
                } else {
                    div.style.cursor = 'default';
                }
                container.appendChild(div);
            }
        }
    }
    
    getEnemyConfig(enemyName) {
        const enemyMap = {
            'Goblin': GameConfig.enemies.goblin,
            'Skeleton': GameConfig.enemies.skeleton,
            'Orc': GameConfig.enemies.orc,
            'Dark Knight': GameConfig.enemies.darkKnight,
            'Dragon': GameConfig.enemies.dragon
        };
        return enemyMap[enemyName] || GameConfig.enemies.goblin;
    }

    moveHeroTo(targetX, targetY) {
        console.log('moveHeroTo called, isMoving=', this.isMoving, 'inCombat=', this.gameManager.inCombat, 'gameActive=', this.gameManager.gameActive);
        if (!this.gameManager.gameActive || this.isMoving || this.gameManager.inCombat) {
            console.log('Move blocked');
            return;
        }
        
        this.isMoving = true;
        console.log('Move started, isMoving set to true');
        
        const targetTile = this.grid[targetY][targetX];
        
        // Определяем противоположный тайл (всегда на противоположном краю сетки)
        let oppositeX, oppositeY;
        if (targetX === this.heroX && targetY === this.heroY - 1) { // движение вверх
            oppositeX = this.heroX;
            oppositeY = this.size - 1; // самый нижний ряд
        } else if (targetX === this.heroX && targetY === this.heroY + 1) { // вниз
            oppositeX = this.heroX;
            oppositeY = 0; // самый верхний ряд
        } else if (targetX === this.heroX - 1 && targetY === this.heroY) { // влево
            oppositeX = this.size - 1; // самый правый столбец
            oppositeY = this.heroY;
        } else if (targetX === this.heroX + 1 && targetY === this.heroY) { // вправо
            oppositeX = 0; // самый левый столбец
            oppositeY = this.heroY;
        }
        
        const targetElement = document.querySelector(`.tile[data-x='${targetX}'][data-y='${targetY}']`);
        if (targetElement) {
            targetElement.style.transform = 'scale(0)';
            targetElement.style.opacity = '0';
            targetElement.style.transition = 'transform 0.15s, opacity 0.15s';
        }
        
        setTimeout(() => {
            if (targetTile.type === 'monster' && targetTile.content instanceof Enemy) {
                this.handleCombat(targetTile, targetX, targetY, oppositeX, oppositeY);
            } else {
                this.handleNormalMove(targetTile, targetX, targetY, oppositeX, oppositeY);
            }
        }, 150);
    }
    
    performShift(targetX, targetY, oppositeX, oppositeY) {
        // Противоположный тайл (всегда существует, т.к. координаты в пределах 0..2)
        const oppositeTile = this.grid[oppositeY][oppositeX];
        // Создаём новый тайл для места, откуда взяли oppositeTile
        const newTileAtOpposite = new Tile(oppositeX, oppositeY);
        newTileAtOpposite.generateContent(this.gameManager.hero.floor);
        
        // Герой занимает целевой тайл (уничтожая его содержимое)
        this.grid[targetY][targetX].type = 'hero';
        this.grid[targetY][targetX].content = null;
        
        // Старая позиция героя заменяется противоположным тайлом
        const oldHeroPos = { x: this.heroX, y: this.heroY };
        this.grid[oldHeroPos.y][oldHeroPos.x] = oppositeTile;
        
        // На месте противоположного тайла создаём новый
        this.grid[oppositeY][oppositeX] = newTileAtOpposite;
        
        // Обновляем позицию героя
        this.heroX = targetX;
        this.heroY = targetY;
    }
    
    handleNormalMove(targetTile, targetX, targetY, oppositeX, oppositeY) {
        this.applyTileEffect(targetTile);
        this.performShift(targetX, targetY, oppositeX, oppositeY);
        this.completeMove();
    }
    
    handleCombat(targetTile, targetX, targetY, oppositeX, oppositeY) {
        this.gameManager.inCombat = true;
        const enemy = targetTile.content;
        
        this.combatManager.resolveCombat(
            this.gameManager.hero,
            enemy,
            () => {
                this.performShift(targetX, targetY, oppositeX, oppositeY);
                this.gameManager.inCombat = false;
                this.completeMove();
            },
            () => {
                // После поражения или отступления
                this.gameManager.inCombat = false;
                this.renderGrid();
                this.isMoving = false;
                this.gameManager.gameActive = this.gameManager.hero.isAlive(); // синхронизация
                console.log('Combat lost, isMoving reset, gameActive=' + this.gameManager.gameActive);
                if (!this.gameManager.hero.isAlive()) {
                    this.gameManager.gameOver();
                }
            },
            this.effectManager
        );
    }
    
    
    completeMove() {
        console.log('completeMove called, rendering grid...');
        
        // Синхронный рендер сетки (без промисов)
        this.renderGrid();
        
        // Анимация появления - оставляем, но делаем её неблокирующей
        document.querySelectorAll('.tile:not(.hero-tile)').forEach(tile => {
            tile.style.transform = 'scale(0.8)';
            tile.style.opacity = '0';
            setTimeout(() => {
                if (tile) {
                    tile.style.transition = 'transform 0.15s, opacity 0.1s';
                    tile.style.transform = 'scale(1)';
                    tile.style.opacity = '1';
                    setTimeout(() => {
                        if (tile) tile.style.transition = '';
                    }, 150);
                }
            }, 50);
        });
        
        // Обновляем этаж и характеристики героя
        if (this.gameManager.hero.isAlive()) {
            this.gameManager.hero.floor++;
            const healAmount = Math.floor(this.gameManager.hero.maxHp * 0.1);
            this.gameManager.hero.hp = Math.min(this.gameManager.hero.hp + healAmount, this.gameManager.hero.maxHp);
            this.gameManager.hero.updateUI();
            Utils.showToast(`⬆️ Floor ${this.gameManager.hero.floor} (+${healAmount} HP)`);
        }
        
        // КРИТИЧЕСКИ ВАЖНО: принудительно сбрасываем флаги
        this.isMoving = false;
        this.gameManager.inCombat = false;
        this.gameManager.gameActive = true;   // убеждаемся, что игра активна
        
        console.log('completeMove finished, isMoving=false, inCombat=false, gameActive=' + this.gameManager.gameActive);
        
        // Дополнительно: перепривязываем обработчики кликов через небольшую задержку (на случай, если анимация ещё идёт)
        setTimeout(() => {
            // Кликабельность уже настроена в renderGrid, но повторно вызовем рендер для синхронизации
            this.renderGrid();
        }, 200);
    }
    
    applyTileEffect(tile) {
        const hero = this.gameManager.hero;
        
        switch (tile.type) {
            case 'treasure':
                hero.addScore(tile.content.gold);
                Utils.showToast(`💰 +${tile.content.gold} points!`);
                break;
            case 'trap':
                hero.takeDamage(tile.content.damage);
                Utils.showToast(`⚠️ Trap! -${tile.content.damage} HP`);
                hero.updateUI();
                break;
            case 'potion':
                hero.heal(tile.content.heal);
                hero.updateUI();
                break;
            case 'empty':
                Utils.showToast("Empty room.");
                break;
        }
    }
}