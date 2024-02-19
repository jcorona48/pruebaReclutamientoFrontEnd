
const tablero = document.querySelector('.grid-container')
const score = document.querySelector('#score')
const timer = document.querySelector('#timer')
const select = document.querySelector('#mode')
const confettiElement = document.getElementById('my-canvas');
const confettiSettings = { target: confettiElement, animate: true, respawn: true };
let confetti = new ConfettiGenerator(confettiSettings);


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
let cardsShowed = false;
cards = posibleCards;
let bonusEttempt = 3;
let bonusTime = 60;
let conffeti = false;



function EasyMode() {
    bonusEttempt = 1;
    bonusTime = 15;
    cards = posibleCards.filter((card, index) => index < 4);
    if (gameStarted) cards = [...cards, ...cards];
}

function MediumMode() {
    bonusEttempt = 2;
    bonusTime = 20;

    cards = posibleCards.filter((card, index) => index < 6);
    if (gameStarted) cards = [...cards, ...cards];

}

function HardMode() {
    bonusEttempt = 3;
    bonusTime = 30;
    cards = posibleCards
    if (gameStarted) cards = [...cards, ...cards];
}

function ExtremeMode() {
    bonusEttempt = 0;
    bonusTime = 30;
    cards = posibleCards;
    if (gameStarted) cards = [...cards, ...cards];
}

select.addEventListener('change', (e) => {
    if (e.target.value === mode) return;

    console.log(e.target.value);
    tablero.classList.replace(mode, e.target.value);

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
    if (e.target.value === 'extreme') {
        mode = 'extreme';
        ExtremeMode();
    }

    restart();
}
)

function formatTime(time) {

    if (time < 10) return `0${time} sec`;
    if (time >= 10 && time < 60) return `${time} sec`;
    if (time >= 60) return `${Math.floor(time / 60) < 10 ? `0${Math.floor(time / 60)}` : `${Math.floor(time / 60)}`}:${time % 60 < 10 ? `0${time % 60}` : time % 60}`;

}


function startTimer() {
    time++;
    if (!winner && cardsShowed) timer.textContent = formatTime(time);
    setTimeout(startTimer, 1000);
}

function restartTimer() {
    time = 0;
    timer.textContent = formatTime(time);
}



function startGame() {
    cards = [...cards, ...cards];
    shuffleCards();
    createBoard();
    showCards();
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
        tablero.appendChild(cardElement);
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

async function showCards() {
    setTimeout(() => {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card) => {
            card.removeEventListener('click', flipCard);
            card.classList.add('flipped');
        });
        setTimeout(() => {
            cards.forEach((card) => {
                card.classList.remove('flipped');
                card.addEventListener('click', flipCard);
            });
            restartTimer();
            cardsShowed = true;
        }, 1000);

    }, 500);
}

function CheckWin() {
    winner = true;

    if (scoreNow <= (cards.length / 2) + bonusEttempt && time <= bonusTime) {
        confetti.render();
        conffeti = true;
        alert(`
    You Win \n 
    Your score is: ${scoreNow} \n  
    Your time is: ${formatTime(time)}\n 
    Mode: ${mode}`);

        score.classList.add('green');
        timer.classList.add('green');

    } else {
        alert(`
        You Lose \n 
        Your score is: ${scoreNow}\n 
        Your score should be less than: ${cards.length / 2 + bonusEttempt}\n
        Your time is: ${formatTime(time)}\n 
        Yout time should be less than: ${formatTime(bonusTime)}\n
        Mode: ${mode}`);

        if (!(scoreNow <= (cards.length / 2) + bonusEttempt)) {
            score.classList.add('red');
        } else {
            score.classList.add('green');

        }

        if (!(time <= bonusTime)) {
            timer.classList.add('red');
        } else {
            timer.classList.add('green');
        }
    }


}

function enableBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function removeColor() {
    score.classList.remove('green');
    score.classList.remove('red');
    timer.classList.remove('green');
    timer.classList.remove('red');
}

function restart() {
    if (!gameStarted) {
        gameStarted = true;
        return startGame();
    }


    winner = false;
    removeColor();
    enableBoard();
    shuffleCards();
    scoreNow = 0;
    score.textContent = scoreNow;
    tablero.innerHTML = '';
    time = 0;
    timer.textContent = formatTime(time);
    cardsShowed = false;
    if (conffeti) {
        confetti.clear();
        conffeti = false;
        confetti = new ConfettiGenerator(confettiSettings);
    }
    createBoard();
    showCards();
}

