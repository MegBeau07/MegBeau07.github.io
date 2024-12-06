const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
//Ajout de 2 variables
let pairePareil = 0;
let paireTotal = 6;
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  //Pour fonction Arreter timer et recommencer
  pairePareil++;

  if (pairePareil === paireTotal) {
    arreterJeu();
  }

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
// =========================================================================
// Mon code                                           =
// =========================================================================
//Identifier mes variables


function fermerDialogue() {
  document.getElementById("dialogPop").close();
}

function fermerPourToujours() {
  localStorage.setItem("FermerDefinitivement", "true");
  document.getElementById("dialogPop").close();
}
if (localStorage.getItem("FermerDefinitivement") !== "true") {
  document.getElementById("dialogPop").showModal();
}

  //Ma fonction timer 
  //Ajout fonctionnalité
const timer = document.getElementById("decompte");
let secondes = 59;
let valide = true;
let interval;

//Quand cliquer --> commence le timer
cards.forEach(card => card.addEventListener('click', debut));

//Starter timer
function debut() {
  if (valide) {
   interval = setInterval(timerdecompte, 1000);
   timerdecompte();
  }
  valide = false;
}


// Créer le decompte

function timerdecompte(){
  if (secondes < 10) {
    timer.innerHTML = (secondes);
  }
  else {
    timer.innerHTML = ("0:" + secondes);
  }
  if(secondes > 0) {
    secondes--;
  }
  // Arrêter le jeu lorsque le timer atteint zéro
  else if (secondes === 0) {
    arreterJeu(); 
  }
}
// Fonction pour arrêter le jeu
function arreterJeu() {
  clearInterval(interval);
  recommencerJeu();
}
function recommencerJeu(){
   // Recharge la page
  location.reload();
}







