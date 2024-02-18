
const tablero = document.querySelector('.grid-container')
const score = document.querySelector('#score')
const timer = document.querySelector('#timer')
const select = document.querySelector('#mode')
var confettiElement = document.getElementById('my-canvas');
var confettiSettings = { target: confettiElement };
var confetti = new ConfettiGenerator(confettiSettings);


const posibleCards = [
    {
        src: "./assets/angular.svg",
        name: "Angular"
    },
    {
        src: "./assets/astro.svg",
        name: "Astro"
    },
    {
        src: "./assets/ember.svg",
        name: "Ember"
    },
    {
        src: "./assets/jquery.svg",
        name: "JQuery"
    },
    {
        src: "./assets/nextjs.svg",
        name: "NextJS"
    },
    {
        src: "./assets/react.svg",
        name: "React"
    },
    {
        src: "./assets/svelte.svg",
        name: "Svelte"
    },
    {
        src: "./assets/vue.svg",
        name: "Vue"
    }
]


let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let scoreNow = 0;
let mode = 'hard';
let gameStarted = false;
let time = 0;
score.textContent = scoreNow;
let winner = false;

cards = posibleCards;



function EasyMode() {

    cards = posibleCards.filter((card, index) => index < 4);
    if (gameStarted) cards = [...cards, ...cards];
}

function MediumMode() {

    cards = posibleCards.filter((card, index) => index < 6);
    if (gameStarted) cards = [...cards, ...cards];

}

function HardMode() {
    cards = posibleCards.filter((card, index) => index < 8);
    if (gameStarted) cards = [...cards, ...cards];
}

select.addEventListener('change', (e) => {
    console.log(e.target.value)
    if (e.target.value === mode) return;

    if (e.target.value === 'easy') {
        mode = 'easy';
        EasyMode();
    }
    if (e.target.value === 'medium') {
        mode = 'medium';
        MediumMode();
    }
    if (e.target.value === 'hard') {
        mode = 'hard';
        HardMode();
    }

    console.log('cards', cards)
}
)

function formatTime(time) {

    if (time < 10) return `0${time} sec`;
    if (time >= 10 && time < 60) return `${time} sec`;
    if (time >= 60) return `${Math.floor(time / 60) < 10 ? `0${Math.floor(time / 60)}` : `${Math.floor(time / 60)}`}:${time % 60 < 10 ? `0${time % 60}` : time % 60}`;

}

function startTimer() {
    if (winner) return;
    time++;

    timer.textContent = formatTime(time);
    setTimeout(startTimer, 1000);
}



function startGame() {
    cards = [...cards, ...cards];
    shuffleCards();
    createBoard();
    startTimer();
}

function shuffleCards() {
    cards = cards.sort(() => Math.random() - 0.5);
}

function createBoard() {
    cards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name = card.name;
        cardElement.innerHTML = `
            <div class='front'>
                <img class='front-image' src=${card.src} alt=${card.name}/>
            </div>
            <div class='back'></div>
        `
        console.log(tablero)
        tablero.appendChild(cardElement);

        cardElement.addEventListener('click', flipCard);
    })
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    scoreNow++;
    score.textContent = scoreNow;
    lockBoard = true;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;
    if (isMatch) {
        disableCards()
        CheckAllMatch();

    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    enableBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        enableBoard();
    }, 1000);
}

function CheckAllMatch() {
    let allMatch = true;
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        if (!card.classList.contains('flipped')) {
            allMatch = false;
        }
    });
    if (allMatch) {
        CheckWin();
    }
}

function CheckWin() {
    winner = true;

    alert('You Win \n Your score is: ' + scoreNow + '\n Your time is: ' + formatTime(time) + '\n Mode: ' + mode);
    confetti.render();
}

function enableBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function restart() {
    if (!gameStarted) {
        gameStarted = true;
        return startGame();
    }
    enableBoard();
    shuffleCards();
    scoreNow = 0;
    time = 0;
    score.textContent = scoreNow;
    tablero.innerHTML = '';
    confetti.clear();
    createBoard();
}

