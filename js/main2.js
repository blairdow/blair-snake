
console.log('linked')

var $canvas = $('#myCanvas')[0]
var $ctx = $canvas.getContext('2d')
var snake = [[150, 110],
             [150,115],
             [150,120],
             [150,125],
             [150,130]]

var directionX = 0
var directionY = 0
var snakeHeadX = snake[0][0]
var snakeHeadY = snake[0][1]
var foodX = 0   
var foodY = 0
var score = 0

var $startScreen = $('#start-screen')
var $gameScreen = $('#game-screen')
var $gameOver = $('#game-over')

var $retry = $('#retry')

//vars to detect key presses
var rightPressed = false
var leftPressed = false
var upPressed = false
var downPressed = false

//keys to control snakey and space to start
function eventListeners() {
    $(document).one('keydown', function(e) {
        if(e.keyCode === 32) {
           $startScreen.hide()
           $gameScreen.show()
        } 
    })
    
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

$gameScreen.hide()
$gameOver.hide()
eventListeners()

function displayScore() {
    var $score = $('.score')
    $score.text('Score: ' + score)
}


function gameOverScreen() {
    $gameScreen.fadeOut('slow')
    $gameOver.fadeIn('fast')
    

    //add space to play again
    $(document).one('keydown', function(e){
        if(e.keyCode === 32) {
            //reset snake
            snake = [[150, 110],
                    [150,115],
                    [150,120],
                    [150,125],
                    [150,130]]
            $gameOver.hide()
            $gameScreen.show()
        }
    })
    
}

//functions to randomize food spawn in units of 5
function randomizeFoodX() {
    var n = Math.floor((Math.random() * $canvas.width) + 1)
    
    while (n%5 !== 0) {
        n = Math.floor((Math.random() * $canvas.width) + 1)
    }

    foodX = n - 5
}

function randomizeFoodY() {
    var n = Math.floor((Math.random() * $canvas.height) + 1)
    
    while (n%5 !== 0) {
        n = Math.floor((Math.random() * $canvas.height) + 1)
    }

    foodY = n - 5
}
//call function once to set random food spawn (so its not redrawn every frame)
randomizeFoodX()
randomizeFoodY()

function drawFood() {
  $ctx.clearRect(0, 0, $canvas.width, $canvas.height)
  $ctx.beginPath()
  $ctx.strokeStyle = "#555"
  $ctx.strokeRect(foodX, foodY, 5, 5)
  $ctx.closePath()
}

function eatFood() {
    //add length if snake going horizontal and hits food
    if(foodX === snakeHeadX && foodY === snakeHeadY) {
        score++
        snake.unshift([foodX, foodY])
//        if(rightPressed) {
//            snake.unshift([foodX, foodY], [foodX-5, foodY], [foodX-10, foodY])
//        }
//        if(leftPressed) {
//            snake.unshift([foodX, foodY], [foodX+5, foodY], [foodX+10, foodY])
//        }
//        if(downPressed) {
//            snake.unshift([foodX, foodY], [foodX, foodY+5], [foodX, foodY+10])
//        }
//        if(upPressed) {
//            snake.unshift([foodX, foodY], [foodX, foodY+5], [foodX, foodY+10])
//        }
        
        randomizeFoodX()
        randomizeFoodY()
    }
    
}

function hitWalls() {
    //ends game if walls are hit
    if(snakeHeadX + directionX < 0 || snakeHeadX + directionX > $canvas.width - 5) {
        rightPressed = false
        leftPressed = false
        directionX = 0
        directionY = 0
        gameOverScreen()
    }
    if(snakeHeadY + directionY < 0 || snakeHeadY + directionY > $canvas.height - 5) {
        upPressed = false
        downPressed = false
        directionX = 0
        directionY = 0
        gameOverScreen()
    }
    
}

function hitSelf() {
//    ends game if snake hits self
    for(var a = 1; a < snake.length; a++) {
        if(snake[a][0] === snakeHeadX && snake[a][1] === snakeHeadY) {
        gameOverScreen()
       }
    }
}

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

function drawSnake([n,m]) {
    $ctx.beginPath()
    //starts at n, m
    $ctx.rect(n, m, 5, 5)
    $ctx.fillStyle = '#555555'
    $ctx.fill()
    $ctx.closePath()
}

function draw() {

    displayScore()
    drawFood()
    moveSnake()
    snake.forEach(drawSnake) 
    hitWalls()
    hitSelf()
    eatFood()
}

//interval for draw function
setInterval(draw, 100)



//on arrow key press, reset direction variables
//to change snake speed, change speed of setInterval function