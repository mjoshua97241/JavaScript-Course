'use strict';
/*
______________________________________________________________________________________
//////////////////////////// //* DEFAULT PARAMETERS ////////////////////////////
______________________________________________________________________________________


const bookings = [];

///? Dont - Don't put parameters that were set after it
// const createBooking = function (
//     flightNum,
//     price = 199 * numPassengers
//     numPassengers = 1,
//   ) {}

///* ES6 Way to set default parameters
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  ///? OLD way to set default parameters
  numPassengers ||= 1;
  price ||= 1;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);
createBooking('LH123', undefined, 1000);

______________________________________________________________________________________
////////// //* HOW PASSING ARGUMENT WORKS: VALUE 🆚 REFERENCE ///////////////////////
______________________________________________________________________________________

const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 2347793213467,
};

const checkIn = function (flightNum, passenger) {
  ///? the number of the flight was changed
  flightNum = 'LH999';
  passenger.name = 'Mr.' + passenger.name;

  ///? check the passport number if it's correct
  if (passenger.passport === 2347793213467) {
    alert('Check in');
  } else {
    alert('Wrong passport');
  }
};

checkIn(flight, jonas);
console.log(flight);
console.log(jonas);

///? Is the same doing...
// const flightNum = flight; //just copying the variable
// const passenger = jonas;

///? Generate new passport
const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};

newPassport(jonas);
checkIn(flight, jonas);

______________________________________________________________________________________
////////// //* FUNCTIONS ACCEPTING CALLBACK FUNCTIONS ///////////////////////
______________________________________________________________________________________

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split('');
  return [first.toUpperCase(), ...others].join(' ');
};

//* Higher-order functions
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

///?JS uses callbacks all the time
const high5 = function () {
  console.log('✋🏻');
};
///? This is like the transformer function
document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5);

______________________________________________________________________________________
//////////////////////// //* FUNCTIONS RETURNING FUNCTIONS ///////////////////////////
______________________________________________________________________________________


const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

console.log(greet('Hey')); //?the result is ƒ (name) { console.log(`${greeting} ${name}`); }

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Jonas');

///? Challenge
///? Task: Convert the greet function into an ARROW function
const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('Hi')('John');
______________________________________________________________________________________
//////////////////////// //* THE CALL AND APPLY METHOD ///////////////////////////
______________________________________________________________________________________


const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

///? After some years the Lufthansa create a new airline

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

//Does NOT work
// book(23, 'Sarah Williams');

///? FIX
//? How to tell JS that we want to create a booking on the new Eurowings airline? Or to book Lufthansa?
///? SOLUTION
///?Tell JS explicitly what the this keyword should be like. If we want Eurowings, the this keyword should point to Eurowings. If we want Lufthansa, the this keyword should point to Lufthansa.

//* CALL METHOD
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

///? More Airlines
const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

//* APPLY METHOD
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

///? Better way than apply method is by using the CALL method
book.call(swiss, ...flightData);


______________________________________________________________________________________;
//////////////////////////////// //* THE BIND METHOD ////////////////////////////////
______________________________________________________________________________________;

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');

///? With Event Listeners
lufthansa.planes = 300;

lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};
// lufthansa.buyPlane()

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

/// Partial Application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

///? Challenge: Rewrite the whole example to function returning another function

const addTaxNew = function (rate) {
  return function (value) {
    const taxNew = value + value * rate;
    console.log(taxNew);
  };
};

const addVATNew = addTaxNew(0.23);
addVATNew(100);
addVATNew(23);

______________________________________________________________________________________;
//////// //* IMMEDIATELY INVOKED FUNCTION EXPRESSIONS (IIFE) /////////////////////////
______________________________________________________________________________________;


///? NOT to do if we want to called the function ONCE
const runOnce = function () {
  console.log('This will never run again');
  const isPrivate = 23;
};
runOnce();

// console.log(isPrivate); //ReferenceError

//* IIFE
///? (function(){})()
(function () {
  console.log('This will never run again');
})();

//* Arrow Function
() => console.log('This will ALSO never run again');

______________________________________________________________________________________;
//////////////////////////////// //* CLOSURES ///////////////////////////////////////
______________________________________________________________________________________;


const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking(); //calling the return function inside the securebooking function.
console.log(booker);

booker();
booker();
booker();


///? Example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

//Re-assigning f function
h();
f();
console.dir(f);

///? Example 2
const boardPassegers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000;
boardPassegers(180, 3);


////////////////////////////////// //* Coding Challenge #1 //////////////////////////////////////////////

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀

A. Problem
  1.1. How to display the prompt?
  1.2. How to update the answers array?

  2. How to link the registerAnswer to the "Answer poll" button?
  3. What are the inputs of the method 'displayResults'? type
  4. How to run the displayResults method inside the poll.registerNewAnswer? Functions calling functions
  

B. Sub-problem
  1.1. prompt() method with a display message
    -What are the message to display? poll.question and poll.options
    -How to display the message in a nice formatted way?
      -split by ","
      -join by new line "\n"
    1.2. To determine if its number is to use if-else. How to increase the number at a certain position in the array?

  2. What is the name of click button?
  3. What are the types?
    -string (if it has quotation marks)
      -How message should be displayed? 
    -array (if it has bracket notation)
      -How message should be displayed? AS IS.


const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    ///? Get answer
    ///? Solution 1
    const promptQuestions = this.question;
    const promptOptions = [...this.options].join('\n');
    const promptFinal = Number(
      prompt(
        [promptQuestions, promptOptions, '(Write option number)'].join('\n')
      )
    );

    ///? Solution 2
    const answer = Number(prompt(`${this.question}\n${this.options.join('\n')}\n(Write option number)`));
    
    ///? Register
    if (promptFinal < 4) {
      ///?Update the poll.answers at a position called by the promptFinal
      this.answers[promptFinal]++;
    }

    ///?Using optional chain
    ///?Register Answer
    typeof answer === 'number' && answer < this.answers.length && this.answer[answer]++;

    this.displayResults();
  },

  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

const data1 = [5, 2, 3];
const data2 = [1, 5, 3, 9, 6, 1];

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');

const display = poll.displayResults;

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

////////////////////////////////// //* Coding Challenge #2 //////////////////////////////////////////////

This is more of a thinking challenge than coding challenge

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explaing to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
