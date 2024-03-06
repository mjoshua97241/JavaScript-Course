'use strict';
/*
///* CONSTRUCTOR FUNCTIONS AND NEW OPERATOR

/// NOTES:
/// This function will produce an object
const Person = function (firstName, birthYear) {
  //   console.log(this); //Person {}

  //   Instance Properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  //   BAD Practice!! Never do this.
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const jonas = new Person('Jonas', 1991);
/// "new" operator is will the function (i.e. Person) but it does a whole lot more
console.log(jonas);

// 1. New {} is created
// 2. Function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

console.log(jonas instanceof Person);

Person.hey = function () {
  console.log('Hey there!');
  console.log(this);
};
Person.hey();

//////////// //? Prototypes
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person));

// .prototypeOfLinkedObjects

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));

console.log(jonas.__proto__);
// Object.prototype (type of prototype chain)
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 6, 6, 5, 6, 9, 9]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);

///? Creating new method for an array
///? NOT good idea
///? (1) New version of JS might add the same name. (2) If the same developers implement the same method but different name, it will introduce some bugs
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(x => x + 1);
/*

//////////////////////*  CODING CHALLENGE #1 /////////////////////////////////////
/*
1. Use a constructor function to implement a 'Car'. A car has a 'make' and a 'speed' property. The 'speed' property is the current speed of the car in km/h.
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console
4. Create 2 'Car' objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them

Test Data:
- Data car 1: 'BMW' going at 120 km/h
- Data car 2: 'Mercedes' going at 95 km/h
GOOD LUCK 😀



const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} going at ${this.speed} km/h`);
};

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

console.log(car1, car2);

car1.accelerate();
car1.brake();
car1.accelerate();
car2.accelerate();
car2.brake();
*/

//////////////////* ES6 CLASS /////////////////////////

///? Class are special types of functions

///* Class Expression
// const PersonCl = class {}

///*Class Decleration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  ///? INSTANCE METHODS
  /// Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  ///Set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  ///? Static Method
  static hey() {
    console.log('Hey there');
    console.log(this);
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);

console.log(jessica.__proto__ === PersonCl.prototype);

/// Adding method manually
/// PersonCl.prototype.greet = function () {
///   console.log(`Hey ${this.firstName}`);
/// };
jessica.greet();

///? 1. Classes are NOT hoisted - we can't use them before they are declared in the code

///? 2. Class are FIRST-CLASS citizens - we can pass them to functions and return them from functions.

///? 3. Classes are executed in STRICT mode (without being activated)

const walter = new PersonCl('Walter White', 1965);

PersonCl.hey();

////////////////////* GETTERS AND SETTERS //////////////
///? Unique property. It is also a method.
///? For data VALIDATION.

const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest); //reading the property

account.movements = 50;
console.log(account.movements);

/*
//////////////////* OBJECT.CREATE ////////////////////

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();


//////////////////* CODING CHALLENGE #2 //////////////////////
1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6)
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6)
4. Create a new car and experiment with the 'accelerate' and 'brake' methods, and with the getter and setter.

Test data:
- Data car 1: 'Ford' going at 120 km/h



class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
console.log(ford.speedUS);
ford.accelerate();

ford.speedUS = 50;
console.log(ford);


////////////////////////* INHERITANCE BETWEEN "CLASSES": CONSTRUCTOR FUNCTIONS ///////////////
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear); //to call the person function
  this.course = course;
};

///? LINKING Prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);
*/
/*
//////////////////* CODING CHALLENGE #3 //////////////////////

Your tasks:
1. Use a constructor function to implement an Electric Car (called 'EV') as a child "class" of 'Car'. Besides a make and current speed, the 'EV' also has the current battery charge in % ('charge' property)
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo'
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%'
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! Hint: Review the definiton of polymorphism 😉

Test data:
- Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%
GOOD LUCK 😀



const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// Link the prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
console.log(tesla);
tesla.accelerate();

// console.log(tesla.__proto__);
//////////////////* CODING CHALLENGE #4 //////////////////////
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of 'CarCl' class.
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' & 'chargeBattery' methods of this class, and also update the 'brake' method in the Car class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120km/h, with a charge of 23%.
*/
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);

    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(
  rivian
    .accelerate()
    .accelerate()
    .accelerate()
    .brake()
    .chargeBattery(50)
    .accelerate()
);

console.log(rivian.speedUS);
/*


////////////////* ES6 CLASSES ///////////////////////////////////
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

////////////////* INHERITANCE BETWEEN "CLASSES": OBJECT.CREATE ///////////////////////////////////

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();
*/

// Public fields
// Private fields
// Public methods
// Private methods
// (there is also the static version)

///? FIELDS - are properties in all instances
///? Ex: this._movements & this.locale

class Account {
  ///? 1) Public fields (instances)
  // locale = navigator.language;
  // _movements = [];

  ///? 2) Private Fields (instances) - really not truly accessible to outside (just add #)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;

    //Creating an empty array without passing arguments to constructor functions
    ///? PROTECTED PROPERTY
    this.#pin = pin;
    // this._movements = []; //sample of DATA ENCAPSULATION (not truly private)
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  ///? 3) Public methods

  ///? Public Interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    // Calling other methods
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this;
    }
  }

  static helper() {
    console.log('Helper');
  }

  ///? 4) Private methods (using "#")
  #approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

///? NOT good idea
/*
acc1._movements.push(250);
acc1._movements.push(-140);
console.log(acc1);
*/

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
// console.log(acc1.#approveLoan(1000));
console.log(acc1.getMovements());

console.log(acc1);
// console.log(acc1.#pin);

// console.log(acc1.#movements);

Account.helper();

////* ENCAPSULATION: PROTECTED PROPERTIES AND METHODS //////////////////////
///? Data Privacy
///? REASONS:
///? 1. TO prevent code outside the class to accidentally manipulate the data inside the class.
///? 2.When we exposed small interface, then we can change other internal methods with more confidence because we can be sure that external code does not rely on these private methods so that it will NOT BREAK.

//////////////////////////* CHAINING METHOD //////////////////////////
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);

console.log(acc1.getMovements());
