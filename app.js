
let playingDeck = ['fa-diamond', 'fa-diamond',
                    'fa-paper-plane-o', 'fa-paper-plane-o',
                    'fa-anchor', 'fa-anchor',
                    'fa-bicycle', 'fa-bicycle',
                    'fa-bomb', 'fa-bomb',
                    'fa-leaf', 'fa-leaf',
                    'fa-cube', 'fa-cube',
                    'fa-bolt', 'fa-bolt',
                    ];
const cards = document.querySelectorAll('.card');
const playingMat = document.querySelector('.deck');

let openCards = [];
let moves = 0;


playingMat.addEventListener('click', function(e) {
  const clickTarget = event.target;
  if (clickTarget.classList == ('card') && openCards.length < 2) {
    startClock();
    flipCard(clickTarget);
    flipCardArray(clickTarget);
    if (openCards.length === 2) {
      match();
      moveCounter();
      checkScore();

   }
 }
});


function flipCard(clickTarget) {
  if (!clickTarget.classList.contains('open', 'show', 'match'))
      clickTarget.classList.add('open', 'show');
}

function flipCardArray(clickTarget) {
  openCards.push(clickTarget);
}

function shuffleDeck() {
  const cardsToSchuffle = Array.from(document.querySelectorAll('.deck li'));
  const shuffleCards = shuffle(cardsToSchuffle);
  for (card of shuffleCards) {
    playingMat.appendChild(card);
  }
}

shuffleDeck()


function match() {
  if (openCards[0].firstElementChild.className ===
      openCards[1].firstElementChild.className)
      {
        openCards[0].classList.add('match');
        openCards[1].classList.add('match');
        openCards = [];
      }
  else {
    setTimeout(function() {
        openCards[0].classList.remove('open', 'show');
        openCards[1].classList.remove('open', 'show');
        openCards = [];
      }, 1000);
  }
};

function moveCounter() {
  moves++;
  const movesText = document.querySelector('.moves');
  movesText.innerHTML = moves;
}

function checkScore() {
  if (moves == 9 || moves == 17) {
    hideStar();
  }
}

function hideStar() {
  const scoreStars = document.querySelectorAll('.stars li');
  for (star of scoreStars) {
    if (star.style.display !== 'none') {
        star.style.display = 'none';
        break;
    }
  }
}

// let clockId = setInterval(startClock, 1000);
let time = 0;
// let clockMinutes =  Math.floor(time / 60);
// let clockSeconds = time % 60;

// function startClock() {
//   const clock = document.querySelector('.clock');
//   let clockMinutes =  Math.floor(time / 60);
//   let clockSeconds = time % 60; 
//   time++;
//   console.log(clockMinutes);
//   console.log(clockSeconds);
//   console.log(time);
//   if (clockSeconds < 10) {
//     clock.innerHTML = `${clockMinutes}:0${clockSeconds}`;
//   }
//   else {
//     clock.innerHTML = `${clockMinutes}:${clockSeconds}`;
//   }
// }
let clockId;

function startClock() {
  // time = 0;
  // const clock = document.querySelector('.clock');
  // let clockMinutes =  Math.floor(time / 60);
  // let clockSeconds = time % 60;
  clockId = setInterval(() => {
    time++
    const clock = document.querySelector('.clock');
    let clockMinutes =  Math.floor(time / 60);
    let clockSeconds = time % 60;
    if (clockSeconds < 10) {
        clock.innerHTML = `${clockMinutes}:0${clockSeconds}`;
      }
    else {
        clock.innerHTML = `${clockMinutes}:${clockSeconds}`;
      }
    // console.log(time);
  }, 1000);
  
  // console.log(clockMinutes);
  // console.log(clockSeconds);
}

startClock();

function stopClock() {
  clearInterval(clockId);
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
