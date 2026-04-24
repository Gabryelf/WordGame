class GameManager {
    constructor() {
        this.hero = null;
        this.gridManager = null;
        this.gameActive = false;
        this.inCombat = false;
        this.selectedHero = null;
        this.effectManager = new EffectManager(); // Исправлено: AnimationManager -> EffectManager
    }

    init() {
        this.setupEventListeners();
        this.showScreen('menu');
    }

    setupEventListeners() {
        document.querySelectorAll('.hero-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.hero-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.selectedHero = card.dataset.hero;
                document.getElementById('start-game-btn').disabled = false;
            });
        });
        document.getElementById('start-game-btn').addEventListener('click', () => {
            if (this.selectedHero) this.startGame(this.selectedHero);
        });
        document.getElementById('reset-game-btn').addEventListener('click', () => {
            if (this.selectedHero) this.startGame(this.selectedHero);
        });
        document.getElementById('menu-btn').addEventListener('click', () => this.showScreen('menu'));
        document.getElementById('gameover-menu-btn').addEventListener('click', () => this.showScreen('menu'));
        document.getElementById('play-again-btn').addEventListener('click', () => {
            if (this.selectedHero) this.startGame(this.selectedHero);
        });
    }

    startGame(heroType) {
        this.hero = new Hero(heroType);
        this.gridManager = new GridManager(this);
        this.gameActive = true;
        this.inCombat = false;
        document.getElementById('hero-icon-header').innerText = this.hero.icon;
        document.getElementById('hero-name-header').innerText = heroType.charAt(0).toUpperCase() + heroType.slice(1);
        document.getElementById('hp-max').innerText = this.hero.maxHp;
        this.hero.updateUI();
        this.gridManager.generateGrid();
        this.showScreen('game');
    }

    showScreen(screenName) {
        ['menu', 'game', 'gameover'].forEach(s => {
            const el = document.getElementById(`${s}-screen`);
            if (el) el.classList.remove('active');
        });
        const active = document.getElementById(`${screenName}-screen`);
        if (active) active.classList.add('active');
    }

    gameOver() {
        this.gameActive = false;
        document.getElementById('final-floor').innerText = this.hero.floor;
        document.getElementById('final-score').innerText = this.hero.score;
        document.getElementById('enemies-killed').innerText = this.hero.enemiesKilled;
        this.showScreen('gameover');
    }
}