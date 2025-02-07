const colorBox = document.getElementById('colorBox');
const colorOptions = document.querySelectorAll('.color-option');
const gameStatus = document.getElementById('gameStatus');
const scoreElement = document.getElementById('score');
const newGameButton = document.getElementById('newGameButton');

let targetColor;
let score = 0;

// Generate a random color
function getRandomColor() {
  const colorSet = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink', 'brown', 'black', 'white', 'gray', 'cyan'];
  return colorSet[Math.floor(Math.random() * colorSet.length)];
}

function startNewGame() {
  // reset score
  score = 0;
  scoreElement.textContent = score;
  
  loadNextRound();
}

// Start a new game / round
function loadNextRound() {
  // Reset the game status
  gameStatus.textContent = '';
  gameStatus.onanimationend = null;
  gameStatus.classList.remove('right', 'wrong');

  // allow inputs
  enableInputs();

  // Generate a new target color
  targetColor = getRandomColor();
  colorBox.style.backgroundColor = targetColor;

  let usedColors = [targetColor];

  // Assign random colors to the buttons and ensure one matches the target
  const correctButtonIndex = Math.floor(Math.random() * colorOptions.length);
  colorOptions.forEach((button, index) => {
    let color;

    if (index === correctButtonIndex) {
      color = targetColor;

    } else {
      do {
        color = getRandomColor();

      } while (usedColors.includes(color));

      usedColors.push(color);
    }

    button.style.backgroundColor = color;
    button.dataset.color = color;
  });
}


function enableInputs(){
  colorOptions.forEach(button => button.disabled = false)
}

function disableInputs(){
  colorOptions.forEach(button => button.disabled = true)
}

// Handle color button click
colorOptions.forEach(button => {
  button.addEventListener('click', (event) => {
    const selectedColor = event.target.dataset.color;

    // disable plays during animations
    disableInputs();

    // load next round after displaying results
    gameStatus.onanimationend = () => {
      loadNextRound();
    }

    if (selectedColor === targetColor) {
      gameStatus.classList.add("right");
      gameStatus.textContent = 'Correct!';
      score++;

      scoreElement.textContent = score;

    } else {
      gameStatus.classList.add("wrong");
      gameStatus.textContent = 'Wrong!';
    }
  });
});

// Attach event listener to the new game button
newGameButton.addEventListener('click', startNewGame);

// Initialize the game
startNewGame();
