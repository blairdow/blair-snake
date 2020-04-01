
var $canvas = $('#myCanvas')[0]
var $ctx = $canvas.getContext('2d')

//******* starting snake position
var snake = [[150,125],
             [150,130],
             [150,135],
             [150,140],
             [150,145]]

//******** image elements
var $burger = $('<img>', {
    id: 'burger',
    src: 'css/images/chzburger.png',
    alt: 'burger'    
})[0]

var $cherries = $('<img>', {
    id: 'cherries',
    src: 'css/images/cherries.png',
    alt: 'cherries'
})[0]

var $pizza = $('<img>', {
    id: 'pizza',
    src: 'css/images/pizza.png',
    alt: 'pizza'
})[0]

var foodTypes = [$burger, $pizza, $cherries];

var directionCoords = [0, 0]
var snakeHeadCoords = [snake[0][0], snake[0, 1]]
var foodCoords = randomizeFoodLocation()
var score = 0
var foodKind = pickFood();

//starting framerate - selected with buttons
var fps = 0

//screen modes
var $startScreen = $('#start-screen')
var $gameScreen = $('#game-screen')
var $gameOver = $('#game-over')

//vars to detect key presses
var keyPressed = {
  right: false,
  left: false,
  down: false,
  up: false
}

//keys to control snakey and space to start
function eventListeners() {
    //space bar to start game
    $(document).on('keydown', function(e) {
        //must select speed (fps) before start
        if(fps > 0 && e.keyCode === 32) {
           score = 0
           $startScreen.hide()
           $gameOver.hide()
           playSound('start')
           $gameScreen.fadeIn('slow')
        }
        else if(e.keyCode === 32) {
            $('.speed').toggleClass('emphasize')
        }
    })
    
    //arrow keys to control snake
    $(document).on('keydown', function(e) {
        if(e.keyCode === 38 && !keyPressed.down) {
            //up
            directionCoords = [0, -5]
            Object.keys(keyPressed).forEach((value) => {
              keyPressed[value] = (value === 'up' ?  true : false)
            })
        }
        if(e.keyCode === 40 && !keyPressed.up) {
            //down
            directionCoords = [0, 5]
            Object.keys(keyPressed).forEach((value) => {
              keyPressed[value] = (value === 'down' ?  true : false)
            })

        }
        if(e.keyCode === 37 && !keyPressed.right) {
            //left
            directionCoords = [-5, 0]
            Object.keys(keyPressed).forEach((value) => {
              keyPressed[value] = (value === 'left' ?  true : false)
            })
        }
        if(e.keyCode === 39 && !keyPressed.left) {
            directionCoords = [5, 0]
            Object.keys(keyPressed).forEach((value) => {
              keyPressed[value] = (value === 'right' ?  true : false)
            })
        }
    })
}

function setStartSpeed(e) {
  fps = e.data
  $('.space-bar').css({'color': '#eb00ff', 'text-shadow':'2px 2px aqua'})
}

function displayScore() {
  var $score = $('.score')
  $score.text('Score: ' + score)
}

//sounds
function playSound(sound) {
  //start, food, or death sound
  document.querySelector(`#${sound}`).volume = 0.3
  document.querySelector(`#${sound}`).play()
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
function gameOverScreen() {
    $gameScreen.fadeOut('slow')
    playSound('death')
    $ctx.clearRect(0, 0, $canvas.width, $canvas.height)
    setTimeout(function() {
        fps = 0
        $gameOver.fadeIn()
        snakeReset()
    }, 1000) 
}

//function to randomize food spawn location  in units of 5
function randomizeFoodLocation() {
  //function to create random multiples of 5
    function rand_5(min, max){
        return Math.round((Math.random()*(max-min)+min)/5)*5;
    }
    var x = rand_5(0, $canvas.width-5)
    var y = rand_5(0, $canvas.height-5)
    //check if x or y are in snake area
    var duplicate = false
    for(var i = 0; i < snake.length; i++) {
        if (snake[i][0] === x && snake[i][1] === y)
            duplicate = true
    }
    
    if (duplicate) {
      return randomizeFoodLocation()
    } 
    else {
      return [x, y]
    }
}

//randomize type of food
function pickFood() {
  return Math.floor((Math.random()*(foodTypes.length)))
}

function drawFood(foodKind) {
  let food = foodTypes[foodKind]
  $ctx.clearRect(0, 0, $canvas.width, $canvas.height)
  $ctx.drawImage(food, foodCoords[0], foodCoords[1], 5, 5)  
 }

//runs when snake hits food to add length
function eatFood() {
  score++
  playSound('food')
  speedIncrease()

  var length = snake.length
  //if moving horizontally add length to x-axis
  if(keyPressed.left || keyPressed.right) {
      snake.unshift(foodCoords)
      snake.push([snake[length-1][0], snake[length-1][1]], [snake[length-1][0]+5, snake[length-1][1]])
  }              
  //if moving vertically add length to y-axis
  if(keyPressed.up || keyPressed.down)        
      {snake.unshift(foodCoords)
      snake.push([snake[length-1][0], snake[length-1][1]], [snake[length-1][0], snake[length-1][1]+5])}   
  
  //reset food type and location
  foodCoords = randomizeFoodLocation()
  foodKind = pickFood()
    
}

function checkWalls() {
  //ends game if walls are hit
  if(   snakeHeadCoords[0] + directionCoords[0] < 0 
     || snakeHeadCoords[0] + directionCoords[0] > $canvas.width - 5
     || snakeHeadCoords[1] + directionCoords[1] < 0 
     || snakeHeadCoords[1] + directionCoords[1] > $canvas.height - 5) {
    return true;
  } else {
    return false;
  }
}

//ends game if snake hits self
function checkSelf() {
  for(var a = 1; a < snake.length; a++) {
    if(snake[a][0] === snakeHeadCoords[0] && snake[a][1] === snakeHeadCoords[1]) {
      return true;     
    } else {
      return false;
    }
  }
}

//checks if snake is hitting walls or self
function checkSnakeLocation() {
  if(checkWalls() || checkSelf()) {
    //resets all key presses to false
    Object.keys(keyPressed).forEach(value => keyPressed[value] = false)
    
    directionCoords = [0, 0]
    gameOverScreen()
  }
}

//simulates movement by changing snake array coordinates
function moveSnake() {
  if(keyPressed.right) {
      snake.pop()
      snake.unshift([snakeHeadCoords[0] + directionCoords[0], snakeHeadCoords[1]])
  }
  if(keyPressed.left) {
      snake.pop()
      snake.unshift([snakeHeadCoords[0] + directionCoords[0], snakeHeadCoords[1]])
  }
  if(keyPressed.up) {
      snake.pop()
      snake.unshift([snakeHeadCoords[0], snakeHeadCoords[1] + directionCoords[1]])
  }
  if(keyPressed.down) {
      snake.pop()
      snake.unshift([snakeHeadCoords[0], snakeHeadCoords[1] + directionCoords[1]])
  }
  snakeHeadCoords = [snake[0][0], snake[0][1]]
}

//function given to snake in draw function
function drawSnake(snake) { 
  snake.forEach((segment) => {
    $ctx.beginPath()
    $ctx.rect(segment[0], segment[1], 5, 5)
    $ctx.fillStyle = '#00ff00'
    $ctx.fill()
    $ctx.strokeStyle = "#009300"
    $ctx.stroke()
    $ctx.closePath()
  })
}

//speed selector buttons
var $fast = $('.fast')
var $faster = $('.faster')
var $fastest = $('.fastest')

//***** starting speed selector
$($fast).on('click', 10, setStartSpeed)
$($faster).on('click', 15, setStartSpeed)
$($fastest).on('click', 20, setStartSpeed)

//************set starting environment
$gameScreen.hide()
$gameOver.hide()
eventListeners()

//call to set initial food coordinates
randomizeFoodLocation()

//animation!
function draw() {
  setTimeout(function () {
    //do not change order of functions!
    displayScore()
    checkSnakeLocation()
    drawFood(foodKind)

    if(foodCoords[0] === snakeHeadCoords[0] && foodCoords[1] === snakeHeadCoords[1]) {
      eatFood()
    }

    moveSnake()
    drawSnake(snake)
    
    requestAnimationFrame(draw)

  }, 1000/fps)
}

draw()
