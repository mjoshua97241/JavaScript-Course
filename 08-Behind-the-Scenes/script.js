'use strict';
/*
////////////// Hoisting and TDZ in Practice////////////////

//////Varibles
console.log(me); //undefined
console.log(job); //uninitialized
console.log(year); //uninitialized

var me = 'Jonas';
let job = 'teacher';
const year = 1991;

//////Functions
console.log(addDecl(2, 3)); //5
console.log(addExpr(2, 3)); //Reference Error: Cannot access
// console.log(addArrow(2, 3)); //Reference Error: Cannot access
console.log(addArrow(2, 3)); //for var = undefined

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

// const addArrow = (a, b) => a + b;

var addArrow = (a, b) => a + b;

/////Differences between var, let, and const

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x); //true
console.log(y === window.y); //false
console.log(z === window.z); //false


///////////////THE THIS KEYWORD PRACTICE//////////////////////
console.log(this);

//Function Expression
const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this);
};

calcAge(1991);

//Arrow Function
const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this);
};

calcAgeArrow(1991);

//Inside of a Method
const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};
jonas.calcAge();

const matilda = {
  year: 2017,
};
matilda.calcAge = jonas.calcAge;
matilda.calcAge();

//Take out the function out of Jonas object
const f = jonas.calcAge;
f(); //error because it is not anymore an object but a regular function


/////////////////////Regular Functions 🆚 Arrow Functions//////////////////////////////

//Object
var firstName = 'Matilda';

const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);

    // Regular Function
    // greet: function () {
    //   console.log(`Hey ${this.firstName}`);
    // },

    // //Another PITFALL of THIS keyword (function inside of a method)
    // const isMillenial = function() {
    //   console.log(this.year >=1981 && this.year <= 1996);
    // }
    // isMillenial(); //undefined

    //Solution for the this keyword inside of a method
    //Solution #1
    // const self = this;
    // const isMillenial = function () {
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };

    // Solution #2
    const isMillenial = () => {
      console.log(this.year >= 1981 && this.year <= 1996);
    };

    isMillenial(); //undefined
  },
  // Arrow Function
  greet: () => console.log(`Hey ${this.firstName}`),
};
jonas.greet();
jonas.calcAge();

//Argument Keywords
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5);

var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};
addArrow(2, 5, 8);
*/

///////////Primitives 🆚 Objects (Primitive vs Reference Type) in PRACTICE////////////////

// Primitive Types
// let lastName = 'Williams';
// let oldLastName = lastName;
// lastName = 'Davis';
// console.log(lastName, oldLastName);

// Reference Types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

// Jessica will get married and change her lastName
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before marriage:', jessica);
console.log('After marriage:', marriedJessica);

// Copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';
// console.log('Before marriage:', jessica2);
// console.log('After marriage:', jessicaCopy);

//adding properties to the jessicaCopy.family
jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');
console.log('Before marriage:', jessica2);
console.log('After marriage:', jessicaCopy);
