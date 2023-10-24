/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/images.js":
/*!**************************!*\
  !*** ./src/js/images.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _images_sky_background_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../images/sky-background.png */ \"./src/images/sky-background.png\");\n/* harmony import */ var _images_8bitsnake_gif__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../images/8bitsnake.gif */ \"./src/images/8bitsnake.gif\");\n/* harmony import */ var _images_dead_snake_gif__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../images/dead_snake.gif */ \"./src/images/dead_snake.gif\");\n/* harmony import */ var _images_cherries_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../images/cherries.png */ \"./src/images/cherries.png\");\n/* harmony import */ var _images_chzburger_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../images/chzburger.png */ \"./src/images/chzburger.png\");\n/* harmony import */ var _images_pizza_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../images/pizza.png */ \"./src/images/pizza.png\");\n/* harmony import */ var _images_favicon_ico__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../images/favicon.ico */ \"./src/images/favicon.ico\");\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://blair-snake/./src/js/images.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sounds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sounds */ \"./src/js/sounds.js\");\n/* harmony import */ var _images__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images */ \"./src/js/images.js\");\n/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities */ \"./src/js/utilities.js\");\n\n\n\n\n//screen modes\nlet startScreen = document.getElementById('start-screen')\nlet gameScreen = document.getElementById('game-screen')\nlet gameoverScreen = document.getElementById('game-over-screen')\nlet pauseScreen = document.getElementById('pause-screen')\nlet gameContainer = document.getElementById('game-container')\nlet wrapper = document.querySelector('.wrapper')\n\n//game unit size (sets base for size of snake and food in pixels square)\nlet basePixelUnit = 10;\n\n//canvas elements\nlet canvas = document.getElementById('myCanvas')\nlet ctx = canvas.getContext('2d')\n\n//game elements\nlet speedButtons = document.querySelectorAll('.speed-buttons button');\nlet spaceBar = document.querySelector('.space-bar')\nlet leaderboard = document.getElementById('leaderboard')\n\n//food image elements\nlet burger = (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.createImg)({\n    id: 'burger',\n    src: './build/images/chzburger.png',\n    alt: 'burger'    \n})\nlet cherries = (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.createImg)({\n    id: 'cherries',\n    src: './build/images/cherries.png',\n    alt: 'cherries'\n})\nlet pizza = (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.createImg)({\n    id: 'pizza',\n    src: './build/images/pizza.png',\n    alt: 'pizza'\n})\n\nlet score = 0;\nlet highScores = JSON.parse(localStorage.getItem(\"highScores\")) //check local storage for existing high scores\nif(highScores == null) {\n    //set empty array if no scores\n    highScores = []\n    localStorage.setItem(\"highScores\", JSON.stringify(highScores))\n} \ndisplayHighScores()\n\nlet gameTracker = {\n    snake: [[canvas.width/2, canvas.height-(basePixelUnit*5)], //starting snake position\n             [canvas.width/2, canvas.height-(basePixelUnit*4)],\n             [canvas.width/2, canvas.height-(basePixelUnit*3)],\n             [canvas.width/2, canvas.height-(basePixelUnit*2)],\n             [canvas.width/2, canvas.height-basePixelUnit]],\n    fps: 0, //starting framerate - selected with buttons\n    directionX: 0,\n    directionY: 0,\n    snakeHeadX: canvas.width/2,\n    snakeHeadY: canvas.height-(basePixelUnit*5),\n    foodX: 0,   \n    foodY: 0,\n    foodKind: 0,\n    keyPress: { //vars to detect key presses\n        right: false,\n        left: false,\n        up: false,\n        down: false\n    },\n    gameover: false, //used to stop animation\n    paused: false\n}\n\n//FUNCTIONS\n//keys to control snakey and space to start\nfunction eventListeners() {\n    //set canvas size\n    window.addEventListener('resize', function() {\n        setCanvasSize(canvas)        \n        console.log('resize', gameContainer.clientWidth, gameContainer.clientHeight)\n    }, true);\n\n    //space bar to start game\n    document.addEventListener('keydown', function(e) {\n        //must select speed (fps) before start\n        if(gameTracker.fps > 0 && e.code === \"Space\") {\n            score = 0\n            ;(0,_utilities__WEBPACK_IMPORTED_MODULE_2__.displayScore)(score)\n            spaceBar.classList.replace('animate-emphasize', 'hidden')\n            document.querySelector('.score-wrapper').classList.remove('hidden')\n            startGame()\n            drawGame()\n        }\n        else if(e.code === \"space\") {\n            document.querySelector('.speed').classList.toggle('animate-emphasize')\n        }\n    })\n\n    //P to pause\n    document.addEventListener('keydown', function(e) {\n        if(e.code === \"KeyP\") {\n            togglePause()\n        }\n    })\n\n    //arrow keys\n    document.addEventListener('keydown', function(e) {\n        if(e.code === \"ArrowUp\" && !gameTracker.keyPress.down) {\n            //up\n            gameTracker.keyPress.up = true\n            gameTracker.directionX = 0\n            gameTracker.directionY = -basePixelUnit\n    \n            gameTracker.keyPress.left = false\n            gameTracker.keyPress.right = false\n            gameTracker.keyPress.down = false\n        }\n        if(e.code === \"ArrowDown\" && !gameTracker.keyPress.up) {\n            //down\n            gameTracker.keyPress.down = true\n            gameTracker.directionX = 0\n            gameTracker.directionY = basePixelUnit\n    \n            gameTracker.keyPress.up = false\n            gameTracker.keyPress.right = false\n            gameTracker.keyPress.left = false\n        }\n        if(e.code === \"ArrowLeft\" && !gameTracker.keyPress.right) {\n            //left\n            gameTracker.keyPress.left = true\n            gameTracker.directionX = -basePixelUnit\n            gameTracker.directionY = 0\n    \n            gameTracker.keyPress.right = false\n            gameTracker.keyPress.down = false\n            gameTracker.keyPress.up = false\n        }\n        if(e.code === \"ArrowRight\" && !gameTracker.keyPress.left) {\n            //right\n            gameTracker.keyPress.right = true\n            gameTracker.directionX = basePixelUnit\n            gameTracker.directionY = 0\n    \n            gameTracker.keyPress.left = false\n            gameTracker.keyPress.up = false\n            gameTracker.keyPress.down = false\n        }\n    })\n}\n\nfunction touchEventListeners() {\n    document.addEventListener('touchstart', function(e) {\n        console.log(e.target.dataset.key)\n        let key = e.target.dataset.key\n        if(key === 'up' && !gameTracker.keyPress.down) {\n            //up\n            gameTracker.keyPress.up = true\n            gameTracker.directionX = 0\n            gameTracker.directionY = -basePixelUnit\n    \n            gameTracker.keyPress.left = false\n            gameTracker.keyPress.right = false\n            gameTracker.keyPress.down = false\n        }\n        if(key === \"down\" && !gameTracker.keyPress.up) {\n            //down\n            gameTracker.keyPress.down = true\n            gameTracker.directionX = 0\n            gameTracker.directionY = basePixelUnit\n    \n            gameTracker.keyPress.up = false\n            gameTracker.keyPress.right = false\n            gameTracker.keyPress.left = false\n        }\n        if(key === \"left\" && !gameTracker.keyPress.right) {\n            //left\n            gameTracker.keyPress.left = true\n            gameTracker.directionX = -basePixelUnit\n            gameTracker.directionY = 0\n    \n            gameTracker.keyPress.right = false\n            gameTracker.keyPress.down = false\n            gameTracker.keyPress.up = false\n        }\n        if(key === \"right\" && !gameTracker.keyPress.left) {\n            //right\n            gameTracker.keyPress.right = true\n            gameTracker.directionX = basePixelUnit\n            gameTracker.directionY = 0\n    \n            gameTracker.keyPress.left = false\n            gameTracker.keyPress.up = false\n            gameTracker.keyPress.down = false\n        }\n\n    })\n}\n\nfunction setCanvasSize(canvas) {\n    if(!(0,_utilities__WEBPACK_IMPORTED_MODULE_2__.isMobileDevice)() || wrapper.clientWidth > 640) {\n        canvas.width = 480;\n        canvas.height = 320;\n    } else {\n        canvas.width = Math.floor((wrapper.clientWidth-10) / basePixelUnit) * basePixelUnit;\n        canvas.height = Math.floor(gameContainer.clientHeight / basePixelUnit) * basePixelUnit;\n    }\n    gameContainer.style.width = canvas.width + \"px\"\n    gameContainer.style.height = canvas.height + \"px\"\n    gameTracker = (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.gameReset)(canvas, basePixelUnit);\n    console.log('h/w', canvas.height, canvas.width)\n}\n\n//***** starting speed selector\nfunction setSpeed() {\n    gameTracker.fps = Number(this.dataset.fps) //pulled from html attribute on buttons\n    speedButtons.forEach(function(el) {\n        el.classList.remove('selected')\n    })\n    this.classList.add('selected')\n    document.querySelector('.space-bar').classList.add('animate-emphasize')\n}\n\nfunction displayHighScores() {\n    if(highScores.length > 0) {\n        leaderboard.innerHTML = \"\";\n        highScores.map(el => {\n            let listItem = document.createElement('li')\n            listItem.textContent = el\n            leaderboard.append(listItem)\n        })\n    }\n}\n\nfunction setHighScores(score) {\n    if(score > 0 && highScores.indexOf(score) < 0) {\n        highScores.push(score)\n        highScores.sort((a, b) => b - a)\n        if(highScores.length > 10) {\n            highScores.length = 10\n        }\n        localStorage.setItem(\"highScores\", JSON.stringify(highScores))\n        displayHighScores()\n    }\n}\n\nfunction startGame() {\n    (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.playSound)('start-sound')\n    randomizeFood()\n    gameTracker.foodKind = (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.pickFood)()\n    startScreen.classList.add('hidden')\n    gameoverScreen.classList.add('hidden')\n    gameScreen.classList.remove('animate-fade-out')\n    gameScreen.classList.add('animate-fade-in')\n    gameScreen.classList.replace('hidden','flex')\n}\n\n//runs if snake hits self or walls\nfunction endGame() {\n    gameTracker.gameover = true;\n    gameTracker.keyPress.right = false\n    gameTracker.keyPress.left = false\n    gameTracker.keyPress.up = false\n    gameTracker.keyPress.down = false\n    gameTracker.directionX = 0\n    gameTracker.directionY = 0\n    gameTracker.fps = 0\n\n    setHighScores(score)\n    ;(0,_utilities__WEBPACK_IMPORTED_MODULE_2__.playSound)('death-sound')\n\n    gameScreen.classList.remove('animate-fade-in')\n    gameScreen.classList.add('animate-fade-out')\n    ctx.clearRect(0, 0, canvas.width, canvas.height)\n    setTimeout(() => {\n        gameScreen.classList.replace('flex', 'hidden')\n        gameoverScreen.classList.remove('hidden')\n        spaceBar.classList.remove('hidden')\n        gameTracker = (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.gameReset)(canvas, basePixelUnit);\n    }, 1000);\n}\n\nfunction togglePause() {\n    if(!gameTracker.paused) {\n        gameTracker.paused = true\n        pauseScreen.classList.remove('hidden')\n    } else {\n        gameTracker.paused = false\n        pauseScreen.classList.add('hidden')\n        drawGame() //restart animation\n    }\n}\n\n//function to randomize food spawn in units of 10\nfunction randomizeFood() {\n    var x = (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.randNum)(0, canvas.width-basePixelUnit, basePixelUnit)\n    var y = (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.randNum)(0, canvas.height-basePixelUnit, basePixelUnit)\n    //check if x or y are in snake area\n    var duplicate = false\n    for(var i = 0; i < gameTracker.snake.length; i++) {\n        if (gameTracker.snake[i][0] === x && gameTracker.snake[i][1] === y) { \n            duplicate = true\n        }\n    }\n    \n    if (duplicate) {\n        return randomizeFood() //we love recursion!\n    } \n    else {\n        gameTracker.foodX = x\n        gameTracker.foodY = y\n    }\n}\n\nfunction drawFood() {\n    if(gameTracker.foodKind == 1) {\n        ctx.clearRect(0, 0, canvas.width, canvas.height)\n        ctx.drawImage(pizza, gameTracker.foodX, gameTracker.foodY, basePixelUnit, basePixelUnit)  \n    }\n    else if(gameTracker.foodKind == 2) {\n        ctx.clearRect(0, 0, canvas.width, canvas.height)\n        ctx.drawImage(burger, gameTracker.foodX, gameTracker.foodY, basePixelUnit, basePixelUnit) \n    }\n    else {\n        ctx.clearRect(0, 0, canvas.width, canvas.height)\n        ctx.drawImage(cherries, gameTracker.foodX, gameTracker.foodY, basePixelUnit, basePixelUnit) \n    } \n }\n\n//runs when snake hits food to add length\nfunction eatFood() {\n    //if food coordinates equal snake head coordinates, eat food and add length\n    if(gameTracker.foodX === gameTracker.snakeHeadX && gameTracker.foodY === gameTracker.snakeHeadY) {\n        (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.playSound)('food-sound')\n        score++\n        ;(0,_utilities__WEBPACK_IMPORTED_MODULE_2__.displayScore)(score)\n        if(score%5 === 0) {\n            gameTracker.fps = (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.increaseSpeed)(gameTracker.fps)\n        }\n        \n        let length = gameTracker.snake.length\n        //if moving horizontally add length to x-axis\n        if(gameTracker.keyPress.left || gameTracker.keyPress.right) {\n            gameTracker.snake.unshift([gameTracker.foodX, gameTracker.foodY])\n            gameTracker.snake.push([gameTracker.snake[length-1][0], gameTracker.snake[length-1][1]], [gameTracker.snake[length-1][0]+basePixelUnit, gameTracker.snake[length-1][1]])\n        }              \n        //if moving vertically add length to y-axis\n        if(gameTracker.keyPress.up || gameTracker.keyPress.down)        \n            {gameTracker.snake.unshift([gameTracker.foodX, gameTracker.foodY])\n            gameTracker.snake.push([gameTracker.snake[length-1][0], gameTracker.snake[length-1][1]], [gameTracker.snake[length-1][0], gameTracker.snake[length-1][1]+basePixelUnit])}        \n        //reset food type and location\n        randomizeFood()\n        gameTracker.foodKind = (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.pickFood)()\n    } \n}\n\nfunction hitWalls() {\n    //ends game if walls are hit\n    if(gameTracker.snakeHeadX + gameTracker.directionX < 0 || gameTracker.snakeHeadX + gameTracker.directionX > canvas.width - basePixelUnit) {\n        endGame()\n        \n    } else if(gameTracker.snakeHeadY + gameTracker.directionY < 0 || gameTracker.snakeHeadY + gameTracker.directionY > canvas.height - basePixelUnit) {\n        endGame()\n    }\n}\n\n//ends game if snake hits self\nfunction hitSelf() {\n    for(var a = 1; a < gameTracker.snake.length; a++) {\n        if(gameTracker.snake[a][0] === gameTracker.snakeHeadX && gameTracker.snake[a][1] === gameTracker.snakeHeadY) {\n            endGame()\n            break;\n       }\n    }\n}\n\n//simulates movement by changing snake array coordinates\nfunction moveSnake() {\n    if(gameTracker.keyPress.right) {\n        gameTracker.snake.pop()\n        gameTracker.snake.unshift([gameTracker.snakeHeadX + gameTracker.directionX, gameTracker.snakeHeadY])\n    }\n    if(gameTracker.keyPress.left) {\n        gameTracker.snake.pop()\n        gameTracker.snake.unshift([gameTracker.snakeHeadX + gameTracker.directionX, gameTracker.snakeHeadY])\n    }\n    if(gameTracker.keyPress.up) {\n        gameTracker.snake.pop()\n        gameTracker.snake.unshift([gameTracker.snakeHeadX, gameTracker.snakeHeadY + gameTracker.directionY])\n    }\n    if(gameTracker.keyPress.down) {\n        gameTracker.snake.pop()\n        gameTracker.snake.unshift([gameTracker.snakeHeadX, gameTracker.snakeHeadY + gameTracker.directionY])\n    }\n    gameTracker.snakeHeadX = gameTracker.snake[0][0]\n    gameTracker.snakeHeadY = gameTracker.snake[0][1]\n}\n\nfunction drawSnake([n,m]) { \n    ctx.beginPath()\n    ctx.rect(n,m,basePixelUnit,basePixelUnit)\n    ctx.fillStyle = '#00ff00'\n    ctx.fill()\n    ctx.strokeStyle = \"#009300\"\n    ctx.stroke()\n    ctx.closePath()\n}\n\nfunction setHighScore(score) {\n    localStorage.setItem('highScores', score)\n}\n\n//animation!\nfunction drawGame() {\n    if(gameTracker.gameover || gameTracker.paused) {return;} \n    setTimeout(function () { //setTimeout used with requestAnimationFrame to control speed of animation\n        hitWalls()\n        hitSelf()\n        drawFood()\n        eatFood()\n        moveSnake()\n        gameTracker.snake.forEach(drawSnake) \n        requestAnimationFrame(drawGame)\n    }, 1000/gameTracker.fps)\n}\n\nfunction initGame() {\n    //************set starting environment\n    setCanvasSize(canvas)\n    eventListeners()\n    touchEventListeners()\n    speedButtons.forEach(function(el) {\n        el.addEventListener('click', setSpeed);\n    })\n}\n//end functions\n\ninitGame()\n\n\n\n//# sourceURL=webpack://blair-snake/./src/js/main.js?");

/***/ }),

/***/ "./src/js/sounds.js":
/*!**************************!*\
  !*** ./src/js/sounds.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sounds_death_wav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sounds/death.wav */ \"./src/sounds/death.wav\");\n/* harmony import */ var _sounds_food_wav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sounds/food.wav */ \"./src/sounds/food.wav\");\n/* harmony import */ var _sounds_start_wav__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sounds/start.wav */ \"./src/sounds/start.wav\");\n\n\n\n\n//# sourceURL=webpack://blair-snake/./src/js/sounds.js?");

/***/ }),

/***/ "./src/js/utilities.js":
/*!*****************************!*\
  !*** ./src/js/utilities.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createImg\": function() { return /* binding */ createImg; },\n/* harmony export */   \"displayScore\": function() { return /* binding */ displayScore; },\n/* harmony export */   \"gameReset\": function() { return /* binding */ gameReset; },\n/* harmony export */   \"increaseSpeed\": function() { return /* binding */ increaseSpeed; },\n/* harmony export */   \"isMobileDevice\": function() { return /* binding */ isMobileDevice; },\n/* harmony export */   \"pickFood\": function() { return /* binding */ pickFood; },\n/* harmony export */   \"playSound\": function() { return /* binding */ playSound; },\n/* harmony export */   \"randNum\": function() { return /* binding */ randNum; }\n/* harmony export */ });\nconst isMobileDevice = () => {\n  // User agent string method\n  let isMobile = \n   (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ||  // User agent string method\n   (window.innerWidth < 640) || // Screen resolution method\n   (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));  // Touch events method\n\n  console.log('mobile', isMobile)\n  return isMobile\n}\n\nconst createImg = (options) => {\n  let img = document.createElement('img')\n    for (const key in options) {\n        if (options.hasOwnProperty(key)) {\n            img.setAttribute(key, options[key])\n        }\n    }\n  return img\n}\n\nconst playSound = (soundID) => {\n  document.getElementById(soundID).volume = 0.1\n  document.getElementById(soundID).play()\n}\n\nconst displayScore = (score) => {\n  let scoreElement = document.querySelector('.score')\n  scoreElement.textContent = score\n}\n\nconst increaseSpeed = (fps) => {\n  return fps += 3\n}\n\n//function to create random multiples of given number for food spawn locations\nconst randNum = (min, max, multiple) => {\n    return Math.round((Math.random()*(max-min)+min)/multiple)*multiple;\n}\n\nconst pickFood = () => {\n  let foodKind = Math.floor((Math.random()*3)+1)\n  return foodKind\n}\n\nconst gameReset = (canvas, basePixelUnit = 10) => {\n  let initialValues = {\n    snake: [[canvas.width/2, canvas.height-(basePixelUnit*5)], //starting snake position\n             [canvas.width/2, canvas.height-(basePixelUnit*4)],\n             [canvas.width/2, canvas.height-(basePixelUnit*3)],\n             [canvas.width/2, canvas.height-(basePixelUnit*2)],\n             [canvas.width/2, canvas.height-basePixelUnit]],\n    fps: 0, //starting framerate - selected with buttons\n    directionX: 0,\n    directionY: 0,\n    snakeHeadX: canvas.width/2,\n    snakeHeadY: canvas.height-(basePixelUnit*5),\n    foodX: 0,   \n    foodY: 0,\n    foodKind: 0,\n    keyPress: { //vars to detect key presses\n        right: false,\n        left: false,\n        up: false,\n        down: false\n    }\n  }\n  return initialValues;\n}\n\n\n\n//# sourceURL=webpack://blair-snake/./src/js/utilities.js?");

/***/ }),

/***/ "./src/images/8bitsnake.gif":
/*!**********************************!*\
  !*** ./src/images/8bitsnake.gif ***!
  \**********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/8bitsnake.gif\";\n\n//# sourceURL=webpack://blair-snake/./src/images/8bitsnake.gif?");

/***/ }),

/***/ "./src/images/cherries.png":
/*!*********************************!*\
  !*** ./src/images/cherries.png ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/cherries.png\";\n\n//# sourceURL=webpack://blair-snake/./src/images/cherries.png?");

/***/ }),

/***/ "./src/images/chzburger.png":
/*!**********************************!*\
  !*** ./src/images/chzburger.png ***!
  \**********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/chzburger.png\";\n\n//# sourceURL=webpack://blair-snake/./src/images/chzburger.png?");

/***/ }),

/***/ "./src/images/dead_snake.gif":
/*!***********************************!*\
  !*** ./src/images/dead_snake.gif ***!
  \***********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/dead_snake.gif\";\n\n//# sourceURL=webpack://blair-snake/./src/images/dead_snake.gif?");

/***/ }),

/***/ "./src/images/favicon.ico":
/*!********************************!*\
  !*** ./src/images/favicon.ico ***!
  \********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/favicon.ico\";\n\n//# sourceURL=webpack://blair-snake/./src/images/favicon.ico?");

/***/ }),

/***/ "./src/images/pizza.png":
/*!******************************!*\
  !*** ./src/images/pizza.png ***!
  \******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/pizza.png\";\n\n//# sourceURL=webpack://blair-snake/./src/images/pizza.png?");

/***/ }),

/***/ "./src/images/sky-background.png":
/*!***************************************!*\
  !*** ./src/images/sky-background.png ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/sky-background.png\";\n\n//# sourceURL=webpack://blair-snake/./src/images/sky-background.png?");

/***/ }),

/***/ "./src/sounds/death.wav":
/*!******************************!*\
  !*** ./src/sounds/death.wav ***!
  \******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"sounds/death.wav\";\n\n//# sourceURL=webpack://blair-snake/./src/sounds/death.wav?");

/***/ }),

/***/ "./src/sounds/food.wav":
/*!*****************************!*\
  !*** ./src/sounds/food.wav ***!
  \*****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"sounds/food.wav\";\n\n//# sourceURL=webpack://blair-snake/./src/sounds/food.wav?");

/***/ }),

/***/ "./src/sounds/start.wav":
/*!******************************!*\
  !*** ./src/sounds/start.wav ***!
  \******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"sounds/start.wav\";\n\n//# sourceURL=webpack://blair-snake/./src/sounds/start.wav?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/main.js");
/******/ 	
/******/ })()
;