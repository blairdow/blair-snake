const isMobileDevice = () => {
  // User agent string method
  let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Screen resolution method
  if (!isMobile) {
      let screenWidth = window.screen.width;
      let screenHeight = window.screen.height;
      isMobile = (screenWidth < 768 || screenHeight < 768);
  }

  // Touch events method
  if (!isMobile) {
      isMobile = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
  }
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
    document.getElementById('start').volume = 0.3
    document.getElementById('start').play()
}
const playFoodSound = () => {
    document.getElementById('food').volume = 0.3
    document.getElementById('food').play()
}
const playDeathSound = () => {
    document.getElementById('death').volume = 0.3
    document.getElementById('death').play()
}

const displayScore = (score) => {
  let scoreElement = document.querySelector('.score')
  scoreElement.textContent = score
}

const increaseSpeed = (fps) => {
  return fps += 3
}

//function to create random multiples of 5 for food spawn locations
const rand5 = (min, max) => {
    return Math.round((Math.random()*(max-min)+min)/5)*5;
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

const gameReset = () => {
  let initialValues = {
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
    }
  }
  return initialValues;
}

export { isMobileDevice, createImg, playStartSound, playFoodSound, playDeathSound, displayScore, increaseSpeed, snakeReset, rand5, pickFood, gameReset }