
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
 * randomizes the computer's move. Utilizes the Math.random()
 * to generate the randomized move. Depending on the number,
 * the move will be different.
 * 
 * @param: {void}
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
 * simulates the rock-paper-scissors game. Depending on the user's move and
 * computer's move, the result varies. Uses nested switch statements to 
 * alter the result. Once result is decided, the scores in local storage
 * are changed. Function also changes on-screen elements (results-container,
 * scores).
 * 
 * @param {string} playerMove the move that the user chose from the button
 * @return {void}
 */
function playGame(playerMove)
{
  const computerMove = getComputerMove();
  let result = '';

  // different cases depending on user's move
  switch (playerMove)
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

  // update the score
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

  // display moves
  document.querySelector('.js-results-container').classList.add('displayed');
  document.querySelector('.js-user-text').innerHTML = 'You';
  document.querySelector('.js-user-move').innerHTML = `<img class="move-icon" src="icons/${playerMove}-emoji.png">`;
  document.querySelector('.js-computer-text').innerHTML = 'Computer';
  document.querySelector('.js-computer-move').innerHTML = `<img class="move-icon" src="icons/${computerMove}-emoji.png">`;

}

/**
 * updates the score element on the page. Retrieves properties from the 
 * JavaScript 'scores' object.
 * 
 * @param {void}
 * @return {void}
 */
function updateScoreElem()
{
  document.querySelector('.js-scores').innerHTML = 
    `Wins: ${scores.wins}, Losses: ${scores.losses}, Ties: ${scores.ties}`;
}
