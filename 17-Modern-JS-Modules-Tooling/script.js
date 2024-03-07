// Importing module (just the PART)
// import { addToCart, totalPrice as price, qt } from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(price, qt);
console.log("Importing module");

// Import EVERYTHING into an object
// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// AVOID THIS! importing all in one
// import add, { addToCart, totalPrice as price, qt } from './shoppingCart.js';

//?NOTE: Import is a LIVE connection from exports.
import add, { cart } from "./shoppingCart.js";
add("pizza", 2);
add("bread", 5);
add("apples", 4);

console.log(cart); //imports are NOT copies of the exports

/*
///* TOP LEVEL AWAIT
// await can be use and working outside the async function but it should be use only on module (in index.html script type)
///?NOTE: BLOCKS the entire execution of this module. This can be useful, and can be harmful when running a long task.
// console.log("Start fetching");
// const res = await fetch("https://jsonplaceholder.typicode.com/posts");
// const data = await res.json();
// console.log(data);
// console.log("Something");

const getLastPost = async function () {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();

  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost);

// NOT very clean
// lastPost.then((last) => console.log(last));

const lastPost2 = await getLastPost();
console.log(lastPost2);


///* MODULE PATTERN
// To ENCAPSULATE functionality, to have private data, and exposed API. This is simply using function, by default, and allows us to return values which can become API.

const ShoppingCart2 = (function () {
  // PRIVATE STUFFS
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  //   TO MAKE IT PUBLIC
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

// Why IFE can still runs even if it was run at the start? because of CLOSURES - allows the functions to have variables that were present at the birthplace, so it never loses connections.

ShoppingCart2.addToCart("apple", 4);
ShoppingCart2.addToCart("pizza", 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost); //You cannot access private stuffs


///* COMMON MODULES

// Export
export.addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

// Import
const {addToCart} = require('./shoppingCart.js');
*/

// import cloneDeep from "./lodash-es/cloneDeep.js";
// import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";
import cloneDeep from "lodash-es";

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "pizza", quantity: 5 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

if (module.hot) {
  module.hot.accept();
}

class Person {
  greeting = "Hey";
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}

const jonas = new Person("Jonas");

console.log("Jonas" ?? null);

console.log(cart.find((el) => el.quantity >= 2));
Promise.resolve("TEST").then((x) => console.log(x));

import "core-js/stable";
// import "core-js/stable/array/find";
// import "core-js/stable/array/promise";

// Polyfilling async functions
import "regenerator-runtime/runtime";
