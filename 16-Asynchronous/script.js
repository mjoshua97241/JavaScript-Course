'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
            </div>
            </article>`;

  console.log(html);
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};
/*
const getCountryAndNeighbour = function (country) {
  // OLD SCHOOL OF REQUESTING

  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    //   console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get Neighbour country (2)
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};
////////////////* IMPORTANT ALWAYS USE THIS URL: https://countries-api-836d.onrender.com/countries/

// getCountryAndNeighbour('portugal');
getCountryAndNeighbour('usa');

// CALLBACK HELL: Messy and hard to understand is a bad code. This will lead to more bugs.

setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
        setTimeout(() => {
          console.log('5 second passed');
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/

/*
////* PROMISES
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

const request = fetch('https://restcountries.com/v2/name/portugal');
console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

//////* CONSUMING PROMISES
// Simplified version
*/
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};
/*
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
      console.log(response);

      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      // const neighbour = data[0].borders?.[0];
      const neighbour = 'dsdsdsds';

      if (!neighbour) return;

      // Country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}`);
      renderError(`Something went wrong ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      // console.log(neighbour);

      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}`);
      renderError(`Something went wrong ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

////////* HANDLING REJECTED PROMISES

btn.addEventListener('click', function () {
  getCountryData('portugal');
});

getCountryData('australia');

// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀


//////////////////*  MY ANSWER

const whereAmI = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  )
    .then(response => {
      console.log(response);
      if (!response.ok)
        throw new Error(`Problem with geocoding (${response.status})`);

      return response.json();
    })
    // .then(data => {
    //   console.log(data);
    //   console.log(`You are in ${data.city}, ${data.countryName}.`);

    //   if (!data.city && !data.countryName) return;
    // })
    .then(data => {
      fetch(
        `https://restcountries.com/v2/name/${data.countryName.toLowerCase()}`
      )
        .then(response => {
          console.log(response);

          if (!response.ok)
            throw new Error(`Country not found (${response.status})`);

          return response.json();
        })
        .then(data => {
          renderCountry(data[0]);
          const neighbour = data[0].borders?.[0];

          if (!neighbour) return;

          return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
        })
        .then(response => {
          if (!response.ok)
            throw new Error(`Country not found (${response.status})`);

          return response.json();
        })
        .then(data => renderCountry(data, 'neighbour'))
        .catch(err => {
          console.error(`${err}`);
          renderError(`Something went wrong ${err.message}. Try again!`);
        })
        .finally(() => {
          countriesContainer.style.opacity = 1;
        });
    })
    .catch(err => {
      console.error(`${err}`);
      renderError(`Something went wrong ${err.message}. Try again!`);
    });
};

btn.addEventListener('click', function () {
  // whereAmI(52.508, 13.381);
  // whereAmI(19.037, 72.873);
  whereAmI(-33.933, 18.474);
});

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);


//////////////////* JONAS' ANSWER


const whereAmI = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  )
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.countryName}`);

      return fetch(
        `https://restcountries.com/v2/name/${data.countryName.toLowerCase()}`
      );
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`));
};
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
*/

//////////////* ASYNCHRONOUS BEHIND THE SCENES: THE EVENT LOOP
/*
Runtime in the Browser - "Container" which includes all the pieces necessary to execute Javascript code

PARTS
1. JS Engine - "Heart" of the runtime
  a. HEAP - where object are stored in memory
  b. CALL STACK - where code is actually executed. Only ONE thread of execution. No multitasking!
2. WEB APIs - APIs provided to the engine
3. EVENT LOOP - sends callbacks from queue to call stack
4. CALLBACK QUEUE - ready-to-be-executed callback functions (coming from events)

*/

//////////////* ASYNCHRONOUS BEHIND THE SCENES: THE EVENT LOOP IN PRACTICE

/* 
1. The first to run is anything top level code (outside the callbacks)
2. Second is from  the microtasks queue (this should be resolve first before the callback queue)
3. Then, from the callback queue (because of the timer)


console.log('Test start');

setTimeout(() => console.log('O sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
console.log('Test end');
*/
/*
console.log('Test start');

setTimeout(() => console.log('O sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});

console.log('Test end');


//////////////* BUILDING A SIMPLE PROMISES
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      // Fulfilled Promise
      resolve('You WIN! 💰');
    } else {
      reject(new Error('You lose your money! 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

/// Promisifying means to convert callback based asynchrounous behaviour to promise based
// PROMISIFYING setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// CONSUME the promise
wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('4 seconds passed');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 second'));

// OLD CALLBACK HELL
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//         setTimeout(() => {
//           console.log('5 second passed');
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

/// EASY FULFILLED AND REJECT PROMISE

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));


// Promise based API
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // Callback based API
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    // The same above...
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.countryName}`);

      return fetch(
        `https://restcountries.com/v2/name/${data.countryName.toLowerCase()}`
      );
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`));
};

btn.addEventListener('click', whereAmI);

// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. // When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. // The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

SOLUTION:
 
  1. What is the function?
    a. Pass the imgPath as an input.
  2. How to return a promise that creates a new image and sets the .src attribute to the provided image path?
    a. 
  3. How to append the DOM element after the image done loading?
  4. How to fulfill the value (iamge element)?
  5. How to reject the promise if there is an error?


If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀


// PART 1
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imagesContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    // create a new image
    const img = document.createElement('img');

    // src attribute of the image element to the provided 'imgPath'
    img.src = imgPath;

    // Event listeners
    // load
    // Solution #1
    // img.onload = () => {
    //   imagesContainer.appendChild(img);
    //   resolve(img);
    // };

    // Solution #2
    img.addEventListener('load', function () {
      imagesContainer.append(img);
      resolve(img);
    });

    // Listen to error
    // Solution #1
    // img.onerror = () => {
    //   reject(new Error('Failed to load image'));
    // };

    // Solution #2
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

// PART 2
// Handle the successful promise
let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 3 loaded');
    return wait(2);
  })
  .catch(err => console.error(err));
*/

//////////* CONSUMING PROMISES WITH ASYNC/AWAIT
//? This hides how really consuming promises works. It's syntatic(?) sugar that hides that true process

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// OLD WAY
// fetch(`https://restcountries.com/v2/name/${country}`).then(res =>
//   console.log(res)
// );

const whereAmI = async function (country) {
  try {
    // Geolocation
    const pos = await getPosition();

    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse Geocoding
    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    // Country data

    // Inside this functions, we can have one or more await functions
    const res = await fetch(`https://restcountries.com/v2/name/philippines`);
    // const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.countryName.toLowerCase()}`);
    if (!res.ok) throw new Error('Problem getting country');
    const data = await res.json();

    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.countryName}`;
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};

// const city = whereAmI();
// console.log(city);

// Mixing the old and new consuming promises (DON'T LIKE)
// Prefer use ASYNC FUNCTIONS
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log('3: Finished getting location'));

// CONVERT THE whereAmI() to async function
/*
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message} 💥`);
  }
  console.log('3: Finished getting location');
})();

// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (err) {
//   alert(err.message);
// }
*/

//////* RUNNING PROMISES IN PARALLEL
/*
const get3Countries = async function (c1, c2, c3) {
  //always use this try catch block when using an async function
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
    // console.log([data1.capital, data2.capital, data3.capital]);

    // Run the promises in PARALLEL
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);

    ///?NOTE: If one of the promises rejects, it will shortcircuit all the promises

    // Loop
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania');
*/
////////////////* PROMISE COMBINATOR
///? Promise.race
// Receives an array of promises and returns a promise. This promise returned by promise.race is settled as soon as one the input promises settles. Settled means available (it doesn't matter if it is rejected or fulfilled).
// The promise that settles WINS the race. ONE RESULT only
// If one of the promise gets rejected, it WINS the race. Means all the promises shortcircuits
// SITUATION: Helpful when the user has a very bad internet connection, then the fetch request might took to long. Rejects the promises after a number of seconds has passed.
/*
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/egypt`),
    getJSON(`https://restcountries.com/v2/name/mexico`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v2/name/tanzania`, timeout(5)),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

///? Promise.allSettled
// Takes in array of promises, simply return an array of all the settled promises. No matter the promises got rejected or not.
// It is similar with promise.all but the difference is if the promise.all will rejected, will shortcircuits all the promises, even it is settled.
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

///? Promise.any [ES2021]
//Takes in array of multiple promises, it will return the FIRST FULFILLED PROMISES and simply IGNORED REJECTED promises
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

*/
///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀

PART 1
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imagesContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    // create a new image
    const img = document.createElement('img');

    // src attribute of the image element to the provided 'imgPath'
    img.src = imgPath;

    // Event listeners
    // load

    img.addEventListener('load', function () {
      imagesContainer.append(img);
      resolve(img);
    });

    // Listen to error
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

// PART 2
// Handle the successful promise
let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 3 loaded');
    return wait(2);
  })
  .catch(err => console.error(err));
*/
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imagesContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    // create a new image
    const img = document.createElement('img');

    // src attribute of the image element to the provided 'imgPath'
    img.src = imgPath;

    // Event listeners
    // load

    img.addEventListener('load', function () {
      imagesContainer.append(img);
      resolve(img);
    });

    // Listen to error
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

/*
/// MY SOLUTION
const loadNPause = async function () {
  try {
    let img1 = await createImage('img/img-1.jpg');
    console.log('Image 1 image');
    await wait(2);
    img.style.display = 'none';

    img = await createImage('img/img-2.jpg');
    console.log('Image 2 image');
    await wait(2);
    img.style.display = 'none';

    img = await createImage('img/img-3.jpg');
    currentImg = img3;
    console.log('Image 3 image');
    await wait(2);
  } catch (err) {
    console.error(err);
  }
};
*/

/// MY SOLUTION with ChatGPT help
/*
const loadNPause = async function (path, duration) {
  try {
    const img = await createImage(path);
    currentImg = img;
    console.log(`Image ${path.match(/\d+/g)} loaded`);
    await wait(duration);
    currentImg.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

(async function () {
  try {
    await loadNPause('img/img-1.jpg', 2);
    await loadNPause('img/img-2.jpg', 2);
    await loadNPause('img/img-3.jpg', 2);
  } catch (err) {
    console.error(err);
  }
})();
*/
// PART 2

//1. loadAll = async promise.all(imgArr)
// 2. const loop = await imgArr.map() await createImage([loop])
//3. Check the images array
//4. What promise combinator function should I use to get the images from the array?
//5. promise.parallel

const loadAll = async function (imgArr) {
  try {
    // Async ALWAYS RETURNS PROMISE (not a value)
    const imgs = imgArr.map(async img => await createImage(img));

    const all = await Promise.all(imgs);
    console.log(all);
    all.forEach(img => {
      img.classList.add('parallel');
    });
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
