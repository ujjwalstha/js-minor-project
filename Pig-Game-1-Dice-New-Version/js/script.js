'use strict';

// selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

// declaring variables
let scores = [];
let currentScore, activePlayer, gamePlay;

/**
 * New game
 */
function newGame() {
	// initializing elements
	score0El.textContent = 0;
	score1El.textContent = 0;
	current0El.textContent = 0;
	current1El.textContent = 0;

	// hide dice initially
	diceEl.classList.add('hidden');

	document.querySelector('.player--0').classList.remove('player--winner');
	document.querySelector('.player--1').classList.remove('player--winner');

	document.querySelector('.player--0').classList.add('player--active');
	document.querySelector('.player--1').classList.remove('player--active');

	document.getElementById('name--0').textContent = 'Player 1';
	document.getElementById('name--1').textContent = 'Player 2';

	scores = [0, 0]; // scores of both player stored in array. Score in first element of array is for player 1 and another for player 2
	currentScore = 0; // initializing current score
	activePlayer = 0; // player 1 as initial active player
	gamePlay = true; // determine whether gamePlay is still on or not
}
newGame();

/**
 * Function for switching players
 */
function switchPlayer() {
	// resetting current score to 0 before switching player
	currentScore = 0;
	document.getElementById(`current--${activePlayer}`).textContent =
		currentScore;

	// toggling (removing) the player--active class before switching player (previous active player)
	document
		.querySelector(`.player--${activePlayer}`)
		.classList.toggle('player--active');

	// switching active player (above scripts are considered as before switching player, and below scripts are considered as after switiching player)
	activePlayer = activePlayer === 0 ? 1 : 0;

	// toggling (adding) the player--active class after switching player (new active player)
	document
		.querySelector(`.player--${activePlayer}`)
		.classList.toggle('player--active');
}

// rolling the dice
btnRoll.addEventListener('click', function () {
	if (gamePlay) {
		// generate random dice no from 1 to 6
		const dice = Math.trunc(Math.random() * 6) + 1;

		// show dice image
		diceEl.classList.remove('hidden');
		diceEl.src = `images/dice-${dice}.png`;

		// check if dice no is 1 or not
		if (dice !== 1) {
			// add dice to current score if dice is not 1
			currentScore += dice;
			document.getElementById(`current--${activePlayer}`).textContent =
				currentScore;
		} else {
			// switch player if dice is 1
			switchPlayer();
		}
	}
});

// holding the current score to global score
btnHold.addEventListener('click', function () {
	if (gamePlay) {
		scores[activePlayer] += currentScore; // adding current score to global score of active player
		document.getElementById(`score--${activePlayer}`).textContent =
			scores[activePlayer]; // displaying the global score in UI

		if (scores[activePlayer] >= 15) {
			gamePlay = false;
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add('player--winner');

			diceEl.classList.add('hidden');

			// declare winner to the active player 
			document.getElementById(`name--${activePlayer}`).textContent = '🥳 WINNER 🥳';
			// declare looser to the inactive player 
			document.getElementById(`name--${activePlayer === 0 ? 1 : 0}`).textContent = '😭 LOOSER 😭';
		} else {
			switchPlayer(); // switiching player
		}
	}
});

btnNew.addEventListener('click', newGame);
