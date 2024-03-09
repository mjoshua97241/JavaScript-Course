"strict mode";

const budget = Object.freeze([
  { value: 250, description: "Sold old TV 📺", user: "jonas" },
  { value: -45, description: "Groceries 🥑", user: "jonas" },
  { value: 3500, description: "Monthly salary 👩‍💻", user: "jonas" },
  { value: 300, description: "Freelancing 👩‍💻", user: "jonas" },
  { value: -1100, description: "New iPhone 📱", user: "jonas" },
  { value: -20, description: "Candy 🍭", user: "matilda" },
  { value: -125, description: "Toys 🚂", user: "matilda" },
  { value: -1800, description: "New Laptop 💻", user: "jonas" },
]);

// Object.freeze - make the data immutable (no longer put properties). This only freezes ONE LEVEL only. This is NOT A DEEP FREEZE.
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
// spendingLimits.jay = 200;
console.log(spendingLimits);

// const lim = spendingLimits[user] ? spendingLimits[user] : 0;
const getLimit = (limits, user) => limits?.[user] ?? 0;

// PURE FUNCTION :D
const addExpense = function (state, limit, value, description, user = "jonas") {
  // if (!user) user = "jonas"; //make it a default
  const cleanUser = user.toLowerCase();

  // Problem
  // let limit;
  // if (spendingLimits[user]) {
  //   lim = spendingLimits[user];
  // } else {
  //   lim = 0;
  // }
  // Solution #1 - Ternary Operator
  // const lim = spendingLimits[user] ? spendingLimits[user] : 0;

  // Solution #2 - Optional Chaining
  // const limit = getLimit(user);

  // Problem
  // if (value <= limit) {
  //   budget.push({ value: -value, description: description, user: user });
  // }
  return value <= getLimit(limit, cleanUser)
    ? // creates a copy of object, then add elements
      [...state, { value: -value, description, user: cleanUser }]
    : state;

  // budget.push({ value: -value, description, user: cleanUser });
};
const newBudget1 = addExpense(budget, spendingLimits, 10, "Pizza 🍕");

const newBudget2 = addExpense(
  newBudget1, //to add the result from newBudget1
  spendingLimits,
  100,
  "Going to movies 🍿",
  "Matilda"
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, "Stuff", "Jay");

const checkExpenses = function (state, limits) {
  // state.map();
  // for (const entry of newBudget3) {
  // Problem
  // let limit;
  // if (spendingLimits[entry.user]) {
  //   limit = spendingLimits[entry.user];
  // } else {
  //   limit = 0;
  // }
  // Solution 1
  // const limit = spendingLimits?.[entry.user] ?? 0;
  // Solution 2
  // if (entry.value < -getLimit(limits, entry.user)) entry.flag = "limit";
  // }
};
checkExpenses(newBudget3, spendingLimits);
console.log(newBudget3);

// console.log(budget);

const logBigExpenses = function (bigLimit) {
  let output = "";
  // Problem
  // if (entry.value <= -bigLimit) {
  //   output += `${entry.description.slice(-2)} / `; // Emojis are 2 chars
  // }
  // Solution #1
  for (const entry of budget)
    output +=
      entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : "";

  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};

// console.log(budget);
logBigExpenses(500);
