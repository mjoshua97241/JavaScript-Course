'use strict';

//Selecting the Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //another of using querySelector and a bit faster for bigger multiples
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  // to store the current score and can be updated
  currentScore = 0;

  //store the active player
  activePlayer = 0;

  // State of the game
  playing = true;

  //Starting conditions
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

//function for switching player
// DRY Principle
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //to check if the player is still the same or switches
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

///////////// Without Reset //////////////////////////
//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //this means that the state of the game is playable

    //1. Generate a dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice); //just to check if working

    // 2. Display the dice-remove the hidden
    diceEl.classList.remove('hidden');

    // 2.1. Display the image
    diceEl.src = `dice-${dice}.png`;

    // 3.Checked for rolled 1
    if (dice !== 1) {
      //Add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //this will track the score when is there more than 1 player
      // current0El.textContent = currentScore; //CHANGE LATER
    } else {
      //Switch Player
      switchPlayer();
    }
  }
});
////////////////////////////////////////////////

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to the active player's total score
    scores[activePlayer] += currentScore; //the same with scores[i]=scores[i] + currentScore;

    //display the current total score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's total score >=100
    // Finish the game
    if (scores[activePlayer] >= 20) {
      playing = false; //if this will be executed then the button will not be clickable

      document //to add black background color
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);

      // to remove the player active class when the other player wins the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      //remove the dice image
      diceEl.classList.add('hidden');
    } else {
      // Switch the player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
