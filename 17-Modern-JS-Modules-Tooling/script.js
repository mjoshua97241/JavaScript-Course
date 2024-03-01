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
