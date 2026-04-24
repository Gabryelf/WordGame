class EffectManager {
    constructor() {
        this.activeEffects = new Set();
        this.assetCache = new Map();
    }

    // Загрузка изображения/GIF
    loadAsset(url) {
        if (this.assetCache.has(url)) {
            return Promise.resolve(this.assetCache.get(url));
        }
        
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.assetCache.set(url, img);
                resolve(img);
            };
            img.onerror = reject;
            img.src = url;
        });
    }

    // Встряска тайла
    shakeTile(element) {
        if (!element) return;
        element.classList.add('shake');
        setTimeout(() => element.classList.remove('shake'), 200);
    }

    // Вспышка урона
    flashDamage(element) {
        if (!element) return;
        element.classList.add('damage-flash');
        setTimeout(() => element.classList.remove('damage-flash'), 250);
    }

    // Анимация получения сокровища
    popCoin(element) {
        if (!element) return;
        element.classList.add('coin-pop');
        setTimeout(() => element.classList.remove('coin-pop'), 300);
    }

    // Анимация лечения
    glowHeal(element) {
        if (!element) return;
        element.classList.add('heal-glow');
        setTimeout(() => element.classList.remove('heal-glow'), 400);
    }

    // Эффект критического удара
    criticalHit(element) {
        if (!element) return;
        element.classList.add('critical-hit');
        setTimeout(() => element.classList.remove('critical-hit'), 300);
    }

    // Партиклы с возможностью использовать GIF
    async particles(x, y, type, useGif = false) {
        const container = document.getElementById('game-grid');
        if (!container) return;
        
        const rect = container.getBoundingClientRect();
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.left = `${rect.left + x}px`;
        particle.style.top = `${rect.top + y}px`;
        particle.style.width = '40px';
        particle.style.height = '40px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        if (useGif && GameConfig.assetsPath.effects[type]) {
            const img = await this.loadAsset(GameConfig.assetsPath.effects[type]);
            particle.appendChild(img.cloneNode());
            img.style.width = '100%';
            img.style.height = '100%';
        } else {
            particle.style.borderRadius = '50%';
            if (type === 'gold') {
                particle.style.background = '#ffd966';
                particle.style.boxShadow = '0 0 6px gold';
            } else if (type === 'heal') {
                particle.style.background = '#4aff6e';
                particle.style.boxShadow = '0 0 6px #4aff6e';
            } else if (type === 'damage') {
                particle.style.background = '#ff5555';
                particle.style.boxShadow = '0 0 6px red';
            }
            particle.style.width = '8px';
            particle.style.height = '8px';
        }
        
        document.body.appendChild(particle);
        particle.animate([
            { transform: 'translate(0, 0)', opacity: 1 },
            { transform: 'translate(20px, -30px)', opacity: 0 }
        ], {
            duration: 500,
            easing: 'ease-out'
        });
        setTimeout(() => particle.remove(), 500);
    }

    // Анимация появления тайла
    appearTile(element) {
        if (!element) return;
        element.style.transform = 'scale(0.8)';
        element.style.opacity = '0';
        element.offsetHeight;
        element.style.transition = 'transform 0.15s ease-out, opacity 0.1s';
        element.style.transform = 'scale(1)';
        element.style.opacity = '1';
        setTimeout(() => {
            element.style.transition = '';
        }, 200);
    }

    // Анимация урона по врагу (GIF атаки)
    async animateAttack(targetElement, isCritical = false) {
        if (!targetElement) return;
        targetElement.classList.add('attack-flash');
        if (isCritical) {
            this.criticalHit(targetElement);
        }
        setTimeout(() => targetElement.classList.remove('attack-flash'), 200);
    }
    
    // Анимация исчезновения врага
    vanishEnemy(element) {
        if (!element) return;
        element.style.transition = 'transform 0.2s, opacity 0.2s';
        element.style.transform = 'scale(0) rotate(10deg)';
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.transform = '';
            element.style.opacity = '';
            element.style.transition = '';
        }, 200);
    }
}

window.EffectManager = EffectManager;