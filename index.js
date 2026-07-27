let scores = JSON.parse(localStorage.getItem('scores')) || 
// populate with default scores if no scores in local storage
  {
    wins: 0,
    losses: 0, 
    ties: 0
  }

// update scores on the page
updateScoreElem();

/**
 * Without creating a function inside addEventListener, the param will be null. 
 * So, we create the function to avoid passing in null and breaking the eventListener.
 * play the game with the player's choice/ move
 */
document.querySelector('.js-rock-button').addEventListener('click', () => { playGame('rock'); });
document.querySelector('.js-paper-button').addEventListener('click', () => { playGame('paper'); });
document.querySelector('.js-scissors-button').addEventListener('click', () => { playGame('scissors'); });

// play game with keydown rather than buttons
document.body.addEventListener('keydown', (event) => 
{
  // play the game based off the user's keydown
  switch (event.key)
  {
    // rock
    case 'r': playGame('rock'); break;

    // paper
    case 'p': playGame('paper'); break;

    // scissors
    case 's': playGame('scissors'); break;

    default: alert("ERROR: Invalid keydown: " + event.key.toUpperCase() + 
      "\nPlease input 'r' (rock), 'p' (paper), or 's' (scissors)."); break;
  }

});

// reset the scores when pressed
document.querySelector('.js-reset-button').addEventListener('click', () => 
{
  // reset scores
  resetScore();

  // update the score element on the page
  updateScoreElem();

  // hide the resuls container
  document.querySelector('.js-results-container').classList.remove('displayed');
});


/**
 * randomizes the computer's move. Utilizes the Math.random()
 * to generate the randomized move. Depending on the number,
 * the move will be different.
 * 
 * @param: {void} N/A
 * @return: {string} The randomized move as a string
 */
function getComputerMove()
{
  const randNum = Math.random();

  // rock
  if (randNum >= 0 && randNum < 1/3)
    return 'rock';

  // paper
  else if (randNum >= 1/3 && randNum < 2/3)
    return 'paper';

  // scissors
  else if (randNum >= 2/3 && randNum <= 1)
    return 'scissors';
}

/**
 * resets the scores in localStorage to the default scores (0). 
 * 
 * @param {void} N/A
 * @return {void} N/A
 */
function resetScore()
{
  // set all scores to 0
  scores.wins = 0;
  scores.losses = 0;
  scores.ties = 0;

  // remove scores from local storage
  localStorage.removeItem('scores');
}

/**
 * simulates the rock-paper-scissors game. Depending on the user's move and
 * computer's move, the result varies. Uses nested switch statements to 
 * alter the result. Once result is decided, the scores in local storage
 * are changed. Function also changes on-screen elements (results-container,
 * scores).
 * 
 * @param {string} move the move that is being compared to the computer's move
 * @return {void} N/A
 */
function playGame(move)
{
  const computerMove = getComputerMove();
  let result = '';

  // different cases depending on user's move
  switch (move)
  {
    case 'rock':
    {

      // different cases depending on computer's move
      switch (computerMove)
      {
        case 'rock':
        {
          result = 'Tie.';
          break;
        }

        case 'paper':
        {
          result = 'You lose.';
          break;
        }

        case 'scissors':
        {
          result = 'You win.';
          break;
        }
      }
      break;
    }

    case 'paper':
    {
      // different cases depending on computer's move
      switch (computerMove)
      {
        case 'rock':
        {
          result = 'You win.';
          break;
        }

        case 'paper':
        {
          result = 'Tie.';
          break;
        }

        case 'scissors':
        {
          result = 'You lose.';
          break;
        }
      }
      break;
    }

    case 'scissors':
    {
      // different cases depending on computer's move
      switch (computerMove)
      {
        case 'rock':
        {
          result = 'You lose.';
          break;
        }

        case 'paper':
        {
          result = 'You win.';
          break;
        }

        case 'scissors':
        {
          result = 'Tie.';
          break;
        }
      }
      break;
    }
  }

  // update the score based on the result
  if (result === 'You win.')
  {
    scores.wins++;
  }
  else if (result === 'You lose.')
  {
    scores.losses++;
  }
  else if (result ==='Tie.')
  {
    scores.ties++;
  }

  // store the scores in local storage
  localStorage.setItem('scores', JSON.stringify(scores));

  // update scores on the page
  updateScoreElem();

  // display result on page
  document.querySelector('.js-result').innerHTML = result;

  // display moves using the symbols
  document.querySelector('.js-results-container').classList.add('displayed');
  document.querySelector('.js-user-text').innerHTML = 'You';
  document.querySelector('.js-user-move').innerHTML = `<img class="move-icon" src="icons/${move}-emoji.png">`;
  document.querySelector('.js-computer-text').innerHTML = 'Computer';
  document.querySelector('.js-computer-move').innerHTML = `<img class="move-icon" src="icons/${computerMove}-emoji.png">`;

}

/**
 * updates the score element on the page. Retrieves properties from the 
 * JavaScript 'scores' object.
 * 
 * @param {void} N/A
 * @return {void} N/A
 */
function updateScoreElem()
{
  document.querySelector('.js-scores').innerHTML = 
    `Wins: ${scores.wins}, Losses: ${scores.losses}, Ties: ${scores.ties}`;
}

let isAutoPlaying = false;
let intervalID;

/**
 * plays the game automatically for the user. In essence, the computer is playing against itself
 * 
 * @param {void} N/A
 * @return {void} N/A
 */
function autoPlay()
{
  // if computer is not auto playing, then start auto playing
  if (!isAutoPlaying)
  {
    // repeatedly choose a number and play the game against itself
    intervalID = setInterval(() => 
      {
        const playerMove = getComputerMove();
        playGame(playerMove); 
      }, 700);

    // change flag to true
    isAutoPlaying = true;

    // change text of button to 'stop playing'
    setTimeout(function() {
      document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
    }, 700);
    
  }
  else
  {
    // stop the autoPlay using the interval ID generated from setInterval
    clearInterval(intervalID);

    // change flag back to false
    isAutoPlaying = false;

    // change text inside of button back to original
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';  
  }
}

// enable auto-play when the user clicks the button
document.querySelector('.js-auto-play-button').addEventListener('click', () => { autoPlay(); });