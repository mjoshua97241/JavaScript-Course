'use strict';
/*
/// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

/// 🔴 Delayed Departure from FAO to TXL (11h25)
///              Arrival from BRU to FAO (11h45)
///   🔴 Delayed Arrival from HEL to FAO (12h05)
///            Departure from FAO to LIS (12h30)

/// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};
______________________________________________________________________________________
//////////////////////////// //*Destructuring Arrays ////////////////////////////
______________________________________________________________________________________
///Non-Consecutive Selection of Properties Inside of an Array
const [first, , second] = restaurant.categories;

const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr);
console.log(1, 2, 7, 8, 9);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

//*Copy Array
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

//*Join 2 Arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);
______________________________________________________________________________________
//////////////////////////// //*Destructuring Objects ////////////////////////////
______________________________________________________________________________________
*/
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  //*  Passing an object to the function (NOT manual)
  orderDelivery: function (obj) {
    console.log(obj);
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

/*

//* RENAME VARIABLES
const {
  name: restaurantName, //to rename [OLD NAME]: [NEW NAME], & use 'semicolon'
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags); //CALL them by their NEW name

//* ASSIGNING DEFAULT VALUES and COMBINATION OF SYNTAX
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

//* MUTATING VARIABLES
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj); //the line of code should NOT start {} because JS will expect that it is a 'code block'
console.log(a, b);

//* NESTED OBJECTS (object in an object)
const { fri } = restaurant.openingHours;
console.log(fri);

//* FURTHER DESTRUCTURE (NESTED OBJECTS)
const {
  fri: { open, close },
} = restaurant.openingHours;
console.log(open, close);

//* FURTHER DESTRUCTURE (NESTED OBJECTS) and ASSIGN NEW variables
const {
  fri: { open: o, close: c },
} = restaurant.openingHours;
console.log(o, c);

//* Passing an object to the function (NOT manual)
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

______________________________________________________________________________________;
//////////////////////////// //* The SPREAD Operator (...) ////////////////////////////
______________________________________________________________________________________;


//* Example Array
const arr = [7, 8, 9];

//* OLD way to SPREAD the array
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

//* NEW way to SPREAD
const newArr = [1, 2, ...arr];
console.log(newArr);

//* Passing an arguments (elements of the array) into functions
console.log(...newArr);

//* Create a NEW MENU (New Array)
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

//* Creating a SHALLOW COPIES of Arrays
const mainMenuCopy = [...restaurant.mainMenu]; //Just assign a new variable and spread them as a value
console.log(mainMenuCopy);

//* Join 2 Arrays or More
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);

//* ITERABLES: Arrays, Strings, Maps, Sets, NOT Objects
const str = 'Jonas';
const letters = [...str, '', 'S'];
console.log(letters);

//* DON'Ts
// console.log(`${...str} Schmedtmann`)

//*Functions that accepts MULTIPLE arguments

// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt('Ingredient 2?'),
//   prompt('Ingredient 3?'),
// ];
// console.log(ingredients);

//*CALLING the function with spread operator
// restaurant.orderPasta(...ingredients);

//* CREATE a NEW restaurant OBJECT with all the data from original PLUS SOME
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

//* Shallow copies of the object restaurant
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurantCopy);

______________________________________________________________________________________;
////////////////////////// //* REST Pattern and Parameters ////////////////////////////
______________________________________________________________________________________;

////////////// * 1. DESTRUCTURING

//* SPREAD
const arr = [1, 2, ...[3, 4]]; //Spread operator if the '...' is on the RIGHT of the '='

//* REST
const [a, b, ...others] = [1, 2, 3, 4, 5]; //REST if the '...' is on the LEFT of the '='
console.log(a, b, others); //1 2 [3, 4, 5]

//* REST + SPREAD
const [pizza, risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

//* OBJECT
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays); //thu, fri

////////// * 2. FUNCTIONS

const add = function (...numbers) {
  ///pack the values into an array
  /// console.log(numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x); //unpack the values

/// Another Sample
restaurant.orderPizza('mushroom', 'onion', 'olives', 'spinach');

______________________________________________________________________________________;
////////////////////////// //* Short Circuiting (&& AND ||) ////////////////////////////
______________________________________________________________________________________;


//* OR OPERATOR
///? the 1st TRUTHY value (any numbers and strings, except 0 and empty strings) and will return immediately

///? Samples
console.log(3 || 'Jonas'); //3 -
console.log('' || 'Jonas'); //'Jonas' is the 1ST TRUTHY value
console.log(true || 0); //true
console.log(undefined || null); //null
console.log(undefined || 0 || '' || 'Hello' || 23 || null); //'Hello'

//* Practical Example
///? Task: Look for a property that might be on the restaurant object with the number of guests

///? Long way for coding (Ternary Operator)
restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

///? SHORT CUT (MORE BETTER)
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

//* AND OPERATOR
///? the 1st FALSY value will RETURN immediately

///? Samples
console.log(0 && 'Jonas'); //0
console.log(7 && 'Jonas'); ///?'Jonas' because there is NO FALSY value, both of the values are TRUTHY. So the LAST TRUTHY value will be RETURNED immediately
console.log('Hello' && 23 && null && 'jonas'); //null

//* PRACTICAL EXAMPLES

///? OLD WAY (using if statement)
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushroom', 'spinach');
}

///? BETTER & SIMPLE WAY
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach'); //mushrooms, ["spinach"]

______________________________________________________________________________________;
////////////////////////// //* The Nullish Coalescing Operator (??) ////////////////////////////
______________________________________________________________________________________;


restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests); //? 10 👉🏻 When we set numGuests to 0 (FALSY value) so it will GO to the SECOND operand.

//* SOLUTION: NULLISH (??)
///? We want the result of ZERO

const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect); //0


______________________________________________________________________________________;
////////////////////////// //* Logical Assignment Operators ////////////////////////////
______________________________________________________________________________________;

const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'La Pizza',
  owner: 'Giovanni Rossi',
};
///? TASK 1
///? Add the numGuests property to the objects that do NOT have them
//* OLD WAY
rest1.numGuests = rest1.numGuests || 10;
rest2.numGuests = rest2.numGuests || 10;

//* BETTER WAY: OR Assignment Operator
rest2.numGuests ||= 10;
rest1.numGuests ||= 10; //?10 - we WANT the answer of ZERO but cannot because it is a falsy value

///? TASK 2
///? Solution: Use Nullish Assignment Operator if we want 0 to be the answer
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

///? TASK 3
///? Anonymize the names of the restaurant owners. Replace the string with anynomous

///? Solution: AND assignment operator
//* OLD WAY
// rest1.owner = rest1.owner && '<ANYNOMOUS>';
// rest2.owner = rest2.owner && '<ANYNOMOUS>';

//* BETTER WAY
rest1.owner &&= '<ANYNOMOUS>';
rest2.owner &&= '<ANYNOMOUS>';
console.log(rest1);
console.log(rest2);

______________________________________________________________________________________
//////////////////////////// *CODING CHALLENGE #1 ////////////////////////////////////
______________________________________________________________________________________
Challenge
We're building a football betting app. Suppose we get the data from web 
service about a certain game ('game' variable on next page). 
In his challenge we're gonna work with that data.

Tasks:
1. Create one player array for each team (variables 'players1' & 'players2')
2. The first player in any player array is the goalkeeper and the others are field players.
For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, 
and one array ('fieldPlayers') with all the remaining 10 field players.
  Solution:
  -destructuring array
  -store them to variables 'gk' and 'fieldPlayers'
3. Create an array 'allPlayers' containing all players of both teams (22 players)

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//* Task 1
const [players1, players2] = game.players; //destructuring the arrays into 2
console.log(players1, players2);
//* Task 2
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

//* Task 3
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

//* Task 4
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

//*Task 5
const team1 = game.odds.team1;
const draw = game.odds.x;
const team2 = game.odds.team2;

//* simple way destructuring
const {
  odds: { team1, x: draw, team2 },
} = game;

console.log(team1, draw, team2);

//* Task 6
const printGoals = function (...playerNames) {
  console.log(`Total goals ${playerNames.length}`);
  console.log(playerNames);

  for (let i = 0; i < playerNames.length; i++) {
    console.log(`${playerNames[i]}: ${i + 1}`);
  }
};

const players = ['Davies', 'Muller', 'Lewandowski', 'Kimmich'];
printGoals(...players);
printGoals(...game.scored);

//* Task 7
console.log(`Team ${(team1 < team2 && 1) || 2} wins!`);
///? Explanation:In this code, we use the logical AND (&&) operator to check if team1 has a lower value than team2. If this condition is true,it will return 1. If the condition is false, it will evaluate the second part after the logical OR (||) operator, which will return 2. If false = (`Team ${false || 2} wins!) = Team 2 wins!

arbitrary number of player names = individual names


______________________________________________________________________________________;
////////////////////////// //* Looping Arrays: The for-of Loop ////////////////////////////
______________________________________________________________________________________;

///? Task: Loop over our entire restaurant mainMenu and starterMenu here...
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];

for (const item of menu) console.log(item); //the entire menu array

///? Know the INDEX of each element = use ".entries" in the 'end of any name' array
for (const index of menu.entries()) console.log(index);

///? Know WHAT is the MENU.ENTRIES
console.log([...menu.entries()]);

///? PRINT a nice menu with the use of menu.entries
for (const [i, el] of menu.entries()) {
  console.log(`${i}: ${el}`);
}

______________________________________________________________________________________;
////////////////////////// //* Enhanced Object Literals ////////////////////////////
______________________________________________________________________________________;


///? The object we want to call
const openingHours = {};

///? This is where the openingHours object we want to put
const restaurantObject = {
  openingHours,
};
// console.log(restaurantObject);

//* WRITING METHODS - WITHOUT using the word 'function'
///? Go to the restaurant.order
*/
//* Taking the properties name out from an array
const weekday = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']; //? The source of our properties

const openingHours1 = {
  [weekday[3]]: {
    open: 12,
    close: 22,
  },

  [weekday[4]]: {
    open: 11,
    close: 23,
  },

  [weekday[5]]: {
    open: 0,
    close: 24,
  },
};
/*
console.log(openingHours1);

______________________________________________________________________________________;
////////////////////////// //* Optional Chaining ////////////////////////////
______________________________________________________________________________________;

//* WITHOUT optional chaining
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

//* WITH optional chaining
console.log(restaurant.openingHours?.mon?.open);

//* SAMPLE
///? Task: We will loop over this days array and log to the console whether the restaurant is open or closed on each days
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we are open at ${open}`);
}

//* Optional chaining on calling METHODS
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');

//* Optional chaining on ARRAYS
///? Check if the users array is EMPTY, and get the name of the first element
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];

console.log(users[0]?.name ?? 'User array is empty');

______________________________________________________________________________________;
//////////////// //* Looping Objects: Keys, Values, and Entries //////////////////////
______________________________________________________________________________________;


//* Loop over PROPERTY NAMES - OBJECT.KEYS

for (const day of Object.keys(openingHours1)) {
  console.log(day);
}

///? Examine the object.keys
const properties = Object.keys(openingHours1);
console.log(properties); //(3) ['thu', 'fri', 'sat']

///? Compute how MANY properties are in the object (how many day the restaurant is open)
console.log(`We are open on ${properties.length} days`); //We are open on 3 days.

//* Loop over the VALUES of the properties - OBJECT.VALUES
const values = Object.values(openingHours1);
console.log(values); //(3) [{…}, {…}, {…}]

//* Loop over the ENTIRE OBJECT - OBJECT.ENRIES
const entries = Object.entries(openingHours1);
console.log(entries);

///? Sample
for (const [key, { open, close }] of entries)
  console.log(`On ${key} we open at ${open} and close at ${close}`);

______________________________________________________________________________________;
//////////////////////////////////// //* Sets ////////////////////////////////////////
______________________________________________________________________________________;
///? 👉🏻 SETS is a collection of UNIQUE values. This means it can NEVER have duplicates.

//* To PUT it to SET
const ordersSet = new Set(['Pasta', 'Pizza', 'Risotto', 'Pasta', 'Pizza']);
console.log(ordersSet); //Set(3) {'Pasta', 'Pizza', 'Risotto'}

//* SIZE of the set - ".size"
console.log(ordersSet.size); //3

//* Check if the element is PRESENT in the set - ".has"
console.log(ordersSet.has('Pizza')); //true
console.log(ordersSet.has('Bread')); //false

//* ADD new element
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
console.log(ordersSet); //Set(4) {'Pasta', 'Pizza', 'Risotto', 'Garlic Bread'}

//* DELETE an element - ".delete"
ordersSet.delete('Risotto');
console.log(ordersSet); //Set(3) {'Pasta', 'Pizza', 'Garlic Bread'}

//* Delete ALL elements - ".clear"
// ordersSet.clear();
// console.log(ordersSet); //Set(0) {size: 0}

//* LOOPING over the set
///? use FOR-OF LOOPS
for (const order of ordersSet) console.log(order); //Pasta, Pizza, Garlic Bread

//* PRATICAL SAMPLES:
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];

///? Task 1: To have unique array of the staff set
const newStaff = [...new Set(staff)]; //destructure [...] them set to array
console.log(newStaff); //(3) ['Waiter', 'Chef', 'Manager']

///? Task 2: Know how MANY different positions there are in the set of the staff.
console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
); //3
///? You must input the 'new Set' & the 'properties' of the staff array

//* COUNTING the letters in the string
console.log(new Set('jonnasschmedtmann').size); //11


______________________________________________________________________________________;
////////////////////////////// //* MAPS:FUNDAMENTALS /////////////////////////////////
______________________________________________________________________________________;

//* CREATING a map (empty) - EASIEST way "new Map()"
const rest = new Map();

//* FILLING or ADDING element in the map - ".set"
rest.set('name', 'Classico Italiano'); //(property (key), value)
rest.set(1, 'Firenze, Italy');
rest.set(2, 'Lisbon, Portugal');
console.log(rest); //Map(3) {'name' => 'Classico Italiano', 1 => 'Firenze, Italy', 2 => 'Lisbon, Portugal'}

//* UPDATE + RETURN the map
console.log(rest.set(2, 'Lisbon, Portugal'));

//* CHAINING the set method
rest
  .set('categories', 'Italian', 'Pizzeria', 'Vegetarian', 'Organic')
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are close :(');

//* READ the data from the map - ".get"
console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

///? Task: Get the current time from JS but we don't know how yet
const time = 21;

///? Use logical operators
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

//* CHECK if the map CONTAINS a certain key - ".has"
console.log(rest.has('categories')); //true

//* DELETE elements - ".delete"
console.log(rest.delete(2));
console.log(rest);

//* SIZE of the map - ".size"
console.log(rest.size); //7

//* REMOVE ALL the elements from the map - ".clear"
// rest.clear();
// console.log(rest); //0

//* OBJECTS and ARRAYS as map KEYS
console.log(rest.set([1, 2], 'Test'));

//* to GET the based on that array
// console.log(rest.get([1, 2])); //undefined

///? Solution
const arr = [1, 2]; //? input them INSIDE of a new array
rest.set(arr, 'Test'); //? input them to map using ".set"
console.log(rest.get(arr)); //? use .get to GET the data from that array

//* DOM Elements
///? PUT the h1 inside of the REST map - ".set"
rest.set(document.querySelector('h1'), 'Heading'); //(property, value)
console.log(rest); //get the whole map


______________________________________________________________________________________;
////////////////////////////// //* MAPS: ITERATION /////////////////////////////////
______________________________________________________________________________________;


const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['Correct', 3],
  [true, 'Correct'],
  [false, 'Try again!'],
]);

console.log(question);

//* CONVERT object to map - "new Map"
console.log(Object.entries(openingHours1));
const hoursMap = new Map(Object.entries(openingHours1));
console.log(hoursMap);

//* PRACTICAL EXAMPLE
///? Quiz App

console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

// const answer = Number(prompt('Your answer'));
// console.log(answer);

///? CHECK if the answer is CORRECT
const correct = question.get('Correct');
console.log(correct);

///? My answer:
// console.log((answer === correct && question.get(true)) || question.get(false));

///? Teacher's answer:
///?
console.log(question.get('Correct') === answer); //answer is only "TRUE"
console.log(question.get(question.get('Correct') === answer)); //if we double the "question.get", the answer would be the value itself "Correct"
///? More simplified. If the answer is NOT true, it will FIND false inside the question map. The value of false is "Try again"

//* CONVERT map to array - use SPREAD operator (...)
console.log([...question]);
console.log([...question.entries()]); //same wit the code ABOVE
console.log([...question.keys()]); //get the properties
console.log([...question.values()]);


______________________________________________________________________________________;
////////////////////////////// //* WORKING WITH STRINGS /////////////////////////////////
______________________________________________________________________________________;

const airline = 'TAP Air Portugal';
const plane = 'A320';

//* GET a CHARACTER from the string at a certain POSITION - "[(number)]"
console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);

///? DIRECT writing
console.log('B737'[0]);

//* LENGTH of property of strings
///? .length
console.log(airline.length); //? INDIRECT
console.log('B737'.length); //? DIRECT

//*METHODS

//* POSITION of a certain LETTER in a STRING
///? .indexOf()
console.log(airline.indexOf('r'));

//* INDEX of the LAST 'r' letter in a string
///? .lastIndexOf()
console.log(airline.lastIndexOf('r')); //10

//* SEARCH for ENTIRE words
console.log(airline.indexOf('Portugal')); //8

//* Position at which EXTRACTION will start
///? ".slice(#)"
console.log(airline.slice(4)); //Air Portugal

//* Specify the END Parameter
///? .slice(#, #)
console.log(airline.slice(4, 7)); //Air

//* EXTRACT the FIRST word without knowing any of the indexes
///? .slice(0, name.indexOf(' ') + 1)
console.log(airline.slice(0, airline.indexOf(' '))); //TAP

//* EXTRACT the LAST word
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); //Portugal

//* NEGATIVE begin argument
console.log(airline.slice(-2)); //al
console.log(airline.slice(1, -1)); //AP Air Portuga

///? PRACTICAL EXAMPLE
///? Task: Write a function hta receives an airplane seat and locks to the console wheter it is a MIDDLE seat or not.

const checkMiddleSeat = function (seat) {
  ///? B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got the middle seat');
  else console.log('You got lucky');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');


const airline = 'TAP Air Portugal';

//* CHANGING the CASE of the string
///? .toLowerCase() or .toUpperCase()

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

///? DIRECT way
// console.log('jonas'.toUpperCase());

///? TASK: FIX Capitalization in name
const passenger = 'jOnAs';

///? SOLUTION: CONVERT them to lowercase FIRST
const passengerLower = passenger.toLocaleLowerCase();
///? Convert them to UPPERCASE then combine with slice method
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

///? TASK: COMPARE A USER INPUT EMAIL
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.io \n';

///? SOLUTION:Convert it first to the lowercase
const lowerEmail = loginEmail.toLowerCase();
///? Get RID of the EXCESS (e.g. empty spaces and \n)
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail); //hello@jonas.io
///? SHORTCUT
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

//* REPLACE parts of the string
///? .replace()
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

//* REPLACE ENTIRE WORDS in EVERY occurences
///? .replaceAll()
const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';
console.log(announcement.replaceAll('door', 'gate'));

//* BOOLEANS
///? .includes() .startsWith() .endsWith()
const plane = 'Airbus A320neo';
console.log(plane.includes('A320')); //true
console.log(plane.includes('Boeing')); //false

console.log(plane.startsWith('Air')); //true
console.log(plane.startsWith('Aib')); //false

///? TASK: CHECK if the current plane is part of the new airbus family
if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of the NEW Airbus family');
}

///? PRACTICE EXERCISE
/// Task: Check if the baggage of passenger is ALLOWED to be checked in
const checkedBaggage = function (items) {
  //Convert EVERYTHING to smaller case
  const baggage = items.toLowerCase();
  //Check the baggage
  if (baggage.includes('knife') || baggage.includes('gun'))
    console.log('You are NOT allowed on board');
  else console.log('Welcome aboard!');
};

checkedBaggage('I have a laptop, some Foord, and a pocket Knife');
checkedBaggage('Socks and camera');
checkedBaggage('Got some snacks and a gun for protection');

//* SPLIT METHOD
///? ".split()"
console.log('a+very+nice+string'.split('+')); //(4) ['a', 'very', 'nice', 'string']
console.log('Jonas Schmedtmann'.split(' ')); //(2) ['Jonas', 'Schmedtmann']

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');

//* JOIN METHOD
///? ".join()"
///? Task: Make the last name uppercase + 'Mr.' in the beginning
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

///? Task: Capitalize the first letter of an entire name with multiple names
const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    ///? Solution 1
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    ///? Solution 2
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');

//* PADDING
///? ".padStart" (length, character we want to pad the string with)
///? ".padEnd"

const message = 'Go to gate 23!';
console.log(message.padStart(25, '+').padEnd(30, '+'));
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

///? SAMPLE of padding
///? Task: Mask the credit card number up to the last 4 numbers of the card
const maskCreditCard = function (number) {
  ///? Convert the number to string
  // const str = number + ' '; //Solution 1
  const str = String(number); //Solution 2

  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(454878963157356));
console.log(maskCreditCard(123467975431));

//* REPEAT
///? ".repeat(#)"
///? Repeat the strings multiple times
///? Task: Make a string that have a long messages on screen with a text repeating
const message2 = 'Bad weather... All Departures Delayed... ';
console.log(message2.repeat(5));

///? Task: Due to bad weather there are many planes waiting in line
const planesInLine = function (n) {
  console.log(`There are ${n} planes in ${'✈️'.repeat(n)}`);
};

planesInLine(5);
planesInLine(3);
planesInLine(12);
*/

/*


//////////////////////////////// //* CODING CHALLENGE #2//////////////////////////////////////////
Challenge
Let's continue with our football betting app! Keep using the 'game' variable from
before.
Your tasks:
1. Loop over the game.scored array and print each player name to the console,
along with the goal number (Example: "Goal 1: Lewandowski")

  1. Problem
    - What loop should I use to for the game.scored array?
    - What loop should I use to print each player name along with the goal number to the console?

  2. Sub-problem
    - Object.values (this should NOT be use in the ARRAY)
    - regular for 'the for loop'

2. Use a loop to calculate the average odd and log it to the console (We 
already studied how to calculate averages, you can go check if you don't 
remember)

  1. Problem
    - What loop should we use to calculate the average odd?
    - What odd are we including in the loop?
    - Is the game.odds is an array or object?

  2. Sub-problem
    
3. Print the 3 odds to the console, but in a nice formatted way, exactly 
like this:
  Odd of victory Bayern Munich: 1.33
  Odd of draw: 3.25
  Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them
(except for "draw"). Hint: Note how the odds and the game objects have 
the same property names 😉

  1. Problem
    - Should we use loop? object.keys? object.value? object.entries?
    - What are the things the should NOT be hard coded?
  2. Sub-problem
    - How to access the value of properties of team1 and team2 of game object?
    - How to access the value of odds of team1, team2 and draw from the game.odds?
    NOT hard coded
      - name of team1 of game object
      - name of team2 of game object
      - odds value
    HARD Coded
      - draw

4. Bonus: Create an object called 'scorers' which contains the names of the
players who scored as properties, and the number of goals as the value. In this
game, it will look like this:
    {
    Gnarby: 1,
    Hummels: 1,
    Lewandowski: 2
    }

  1. Problem
    - What are the properties inside of the scorer object?
    - Where will I get the name of the players?
    - Where will I get the number of goals?
  2. Sub-problem
    - Name of the players from game.scored as the property of the scorer object
    - Number of goals is the number of the appearance of their name in the game.scored array
    - How to access the names of the players in the game.scored array? 
    - How to input value of the goal that will the depend on the number of occurences 
      of the number in the game.scored array?
    - How to convert the elements of the game.scored array into the scorer object
      propert?




const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// TASK #1 //
// const scoredArray = game.scored;
// // console.log(scoredArray);

// // Using The For Loop
// for (let i = 0; i < scoredArray.length; i++) {
//   console.log(`Goal ${i + 1}: ${scoredArray[i]}`);
// }

// // Using For-of loop
// // Use the .entries to destructure the index, and the player
// for (const [i, player] of game.scored.entries())
//   console.log(`Goal ${i + 1}: ${player}`);

// TASK #2 //
// const averageOdds = Object.entries(game.odds);
// console.log(averageOdds);

// let sum = 0;
// for (const [index, number] of averageOdds) {
//   sum += number;
// }
// const average = sum / averageOdds.length;

// console.log(average);

// ANOTHER SOLUTION

// const odd = Object.values(game.odds);
// //To accumulate the sum after every we iterate through the array
// let average = 0;

// //We just want to access the value of the properties of game.odds object
// for (const odds of odd) average += odds;
// console.log(average);
// average /= odd.length;
// console.log(average);

// Task 3 //
// My Answer
// const teamName = Object.values(game);
// const oddNumber = Object.values(game.odds);
// console.log(teamName);
// console.log(oddNumber);
// console.log(`Odd of victory ${teamName[0]}: ${oddNumber[0]}`);
// console.log(`Odd of draw: ${oddNumber[1]}`);
// console.log(`Odd of victory ${teamName[1]}: ${oddNumber[2]}`);

// //Answer from ChatGPT
// // Destructure team names (team1 and team2) and odds from the game object
// const { team1, team2, odds } = game;

// //Print the odds in the desired format using template literals
// console.log(`Odd of victory ${team1}: ${odds.team1}`);
// console.log(`Odd of draw: ${odds.x}`);
// console.log(`Odd of victory ${team2}: ${odds.team2}`);

// Another Solution
// for (const [team, odd] of Object.entries(game.odds)) {
//   const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
//   console.log(`Odd of ${teamStr}: ${odd}`);
// }
// BONUS
// const scorers = {}; //Create an empty object to update later

// //Loop through the scored array and update the goal count for each player
// for (const playerName of game.scored) {
//   //Use the nullish coaelescing operator increment the goal count (defaulting to 0 if undefined)
//   scorers[playerName] = (scorers[playerName] ?? 0) + 1;

//   // another solution TERNARY OPERATOR
//   // scorers[playerName] ? scorers[playerName]++ : (scorers[playerName] = 1);
// }
// console.log(scorers);
*/

////////////////////////////////// //* Coding Challenge #3 //////////////////////////////////////////////

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀

A. Problem
 1. How to pick the events that has no duplicates?
 2. How to remove the event from the game events log?
 3. 
 4. What loop should I use? For-of loop

B. Sub - problem
  1. Sets. How to access the values in sets? .values
  2. .delete. What should I delete? The key or the value? or both? Both
  3.
  4. How to determine if it's before or after 45 mins? Use <, >



const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

///? Task 1
const events = [...new Set(gameEvents.values())];
// console.log(events);

///? Task 2
gameEvents.delete(64);
// console.log(gameEvents);

///? Task 3
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes.`
);

///? If we want to exclude the 92 event
const time = [...gameEvents.keys()].pop();
// console.log(time);

// console.log(
//   `An event happened, on average, every ${time / gameEvents.size} minutes.`
// );

///? Task 4
for (const [time, event] of gameEvents) {
  const half = time <= 45 ? 'FIRST HALF' : 'SECOND HALF';
  console.log(`[${half}] ${time}: ${event}`);
}

////////////////////////////////// //* Coding Challenge #4 //////////////////////////////////////////////
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀

1. Problems
  - How to read the input?
  - How to split the input?
  - How to convert to camelCase?
  - How to Output result?

2. Sub - problems
  - How to get the input text from the textarea using JS? Text inserted into the DOM.
  - .split() and store them into an array and convert them into lowerCase
  - Convert (happens when the button is clicked)
    -further split them by underscores and store them into an array
    -capitalize each first letter of 2nd word
    -join the two letters to form camelCase variable name
  - Output Result
    -Each converted name, print it to the console



document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const split = text.split('\n');
  console.log(split);

  for (const [i, camel] of split.entries()) {
    //Destrucutre them into 2
    const [first, second] = camel.trim().toLowerCase().split('_');
    // console.log(first, second);

    const print = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${print.padEnd(18)}${'✈️'.repeat(i + 1)}`);
  }
});

//////////////////////// //* STRINGS METHOD PRACTICE ///////////////////////////
/// 🔴 Delayed Departure from FAO to TXL (11h25)
///              Arrival from BRU to FAO (11h45)
///   🔴 Delayed Arrival from HEL to FAO (12h05)
///            Departure from FAO to LIS (12h30)


1. Problem
  A. What are the parts of strings that are NOT PART in the output? 
    - "_" - 6 times occurences
    - ";" - 12 times occurences
    - "93766109" - (4 times occurences) 
    - "2133758440" 
    - "+" - 3 times occurences
    - "0943384722"
    - "7439299980"
    - "232363985"
    - ":" - 4 times
  B. How to put them into an array?
  C. What are the uppercase strings?
    - "FAO", "TXL", "BRU", "HEL", "LIS"
  D. What are the strings that I should ADD?
    - spaces
    - "to"
    - parenthesis "()"
    - icon "🔴"
  E. What are the REPLACEABLE strings?
    - "_" -> spaces
    - ";" -> "from"
    - ";" -> "to"
    - ":" -> "h"
  F. How many characters?
    - 44 characters

2. Sub-Problems
  A. Steps
    a. Split them by a line separator "+"
    b. Store the lines of strings into an array
    c. Do the further changes
      - replacing
      - toUpperCase
      - additions
*/

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const message = flights.split('+');
// console.log(message);
for (const character of message) {
  const [event, from, to, time] = character.split(';');
  // console.log(event, from, to, time);

  const eventConversion =
    (event.includes('Delayed') && event.replace('_', '🔴 ')) ||
    event.replace('_', ' ');
  // const eventConversion1 = eventConversion.replace('_', ' ');
  // console.log(eventConversion1);
  const placeConversion = ` from ${[
    from.slice(0, 3).toUpperCase(),
    to.slice(0, 3).toUpperCase(),
  ].join(' to ')} `;
  // console.log(placeConversion);
  const timeConversion = `(${time.replace(':', 'h')})`;
  // console.log(timeConversion);
  const finalMessage = `${eventConversion
    .padStart(20, ' ')
    .replace('_', ' ')}${placeConversion}${timeConversion}`;
  console.log(finalMessage);
}

/// 🔴 Delayed Departure from FAO to TXL (11h25)
///              Arrival from BRU to FAO (11h45)
///   🔴 Delayed Arrival from HEL to FAO (12h05)
///            Departure from FAO to LIS (12h30)
