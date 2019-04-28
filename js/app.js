
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
  if (clickTarget.classList == ('card')) && openCards.length < 2) {
    flipCard(clickTarget);
    flipCardArray(clickTarget);
    if (openCards.length === 2) {
      match();
      moveCounter();
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

function match(cardEl) {
  if (openCards[0].firstElementChild.class ===
      opencards[1].firstElementChild.class)
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


  // console.log('this is a click');
