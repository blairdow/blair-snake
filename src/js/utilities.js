const isMobileDevice = () => {
  // User agent string method
  let isMobile = 
   (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ||  // User agent string method
   (window.innerWidth < 640) || // Screen resolution method
   (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));  // Touch events method

  return isMobile
}

const isTouchScreen = () => {
  return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))
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

const playSound = (soundID) => {
  document.getElementById(soundID).volume = 0.1
  document.getElementById(soundID).play()
}

const displayScore = (score) => {
  let scoreElement = document.querySelectorAll('.score')
  scoreElement.forEach((el) => {
    el.textContent = score
  })
}

const increaseSpeed = (fps) => {
  return fps += 3
}

//function to create random multiples of given number for food spawn locations
const randNum = (min, max, multiple) => {
    return Math.round((Math.random()*(max-min)+min)/multiple)*multiple;
}

const pickFood = () => {
  let foodKind = Math.floor((Math.random()*3)+1)
  return foodKind
}

const gameReset = (canvas, basePixelUnit = 10) => {
  let initialValues = {
    snake: [[Math.floor((canvas.width/2)/basePixelUnit)*basePixelUnit, canvas.height-(basePixelUnit*5)], //starting snake position
             [Math.floor((canvas.width/2)/basePixelUnit)*basePixelUnit, canvas.height-(basePixelUnit*4)],
             [Math.floor((canvas.width/2)/basePixelUnit)*basePixelUnit, canvas.height-(basePixelUnit*3)],
             [Math.floor((canvas.width/2)/basePixelUnit)*basePixelUnit, canvas.height-(basePixelUnit*2)],
             [Math.floor((canvas.width/2)/basePixelUnit)*basePixelUnit, canvas.height-basePixelUnit]],
    fps: 0, //starting framerate - selected with buttons
    directionX: 0,
    directionY: 0,
    snakeHeadX: Math.floor((canvas.width/2)/basePixelUnit)*basePixelUnit,
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
  return initialValues;
}

export { isMobileDevice, isTouchScreen, createImg, playSound, displayScore, increaseSpeed, randNum, pickFood, gameReset }