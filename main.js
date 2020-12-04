const frontPictures = [
    'images/bee.jpg',
    'images/spider.jpg',
    'images/bee.jpg',
    'images/butterfly.jpg',
    'images/ladybug.jpg',
    'images/ladybug.jpg',
    'images/snail.jpg',
    'images/spider.jpg',
    'images/snail.jpg',
    'images/butterfly.jpg'
]

let cardElements = document.querySelectorAll(".card");
let cardElementsArray = [...cardElements];
const clock = document.querySelector(".table__clock");

let openedCards = [];
let matchedCards = [];

let second,
    minute,
    interval;
let timer = false;


function fillCards() {
    let card__backs = document.querySelectorAll(".card__back");
    for (i = 0; i < card__backs.length; i++) {
        card__backs[i].appendChild(document.createElement('img')).src = frontPictures[i];
        cardElements[i].type = frontPictures[i];
    }
}
fillCards();

startGame();


function displayCard() {
    if (timer === false) {
        startTimer();
    }
    this.children[0].classList.toggle('card__flip');
    this.classList.toggle("disabled");
    cardOpen(this);
}

function cardOpen(card) {
    openedCards.push(card);
    let len = openedCards.length;
    if (len === 2) {

        if (openedCards[0].type === openedCards[1].type) {
            matched();
        } else {
            unmatched();
        }
    }
}

function matched() {
    matchedCards.push(openedCards[0]);
    matchedCards.push(openedCards[1]);
    openedCards = [];
    if (matchedCards.length == 10) {
        endGame();
    }
}

function unmatched() {
    disable();
    setTimeout(function () {
        openedCards[0].children[0].classList.remove('card__flip');
        openedCards[1].children[0].classList.remove('card__flip');
        enable();
        openedCards = [];
    }, 1100)
}

function disable() {
    cardElementsArray.filter((card) => {
        card.classList.add('disabled');
    })
}

function enable() {
    cardElementsArray.filter((card) => {
        card.classList.remove('disabled');
        for (let i = 0; i < matchedCards.length; i++) {
            matchedCards[i].classList.add('disabled');
        }
    })
}

function startTimer() {
    timer = true;
    interval = setInterval(function () {
        second = addZero(second);
        clock.textContent = `${minute}:${second}`;
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
    }, 1000)
}

function endGame() {
    clearInterval(interval);
    matchedCards = [];
    setTimeout(function () {
        startGame();
    }, 5000);
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function startGame() {
    clock.textContent = `0:00`;
    timer = false;
    second = 0,
    minute = 0,
    cardElements.forEach(item => item.classList.remove("disabled"));
    cardElements.forEach(item => item.children[0].classList.remove("card__flip"));
    cardElementsArray.forEach(item => item.addEventListener('click', displayCard));

}