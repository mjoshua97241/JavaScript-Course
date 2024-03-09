'use strict';
/*
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovement = function (movements, sort = false) {
  // EMPTY the container
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    // Insert the HTML to the webpage. Into the movements elements. We will use Insert Adjacent element
    containerMovements.insertAdjacentHTML('afterbegin', html); //the 1st string is where we want to attach the HTML; 2nd is the string containing the HTML that we want to insert
    //"beforeend" will reverse the order
  });
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${Math.abs(interest)}€`;
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

//* MAP METHOD
///? Computing Usernames

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

// Update UI
const updateUI = function (acc) {
  // Display movements
  displayMovement(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Dispaly summary
  calcDisplaySummary(acc);
};

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);

    console.log('LOGIN');
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); //common to do when working with FORMS
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    console.log(index);

    // Delete Account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovement(currentAccount.movements, !sorted);
  sorted = !sorted;
});

//////////////////* Array Methods Practice ///////////////////////

//1.
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum);

//2. Count how many deposits there have been in the bank with at least $1000
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  // .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
console.log(numDeposits1000);

// Prefixed ++ operator
let a = 10;
console.log(++a);

//3. Create a NEW object which contains the sums of deposits and the withdrawals
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

// 4. Function that convert any string to a title case ()
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('this is a LONG title but n ot too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

/*




////////////////* Coding Challenge #1 ///////////////////

 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀

I. PROBLEM
  1. How to know if the array is received is Julia?
  2. How to remove the 1st, and two last elements from Julia arrays?
  3. How to determine whether the dog is adult or puppy? If it is more than 3 years = adult.
  4. How to create a SHALLOW COPY (doesn't mutate the original)? .slice() method
  5. How to combine the Julia's (corrected) and Kate's data? .concat()
  
II. SUB-PROBLEM


const checkDogs = function (dogsJulia, dogsKate) {
  const clonedDogsJulia = dogsJulia.slice(1, -2);

  const joined = clonedDogsJulia.concat(dogsKate);
  // console.log(joined);

  joined.forEach(function (el, i, arr) {
    if (el >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${el} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};

// Data1
const Julia1 = [3, 5, 2, 12, 7];
const Kate1 = [4, 1, 15, 8, 3];

// Data2
const Julia2 = [9, 16, 6, 8, 3];
const Kate2 = [10, 5, 6, 1, 4];

checkDogs(Julia1, Kate1);
checkDogs(Julia2, Kate2);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


////////////////* Coding Challenge #2 ///////////////////

Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀

I. PROBLEM
  1. Use MAP Method
  2. USe FILTER Method
  3. Use REDUCE Method

II. SUB-PROBLEM


const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map(dogAge =>
    dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
  );
  const adults = humanAge.filter(humanAge => humanAge > 18);
  const average = adults.reduce(
    (acc, everyAge, i, arr) => acc + everyAge / arr.length,
    0
  );
  // const average = adults.reduce ((acc, age) => acc + age,0)/adults.length;

  return average;
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);

////////////////* Coding Challenge #3 ///////////////////
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]


const ages = [5, 2, 4, 1, 15, 8, 3];

const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age > 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);

////////////////* Coding Challenge #4 ///////////////////

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀



I. PROBLEM
  A. How to loop over the array with objects?
    1. What is the formula of the recommended food? recommendedFood = weight ** 0.75 * 28
    2. How to add new property to the object and what is the name? "recommended". use dot notation (.recommended = "(result of recommendedFood)")
  
  B. How to find Sarah in the owners array? .map
    1. 
  
  C. What array and methods that will get only the dogs who eat too much and too little? .filter
    1. What methods that will get only the names of the owner and put it into an array.

II. SUB-PROLEM

*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

// 2.
const isSarahOwner = dogs.find(dog => dog.owners.includes('Sarah'));

console.log(isSarahOwner);
console.log(
  `Sarah's dog is eating too ${
    isSarahOwner.curFood > isSarahOwner.recFood ? 'much!' : 'little!'
  }`
);

// 3.

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);

// 4.
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 5.

const exactFood = dogs.some(dog => dog.recFood === dog.curFood);
console.log(exactFood);

// 6.
const checkEatingOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

const okayFood = dogs.some(checkEatingOkay);
console.log(okayFood);

// 7.
const okayFoodDogs = dogs.filter(checkEatingOkay);
console.log(okayFoodDogs);

// 8.
const dogsCopy = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsCopy);

// const sorted = dogs.flatMap(dog => dog.recFood).sort((a, b) => a - b);
// console.log(sorted);

/*
______________________________________________________________________________________;
////////////////////////// //* SIMPLE ARRAY METHODS //////////////////////////////////
______________________________________________________________________________________;


///? Arrays have methods because they are functions. Methods are simply functions that we can call on objects. Basically, they are functions ATTACHED on objects. This means that arrays THEMSELVES are object. These array methods are simply functions that are attached to all arrays that we create in JS. Arrays are OBJECTS.

let arr = ['a', 'b', 'c', 'd', 'e'];

//* SLICE
///? EXTRACT any array WITHOUT CHANGING (DOESN'T MUTATE) the original.

console.log(arr.slice(2)); //this will extract START from index 2 until the end
console.log(arr.slice(2, 4)); //define the START & END parameter
console.log(arr.slice(-2)); //negative parameter will BEGIN at the END of parameter
console.log(arr.slice(-1)); //LAST element of the parameter
console.log(arr.slice(1, -2));
console.log(arr.slice());
console.log([...arr]);

//* SPLICE
///? MUTATE (CHANGE) the ORIGINAL array
/// console.log(arr.splice(2));
arr.splice(-1); //DELETE the LAST element
arr.splice(1, 2); //the LAST parameter is number of elements we want to DELETE starting from index designated in the first parameter
console.log(arr);

//* REVERSE
///? MUTATE (CHANGE) the ORIGINAL array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());

//* CONCAT
///? DOESN'T MUTATE the original array
const letters = arr.concat(arr2);
console.log(letters);

//* JOIN
console.log(letters.join('-'));


//* AT
///? Start COUNTING from the LAST element of the array

const arr3 = [23, 11, 64];
console.log(arr3[0]);
console.log(arr3.at(0)); //modern way

///? Task: We want to get the LAST element of the array without knowing the length of the array
///? LENGTH METHOD
console.log(arr3[arr3.length - 1]);
///? SLICE METHOD
console.log(arr3.slice(-1)[0]);

///? AT METHOD
console.log(arr3.at(-1));
///? also WORKS on STRINGS
console.log('jonas'.at(-1));

//* forEach
///?Task: Loop over the array in order to print the message for each movement in this bank account. The positive values are deposits and negative values are withdrawals. We will print to the console whether the person deposited or withdrew some money.
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

///? Long Way
/// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  ///to access the variables in the for-of loops
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

///? Easy Way
console.log('----FOREACH----');
movements.forEach(function (mov, i, arr) {
  ///the order of placement is very important here: 1st - current ELEMENT, 2nd - is the INDEX of the element
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});

///? Usage: You CANNOT breakout on the forEach method. It will ALWAYS loop on the entire array. If you want to breakout, you use for-of loop.

/// 0: function (200)
/// 1: function (450)
/// 2: function (400)
/// ...


//* forEach with Maps and Sets

/// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  ///value = current ELEMENT, key = is current INDEX, map = is the entire ARRAY
  console.log(`${key}: ${value}`);
});

/// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach(function (value, _, map) {
  ///Set DO NOT have INDEXES. value = current ELEMENT, _ = is throw away variable, map = is the entire ARRAY.
  console.log(`${value}: ${value}`);
});

______________________________________________________________________________________;
////////////////////////// //* DATA TRANSFORMATION //////////////////////////////////
______________________________________________________________________________________;


///* MAP
///? It takes the original array. Loop over the array. In every each iteration, it applies callback function that is specify on the code to the current element. It return a NEW ARRAY containing the result of applying an operation on all original array elements. Ex: current * 2

///? SAMPLE
const eurToUsd = 1.1;
*/
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/*
///? Normal map method
/// const movementsUSD = movements.map(function (mov) {
///   return mov * eurToUsd;
/// });

///? MAPS: ARROW FUNCTION
/// It difficults to read but it is MORE cleaner.
const movementsUSD = movements.map(mov => mov * eurToUsd);
console.log(movementsUSD);

console.log(movements);
console.log(movementsUSD);

///? Access the current INDEX
const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescriptions);

//* FILTER
///? It filter elements from the original array which SATISFIES the certain condition. It returns NEW ARRAY containing the array elements that passed a specified TEST CONDITION. Ex: current > 2

///? (current array element, index, entire array)
const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});

console.log(movements);
console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);

console.log(withdrawals);

//* REDUCE
///? It BOILS ("reduces") all array elements down to one single value (e.g. adding all elements together). Ex: acc + current

console.log(movements);

///? PARAMETER: (accumulator, current element, cur index, entire array)
///? accumulatr -> SNOWBALL
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0); //0 is the INITIAL value of accumulator

///? Arrow function
const balance = movements.reduce((acc, cur) => acc + cur, 0);

console.log(balance);

///? VS. using for-of loop
// let balance2 = 0;
// for (const mov of movements) balance2 += mov;
// console.log(balance2);

///? TASK:
///? Get the MAXIMUM VALUE in the array
// acc -> will keep TRACK the maximum value. THINK always what we WANT on the accumulator.
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]); //don't just put zero, include the NAME of the array

console.log(max);


////////////////////* THE MAGIC CHAINING METHODS /////////////////////////////////
///? COMBINING the Map, Reduce and Filter
///? NOTE: We can chain the method if the after another one if the FIRST ONE RETURNS an ARRAY.

///? REMINDER 1.DO NOT OVERUSE because it can cause performance ISSUES. Compress all the functionality to little as possible. 2. BAD PRACTICE - methods that MUTATE the original array (e.g. splice method)

const eurToUsd = 1.1;
console.log(movements);

///? PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    /// console.log(arr); //Inspecting the current array in the pipeline
    return mov * eurToUsd;
  })
  /// .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);
*/
/*
///* FIND
///? It is a BOLEAN VALUE. The first true value will RETURN. It will return an ELEMENT.
///? GOAL: To find EXACTLY one element.

const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// Using for-of loops
/*
for (const acc of accounts) {
  if (acc.owner === 'Jessica Davis') {
    console.log(acc);
  }
}


//* SOME

console.log(movements);

///? EQUALITY
console.log(movements.includes(-130));

///? SOME: CONDITION
///? Task: We would like to know if there are some deposits on the account (positive movements)

const anyDeposits = movements.some(mov => mov > 1500);
console.log(anyDeposits);

//* EVERY
///? Similar to some method but the DIFFERENCE is that it RETURNS true if ALL the elements in the array satisfy the condition that we passed in

console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

///? Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));


//* FLAT
///? Only goes ONE LEVEL deep

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); //(2) -> NUMBER of levels

///? Task the account movements out to calculate ALL the movements on the accounts
const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);

const allMovements = accountMovements.flat();
console.log(allMovements);

const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

const overalBalance = accounts
  .map(acc => acc.movements) //1st
  .flat() //2nd
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

//* FLATMAP
///? COMBINATION of flat and map in one method
const overalBalance2 = accounts
  .flatMap(acc => acc.movements) //ONLY ONE level deep
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);


//* SORT (MUTATES)
///? Arranges
///? Will NOT work on MIXED strings

///? Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());

///? Numbers
///? Sorts converts number to strings and need to be fixed
console.log(movements);

///? return < 0, A, B (keep order)
///? return > 0, B, A (switch order)

///? Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);

///? Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);


//* MORE WAYS of CREATING AND FILLING ARRAYS

///? Manual
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

///? Programmatically
///? Empty arrays + fill method
const x = new Array(7);
console.log(x);
// console.log(x.map(() => 5));

//* FILL (MUTATES)
x.fill(1, 3, 5); // (what should it be filled with, begin parameter, end parameter)
x.fill(1);
console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

//* Array.from
///?
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );

  console.log(movementsUI);
  // const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});
*/
