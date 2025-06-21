let playerScore = 0;
let computerScore = 0;
let countdown = 3;
let gameOver = false;
let countdownInterval;
let storedPlayerChoice = null;

const countdownSound = document.getElementById("countdown-sound");

function startGame() {
  gameOver = false;
  playerScore = 0;
  computerScore = 0;
  document.getElementById('player-score').textContent = 0;
  document.getElementById('computer-score').textContent = 0;
  document.getElementById('winner').textContent = "Make your move!";
  document.getElementById('timer').textContent = "Game started!";
  enableButtons(true);
}

function resetGame() {
  startGame();
}

function startRound(playerChoice) {
  if (gameOver) return;

  storedPlayerChoice = playerChoice;
  countdown = 3;
  document.getElementById('timer').textContent = `Starting in: ${countdown}`;

  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    countdownSound.currentTime = 0;
    countdownSound.play();

    countdown--;
    document.getElementById('timer').textContent = `Starting in: ${countdown}`;

    if (countdown === 0) {
      clearInterval(countdownInterval);
      playAfterCountdown();
    }
  }, 1000);
}

function playAfterCountdown() {
  const playerChoice = storedPlayerChoice;
  const choices = ['rock', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  document.getElementById('player-choice').textContent = playerChoice;
  document.getElementById('computer-choice').textContent = computerChoice;

  let winner = '';

  if (playerChoice === computerChoice) {
    winner = "It's a tie!";
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'scissors' && computerChoice === 'paper') ||
    (playerChoice === 'paper' && computerChoice === 'rock')
  ) {
    winner = "You win this round!";
    playerScore++;
  } else {
    winner = "Computer wins this round!";
    computerScore++;
  }

  document.getElementById('winner').textContent = winner;
  document.getElementById('player-score').textContent = playerScore;
  document.getElementById('computer-score').textContent = computerScore;

  checkGameOver();
}

function checkGameOver() {
  if (playerScore === 5 || computerScore === 5) {
    gameOver = true;
    document.getElementById('timer').textContent = "Game Over!";
    document.getElementById('winner').textContent =
      playerScore === 5 ? "🎉 You won the game!" : "💻 Computer won the game!";
    enableButtons(false);
  }
}
function showHowToPlay() {
    alert(
`Welcome to Jagadish's Rock, Paper, Scissors Project!

🪨📄✂️ How to Play:
- Players: 1 (You) vs. Computer.
- Choices: Rock beats Scissors, Scissors beat Paper, Paper beats Rock.
- How to Win: Pick the stronger option. If both match, it's a tie!
- Play Again: First to 5 points wins the game.`
    );
}
function enableButtons(enable) {
  document.querySelectorAll('.choices button').forEach(btn => {
    btn.disabled = !enable;
  });
}