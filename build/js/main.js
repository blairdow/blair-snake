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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sounds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sounds */ \"./src/js/sounds.js\");\n/* harmony import */ var _images__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images */ \"./src/js/images.js\");\n\n\n\nvar $canvas = $('#myCanvas')[0]\nvar $ctx = $canvas.getContext('2d')\n\n//******* starting snake position\nvar snake = [[150,125],\n             [150,130],\n             [150,135],\n             [150,140],\n             [150,145]]\n\n//******** image elements\nvar $burger = $('<img>', {\n    id: 'burger',\n    src: './build/images/chzburger.png',\n    alt: 'burger'    \n})[0]\n\nvar $cherries = $('<img>', {\n    id: 'cherries',\n    src: './build/images/cherries.png',\n    alt: 'cherries'\n})[0]\n\nvar $pizza = $('<img>', {\n    id: 'pizza',\n    src: './build/images/pizza.png',\n    alt: 'pizza'\n})[0]\n\n\nvar directionX = 0\nvar directionY = 0\nvar snakeHeadX = snake[0][0]\nvar snakeHeadY = snake[0][1]\nvar foodX = 0   \nvar foodY = 0\nvar score = 0\nvar foodKind = 0\n\n//speed selector buttons\nlet speedButtons = document.querySelectorAll('.speed-buttons button');\nconsole.log('speed buttons', speedButtons)\nvar $fast = $('.fast')\nvar $faster = $('.faster')\nvar $fastest = $('.fastest')\n\n//sounds\nvar startSound = function() {\n    document.querySelector('#start').volume = 0.3\n    document.querySelector('#start').play()\n}\nvar foodSound = function() {\n    document.querySelector('#food').volume = 0.3\n    document.querySelector('#food').play()\n}\nvar deathSound = function() {\n    document.querySelector('#death').volume = 0.3\n    document.querySelector('#death').play()\n}\n\n//starting framerate - selected with buttons\nvar fps = 0\n\n//screen modes\nvar $startScreen = $('#start-screen')\nvar $gameScreen = $('#game-screen')\nvar $gameOver = $('#game-over')\n\n//vars to detect key presses\nvar rightPressed = false\nvar leftPressed = false\nvar upPressed = false\nvar downPressed = false\n\n//keys to control snakey and space to start\nfunction eventListeners() {\n    //space bar to start game\n    $(document).on('keydown', function(e) {\n        //must select speed (fps) before start\n        if(fps > 0 && e.keyCode === 32) {\n           score = 0\n           $('.space-bar').removeClass('animate-emphasize')\n           $('.space-bar').addClass('hidden')\n           $('.score-wrapper').removeClass('hidden')\n           $startScreen.hide()\n           $gameOver.hide()\n           startSound()\n           $gameScreen.fadeIn('slow')\n        }\n        else if(e.keyCode === 32) {\n            $('.speed').toggleClass('animate-ping')\n        }\n    })\n    //arrow keys\n    $(document).on('keydown', function(e) {\n        if(e.keyCode === 38 && !downPressed) {\n            //up\n            upPressed = true\n            directionX = 0\n            directionY = -5\n\n            leftPressed = false\n            rightPressed = false\n            downPressed = false\n        }\n        if(e.keyCode === 40 && !upPressed) {\n            //down\n            downPressed = true\n            directionX = 0\n            directionY = 5\n\n            upPressed = false\n            rightPressed = false\n            leftPressed = false\n        }\n        if(e.keyCode === 37 && !rightPressed) {\n            //left\n            leftPressed = true\n            directionX = -5\n            directionY = 0\n\n            rightPressed = false\n            downPressed = false\n            upPressed = false\n        }\n        if(e.keyCode === 39 && !leftPressed) {\n            rightPressed = true\n            directionX = 5\n            directionY = 0\n\n            leftPressed = false\n            upPressed = false\n            downPressed = false\n        }\n    })\n}\n\n//***** starting speed selector\nfunction setSpeed() {\n    console.log('this', this)\n    fps = this.dataset.fps\n    speedButtons.forEach(function(el) {\n        el.classList.remove('selected')\n    })\n    this.classList.add('selected')\n    document.querySelector('.space-bar').classList.add('animate-emphasize')\n}\nspeedButtons.forEach(function(el) {\n    el.addEventListener('click', setSpeed);\n})\n\n//************set starting environment\n$gameScreen.hide()\n$gameOver.hide()\neventListeners()\n\nfunction displayScore() {\n    var $score = $('.score')\n    $score.text(score)\n}\n\n//increase speed when score is 5, 10, 15, etc\nfunction speedIncrease() {\n    if(score%5 === 0) {\n        fps += 3\n    }\n}\n\n//reset snake to start position\nfunction snakeReset () {\n    snake =[[150,125],\n             [150,130],\n             [150,135],\n             [150,140],\n             [150,145]]\n    }\n\n//runs if snake hits self or walls\nfunction gameOverScreen() {\n    $gameScreen.fadeOut('slow')\n    deathSound()\n    $ctx.clearRect(0, 0, $canvas.width, $canvas.height)\n    setTimeout(function() {\n        fps = 0\n        $gameOver.fadeIn()\n        $('.space-bar').removeClass('hidden')\n        snakeReset()\n    }, 1000) \n}\n\n//function to randomize food spawn in units of 5\nfunction randomizeFood() {\n  //function to create random multiples of 5\n    function rand_5(min, max){\n        return Math.round((Math.random()*(max-min)+min)/5)*5;\n    }\n    var x = rand_5(0, $canvas.width-5)\n    var y = rand_5(0, $canvas.height-5)\n    //check if x or y are in snake area\n    var duplicate = false\n    for(var i = 0; i < snake.length; i++) {\n        if (snake[i][0] === x && snake[i][1] === y)\n            duplicate = true\n    }\n    \n    if (duplicate) {\n        console.log('recursion', duplicate)\n        return randomizeFood()\n    } \n    else {\n        foodX = x\n        foodY = y\n        console.log(foodX, foodY)\n    }\n}\n\n//call to set initial food coordinates\nrandomizeFood()\n\nfunction pickFood() {\n    foodKind = Math.floor((Math.random()*3)+1)\n}\n//call to initialize food type\npickFood()\n\nfunction drawFood() {\n    if(foodKind == 1) {\n        $ctx.clearRect(0, 0, $canvas.width, $canvas.height)\n        $ctx.drawImage($pizza, foodX, foodY, 5, 5)  \n    }\n    else if(foodKind == 2) {\n        $ctx.clearRect(0, 0, $canvas.width, $canvas.height)\n        $ctx.drawImage($burger, foodX, foodY, 5, 5) \n    }\n    else {\n        $ctx.clearRect(0, 0, $canvas.width, $canvas.height)\n        $ctx.drawImage($cherries, foodX, foodY, 5, 5) \n    } \n }\n\n//runs when snake hits food to add length\nfunction eatFood() {\n    //if food coordinates equal snake head coordinates, eat food and add length\n    if(foodX === snakeHeadX && foodY === snakeHeadY) {\n        score++\n        foodSound()\n        speedIncrease()\n        \n        var length = snake.length\n        //if moving horizontally add length to x-axis\n        if(leftPressed || rightPressed) {\n            snake.unshift([foodX, foodY])\n            snake.push([snake[length-1][0], snake[length-1][1]], [snake[length-1][0]+5, snake[length-1][1]])\n        }              \n        //if moving vertically add length to y-axis\n        if(upPressed || downPressed)        \n            {snake.unshift([foodX, foodY])\n            snake.push([snake[length-1][0], snake[length-1][1]], [snake[length-1][0], snake[length-1][1]+5])}        \n        //reset food type and location\n        randomizeFood()\n        pickFood()\n    } \n}\n\nfunction hitWalls() {\n    //ends game if walls are hit\n    if(snakeHeadX + directionX < 0 || snakeHeadX + directionX > $canvas.width - 5) {\n        rightPressed = false\n        leftPressed = false\n        upPressed = false\n        downPressed = false\n        directionX = 0\n        directionY = 0\n        gameOverScreen()\n\n    }\n    if(snakeHeadY + directionY < 0 || snakeHeadY + directionY > $canvas.height - 5) {\n        gameOverScreen()\n        rightPressed = false\n        leftPressed = false\n        upPressed = false\n        downPressed = false\n        directionX = 0\n        directionY = 0\n    }\n}\n\n//ends game if snake hits self\nfunction hitSelf() {\n    for(var a = 1; a < snake.length; a++) {\n        if(snake[a][0] === snakeHeadX && snake[a][1] === snakeHeadY) {\n            gameOverScreen()\n            rightPressed = false\n            leftPressed = false\n            upPressed = false\n            downPressed = false\n            directionX = 0\n            directionY = 0\n       }\n    }\n}\n\n//simulates movement by changing snake array coordinates\nfunction moveSnake() {\n    if(rightPressed) {\n        snake.pop()\n        snake.unshift([snakeHeadX + directionX, snakeHeadY])\n    }\n    if(leftPressed) {\n        snake.pop()\n        snake.unshift([snakeHeadX + directionX, snakeHeadY])\n    }\n    if(upPressed) {\n        snake.pop()\n        snake.unshift([snakeHeadX, snakeHeadY + directionY])\n    }\n    if(downPressed) {\n        snake.pop()\n        snake.unshift([snakeHeadX, snakeHeadY + directionY])\n    }\n    snakeHeadX = snake[0][0]\n    snakeHeadY = snake[0][1]\n}\n\n//function given to snake in draw function\nfunction drawSnake([n,m]) { \n    $ctx.beginPath()\n    $ctx.rect(n,m,5,5)\n    $ctx.fillStyle = '#00ff00'\n    $ctx.fill()\n    $ctx.strokeStyle = \"#009300\"\n    $ctx.stroke()\n    $ctx.closePath()\n}\n\n//animation!\nfunction draw() {\n    setTimeout(function () {\n        //do not change order of functions!\n        hitWalls()\n        hitSelf()\n        displayScore()\n        drawFood()\n\n        eatFood()\n\n        moveSnake()\n        snake.forEach(drawSnake) \n        requestAnimationFrame(draw)\n        \n    }, 1000/fps)\n}\n\ndraw()\n\n\n//# sourceURL=webpack://blair-snake/./src/js/main.js?");

/***/ }),

/***/ "./src/js/sounds.js":
/*!**************************!*\
  !*** ./src/js/sounds.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sounds_death_wav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sounds/death.wav */ \"./src/sounds/death.wav\");\n/* harmony import */ var _sounds_food_wav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sounds/food.wav */ \"./src/sounds/food.wav\");\n/* harmony import */ var _sounds_start_wav__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sounds/start.wav */ \"./src/sounds/start.wav\");\n\n\n\n\n//# sourceURL=webpack://blair-snake/./src/js/sounds.js?");

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