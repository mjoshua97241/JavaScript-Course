// Importing module (just the PART)
// import { addToCart, totalPrice as price, qt } from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(price, qt);
console.log('Importing module');

// Import EVERYTHING into an object
// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// AVOID THIS! importing all in one
// import add, { addToCart, totalPrice as price, qt } from './shoppingCart.js';

//?NOTE: Import is a LIVE connection from exports.
import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);

console.log(cart); //imports are NOT copies of the exports
