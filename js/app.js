
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
    // startClock();
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
  if (moves == 12 || moves == 20) {
    hideStar();
  }
}

const scoreStars = document.querySelectorAll('.stars li');

function hideStar() {
  for (star of scoreStars) {
    if (star.style.display !== 'none') {
        star.style.display = 'none';
        break;
    }
  }
}

let time = 0;
let clockID;

function startClock() {
  clockID = setInterval(() => {
  time++
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

// startClock();

function stopClock() {
  clearInterval(clockID);
}

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

modalStats();

function getStarScore() {
  stars = 0;
  for (star of scoreStars) {
    if (star.style.display !=='none') {
      stars++;
    }
  }
  console.log(stars);
  return stars;
};

document.querySelector('.modal-cancel').addEventListener('click', () => {
  toggleModal();
});

document.querySelector('.modal-replay').addEventListener('click', () => {
  // replay function
});

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
