

frontPictures = [
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

function fillCards() {
    cards = document.querySelectorAll(".card__back");
    for (i = 0; i < cards.length; i++) {
        cards[i].appendChild(document.createElement('img')).src = frontPictures[i];
    }
}
fillCards();

function reset() {
    let cards = document.querySelectorAll(".card__inner");
    cards.forEach(item => item.classList.remove('card__flip'))
    cardTurner();
}

function cardTurner() {
    let clickCounter = 0;
    let cards = document.querySelectorAll(".card");
    cards.forEach(item => item.addEventListener('click', () => {
        if (clickCounter < 2) {
            item.firstChild.nextSibling.classList.add('card__flip');
            clickCounter++
        }
        else {
            clickCounter = 0;
            reset();
        }   
    }))
}


cardTurner();
