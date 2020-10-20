/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach the set final points on GLOBAL score wins the game
*/

// variable initialization
var score, roundScore, activePlayer, gamePlaying, finalScore; 

// initially invoking init function
init(); 


/**
 * On click of Roll Dice button
 */
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // Final score value 
        finalScore = document.getElementById('final-score').value;

        // Check if final score is set or not
        if (finalScore) {
            document.getElementById('final-score').setAttribute('disabled', 'true');

            // generate random dice no
            var dice = Math.floor(Math.random() * 6) + 1;

            // get random dice image
            diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'images/dice-' + dice + '.png';

            // updating round score if dice roll no is not 1
            if (dice !== 1) {
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;

            } else {
                nextPlayer(); // next player
            }

        } else {
            alert('SET FINAL SCORE FIRST!');
        }
        
    }
});


/**
 * On click of hold button
 */
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Final score value 
        finalScore = document.getElementById('final-score').value;

        // Check if final score is set or not
        if (finalScore) {
            // add round score to global score of the active player
            score[activePlayer] += roundScore;

            // update score in UI
            document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];

            // winner
            if (score[activePlayer] >= finalScore) {

                var inactivePlayer = (activePlayer === 0) ? 1 : 0; // gets inactive player

                hideDice();
                document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
                document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
                document.getElementById('winner-'+activePlayer).style.display = 'block';
                document.getElementById('looser-'+inactivePlayer).style.display = 'block';

                // set game play to false after the player wins
                gamePlaying = false; 

            } else {
                // change to next player
                nextPlayer();
            }

        } else {
            alert('SET FINAL SCORE FIRST!');
        }
    }    
});


/**
 * This function is for swapping to the next player
 */
function nextPlayer() {
    // changing active player accordingly
    (activePlayer === 0) ? activePlayer = 1 : activePlayer = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    roundScore = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    hideDice();
}


// passing 'init' function as an argument in second param of event listener method.
document.querySelector('.btn-new').addEventListener('click', init); 


/**
 * Initial function which will be invoked as soon as the page is loaded. 
 * This function is invoked on clicking 'New Game' button as well.
 */
function init() {
    score = [0, 0]; // initializing scores of both players in array object
    roundScore = 0; // initializing round score
    activePlayer = 0; // determines the active player. if 0 then it's player1 and if 1 then it's player2.
    gamePlaying = true; // initially declaring games status to true

    hideDice(); // initially no dice is displayed

    // Initializing all the values to 0 in UI
    document.getElementById('score-0').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    // removes winner class from both player's panel
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    // removes active class from both player's panel
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    // adds active class in player1's panel
    document.querySelector('.player-0-panel').classList.add('active');

    // removes winner looser board from both player
    document.getElementById('winner-0').style.display = 'none';
    document.getElementById('looser-0').style.display = 'none';
    document.getElementById('winner-1').style.display = 'none';
    document.getElementById('looser-1').style.display = 'none';

    // Removing the attribute 'disabled' and resetting value from final score input field 
    document.getElementById('final-score').removeAttribute('disabled');
    document.getElementById('final-score').value = '';

    // Prompt to ask both player's name
    var player1 = prompt('WELCOME TO PIG DICE GAME!\r\nPlease enter first player\'s name.');
    var player2 = prompt('Please enter second player\'s name.');

    // Displaying text in UI
    document.getElementById('name-0').textContent = player1 ? player1 : 'Player 1';
    document.getElementById('name-1').textContent = player2 ? player2 : 'Player 2';
}

/**
 * Function to hide dice
 */
function hideDice() {
    document.querySelector('.dice').style.display = 'none';
}

































// document.querySelector('#current-' + activePlayer).textContent = dice; // to change the text in the element #current
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';  // to use the HTML tag in the element #current



// document.querySelector('body').style.backgroundColor = 'black'; //testing