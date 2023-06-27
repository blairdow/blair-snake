import sounds from './sounds'
import images from './images'

let canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext('2d')

//******* starting snake position
let snake = [[150,125],
             [150,130],
             [150,135],
             [150,140],
             [150,145]]

//******** image elements
function createImg(options) {
    let img = document.createElement('img')
    for (const key in options) {
        if (options.hasOwnProperty(key)) {
            img.setAttribute(key, options[key])
        }
    }
    return img
}
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

let directionX = 0
let directionY = 0
let snakeHeadX = snake[0][0]
let snakeHeadY = snake[0][1]
let foodX = 0   
let foodY = 0
let score = 0
let foodKind = 0

//speed selector buttons
let speedButtons = document.querySelectorAll('.speed-buttons button');
let spaceBar = document.querySelector('.space-bar')

//sounds
function startSound() {
    document.getElementById('start').volume = 0.3
    document.getElementById('start').play()
}
function foodSound() {
    document.getElementById('food').volume = 0.3
    document.getElementById('food').play()
}
function deathSound() {
    document.getElementById('death').volume = 0.3
    document.getElementById('death').play()
}

//starting framerate - selected with buttons
let fps = 0

//screen modes
let startScreen = document.getElementById('start-screen')
let gameScreen = document.getElementById('game-screen')
let gameoverScreen = document.getElementById('game-over')

//vars to detect key presses
let keyPressTracker = {
    right: false,
    left: false,
    up: false,
    down: false
}

//keys to control snakey and space to start
function eventListeners() {
    //space bar to start game
    document.addEventListener('keydown', function(e) {
        console.log('event', e)
        //must select speed (fps) before start
        if(fps > 0 && e.keyCode === 32) {
            score = 0
            spaceBar.classList.replace('animate-emphasize', 'hidden')
            document.querySelector('.score-wrapper').classList.remove('hidden')
            startSound()
            startScreen.classList.add('hidden')
            gameScreen.classList.replace('hidden', 'flex')
            gameScreen.classList.remove('opacity-0')
        }
        else if(e.keyCode === 32) {
            document.querySelector('.speed').classList.toggle('animate-emphasize')
        }
    })
    //arrow keys
    document.addEventListener('keydown', function(e) {
        if(e.keyCode === 38 && !keyPressTracker.down) {
            //up
            keyPressTracker.up = true
            directionX = 0
            directionY = -5
    
            keyPressTracker.left = false
            keyPressTracker.right = false
            keyPressTracker.down = false
        }
        if(e.keyCode === 40 && !keyPressTracker.up) {
            //down
            keyPressTracker.down = true
            directionX = 0
            directionY = 5
    
            keyPressTracker.up = false
            keyPressTracker.right = false
            keyPressTracker.left = false
        }
        if(e.keyCode === 37 && !keyPressTracker.right) {
            //left
            keyPressTracker.left = true
            directionX = -5
            directionY = 0
    
            keyPressTracker.right = false
            keyPressTracker.down = false
            keyPressTracker.up = false
        }
        if(e.keyCode === 39 && !keyPressTracker.left) {
            keyPressTracker.right = true
            directionX = 5
            directionY = 0
    
            keyPressTracker.left = false
            keyPressTracker.up = false
            keyPressTracker.down = false
        }

    })
}

//***** starting speed selector
function setSpeed() {
    console.log('this', this)
    fps = Number(this.dataset.fps)
    speedButtons.forEach(function(el) {
        el.classList.remove('selected')
    })
    this.classList.add('selected')
    document.querySelector('.space-bar').classList.add('animate-emphasize')
}
speedButtons.forEach(function(el) {
    el.addEventListener('click', setSpeed);
})

//************set starting environment
eventListeners()

function displayScore() {
    let scoreElement = document.querySelector('.score')
    // score.textContent = score
}

//increase speed when score is 5, 10, 15, etc
function speedIncrease() {
    if(score%5 === 0) {
        fps += 3
    }
}

//reset snake to start position
function snakeReset () {
    snake =[[150,125],
             [150,130],
             [150,135],
             [150,140],
             [150,145]]
}

//runs if snake hits self or walls
function showGameOverScreen() {
    ////////to do make fade in and out tailwind animation
    // $gameScreen.fadeOut('slow')
    gameScreen.classList.add('hidden')
    gameScreen.classList.add('opacity-0')
    deathSound()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setTimeout(function() {
        fps = 0
        gameoverScreen.classList.remove('hidden')
        gameoverScreen.classList.remove('opacity-0')
        spaceBar.classList.remove('hidden')
        snakeReset()
    }, 1000) 
}

//function to randomize food spawn in units of 5
function randomizeFood() {
  //function to create random multiples of 5
    function rand_5(min, max){
        return Math.round((Math.random()*(max-min)+min)/5)*5;
    }
    var x = rand_5(0, canvas.width-5)
    var y = rand_5(0, canvas.height-5)
    //check if x or y are in snake area
    var duplicate = false
    for(var i = 0; i < snake.length; i++) {
        if (snake[i][0] === x && snake[i][1] === y)
            duplicate = true
    }
    
    if (duplicate) {
        return randomizeFood()
    } 
    else {
        foodX = x
        foodY = y
    }
}

//call to set initial food coordinates
randomizeFood()

function pickFood() {
    foodKind = Math.floor((Math.random()*3)+1)
}
//call to initialize food type
pickFood()

function drawFood() {
    if(foodKind == 1) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(pizza, foodX, foodY, 5, 5)  
    }
    else if(foodKind == 2) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(burger, foodX, foodY, 5, 5) 
    }
    else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(cherries, foodX, foodY, 5, 5) 
    } 
 }

//runs when snake hits food to add length
function eatFood() {
    //if food coordinates equal snake head coordinates, eat food and add length
    if(foodX === snakeHeadX && foodY === snakeHeadY) {
        score++
        foodSound()
        speedIncrease()
        
        var length = snake.length
        //if moving horizontally add length to x-axis
        if(keyPressTracker.left || keyPressTracker.right) {
            snake.unshift([foodX, foodY])
            snake.push([snake[length-1][0], snake[length-1][1]], [snake[length-1][0]+5, snake[length-1][1]])
        }              
        //if moving vertically add length to y-axis
        if(keyPressTracker.up || keyPressTracker.down)        
            {snake.unshift([foodX, foodY])
            snake.push([snake[length-1][0], snake[length-1][1]], [snake[length-1][0], snake[length-1][1]+5])}        
        //reset food type and location
        randomizeFood()
        pickFood()
    } 
}

function hitWalls() {
    ///to do move all game over resets including snake reset together
    //ends game if walls are hit
    if(snakeHeadX + directionX < 0 || snakeHeadX + directionX > canvas.width - 5) {
        keyPressTracker.right = false
        keyPressTracker.left = false
        keyPressTracker.up = false
        keyPressTracker.down = false
        directionX = 0
        directionY = 0
        showGameOverScreen()

    }
    if(snakeHeadY + directionY < 0 || snakeHeadY + directionY > canvas.height - 5) {
        keyPressTracker.right = false
        keyPressTracker.left = false
        keyPressTracker.up = false
        keyPressTracker.down = false
        directionX = 0
        directionY = 0
        showGameOverScreen()
    }
}

//ends game if snake hits self
function hitSelf() {
    for(var a = 1; a < snake.length; a++) {
        if(snake[a][0] === snakeHeadX && snake[a][1] === snakeHeadY) {
            showGameOverScreen()
            keyPressTracker.right = false
            keyPressTracker.left = false
            keyPressTracker.up = false
            keyPressTracker.down = false
            directionX = 0
            directionY = 0
       }
    }
}

//simulates movement by changing snake array coordinates
function moveSnake() {
    if(keyPressTracker.right) {
        snake.pop()
        snake.unshift([snakeHeadX + directionX, snakeHeadY])
    }
    if(keyPressTracker.left) {
        snake.pop()
        snake.unshift([snakeHeadX + directionX, snakeHeadY])
    }
    if(keyPressTracker.up) {
        snake.pop()
        snake.unshift([snakeHeadX, snakeHeadY + directionY])
    }
    if(keyPressTracker.down) {
        snake.pop()
        snake.unshift([snakeHeadX, snakeHeadY + directionY])
    }
    snakeHeadX = snake[0][0]
    snakeHeadY = snake[0][1]
}

//function given to snake in draw function
function drawSnake([n,m]) { 
    ctx.beginPath()
    ctx.rect(n,m,5,5)
    ctx.fillStyle = '#00ff00'
    ctx.fill()
    ctx.strokeStyle = "#009300"
    ctx.stroke()
    ctx.closePath()
}

//animation!
function draw() {
    setTimeout(function () {
        //do not change order of functions!
        hitWalls()
        hitSelf()
        displayScore()
        drawFood()

        eatFood()

        moveSnake()
        snake.forEach(drawSnake) 
        requestAnimationFrame(draw)
        
    }, 1000/fps)
}

draw()
