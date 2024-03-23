'use strict';
/*
//before the DOM manipulation
console.log(document.querySelector('.message').textContent);

//this is to edit the message. During the DOM manipulation.
document.querySelector('.message').textContent = 'Correct Number!';

//After the DOM manipulation and logging the results
console.log(document.querySelector('.message').textContent);

//Let's do the same in the  secret number and the score.
document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

//this is to manipulate the input data. During the DOM manipulation.
//to manipulate the input data, we need to seek the class name of that element.
document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

// this will give us the random number during the development but in the real game it should be hidden.
//Math.random will give us a random numbers but only from 0-1. This means all decimals. But we need a number between 1-20.
//To do this we need to multiply it by 20. But another problem is that it has decimals and they are noise. To remove this we need to a methood and that is
//Math.trunc
let secretNumber = Math.trunc(Math.random() * 20) + 1;

//we need to create a variable for the score, and we will update the score when the guess is wrong.
let score = 20; //this is called a STATE variable, which is a part of the APPLICATION STATE
//all the data is relevant to the application

let highscore = 0; //this is to keep track of the highscore. This will be updated when the score is greater than zero and greater than the previous highscore.

// console.log(number);

//To avoid DRY, we will create a function for all the duplicates.
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const displayNumber = function (number) {
  document.querySelector('.number').textContent = number;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  //to compare the screet number to the user's guess, we will use the if-else statement.
  if (!guess) {
    //if there is no input data. The message will be 'No number!'
    // document.querySelector('.message').textContent = 'No Number!';

    // Refactoring
    displayMessage('No Number!');

    //if the user's guess is equal to the secret number, we will display the message 'Correct number!"
  } else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = 'Correct Number!';

    // Refactoring
    displayMessage('Correct Number!');

    //when we reload the browser, we want to display the random number in the UI. To do this...
    // document.querySelector('.number').textContent = secretNumber;
    displayNumber(secretNumber);

    //To manipulate the style, "style property" "CSS property" "string"
    document.querySelector('body').style.backgroundColor = '#60b347';

    document.querySelector('.number').style.width = '30 rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    // When the guess is WRONG
    //REFACTORING THE DUPLICATES from the guess is higher or lower than secret number
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector('.message').textContent =
      // guess > secretNumber ? 'Too High!' : 'Too Low!'; //We turn this line to "ternary operator" to display different messages

      // Refactor
      displayMessage(guess > secretNumber ? 'Too High!' : 'Too Low!');

      score--; //this will decrease the score
      document.querySelector('.score').textContent = score; //this will update the score
    } else {
      // document.querySelector('.message').textContent = 'Game Over!';

      // Refactor
      displayMessage('Game Over!');

      document.querySelector('.score').textContent = 0; //this will update the score to ZERO
    }
  }
  //if the user's guess is higher than the scret number, we will display the message 'Too high!'
  // } else if (guess > secretNumber) {
  //   //this code only happens when the score is higher than the zero. Use another if-else statement
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = 'Too High!';
  //     score--; //this will decrease the score
  //     document.querySelector('.score').textContent = score; //this will update the score
  //   } else {
  //     document.querySelector('.message').textContent = 'Game Over!';
  //     document.querySelector('.score').textContent = 0; //this will update the score to ZERO
  //   }

  //   //if the user's guess is lower than the scret number, we will display the message 'Too low!'
  // } else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = 'Too Low!';
  //     score--; //this will decrease the score
  //     document.querySelector('.score').textContent = score; //this will update the score
  //   } else {
  //     document.querySelector('.message').textContent = 'Game Over!';
  //     document.querySelector('.score').textContent = 0; //this will update the score to ZERO
  //   }
});

//To reset the game. MY ANSWER
document.querySelector('.again').addEventListener('click', function () {
  score = 20; //a variable for the score when the game is reset
  secretNumber = Math.trunc(Math.random() * 20) + 1; //we need to reassign a new secret number when the game is reset. This copied from let secretNumber.
  document.querySelector('.score').textContent = 20;
  // document.querySelector('.number').textContent = '?';
  displayNumber('?');
  // document.querySelector('.message').textContent = 'Start guessing...';
  displayMessage('Start guessing...');
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').value;
});

/////////////////////////////////////////////////////////
/*
Coding challenge #1
Implement a game reset functionalility, so that the player can make a new guess! Here is how:

1. Select the element with the 'again' class and attach a click event handler
TIP: This is the same with the 'check' button

2. In the handler function, restore initial values of the score and the secretNumber variables
(variables) score ('.score') -> 20
(variables) secretNumber ('.number') -> reset


3. Restore the initial conditions of the message, number, score and guess input field
initial message -> 'Start guessing...'
number -> back to question mark
score -> 20
input field -> empty

4. Also restore the original background color (#222) and number width (15 rem)

*/

////////////////////////    CODE WARS   //////////////////////////////////////////
/*
Create a function with two arguments that will return an array of the first n multiples of x.

Assume both the given number and the number of times to count will be positive numbers greater than 0.

Return the results as an array or list ( depending on language ).

1. Identify the Problem
- What are the two arguments of the function? N and X
- What should be the returned value? Array

2. Sub-problems
- What is argument n? N is the length of the array
n = .length
- What is argument X? X is the first number of the array
x = [0]
- What is the array? Any array



function countBy(x, n) {
  let z = []; //this will receive the calculation from the loops

  //we need i = 1 so that can multiply it with any number
  for (let i = 1; i < n + 1; i++) {
    //create a variable for the multiples. We get the formula from the problem itself "n multiples of x" Why n becomes an i because it's the same.
    let multiples = x * i;
    //we will add the result to the empty z array.
    z.push(multiples);

    //combinations of multiples and method
    //z.push(x*1);
  }

  return z;
}

console.log(countBy(1, 4));
*/
