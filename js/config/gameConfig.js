const GameConfig = {
    gridSize: 3,
    tileSize: { width: 100, height: 100 },
    
    heroes: {
        warrior: { 
            name: 'Warrior', 
            maxHp: 30, 
            baseAttack: 8, 
            icon: '⚔️',
            avatar: 'assets/heroes/warrior.gif'
        },
        rogue: { 
            name: 'Rogue', 
            maxHp: 22, 
            baseAttack: 10, 
            icon: '🗡️',
            avatar: 'assets/heroes/rogue.gif'
        },
        mage: { 
            name: 'Mage', 
            maxHp: 18, 
            baseAttack: 12, 
            icon: '🔮',
            avatar: 'assets/heroes/mage.gif'
        }
    },
    
    enemies: {
        goblin: { 
            name: 'Goblin', 
            icon: '👺', 
            avatar: 'assets/enemies/goblin.gif',
            baseHp: 15, 
            baseAtk: 5, 
            exp: 20 
        },
        skeleton: { 
            name: 'Skeleton', 
            icon: '💀', 
            avatar: 'assets/enemies/skeleton.gif',
            baseHp: 20, 
            baseAtk: 7, 
            exp: 30 
        },
        orc: { 
            name: 'Orc', 
            icon: '👹', 
            avatar: 'assets/enemies/orc.gif',
            baseHp: 30, 
            baseAtk: 10, 
            exp: 50 
        },
        darkKnight: { 
            name: 'Dark Knight', 
            icon: '🗡️', 
            avatar: 'assets/enemies/dark_knight.gif',
            baseHp: 40, 
            baseAtk: 12, 
            exp: 70 
        },
        dragon: { 
            name: 'Dragon', 
            icon: '🐉', 
            avatar: 'assets/enemies/dragon.gif',
            baseHp: 60, 
            baseAtk: 15, 
            exp: 100 
        }
    },
    
    tiles: {
        treasure: { 
            icon: '💰', 
            avatar: 'assets/tiles/treasure.gif',
            effect: 'gold' 
        },
        trap: { 
            icon: '⚠️', 
            avatar: 'assets/tiles/trap.gif',
            effect: 'damage' 
        },
        potion: { 
            icon: '🧪', 
            avatar: 'assets/tiles/potion.gif',
            effect: 'heal' 
        },
        empty: { 
            icon: '⬜', 
            avatar: 'assets/tiles/empty.gif',
            effect: 'none' 
        }
    },
    
    animations: {
        tileRemoveDelay: 150
    },
    
    assetsPath: {
        effects: {
            heal: 'assets/effects/heal.gif',
            damage: 'assets/effects/damage.gif',
            gold: 'assets/effects/gold.gif',
            critical: 'assets/effects/critical.gif'
        }
    }
};

window.GameConfig = GameConfig;