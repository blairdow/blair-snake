const isMobileDevice = () => {
  // User agent string method
  let isMobile = 
   (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ||  // User agent string method
   (window.innerWidth < 640) || // Screen resolution method
   (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));  // Touch events method

  console.log('mobile', isMobile)
  return isMobile
}

const createImg = (options) => {
  let img = document.createElement('img')
    for (const key in options) {
        if (options.hasOwnProperty(key)) {
            img.setAttribute(key, options[key])
        }
    }
  return img
}

const playStartSound = () => {
    document.getElementById('start').volume = 0.15
    document.getElementById('start').play()
}
const playFoodSound = () => {
    document.getElementById('food').volume = 0.15
    document.getElementById('food').play()
}
const playDeathSound = () => {
    document.getElementById('death').volume = 0.15
    document.getElementById('death').play()
}

const displayScore = (score) => {
  let scoreElement = document.querySelector('.score')
  scoreElement.textContent = score
}

const increaseSpeed = (fps) => {
  return fps += 3
}

//function to create random multiples of given number for food spawn locations
const randNum = (min, max, multiple) => {
    return Math.round((Math.random()*(max-min)+min)/multiple)*multiple;
}

const snakeReset = () => {
  let snake =[[150,125],
            [150,130],
            [150,135],
            [150,140],
            [150,145]]
  return snake
}

const pickFood = () => {
  let foodKind = Math.floor((Math.random()*3)+1)
  return foodKind
}

const gameReset = (canvas, basePixelUnit = 10) => {
  let initialValues = {
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
    }
  }
  return initialValues;
}

export { isMobileDevice, createImg, playStartSound, playFoodSound, playDeathSound, displayScore, increaseSpeed, snakeReset, randNum, pickFood, gameReset }