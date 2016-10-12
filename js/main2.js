
console.log('linked')

var $canvas = $('#myCanvas')[0]
var $ctx = $canvas.getContext('2d')
var snake = [[150,125],
             [150,130],
             [150,135],
             [150,140],
             [150,145]]

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

//vars to detect key presses
var rightPressed = false
var leftPressed = false
var upPressed = false
var downPressed = false

var selfGameOver = false

//keys to control snakey and space to start
function eventListeners() {
    $(document).one('keydown', function(e) {
        if(e.keyCode === 32) {
           $startScreen.hide()
           $gameScreen.show()
//           $gameOver.hide()
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

//reset snake to start position
function snakeReset () {
    snake =[[150,125],
             [150,130],
             [150,135],
             [150,140],
             [150,145]]
    }

//function resetGame() {
//    $(document).one('keydown', function(e){
//        if(e.keyCode === 32) {
//            console.log('reset')
//            $gameOver.fadeOut()
//        }
////        if(e.keyCode === 32) {
////            //reset snake
////            snake = [[150,125],
////                     [150,130],
////                     [150,135],
////                     [150,140],
////                     [150,145]]
////            $gameOver.fadeOut('fast')
////            setTimeout(function () {
////                score = 0
////                $gameScreen.fadeIn('fast')
////            }, 500)
////        }
//    })
//}

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
    setTimeout(function() {
        $gameOver.fadeIn()
        snakeReset()
    }, 1000) 
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
    //if food coordinates equal snake head coordinates, eat food and add length
    if(foodX === snakeHeadX && foodY === snakeHeadY) {
        score++
        var length = snake.length
        //if moving horizontally add length to x-axis
        if(leftPressed || rightPressed) {
            snake.unshift([foodX, foodY])
            snake.push([snake[length-1][0], snake[length-1][1]], [snake[length-1][0]+5, snake[length-1][1]])
        }              
        //if moving vertically add length to y-axis
        if(upPressed || downPressed) {snake.unshift([foodX, foodY])
        snake.push([snake[length-1][0], snake[length-1][1]], [snake[length-1][0], snake[length-1][1]+5])}        
        //reset food spawn coordinates
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
   
    for(var a = 1; a < snake.length; a++) {
        if(snake[a][0] === snakeHeadX && snake[a][1] === snakeHeadY) {
            rightPressed = false
            leftPressed = false
            upPressed = false
            downPressed = false
            directionX = 0
            directionY = 0
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
    var fps = 10
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
