/*
 * Create a list that holds all of your cards
 */
const icons = [
  "fa fa-diamond", "fa fa-diamond",
  "fa fa-paper-plane-o", "fa fa-paper-plane-o",
  "fa fa-anchor", "fa fa-anchor",
  "fa fa-bolt", "fa fa-bolt",
  "fa fa-cube", "fa fa-cube",
  "fa fa-leaf", "fa fa-leaf",
  "fa fa-bicycle", "fa fa-bicycle",
  "fa fa-bomb", "fa fa-bomb", ];



// Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(icons) {
      var currentIndex = icons.length, temporaryValue, randomIndex;

      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = icons[currentIndex];
          icons[currentIndex] = icons[randomIndex];
          icons[randomIndex] = temporaryValue;
      }

      return icons;
  }

// Shuffle array when game starts
shuffle(icons)

// Create containers
const cardsContainer = document.querySelector(".deck");
// Opened cards array
let openedCards = [];

// Matched cards array
let matchedCards =[];

/*
 * Initialize the game
 */
function init() {
  // Create the cards
  for(let i = 0; i < icons.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${icons[i]}"></i>`;
    cardsContainer.appendChild(card);

    // Add Click Event to each card
    click(card);
  }
}

//first click indicator
var isFirstClick = false;


/*
 *Click event
 */
function click(card){

    //Card Click Event
    card.addEventListener("click", function() {

      if(isFirstClick) {
        // Start our timer
        startTimer();
        // Change our First Click indicator's value
        isFirstClick = false;
      }

      const currentCard = this;
      const previousCard = openedCards[0];

      // Opened card
      if(openedCards.length === 1) {

        card.classList.add("open", "show", "disable");
        openedCards.push(this);

        // Compare 2 opened
        compare(currentCard, previousCard);


      } else {
        // Don't opened cards
        currentCard.classList.add("open","show", "disable");
        openedCards.push(this);
      }

    });
  }

/*
 * Compare the 2 cards
 */
 function compare(currentCard,previousCard) {
   //Matcher
   if(currentCard.innerHTML === previousCard.innerHTML) {

     //Matched
     currentCard.classList.add("match");
     previousCard.classList.add("match");

     matchedCards.push(currentCard, previousCard);

     openedCards = [];

     //checking game appendChild
     isOver();

   } else {
     setTimeout(function() {
       currentCard.classList.remove("open", "show","disable");
       previousCard.classList.remove("open", "show","disable");

     }, 500);
     openedCards = [];
 }
    //Add New Move
    addMove();
}

 /*
  *Check if the game is over!
  */

 function isOver() {
    if(matchedCards.length === icons.length) {
        aletr("Game Over!");
        stopTimer();
    }
}

/*
 *Add Moves
 */
const movesContainer = document.querySelector(".moves");
  let moves = 0;
  movesContainer.innerHTML = 0;
  function addMove(){
    moves++;
    movesContainer.innerHTML = moves;

     //Set the Rating
     rating()
};

/*
 *Rating
 */
const starsContainer = document.querySelector(".stars");
starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
function rating () {
  if(moves < 20){
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`
  }
  else if (moves <30 ){
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`
  }
  else {
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`
  }
};

/*
 *Timer function
 */

const timerContainer = document.querySelector(".timer");
let liveTimer,
totalSeconds = 0;

//set the default value to the timer's container
timerContainer.innerHTML = totalSeconds;


 function startTimer() {
   liveTimer = setInterval(function() {
     // Increase the totalSeconds by 1
     totalSeconds++;
     // Update the HTML Container with the new time
     timerContainer.innerHTML = totalSeconds;
   }, 1000);
 }


  /*
   *Restart Button
   */
   const restartButton = document.querySelector(".restart");
   restartButton.addEventListener("click", function(){

     //Delete all cards
     cardsContainer.innerHTML = "";

     // call 'init' to create new Game
     init();

     //reset all variables
     matchedCards= [];

     //reset moves
     moves = 0
     movesContainer.innerHTML = moves;

     //reset stars
     starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;

     // schuffle
     shuffle(icons)

     //timer
     totalSeconds = 0;
     timerContainer.innerHTML = totalSeconds;
   })
  //////// Start the game for the first time!
  init();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
