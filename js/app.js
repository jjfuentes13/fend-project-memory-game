
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
let matchCards = 0;
let clockOff = true;

playingMat.addEventListener('click', function(e) {
  const clickTarget = event.target;
  if (clickTarget.classList == ('card') && (clockOff === true)) {
    startClock();
    clockOff = false;
  }
});

// main event listener to play game
playingMat.addEventListener('click', function(e) {
  const clickTarget = event.target;
    if (clickTarget.classList == ('card') && openCards.length < 2) {
      flipCard(clickTarget);
      flipCardArray(clickTarget);
      if (openCards.length === 2) {
        match();
        moveCounter();
        checkScore();
        if (matchCards === 8) {
          endGame();
      }
   }
}
});


//function to end game and display modal score box
function endGame() {
  stopClock();
  modalStats();
  toggleModal();
}


// functions to flip cards and shuffle deck at the start. 
function flipCard(clickTarget) {
  if (!clickTarget.classList.contains('open', 'show', 'match'))
      clickTarget.classList.add('open', 'show');
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

function shuffleDeck() {
  const cardsToSchuffle = Array.from(document.querySelectorAll('.deck li'));
  const shuffleCards = shuffle(cardsToSchuffle);
  for (card of shuffleCards) {
    playingMat.appendChild(card);
  }
}

shuffleDeck();

// functions to match cards
function flipCardArray(clickTarget) {
  openCards.push(clickTarget);
}

function match() {
  if (openCards[0].firstElementChild.className ===
      openCards[1].firstElementChild.className)
      {
        openCards[0].classList.add('match');
        openCards[1].classList.add('match');
        openCards = [];
        matchCards++;
      }
  else {
    setTimeout(function() {
        openCards[0].classList.remove('open', 'show');
        openCards[1].classList.remove('open', 'show');
        openCards = [];
      }, 1000);
  }
}

// functions that affect moves
function moveCounter() {
  moves++;
  const movesText = document.querySelector('.moves');
  movesText.innerHTML = moves;
}

function resetMoves() {
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
}

// functions of score tracking
const scoreStars = document.querySelectorAll('.stars li');

function checkScore() {
  if (moves == 12 || moves == 20) {
    hideStar();
  }
}

function hideStar() {
  for (star of scoreStars) {
    if (star.style.display !== 'none') {
        star.style.display = 'none';
        break;
    }
  }
}

// clock function and global variables for clock mechanics
let time = 0;
let clockID;

function startClock() {
  clockID = setInterval(() => {
  time++;
  const clock = document.querySelector('.clock');
  let clockMinutes = Math.floor(time/60);
  let clockSeconds = time % 60;
  if (clockSeconds < 10) {
    clock.innerHtml = `${clockMinutes}:0${clockSeconds}`;
  }else {
    clock.innerHTML = `${clockMinutes}:${clockSeconds}`;
  }
}, 1000);
}

function stopClock() {
  clearInterval(clockID);
}

// event listener to handle the reset button on playing screen
document.querySelector('.restart').addEventListener('click', reset);

//functions for modal score box
function toggleModal() {
  const modal = document.querySelector('.modal-background');
  modal.classList.toggle('hide');
}

function modalStats() {
  const timeStat = document.querySelector('.modal-time');
  const clockTime = document.querySelector('.clock').innerHTML;
  const moveStat = document.querySelector('.modal-moves');
  const starModal = document.querySelector('.modal-stars');
  const starStat = getStarScore();

  timeStat.innerHTML = `Time = ${clockTime}`;
  moveStat.innerHTML = `Moves = ${moves}`;
  starModal.innerHTML = `Stars = ${starStat}`;
  console.log(starStat);
}

function getStarScore() {
  stars = 0;
  for (star of scoreStars) {
    if (star.style.display !=='none') {
      stars++;
    }
  }
  console.log(stars);
  return stars;
}

// event listener to close modal score box
document.querySelector('.modal-cancel').addEventListener('click', () => {
  toggleModal();
});

//event listener to reset game from modal box
document.querySelector('.modal-replay').addEventListener('click', replay);

// reset/replay functions -- 
function reset() {
  resetClock();
  resetMoves();
  resetStars();
  shuffleDeck();
  resetCards();
}

function replay() {
  reset();
  toggleModal();
}

function resetClock() {
  stopClock();
  clockOff = true;
  time = 0;
}

function resetStars() {
  stars = 0;
  for (star of scoreStars) {
    star.style.display = 'inline';
  }
}

function resetCards() {
  for (card of cards) {
    card.className = 'card';  
  }
}

