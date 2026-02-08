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
