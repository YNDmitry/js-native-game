const $start = document.querySelector('#start')
const $game = document.querySelector('#game') 
const $time = document.querySelector('#time')
const $result = document.querySelector('#result')
const $timeHeader = document.querySelector('#time-header')
const $resultHeader = document.querySelector('#result-header')
const $gameTime = document.querySelector('#game-time')

let score = 0
let isGameStarted = false

const show = ($el) => {
  $el.classList.remove('hide')
}
const hide = ($el) => {
  $el.classList.add('hide')
}

$start.addEventListener('click', () => {
  score = 0
  setGameTime()
  $gameTime.setAttribute('disabled', 'true')
  isGameStarted = true
  hide($start)
  $game.style.backgroundColor = 'white'

  let interval = setInterval(() => {
    let time = parseFloat($time.textContent)
    if (time <= 0) {
      clearInterval(interval)
      endGame()
    } else {
      $time.textContent = (time - 0.1).toFixed(1)
    }
  }, 100)

  renderBox()
})

$game.addEventListener('click', (event) => {
  if (!isGameStarted) {
    return
  }

  if (event.target.dataset.box) {
    score += 1
    renderBox()
  }
})

$gameTime.addEventListener('input', () => {
  setGameTime()
})

const setGameScore = () => {
  $result.textContent = score.toString()
}

const setGameTime = () => {
  let time = +$gameTime.value
  $time.textContent = time.toFixed(1)
  show($timeHeader)
  hide($resultHeader)
}

const endGame = () => {
  isGameStarted = false
  $gameTime.removeAttribute('disabled')
  setGameScore()
  show($start)
  $game.innerHTML = ''
  $game.style.backgroundColor = '#ccc'
  hide($timeHeader)
  show($resultHeader)
}

const renderBox = () => {
  $game.innerHTML = ''
  const box = document.createElement('div')
  let boxSize = getRandom(30, 100)
  let gameSize = $game.getBoundingClientRect()
  let maxTop = gameSize.height - boxSize
  let maxLeft = gameSize.width - boxSize
  let color = getRandomColor()

  box.style.height = box.style.width = boxSize + 'px'
  box.style.position = 'absolute'
  box.style.backgroundColor = color
  box.style.top = getRandom(0, maxTop) + 'px'
  box.style.left = getRandom(0, maxLeft) + 'px'
  box.style.cursor = 'pointer'
  box.setAttribute('data-box', 'true')
  
  $game.insertAdjacentElement('afterbegin', box)
}

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const getRandomColor = () => {
  let letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
