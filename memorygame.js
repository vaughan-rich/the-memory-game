const cards = document.querySelectorAll('.memorycard');

let hasFlippedCard = false;
let firstCard, secondCard;
let boardLocked = false; // need this to prevent bugs

let cardsTotal = 42;
var pairsNum = 0;
var movesNum = 0;
var lives = 3;

var livesDisp = document.getElementById("lives");
livesDisp.style.display = "none";

// Enclosing shuffle function in brackets makes it an Immediately Invoked Function Expression (IIFE), so it's executed right after its definition.
(function shuffleCards() {   
    cards.forEach(card => {
        // random number between 1 and 12
        let position = Math.floor(Math.random() * 12);
        card.style.order = position;
    });   
})();

cards.forEach(card => card.addEventListener('click',flipCard));

function flipCard() {
    // when the board is 'locked', don't run any of this code:
    if (boardLocked) return;
    
    // if the user is clicking on the same card for second time, don't run any of this code:
    if (this === firstCard) return;
    
    //console.log('Flipped');
    //console.log(this);
    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        // if it's false ^^ this means it's first click
        hasFlippedCard = true;
        firstCard = this;
        //console.log({hasFlippedCard, firstCard});
        
        return; // need this return to fit with ternary operator
    }
    
    // this code executes on second click (used to be inside else clause):
        hasFlippedCard = false;
        secondCard = this;
        //console.log({firstCard, secondCard});
        //console.log(this);
        checkIfMatch();
}

function checkIfMatch() {

    // check if the cards match:
    console.log(firstCard.dataset.framework);
    console.log(secondCard.dataset.framework);

    // Ternary operator allows you to write an if-else block in just one line:
    let Match = firstCard.dataset.framework === secondCard.dataset.framework;
    Match ? disableCards() : resetCards();
    
    /* This is the old if-else logic, commented out:
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        //cards match
        console.log('Its a match');
        disableCards();
    }
    else {
        // cards don't match
        console.log('Not a match');
        resetCards();        
    }*/     
    
    console.log("checkIfMatch Function Executed");
}


function resetCards() {
    
    movesNum = movesNum + 1;
    document.getElementById("instructions").innerHTML = "match the symbols. number of pairs: " + pairsNum + "/21. number of guesses: " + movesNum +".";
    
    console.log('Not a match');  
    boardLocked = true; // stops the player from trying to quickly click other cards
    
    if (pairsNum > 17) {
        lives = lives - 1;
        printlives();
        if (lives < 1) {
            gameOver();
            return;
        }
    }
    
    // need a small delay so we can see second card:
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        boardLocked = false;
    }, 1200);  
}

function disableCards() {
    
    movesNum = movesNum + 1;
    document.getElementById("instructions").innerHTML = "match the symbols. number of pairs: " + pairsNum + "/21. number of guesses: " + movesNum +".";
    
    console.log('Its a match');
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click',flipCard);
    scoreIncrease();
    
}

function scoreIncrease() {
    pairsNum = pairsNum + 1;
    console.log(pairsNum);
    document.getElementById("instructions").innerHTML = "match the symbols. number of pairs: " + pairsNum + "/21. number of guesses: " + movesNum +".";
    
    if (pairsNum > 17) {
        printlives();
    }
    
    if (pairsNum > 20) {
        youWon();
    }  
}

function printlives() {
    // make lives appear
    livesDisp.style.display = "block";
    
    if (lives === 3) {
        document.getElementById("lives").innerHTML = "Lives: 🧠 🧠 🧠";    
    }
    else if (lives === 2) {
        document.getElementById("lives").innerHTML = "Lives: 🧠 🧠";
    }
    else if (lives === 1) {
        document.getElementById("lives").innerHTML = "Lives: 🧠"; 
    }
    else {
        document.getElementById("lives").innerHTML = "Lives: "; 
    }
    
}

function gameOver() {
    boardLocked = true;
    var para = document.createElement("P");
    var t = document.createTextNode("you lose... refresh the page to try again...");
    para.appendChild(t);
    document.getElementById("byrichardvaughan").appendChild(para);
}

function youWon() {
    boardLocked = true;
    var para = document.createElement("P");
    var t = document.createTextNode("congratulations. you have conquered the impossible... refresh the page to play again...");
    para.appendChild(t);
    document.getElementById("byrichardvaughan").appendChild(para);
}