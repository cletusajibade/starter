'use strict';

let diceEl = document.querySelector('.dice');
let btnNewGameEl = document.querySelector('.btn--new');
let btnRollEl = document.querySelector('.btn--roll');
let btnHoldEl = document.querySelector('.btn--hold');

let currentScore0El = document.getElementById('current--0');
let currentScore1El = document.getElementById('current--1');
let score0El = document.getElementById('score--0');
let score1El = document.getElementById('score--1');

let sectionPlayer0El = document.querySelector('.player--0');
let sectionPlayer1El = document.querySelector('.player--1');

let score, currentScore, currentPlayer, playing;

function init() {
  score = [0, 0];
  currentPlayer = 0;
  currentScore = 0;
  playing = true;

  diceEl.classList.add('hidden');
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
}

init();

/**
 * Generate random numbers between 1 and 6 inclusive
 * @return {*}
 */
function roleDice() {
  return Math.floor(Math.random() * 6) + 1;
}

btnRollEl.addEventListener('click', () => {
  if (playing) {
    const dice = roleDice();
    diceEl.classList.remove('hidden');
    diceEl.setAttribute('src', `dice-${dice}.png`);

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    } else {
      currentScore = 0;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');
      switchPlayer();
    }
  }
});

btnHoldEl.addEventListener('click', () => {
  if (playing) {
    score[currentPlayer] += currentScore;
    if (score[currentPlayer] >= 100) {
      //End game, current player wins
      playing = false;
      console.log(`Player ${currentPlayer} wins`);

      document.getElementById(`score--${currentPlayer}`).textContent =
        score[currentPlayer];
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;

      currentScore = 0;
    } else {
      currentScore = 0;
      document.getElementById(`score--${currentPlayer}`).textContent =
        score[currentPlayer];
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');

      switchPlayer();
    }
  }
});

btnNewGameEl.addEventListener('click', init);

function switchPlayer() {
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  currentScore = 0;

  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.toggle('player--active');
}
