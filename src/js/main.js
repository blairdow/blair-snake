import sounds from './sounds'
import images from './images'
import { isMobileDevice, createImg, playStartSound, playFoodSound, playDeathSound, updateScore, increaseSpeed, rand5, pickFood, gameReset } from './utilities';

//canvas elements
let canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext('2d')

//screen modes
let isMobile = isMobileDevice();
let startScreen = document.getElementById('start-screen')
let gameScreen = document.getElementById('game-screen')
let gameoverScreen = document.getElementById('game-over')

let animationReference;

//speed/start buttons
let speedButtons = document.querySelectorAll('.speed-buttons button');
let spaceBar = document.querySelector('.space-bar')

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
let highScores = JSON.parse(localStorage.getItem("highScores"))
if(highScores == null) {
    //set empty array if no scores
    highScores = []
    localStorage.setItem("highScores", JSON.stringify(highScores))
} else {
    // highScores = JSON.parse(highScores)
}
console.log(highScores)

let gameTracker = {
    snake: [[150,125], //starting snake position
             [150,130],
             [150,135],
             [150,140],
             [150,145]],
    fps: 0, //starting framerate - selected with buttons
    directionX: 0,
    directionY: 0,
    snakeHeadX: 150,
    snakeHeadY: 125,
    foodX: 0,   
    foodY: 0,
    foodKind: 0,
    keyPress: { //vars to detect key presses
        right: false,
        left: false,
        up: false,
        down: false
    },
    gameover: false //used to stop animation
}

//FUNCTIONS
//keys to control snakey and space to start
function keyboardEventListeners() {
    //space bar to start game
    document.addEventListener('keydown', function(e) {
        //must select speed (fps) before start
        if(gameTracker.fps > 0 && e.code === "Space") {
            score = 0
            spaceBar.classList.replace('animate-emphasize', 'hidden')
            document.querySelector('.score-wrapper').classList.remove('hidden')
            startGame()
            drawGame()
        }
        else if(e.code === "space") {
            document.querySelector('.speed').classList.toggle('animate-emphasize')
        }
    })

    //arrow keys
    document.addEventListener('keydown', function(e) {
        if(e.code === "ArrowUp" && !gameTracker.keyPress.down) {
            //up
            gameTracker.keyPress.up = true
            gameTracker.directionX = 0
            gameTracker.directionY = -5
    
            gameTracker.keyPress.left = false
            gameTracker.keyPress.right = false
            gameTracker.keyPress.down = false
        }
        if(e.code === "ArrowDown" && !gameTracker.keyPress.up) {
            //down
            gameTracker.keyPress.down = true
            gameTracker.directionX = 0
            gameTracker.directionY = 5
    
            gameTracker.keyPress.up = false
            gameTracker.keyPress.right = false
            gameTracker.keyPress.left = false
        }
        if(e.code === "ArrowLeft" && !gameTracker.keyPress.right) {
            //left
            gameTracker.keyPress.left = true
            gameTracker.directionX = -5
            gameTracker.directionY = 0
    
            gameTracker.keyPress.right = false
            gameTracker.keyPress.down = false
            gameTracker.keyPress.up = false
        }
        if(e.code === "ArrowRight" && !gameTracker.keyPress.left) {
            //right
            gameTracker.keyPress.right = true
            gameTracker.directionX = 5
            gameTracker.directionY = 0
    
            gameTracker.keyPress.left = false
            gameTracker.keyPress.up = false
            gameTracker.keyPress.down = false
        }
    })
}

//***** starting speed selector
function setSpeed() {
    gameTracker.fps = Number(this.dataset.fps) //pulled from html attribute on buttons
    speedButtons.forEach(function(el) {
        el.classList.remove('selected')
    })
    this.classList.add('selected')
    document.querySelector('.space-bar').classList.add('animate-emphasize')
}

function startGame() {
    playStartSound()
    startScreen.classList.add('hidden')
    gameoverScreen.classList.add('hidden')
    gameScreen.classList.remove('animate-fade-out')
    gameScreen.classList.add('animate-fade-in')
    gameScreen.classList.replace('hidden','flex')
}

//runs if snake hits self or walls
function endGame() {
    gameTracker.gameover = true;
    gameTracker.keyPress.right = false
    gameTracker.keyPress.left = false
    gameTracker.keyPress.up = false
    gameTracker.keyPress.down = false
    gameTracker.directionX = 0
    gameTracker.directionY = 0
    gameTracker.fps = 0
    highScores.push(score)
    localStorage.setItem("highScores", JSON.stringify(highScores))
    gameScreen.classList.remove('animate-fade-in')
    gameScreen.classList.add('animate-fade-out')
    playDeathSound()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setTimeout(() => {
        gameScreen.classList.replace('flex', 'hidden')
        gameoverScreen.classList.remove('hidden')
        spaceBar.classList.remove('hidden')
        gameTracker = gameReset();
    }, 1000);
}

//function to randomize food spawn in units of 5
function randomizeFood() {
    var x = rand5(0, canvas.width-5)
    var y = rand5(0, canvas.height-5)
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
    // console.log('draw food')
    if(gameTracker.foodKind == 1) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(pizza, gameTracker.foodX, gameTracker.foodY, 5, 5)  
    }
    else if(gameTracker.foodKind == 2) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(burger, gameTracker.foodX, gameTracker.foodY, 5, 5) 
    }
    else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(cherries, gameTracker.foodX, gameTracker.foodY, 5, 5) 
    } 
 }

//runs when snake hits food to add length
function eatFood() {
    //if food coordinates equal snake head coordinates, eat food and add length
    if(gameTracker.foodX === gameTracker.snakeHeadX && gameTracker.foodY === gameTracker.snakeHeadY) {
        playFoodSound()
        score++
        updateScore(score)
        if(score%5 === 0) {
            gameTracker.fps = increaseSpeed(gameTracker.fps)
        }
        
        let length = gameTracker.snake.length
        //if moving horizontally add length to x-axis
        if(gameTracker.keyPress.left || gameTracker.keyPress.right) {
            gameTracker.snake.unshift([gameTracker.foodX, gameTracker.foodY])
            gameTracker.snake.push([gameTracker.snake[length-1][0], gameTracker.snake[length-1][1]], [gameTracker.snake[length-1][0]+5, gameTracker.snake[length-1][1]])
        }              
        //if moving vertically add length to y-axis
        if(gameTracker.keyPress.up || gameTracker.keyPress.down)        
            {gameTracker.snake.unshift([gameTracker.foodX, gameTracker.foodY])
            gameTracker.snake.push([gameTracker.snake[length-1][0], gameTracker.snake[length-1][1]], [gameTracker.snake[length-1][0], gameTracker.snake[length-1][1]+5])}        
        //reset food type and location
        randomizeFood()
        gameTracker.foodKind = pickFood()
    } 
}

function hitWalls() {
    //ends game if walls are hit
    if(gameTracker.snakeHeadX + gameTracker.directionX < 0 || gameTracker.snakeHeadX + gameTracker.directionX > canvas.width - 5) {
        endGame()
        
    } else if(gameTracker.snakeHeadY + gameTracker.directionY < 0 || gameTracker.snakeHeadY + gameTracker.directionY > canvas.height - 5) {
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
    ctx.rect(n,m,5,5)
    ctx.fillStyle = '#00ff00'
    ctx.fill()
    ctx.strokeStyle = "#009300"
    ctx.stroke()
    ctx.closePath()
}

function setHighScore(score) {
    localStorage.setItem('highScores', score)
}

//animation!
function drawGame() {
    if(gameTracker.gameover) {return;} 
    setTimeout(function () {
        //do not change order of functions!
        hitWalls()
        hitSelf()
        drawFood()
        eatFood()
        moveSnake()
        gameTracker.snake.forEach(drawSnake) 
        animationReference = requestAnimationFrame(drawGame)
        console.log('ani', animationReference)
    }, 1000/gameTracker.fps)
}

function initGame() {
    //************set starting environment
    keyboardEventListeners()
    speedButtons.forEach(function(el) {
        el.addEventListener('click', setSpeed);
    })
    //call to set initial food coordinates
    randomizeFood()
    //call to initialize food type
    gameTracker.foodKind = pickFood()
}
//end functions

initGame()

