'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnsCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal'); //querySelectorAll to select all the class with the same elements
console.log(btnsOpenModal);

//DRY PRINCIPLE
//create functions outside and call them out as soon as the click event happens
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openModal = function () {
  console.log('Button clicked');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

//lets create for loops for the NodeList to show the content of each of them
for (let i = 0; i < btnsOpenModal.length; i++)
  //   console.log(btnsOpenModal[i].textContent); //to show the content of each in the nodeslist, and use .textContent
  //We will add an Event Listener to display a message that the button is clicked to see if it's working
  btnsOpenModal[i].addEventListener('click', openModal);

btnsCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//create an "esc" keypress event
document.addEventListener('keydown', function (e) {
  //we will define the function here with "e"
  //there are 3 types of keyboard event - 1.keydown 2.keyup 3.keypress
  //keydown - it is fired as soon we just pressed down the key
  //keyup - it is fired as soon we lift up our finger from key
  // keypress - it is fired continuously as long as we are pressing the key

  // to test if it's functioning
  // console.log(e.key); //search for the "specific key that you presses and the name" and call the property (NOT THE VALUE). This will give us the name of the key we pressed.

  //-----------------this is a long method-----------------------------
  // we want to close the modal using the escape button. Let's use if statement (conditions) for this to just isolate the key we wanted to press (specifically the "ESCAPE" button)
  /*
  if (e.key === 'Escape') {
    //We just want the ESCAPE button only to close the modal window
    // console.log('Esc was pressed'); //to check if it is working

    // we just want the escape button to work if the modal window is opened. We need to use the if statement again...
    //how do we know if it's not visible? if it does contain the class 'hidden' then it is not visible, otherwise, it is visible
    if (!modal.classList.contains('hidden')) {
      //if it does not contain hidden class means it is visible, therefore it will execute the true - "clModal ()" function
      closeModal(); //we need to call the function here because if the keyevent executed, this line of code will be executed and we want something to happen here
    }
  }
  */

  //-----------------this is a cleaner method for the repeating codes-------------------------
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    //we will use the AND Operator, if it is both true the closeModal function will be executed. If it is false, the closeModal will not be executed.
    closeModal(); //we need to call the function here because if the keyevent executed, this line of code will be executed and we want something to happen here
  }
});
