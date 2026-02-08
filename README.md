<details> <summary><strong>📁 Часть 1: Подготовка проекта</strong></summary>
  
- [ ] Шаг 1.1: Изучаем структуру
  
````text
word-wonders/
├── index.html              # Основной HTML файл
├── css/
│   ├── main.css           # Основные глобальные стили
│   └── components.css     # Стили отдельных компонентов
├── js/
│   ├── config.js          # Конфигурационные константы
│   ├── utils.js           # Вспомогательные функции
│   ├── game.js            # Игровая логика (ядро)
│   └── ui.js              # Управление интерфейсом
└── data/
    └── words.js           # Словарь слов и данные
````

- [ ] Шаг 1.2: Создание основной структуры в index.html
  
````html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Word Wonders</title>
</head>
<body>
    <!-- Главное меню -->
    <div id="mainScreen" class="screen active">
        
    </div>
    <!-- Игровой экран -->
    <div id="gameScreen" class="screen">
        
    </div>
    <!-- Экран результатов -->
    <div id="resultScreen" class="screen">
       
    </div>
</body>
</html>
````
- [ ] Шаг 1.3: Подключение ссылок на остальные скрипты в index.html

````html
<!-- Сначала стили -->
<link rel="stylesheet" href="css/main.css">
<link rel="stylesheet" href="css/components.css">

<!-- Потом скрипты в правильном порядке -->
<script src="data/words.js"></script>  <!-- 1. Данные -->
<script src="js/config.js"></script>   <!-- 2. Конфигурация -->
<script src="js/utils.js"></script>    <!-- 3. Утилиты -->
<script src="js/game.js"></script>     <!-- 4. Логика -->
<script src="js/ui.js"></script>       <!-- 5. Интерфейс -->
````

- [ ] Шаг 1.4: Наполняем index.html содержимым контейнеров

**Главное меню - стартовый экран**
````html
<!-- Главное меню -->
    <div id="mainScreen" class="screen active">
        <!-- Header -->
        <div class="logo">
            <h1>WORD WONDERS</h1>
            <p>Собирай слова из букв</p>
        </div>
        <!-- Start Buttons -->
        <div class="mode-buttons">
            <button id="infiniteMode" class="mode-btn">
                <div>Бесконечная игра</div>
                <div class="subtitle">Уровни со сложностью</div>
            </button>
            
            <button id="dailyMode" class="mode-btn">
                <div>Слово дня</div>
                <div class="subtitle">Новая тема каждый день</div>
            </button>
        </div>
    </div>
````

**Игровой контейнер**
````html
<!-- Игровой экран -->
    <div id="gameScreen" class="screen">
        <!-- Header ststs -->
        <div class="game-header">
            <button id="backBtn" class="icon-btn">←</button>
            <div class="stats">
                <div class="stat">🎯 <span id="currentLevel">1</span></div>
                <div class="stat">⭐ <span id="score">0</span></div>
                <div class="stat">❤️ <span id="attempts">5</span></div>
            </div>
            <button id="resetBtn" class="icon-btn">↺</button>
        </div>
        <!-- Word area -->
        <div class="words-area">
            <div id="wordsGrid"></div>
            <div class="word-info" id="wordInfo">Найди все слова</div>
        </div>
        <!-- Input area -->
        <div class="input-area">
            <div id="currentInput" class="current-input"></div>
            <div class="circle-input" id="circleInput"></div>
        </div>
    </div>
````

**Событийный контейнер сообщений**
````html
<!-- Экран результатов -->
    <div id="resultScreen" class="screen">
        <div id="resultIcon" class="result-icon">🎉</div>
        <h2 id="resultTitle">Уровень пройден!</h2>
        <p id="resultMessage">Отлично!</p>

        <div class="result-stats">
            <div>Найдено слов: <span id="resultFound">0/0</span></div>
            <div>Заработано очков: <span id="resultScore">0</span></div>
            <div>Новый уровень: <span id="resultNextLevel">2</span></div>
        </div>

        <div class="result-buttons">
            <button id="nextLevelBtn" class="btn btn-primary">Следующий уровень</button>
            <button id="backToMenuBtn" class="btn btn-secondary">В меню</button>
        </div>
    </div>
````
- [ ] Шаг 1.5: Проверяем результат в браузере с запуском index.html
</details>

<details> <summary><strong>🎨 Часть 2: Создание базовых стилей</strong></summary>

- [ ] Шаг 2.1: Открываем и заполняем файл main.css основными стилями
````css
/* Основные стили */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #0f172a 0%, #2d4263 100%);
    color: #f8fafc;
    height: 100vh;
    overflow: hidden;
    touch-action: manipulation;
}

/* Стили экранов */
.screen {
    display: none;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    flex-direction: column;
}

.screen.active {
    display: flex;
}
````

- [ ] Шаг 2.2: Открываем файл components.css и заполняем стилями для элементов

````css
/* Задайте свои стили для главных кнопок*/
.mode-btn {
    ...
}

.mode-btn:first-child {
    animation-delay: 0.1s;
}

.mode-btn:last-child {
    animation-delay: 0.2s;
}

.mode-btn:active {
    transform: scale(0.98);
}

.mode-btn:hover {
    background-color: #6f18c0;
}
/* Остальные кнопки потом зададим ниже*/
````

- [ ] Шаг 2.3: Проверка и отладка стилей - запускаем index.html в браузере

**Смотрим на результат стилизации**

**Редактируем если надо**

**Проверяем работоспособность стилевых событий**

</details>

<details> <summary><strong>⚙️ Часть 3: Настройка конфигурации</strong></summary>

- [ ] Шаг 3.1: Создание глобальных настроек для приложения config.js

````javascript
// Конфигурация игры
const CONFIG = {
    // Настройки игры
    INITIAL_LEVEL: 1,
    INITIAL_SCORE: 0,
    INITIAL_ATTEMPTS: 5,
    MAX_LEVEL: 50,
    
    // Настройки генерации уровней
    MIN_WORDS_PER_LEVEL: 3,
    MAX_WORDS_PER_LEVEL: 5,
    MAX_LETTERS_IN_CIRCLE: 8,
    CIRCLE_RADIUS: 75,
    CIRCLE_CENTER_X: 110,
    CIRCLE_CENTER_Y: 110,
    
    // Настройки очков
    POINTS_PER_LETTER: 10,
    BONUS_PER_LEVEL: 100,
    
    // Настройки сложности
    LEVEL_MULTIPLIER: 0.1,
    ATTEMPTS_PER_LEVEL: 1,
    
    // Настройки интерфейса
    LETTER_CELL_SIZE: 40,
    INPUT_LETTER_SIZE: 45,
    CIRCLE_LETTER_SIZE: 45
};
````

- [ ] Шаг 3.2: Создание конструктора приложения game.js главного файла

````javascript
// Основная логика игры
class Game {
    constructor() {
        this.state = {
            mode: 'infinite',
            level: CONFIG.INITIAL_LEVEL,
            score: CONFIG.INITIAL_SCORE,
            attempts: CONFIG.INITIAL_ATTEMPTS,
            currentInput: [],
            foundWords: [],
            levelData: null,
            dailyCompleted: false,
            dailyDate: null
        };
        
        this.init();
    }

    init() {
        console.log('Игра инициализирована');
    }
}

// Создание экземпляра игры
const game = new Game();
````

- [ ] Шаг 3.2: Создание функций в  game.js для последующей реализации

````javascript
// В классе игры Game
...
    // Настройка ежедневной игры
    setupDaily() {
        console.log('Настройка ежедневной игры');
    }

    // Настройка обработчиков событий
    setupEventListeners() {
        console.log('Настройка обработчиков событий');
    }

    // Начать игру
    start(mode) {
        console.log('Начать игру');
    }

    // Генерация обычного уровня
    generateLevel() {
         console.log('Генерация обычного уровня');
    }

    // Генерация ежедневного уровня
    generateDailyLevel() {
         console.log('Генерация ежедневного уровня');
    }

    // Добавить букву
    addLetter(letter) {
        console.log('Добавить букву');
    }

    // Удалить последнюю букву
    removeLastLetter() {
        console.log('Удалить последнюю букву');
    }

    // Сбросить ввод
    resetInput() {
        console.log('Сбросить ввод');
    }

    // Отправить слово
    submitWord() {
       console.log('Отправить слово');
    }

    // Уровень завершен
    levelComplete() {
        console.log('Уровень завершен');
    }

    // Уровень провален
    levelFailed() {
        console.log('Уровень провален');
    }

    // Следующий уровень
    nextLevel() {
       console.log('Следующий уровень');
    }
````

- [ ] Шаг 3.3: Заполнение функций инициализации в game.js для проверки вызовов

````javascript
// В функциях Game класса
...

     init() {
        this.setupDaily();
        this.setupEventListeners();
        console.log('Игра инициализирована');
    }

    // Начать игру
    start(mode) {
        this.state.mode = mode;
        this.state.currentInput = [];
        this.state.foundWords = [];
        this.state.attempts = CONFIG.INITIAL_ATTEMPTS + Math.floor(this.state.level / 3);
        
        // Генерация уровня
        if (mode === 'infinite') {
            this.generateLevel();
        } else {
            this.generateDailyLevel();
            this.state.dailyCompleted = true;
        }
        console.log('Начать игру');
    }


````

- [ ] Шаг 3.4: Тестируем вызов функций в браузере в консоли разработчика


</details>

<details> <summary><strong>🔧 Часть 4: Настройка вспомогательных функций</strong></summary>

- [ ] Шаг 4.1: Создаем набор требуемых утилит в файле utils.js

````javascript
const Utils = {
    // Перемешивание массива
    shuffle(array) {
        const newArray = [...array];
        ...
        return newArray;
    },

    // Уникальные значения
    unique(array) {
        return [...new Set(array)];
    },

    // Получить случайный элемент
    randomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    },

    // Подсчет повторений букв в слове
    countLetters(word) {
        ...
        return counts;
    },

    // Проверка, можно ли составить слово из букв
    canFormWord(word, availableLetters) {
        const wordCounts = this.countLetters(word);
        const availableCounts = this.countLetters(availableLetters);
        ...
        return true;
    },

    // Получить дату в формате YYYY-MM-DD
    getTodayString() {
        const today = new Date();
        return today.toISOString().split('T')[0];
    },
    
    // Получить индекс темы дня
    getDailyThemeIndex() {
        const today = new Date();
        return today.getDate() % WORD_LIST.dailyThemes.length;
    }
};
````

- [ ] Шаг 4.2: Дополняем реализацию функций расчета утилит в файле utils.js

````javascript
const Utils = {
    // Перемешивание массива
    shuffle(array) {
        const newArray = [...array];
        // Мешаем меняя местами
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    },

    // Подсчет повторений букв в слове
    countLetters(word) {
        // Итеративный подсчет повторений
        for (const letter of word) {
            counts[letter] = (counts[letter] || 0) + 1;
        }
        return counts;
    },

    // Проверка, можно ли составить слово из букв
    canFormWord(word, availableLetters) {
        const wordCounts = this.countLetters(word);
        const availableCounts = this.countLetters(availableLetters);
        // Цикл для возврата негативного результата - слово нельзя составить
        for (const letter in wordCounts) {
            if (!availableCounts[letter] || availableCounts[letter] < wordCounts[letter]) {
                return false;
            }
        }
        // Возвращаем положительный результат если не зашли в цикл
        return true;
    },
};
````

</details>

<details> <summary><strong>🏟️ Часть 5: Разработка представлений</strong></summary>
  
- [ ] Шаг 5.1: Инициализация интерфейса и его функций в ui.js

````javascript
// Управление интерфейсом
const UI = {
    currentScreen: 'mainScreen',
    
    // Показать экран
    showScreen(screenId) {
         console.log('Показать экран');
    },
    
    // Обновить игровой экран
    updateGameScreen(state) {
        console.log('Обновить игровой экран');
    },
    
    // Отрисовать сетку слов
    renderWordsGrid(state) {
        console.log('Отрисовать сетку слов');
    },
    
    // Отрисовать текущий ввод
    renderCurrentInput(state) {
         console.log('Отрисовать текущий ввод');
    },
    
    // Отрисовать круг с буквами
    renderCircleInput(state) {
         console.log('Отрисовать круг с буквами');
    },
    
    // Показать уровень завершен
    showLevelComplete(state) {
         console.log('Показать уровень завершен');
    },
    
    // Показать уровень провален
    showLevelFailed(state) {
          console.log('Показать уровень провален');
    },
    
    // Показать всплывающее сообщение
    showMessage(text, icon = '') {
         console.log('Показать всплывающее сообщение');
    }
};
````

- [ ] Шаг 5.2: Инициализация интерфейса и его функций в ui.js для экранов

````javascript
// UI класс
// Показать экран
    showScreen(screenId) {
        this.currentScreen = screenId;
        // Показать выбранный экран и его элементы
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        // Присваиваем класс стилей для отображения
        document.getElementById(screenId).classList.add('active');
    },

 if (!state.levelData) return;
        
        // Обновить статистику
        document.getElementById('currentLevel').textContent = state.level;
        document.getElementById('score').textContent = state.score;
        document.getElementById('attempts').textContent = state.attempts;
        
        // Обновить информацию
        const foundCount = state.foundWords.length;
        const totalWords = state.levelData.words.length;
        document.getElementById('wordInfo').textContent = 
            `Найдено слов: ${foundCount}/${totalWords}`;
        
        // Отрисовать слова
        this.renderWordsGrid(state);
        
        // Отрисовать текущий ввод
        this.renderCurrentInput(state);
        
        // Отрисовать круг с буквами
        this.renderCircleInput(state);
````

- [ ] Шаг 5.3: Возвращаемся в game.js и вызываем наши новые функции

````javascript
// Настройка обработчиков событий
    setupEventListeners() {
        // Главный экран
        document.getElementById('infiniteMode').addEventListener('click', () => this.start('infinite'));
        document.getElementById('dailyMode').addEventListener('click', () => {
            if (!this.state.dailyCompleted) {
                this.start('daily');
            }
        });
        
        // Игровой экран
        document.getElementById('backBtn').addEventListener('click', () => UI.showScreen('mainScreen'));
        document.getElementById('resetBtn').addEventListener('click', () => this.resetInput());
        
        // Круг с буквами
        document.addEventListener('click', (e) => {
            if (e.target.closest('.circle-letter')) {
                this.addLetter(e.target.textContent);
            }
            if (e.target.closest('.circle-center')) {
                this.submitWord();
            }
        });
        
        // Экран результатов
        document.getElementById('nextLevelBtn').addEventListener('click', () => this.nextLevel());
        document.getElementById('backToMenuBtn').addEventListener('click', () => {
            UI.showScreen('mainScreen');
        });
        
        // Клавиатура
        document.addEventListener('keydown', (e) => {
            if (UI.currentScreen === 'gameScreen') {
                if (e.key === 'Enter') this.submitWord();
                if (e.key === 'Backspace') this.removeLastLetter();
                if (/^[а-яА-Яa-zA-Z]$/.test(e.key)) {
                    this.addLetter(e.key.toUpperCase());
                }
                UI.updateGameScreen(this.state);
            }
        });
    }
````

- [ ] Шаг 5.4: Тестируем в браузере запуск режимов в консоле
      
**Смотрим текстовый вызов**

**Проверяем на наличие ошибок**

**Исправляем если надо**

</details>

<details> <summary><strong> Часть 6: Стилизация экранов </strong></summary>
  
- [ ] Шаг 6.1: Дополняем main.css новыми стилями

````css
/* выравнивание контейнеров */
#mainScreen {
    justify-content: center;
    align-items: center;
    padding: 20px;
    gap: 40px;
}

#gameScreen {
    padding: 10px;
}

#resultScreen {
    justify-content: center;
    align-items: center;
    padding: 20px;
    text-align: center;
    gap: 20px;
}

/* стилизация логотипа названия */
.logo {
    text-align: center;
}

.logo h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    background: linear-gradient(45deg, #60a5fa, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.logo p {
    font-size: 1rem;
    opacity: 0.8;
}

.mode-buttons {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    max-width: 300px;
}

/* плавное появление - скрытие */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeOut {
    0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); display: none; }
}
````

- [ ] Шаг 6.2: Работа с экранами в game.js - вызов и отрисовка

````javascript
start(mode) {
    ...
        // Вызываем события и показ экрана
        UI.showScreen('gameScreen');
        UI.updateGameScreen(this.state);
    }
````
**Тестируем переключение**

**Ожидается смена экрана**

**Кнопка назад должна так же работать**

- [ ] Шаг 6.3: Добавляем стили для игрового экрана
      
````css
.subtitle {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-top: 5px;
}

.icon-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
}

.icon-btn:active {
    background: rgba(255, 255, 255, 0.1);
}

/* Игровой экран */
.game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    margin-bottom: 10px;
}

.stats {
    display: flex;
    gap: 15px;
}

.stat {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 1.1rem;
}

.words-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 0;
}

.words-grid {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    margin-bottom: 20px;
}

.word-row {
    display: flex;
    gap: 5px;
}

.letter-cell {
    width: 40px;
    height: 40px;
    border: 2px solid #4b5563;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: bold;
    transition: all 0.3s;
}

.letter-cell.revealed {
    background: linear-gradient(45deg, #059669, #10b981);
    border-color: #059669;
    transform: scale(1.05);
}

.word-info {
    text-align: center;
    font-size: 1rem;
    opacity: 0.9;
    margin-top: 10px;
}
````

- [ ] Шаг 6.4: Добавляем новые шрифты

````text
https://fonts.google.com/
````

**Переходим на сайт**

**Выставляем поиск кирилических шрифтов**

**Находим поравившийся**

**Получаем шрифт и импортируе в проект**

````html
/* Пример вставки ссылки в html*/
<style>
        @import url('https://fonts.googleapis.com/css2?family=Rampart+One&display=swap');
</style>
````

````css
/* добавляем на ряду с остальными стилями любого контейнера */
#mainScreen {
    ...
    font-family: "Rampart One", sans-serif;
    font-weight: 400;
    font-style: normal;
}
````

**По аналогии изменяем и остальные шрифты**

**Стилизуем так же кнопки как и название только другим шрифтом**


</details>
