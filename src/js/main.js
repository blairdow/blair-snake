import sounds from './sounds'
import images from './images'
import { isMobileDevice, isTouchScreen, createImg, playSound, displayScore, increaseSpeed, randNum, pickFood, gameReset } from './utilities';

//screen modes
let startScreen = document.getElementById('start-screen')
let gameScreen = document.getElementById('game-screen')
let gameoverScreen = document.getElementById('game-over-screen')
let pauseScreen = document.getElementById('pause-screen')
let gameContainer = document.getElementById('game-container')
let wrapper = document.querySelector('.wrapper')

//game unit size (sets base for size of snake and food in pixels square)
let basePixelUnit = 10;

//canvas elements
let canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext('2d')

//game elements
let speedButtons = document.querySelectorAll('.speed-buttons button');
let spaceBar = document.querySelector('.space-bar')
let leaderboard = document.getElementById('leaderboard')

//food image elements
let burger = createImg({
    id: 'burger',
    src: './build/images/chzburger.png',
    alt: 'burger'    
})
let cherries = createImg({
    id: 'cherries',
    src: './build/images/cherries.png',
    alt: 'cherries'
})
let pizza = createImg({
    id: 'pizza',
    src: './build/images/pizza.png',
    alt: 'pizza'
})

let score = 0;
let highScores = JSON.parse(localStorage.getItem("highScores")) //check local storage for existing high scores
if(highScores == null) {
    //set empty array if no scores
    highScores = []
    localStorage.setItem("highScores", JSON.stringify(highScores))
} 
displayHighScores()

let gameTracker = {
    snake: [[canvas.width/2, canvas.height-(basePixelUnit*5)], //starting snake position
             [canvas.width/2, canvas.height-(basePixelUnit*4)],
             [canvas.width/2, canvas.height-(basePixelUnit*3)],
             [canvas.width/2, canvas.height-(basePixelUnit*2)],
             [canvas.width/2, canvas.height-basePixelUnit]],
    fps: 0, //starting framerate - selected with buttons
    directionX: 0,
    directionY: 0,
    snakeHeadX: canvas.width/2,
    snakeHeadY: canvas.height-(basePixelUnit*5),
    foodX: 0,   
    foodY: 0,
    foodKind: 0,
    keyPress: { //vars to detect key presses
        right: false,
        left: false,
        up: false,
        down: false
    },
    gameActive: false,
    paused: false
}

//FUNCTIONS
//keys to control snakey and space to start
function eventListeners() {
    //set canvas size
    window.addEventListener('resize', function() {
        setCanvasSize(canvas)        
    }, true);

    //space bar to start game
    document.addEventListener('keydown', function(e) {
        //must select speed (fps) before start
        if(gameTracker.fps > 0 && e.code === "Space") {
            score = 0
            displayScore(score)
            spaceBar.classList.replace('animate-emphasize-color', 'hidden')
            document.querySelector('.score-wrapper').classList.remove('hidden')
            startGame()
            drawGame()
        }
        else if(e.code === "Space") {
            document.querySelector('.speed').classList.toggle('animate-emphasize')
        }
    })

    //P to pause
    document.addEventListener('keydown', function(e) {
        if(e.code === "KeyP") {
            togglePause()
        }
    })

    //arrow keys
    document.addEventListener('keydown', function(e) {
        if(gameTracker.gameActive) {
            if(e.code === "ArrowUp" && !gameTracker.keyPress.down) {
                //up
                gameTracker.keyPress.up = true
                gameTracker.directionX = 0
                gameTracker.directionY = -basePixelUnit
        
                gameTracker.keyPress.left = false
                gameTracker.keyPress.right = false
                gameTracker.keyPress.down = false
            }
            if(e.code === "ArrowDown" && !gameTracker.keyPress.up) {
                //down
                gameTracker.keyPress.down = true
                gameTracker.directionX = 0
                gameTracker.directionY = basePixelUnit
        
                gameTracker.keyPress.up = false
                gameTracker.keyPress.right = false
                gameTracker.keyPress.left = false
            }
            if(e.code === "ArrowLeft" && !gameTracker.keyPress.right) {
                //left
                gameTracker.keyPress.left = true
                gameTracker.directionX = -basePixelUnit
                gameTracker.directionY = 0
        
                gameTracker.keyPress.right = false
                gameTracker.keyPress.down = false
                gameTracker.keyPress.up = false
            }
            if(e.code === "ArrowRight" && !gameTracker.keyPress.left) {
                //right
                gameTracker.keyPress.right = true
                gameTracker.directionX = basePixelUnit
                gameTracker.directionY = 0
        
                gameTracker.keyPress.left = false
                gameTracker.keyPress.up = false
                gameTracker.keyPress.down = false
            }
        }
    })
}

function touchEventListeners() {
    document.addEventListener('touchstart', function(e) {
        let key = e.target.dataset.key

        //must select speed (fps) before start
        if(gameTracker.fps > 0 && key === "start") {
            score = 0
            displayScore(score)
            document.querySelector('.score-wrapper').classList.remove('hidden')
            startGame()
            drawGame()
        } else if(key === "start") {
            document.querySelector('.speed').classList.toggle('animate-emphasize')
        }

        if(gameTracker.gameActive) {
            if(key === 'up' && !gameTracker.keyPress.down) {
                //up
                gameTracker.keyPress.up = true
                gameTracker.directionX = 0
                gameTracker.directionY = -basePixelUnit
        
                gameTracker.keyPress.left = false
                gameTracker.keyPress.right = false
                gameTracker.keyPress.down = false
            }
            if(key === "down" && !gameTracker.keyPress.up) {
                //down
                gameTracker.keyPress.down = true
                gameTracker.directionX = 0
                gameTracker.directionY = basePixelUnit
        
                gameTracker.keyPress.up = false
                gameTracker.keyPress.right = false
                gameTracker.keyPress.left = false
            }
            if(key === "left" && !gameTracker.keyPress.right) {
                //left
                gameTracker.keyPress.left = true
                gameTracker.directionX = -basePixelUnit
                gameTracker.directionY = 0
        
                gameTracker.keyPress.right = false
                gameTracker.keyPress.down = false
                gameTracker.keyPress.up = false
            }
            if(key === "right" && !gameTracker.keyPress.left) {
                //right
                gameTracker.keyPress.right = true
                gameTracker.directionX = basePixelUnit
                gameTracker.directionY = 0
        
                gameTracker.keyPress.left = false
                gameTracker.keyPress.up = false
                gameTracker.keyPress.down = false
            }
            if(key === "pause") {
                togglePause()           
            }
        }
    })
}

function setCanvasSize(canvas) {
    if(!isMobileDevice() || wrapper.clientWidth > 640) {
        canvas.width = 480;
        canvas.height = 320;
    } else {
        canvas.width = Math.floor((wrapper.clientWidth-10) / basePixelUnit) * basePixelUnit;
        canvas.height = Math.floor(gameContainer.clientHeight / basePixelUnit) * basePixelUnit;
    }
    gameContainer.style.width = canvas.width + "px"
    gameContainer.style.height = canvas.height + "px"
    gameTracker = gameReset(canvas, basePixelUnit);
    console.log('h/w', canvas.height, canvas.width)
}

//***** starting speed selector
function setSpeed() {
    gameTracker.fps = Number(this.dataset.fps) //pulled from html attribute on buttons
    speedButtons.forEach(function(el) {
        el.classList.remove('selected')
    })
    this.classList.add('selected')
    document.querySelector('.space-bar').classList.add('animate-emphasize-color')
}

function displayHighScores() {
    if(highScores.length > 0) {
        leaderboard.innerHTML = "";
        highScores.map(el => {
            let listItem = document.createElement('li')
            listItem.textContent = el
            leaderboard.append(listItem)
        })
    }
}

function setHighScores(score) {
    if(score > 0 && highScores.indexOf(score) < 0) {
        highScores.push(score)
        highScores.sort((a, b) => b - a)
        if(highScores.length > 10) {
            highScores.length = 10
        }
        localStorage.setItem("highScores", JSON.stringify(highScores))
        displayHighScores()
    }
}

function startGame() {
    playSound('start-sound')
    gameTracker.gameActive = true;
    randomizeFood()
    gameTracker.foodKind = pickFood()
    startScreen.classList.add('hidden')
    gameoverScreen.classList.add('hidden')
    gameScreen.classList.remove('animate-fade-out')
    gameScreen.classList.add('animate-fade-in')
    gameScreen.classList.replace('hidden','flex')
}

//runs if snake hits self or walls
function endGame() {
    gameTracker.gameActive = false;
    gameTracker.keyPress.right = false
    gameTracker.keyPress.left = false
    gameTracker.keyPress.up = false
    gameTracker.keyPress.down = false
    gameTracker.directionX = 0
    gameTracker.directionY = 0
    gameTracker.fps = 0

    setHighScores(score)
    playSound('death-sound')

    gameScreen.classList.remove('animate-fade-in')
    gameScreen.classList.add('animate-fade-out')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setTimeout(() => {
        gameScreen.classList.replace('flex', 'hidden')
        gameoverScreen.classList.remove('hidden')
        spaceBar.classList.remove('hidden')
        gameTracker = gameReset(canvas, basePixelUnit);
    }, 1000);
}

function togglePause() {
    if(!gameTracker.paused) {
        gameTracker.paused = true
        pauseScreen.classList.remove('hidden')
    } else {
        gameTracker.paused = false
        pauseScreen.classList.add('hidden')
        drawGame() //restart animation
    }
}

//function to randomize food spawn in units of 10
function randomizeFood() {
    var x = randNum(0, canvas.width-basePixelUnit, basePixelUnit)
    var y = randNum(0, canvas.height-basePixelUnit, basePixelUnit)
    //check if x or y are in snake area
    var duplicate = false
    for(var i = 0; i < gameTracker.snake.length; i++) {
        if (gameTracker.snake[i][0] === x && gameTracker.snake[i][1] === y) { 
            duplicate = true
        }
    }
    
    if (duplicate) {
        return randomizeFood() //we love recursion!
    } 
    else {
        gameTracker.foodX = x
        gameTracker.foodY = y
    }
}

function drawFood() {
    if(gameTracker.foodKind == 1) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(pizza, gameTracker.foodX, gameTracker.foodY, basePixelUnit, basePixelUnit)  
    }
    else if(gameTracker.foodKind == 2) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(burger, gameTracker.foodX, gameTracker.foodY, basePixelUnit, basePixelUnit) 
    }
    else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(cherries, gameTracker.foodX, gameTracker.foodY, basePixelUnit, basePixelUnit) 
    } 
 }

//runs when snake hits food to add length
function eatFood() {
    //if food coordinates equal snake head coordinates, eat food and add length
    if(gameTracker.foodX === gameTracker.snakeHeadX && gameTracker.foodY === gameTracker.snakeHeadY) {
        playSound('food-sound')
        score++
        displayScore(score)
        if(score%5 === 0) {
            gameTracker.fps = increaseSpeed(gameTracker.fps)
        }
        
        let length = gameTracker.snake.length
        //if moving horizontally add length to x-axis
        if(gameTracker.keyPress.left || gameTracker.keyPress.right) {
            gameTracker.snake.unshift([gameTracker.foodX, gameTracker.foodY])
            gameTracker.snake.push([gameTracker.snake[length-1][0], gameTracker.snake[length-1][1]], [gameTracker.snake[length-1][0]+basePixelUnit, gameTracker.snake[length-1][1]])
        }              
        //if moving vertically add length to y-axis
        if(gameTracker.keyPress.up || gameTracker.keyPress.down)        
            {gameTracker.snake.unshift([gameTracker.foodX, gameTracker.foodY])
            gameTracker.snake.push([gameTracker.snake[length-1][0], gameTracker.snake[length-1][1]], [gameTracker.snake[length-1][0], gameTracker.snake[length-1][1]+basePixelUnit])}        
        //reset food type and location
        randomizeFood()
        gameTracker.foodKind = pickFood()
    } 
}

function hitWalls() {
    //ends game if walls are hit
    if(gameTracker.snakeHeadX + gameTracker.directionX < 0 || gameTracker.snakeHeadX + gameTracker.directionX > canvas.width - basePixelUnit) {
        endGame()
        
    } else if(gameTracker.snakeHeadY + gameTracker.directionY < 0 || gameTracker.snakeHeadY + gameTracker.directionY > canvas.height - basePixelUnit) {
        endGame()
    }
}

//ends game if snake hits self
function hitSelf() {
    for(var a = 1; a < gameTracker.snake.length; a++) {
        if(gameTracker.snake[a][0] === gameTracker.snakeHeadX && gameTracker.snake[a][1] === gameTracker.snakeHeadY) {
            endGame()
            break;
       }
    }
}

//simulates movement by changing snake array coordinates
function moveSnake() {
    if(gameTracker.keyPress.right) {
        gameTracker.snake.pop()
        gameTracker.snake.unshift([gameTracker.snakeHeadX + gameTracker.directionX, gameTracker.snakeHeadY])
    }
    if(gameTracker.keyPress.left) {
        gameTracker.snake.pop()
        gameTracker.snake.unshift([gameTracker.snakeHeadX + gameTracker.directionX, gameTracker.snakeHeadY])
    }
    if(gameTracker.keyPress.up) {
        gameTracker.snake.pop()
        gameTracker.snake.unshift([gameTracker.snakeHeadX, gameTracker.snakeHeadY + gameTracker.directionY])
    }
    if(gameTracker.keyPress.down) {
        gameTracker.snake.pop()
        gameTracker.snake.unshift([gameTracker.snakeHeadX, gameTracker.snakeHeadY + gameTracker.directionY])
    }
    gameTracker.snakeHeadX = gameTracker.snake[0][0]
    gameTracker.snakeHeadY = gameTracker.snake[0][1]
}

function drawSnake([n,m]) { 
    ctx.beginPath()
    ctx.rect(n,m,basePixelUnit,basePixelUnit)
    ctx.fillStyle = '#00ff00'
    ctx.fill()
    ctx.strokeStyle = "#009300"
    ctx.stroke()
    ctx.closePath()
}

//animation!
function drawGame() {
    if(!gameTracker.gameActive || gameTracker.paused) {return;} 
    setTimeout(function () { //setTimeout used with requestAnimationFrame to control speed of animation
        hitWalls()
        hitSelf()
        drawFood()
        eatFood()
        moveSnake()
        gameTracker.snake.forEach(drawSnake) 
        requestAnimationFrame(drawGame)
    }, 1000/gameTracker.fps)
}

function initGame() {
    //************set starting environment
    setCanvasSize(canvas)
    eventListeners()
    if(isTouchScreen()) {
        touchEventListeners()
        document.body.classList.add('touchscreen')
    }
    speedButtons.forEach(function(el) {
        el.addEventListener('click', setSpeed);
    })
}
//end functions

initGame()

