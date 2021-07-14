/*************************************
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls two dices as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls both dices no 1, all his ROUND score gets lost. After that, it's the next player's turn. Also, if one of the dice no is 6 consecutively two times, then the whole global score of the active player is reset to 0 and it's next player's turn.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach the set final points on GLOBAL score wins the game
********************************/


// variable initialization
var score, roundScore, activePlayer, gamePlaying, prev_dice1, prev_dice2;

// initially invoking init function
init();


/**
 * On click of Roll Dice button
 */
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        finalScore = document.getElementById('final-score').value;

        if (finalScore) {
            // disabling the score field after initial roll of dice
            document.getElementById('final-score').setAttribute('disabled', 'true');

            // generate random dices no
            var dice1 = Math.floor(Math.random() * 6) + 1;
            var dice2 = Math.floor(Math.random() * 6) + 1;

            // reset score of active player to zero and give turn to next player if the dice no is 6 consecutively two times.
            if ((dice1 === 6 && prev_dice1 === 6) || (dice2 === 6 && prev_dice2 === 6)) { 
                // reseting global score of active player to 0. 
                score[activePlayer] = 0;
                document.getElementById('score-' + activePlayer).textContent = score[activePlayer];

                // calling nextPlayer function after 1sec
                setTimeout(function(){
                    nextPlayer()
                }, 1000);

            } else {
                prev_dice1 = dice1; // stores total dice value from previous roll
                prev_dice2 = dice2; // stores total dice value from previous roll

                // get random dice image
                dice1DOM = document.getElementById('dice-1');
                dice2DOM = document.getElementById('dice-2');

                dice1DOM.style.display = 'block';
                dice2DOM.style.display = 'block';
                
                dice1DOM.src = 'images/dice-' + dice1 + '.png';
                dice2DOM.src = 'images/dice-' + dice2 + '.png';
        
                // checking if both dice no is 1 or not
                if (dice1 === 1 && dice2 === 1) {
                    // next player turn if both dice no is 1
                    setTimeout(function(){
                        nextPlayer();
                    }, 1000);
        
                } else {
                    // updating round score if both dices no is not 1
                    totalDice = dice1 + dice2;
                    roundScore += totalDice;
                    document.querySelector('#current-' + activePlayer).textContent = roundScore;
                }
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
            // add current round score to global score
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

                // set game play to false after the palyer wins
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

    hideDice(); // invokes function to hide dice
}


// passing 'init' function as an argument in second param of event listener method.
document.querySelector('.btn-new').addEventListener('click', init); 


/**
 * Initial function which will be invoked as soon as the page is loaded. 
 * This function is also invoked on clicking 'New Game' button.
 */
function init() {

    score = [0, 0]; // scores of both players
    roundScore = 0; // initializing round score
    activePlayer = 0; // determines the active player
    gamePlaying = true; // initially declaring games status to true
    prev_dice1 = 0; // initializing previous value for dice1
    prev_dice2 = 0; // initializing previous value for dice2

    hideDice(); // function invoked to hide dices

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
 * Function to hide dices
 */
function hideDice() {
    document.getElementById('dice-1').style.display = 'none'; 
    document.getElementById('dice-2').style.display = 'none'; 
}

































// document.querySelector('#current-' + activePlayer).textContent = dice; // to change the text in the element #current
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';  // to use the HTML tag in the element #current



// document.querySelector('body').style.backgroundColor = 'black'; //testing