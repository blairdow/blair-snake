
var $canvas = $('#myCanvas')[0]
var $ctx = $canvas.getContext('2d')
var snake = [[150,125],
             [150,130],
             [150,135],
             [150,140],
             [150,145]]
var $burger = $('<img>', {
    id: 'burger',
    src: '../css/images/chzburger.png',
    alt: 'burger'    
})[0]

var $cherries = $('<img>', {
    id: 'cherries',
    src: '../css/images/cherries.png',
    alt: 'cherries'
})[0]

var $pizza = $('<img>', {
    id: 'pizza',
    src: '../css/images/pizza.png',
    alt: 'pizza'
})[0]

var directionX = 0
var directionY = 0
var snakeHeadX = snake[0][0]
var snakeHeadY = snake[0][1]
var foodX = 0   
var foodY = 0
var score = 0

//starting framerate
var fps = 10
var $startScreen = $('#start-screen')
var $gameScreen = $('#game-screen')
var $gameOver = $('#game-over')

//vars to detect key presses
var rightPressed = false
var leftPressed = false
var upPressed = false
var downPressed = false

var selfGameOver = false

//keys to control snakey and space to start
function eventListeners() {
    //space bar to start game
    $(document).one('keydown', function(e) {
        if(e.keyCode === 32) {
           $startScreen.hide()
           $gameScreen.show()
        } 
    })
    //arrow keys
    $(document).on('keydown', function(e) {
        if(e.keyCode === 38 && !downPressed) {
            //up
            upPressed = true
            directionX = 0
            directionY = -5

            leftPressed = false
            rightPressed = false
            downPressed = false
        }
        if(e.keyCode === 40 && !upPressed) {
            //down
            downPressed = true
            directionX = 0
            directionY = 5

            upPressed = false
            rightPressed = false
            leftPressed = false
        }
        if(e.keyCode === 37 && !rightPressed) {
            //left
            leftPressed = true
            directionX = -5
            directionY = 0

            rightPressed = false
            downPressed = false
            upPressed = false
        }
        if(e.keyCode === 39 && !leftPressed) {
            rightPressed = true
            directionX = 5
            directionY = 0

            leftPressed = false
            upPressed = false
            downPressed = false
        }
    })
}

//************set starting environment
//$startScreen.hide()
$gameScreen.hide()
$gameOver.hide()
eventListeners()

function displayScore() {
    var $score = $('.score')
    $score.text('Score: ' + score)
}

//increase speed when score is 5, 10, 15, etc
function speedIncrease() {
    if(score%5 === 0) {
        fps += 3
        console.log('increase speed', fps)
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
function gameOverScreen() {
    //set space bar to reset game
    $(document).one('keydown', function(e){
        if(e.keyCode === 32) {
            $gameOver.fadeOut('fast')
            setTimeout(function () {
                score = 0
                $gameScreen.fadeIn('fast')
            }, 500)
        }
    })
    
    $gameScreen.fadeOut('slow')
    $ctx.clearRect(0, 0, $canvas.width, $canvas.height)
    setTimeout(function() {
        $gameOver.fadeIn()
        snakeReset()
    }, 1000) 
}

//functions to randomize food spawn in units of 5
function randomizeFoodX() {
    var counter = 0
    var n = Math.floor((Math.random() * $canvas.width) + 1)
    for(var i = 0; i < snake.length; i++) {
        if(snake[i][0] === n) {
            counter++
        }  
    }
    while (n%5 !== 0 && counter < 1) {
        n = Math.floor((Math.random() * $canvas.width) + 1)
    }
    foodX = n - 5
}
function randomizeFoodY() {
    var counter = 0
    var n = Math.floor((Math.random() * $canvas.height) + 1)
    for(var i = 0; i < snake.length; i++) {
        if(snake[i][1] === n) {
            counter++
        }  
    }
    while (n%5 !== 0 && counter < 1) {
        n = Math.floor((Math.random() * $canvas.height) + 1)
    }
    foodY = n - 5
}
//call function once to set random food spawn (so its not redrawn every frame)
randomizeFoodX()
randomizeFoodY()

function pickFood() {
    var x = Math.floor((Math.random()*3)+1)
    return x
}
//call to initialize food
pickFood()

function drawFood() {
    if(pickFood == 1) {
        $ctx.clearRect(0, 0, $canvas.width, $canvas.height)
        $ctx.drawImage($pizza, foodX, foodY, 5, 5)  
    }
    else if(pickFood == 2) {
        $ctx.clearRect(0, 0, $canvas.width, $canvas.height)
        $ctx.drawImage($burger, foodX, foodY, 5, 5) 
    }
    else {
        $ctx.clearRect(0, 0, $canvas.width, $canvas.height)
        $ctx.drawImage($cherries, foodX, foodY, 5, 5) 
    } 
 }

//runs when snake hits food to add length
function eatFood() {
    //if food coordinates equal snake head coordinates, eat food and add length
    if(foodX === snakeHeadX && foodY === snakeHeadY) {
        score++
        speedIncrease()
        var length = snake.length
        //if moving horizontally add length to x-axis
        if(leftPressed || rightPressed) {
            snake.unshift([foodX, foodY])
            snake.push([snake[length-1][0], snake[length-1][1]], [snake[length-1][0]+5, snake[length-1][1]])
        }              
        //if moving vertically add length to y-axis
        if(upPressed || downPressed)        
            {snake.unshift([foodX, foodY])
            snake.push([snake[length-1][0], snake[length-1][1]], [snake[length-1][0], snake[length-1][1]+5])}        
        //reset food spawn coordinates
        randomizeFoodX()
        randomizeFoodY()
        pickFood()
    } 
}

function hitWalls() {
    //ends game if walls are hit
    if(snakeHeadX + directionX < 0 || snakeHeadX + directionX > $canvas.width - 5) {
        rightPressed = false
        leftPressed = false
        upPressed = false
        downPressed = false
        directionX = 0
        directionY = 0
        gameOverScreen()

    }
    if(snakeHeadY + directionY < 0 || snakeHeadY + directionY > $canvas.height - 5) {
        gameOverScreen()
        rightPressed = false
        leftPressed = false
        upPressed = false
        downPressed = false
        directionX = 0
        directionY = 0
    }
}

//ends game if snake hits self
function hitSelf() {
    for(var a = 1; a < snake.length; a++) {
        if(snake[a][0] === snakeHeadX && snake[a][1] === snakeHeadY) {
            gameOverScreen()
            rightPressed = false
            leftPressed = false
            upPressed = false
            downPressed = false
            directionX = 0
            directionY = 0
       }
    }
}

//simulates movement by changing snake array coordinates
function moveSnake() {
    if(rightPressed) {
        snake.pop()
        snake.unshift([snakeHeadX + directionX, snakeHeadY])
    }
    if(leftPressed) {
        snake.pop()
        snake.unshift([snakeHeadX + directionX, snakeHeadY])
    }
    if(upPressed) {
        snake.pop()
        snake.unshift([snakeHeadX, snakeHeadY + directionY])
    }
    if(downPressed) {
        snake.pop()
        snake.unshift([snakeHeadX, snakeHeadY + directionY])
    }
    snakeHeadX = snake[0][0]
    snakeHeadY = snake[0][1]
}

//function given to snake in draw function
function drawSnake([n,m]) { 
    $ctx.beginPath()
    $ctx.rect(n,m,5,5)
    $ctx.fillStyle = '#00ff00'
    $ctx.fill()
    $ctx.strokeStyle = "#009300"
    $ctx.stroke()
    $ctx.closePath()
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
