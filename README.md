<details> <summary><strong>📁 Часть 1: Подготовка проекта</strong></summary>
##Шаг 1.1: Изучаем структуру
  
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

##Шаг 1.2: Создание основной структуры в index.html
  
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
##Шаг 1.3: Подключение ссылок на остальные скрипты в index.html

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

##Шаг 1.4: Наполняем index.html содержимым контейнеров

### Главное меню - стартовый экран
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

### Игровой контейнер
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

### Событийный контейнер сообщений
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
##Шаг 1.5: Проверяем результат в браузере с запуском index.html
