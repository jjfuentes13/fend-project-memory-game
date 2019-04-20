
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

playingMat.addEventListener('click', function(cardEl) {
  if (cardEl.target.classList == 'card') {
    flipCard(cardEl);
    console.log('clock');
  }
});

function flipCard(cardEl) {
  if (!cardEl.target.classList.contains('open', 'show', 'match'))
      cardEl.target.classList.add('open', 'show');
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
