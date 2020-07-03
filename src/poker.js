//set up variables
let deck = [];
let shuffledDeck = [];
const rankName = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suiteName = ['diamonds', 'hearts', 'spades', 'clubs'];

//sets Up Deck
for (let i = 0; i <= 12; i++) {
    for (let j = 0; j <= 3; j++) {
        let card = {
            rank: i,
            suite: j,
            cardText: rankName[i] + ' of ' + suiteName[j]
        };
        deck.push(card);
    }
}

//shuffles Deck
for (let i = 52; i > 0; i--) {
    let randomCard = Math.floor(Math.random() * i);
    shuffledDeck.push(deck[randomCard]);
    deck.splice(randomCard, 1);
}

//Deals Cards to players
let players = [];
for (let i = 0; i < 8; i++) {
    players.push([shuffledDeck[0]]);
    shuffledDeck.splice(0, 1);
}
for (let i = 0; i < 8; i++) {
    players[i].push(shuffledDeck[0]);
    shuffledDeck.splice(0, 1);
}

//Deal cards to table
let table = shuffledDeck.splice(0, 5);


//See what card we got
console.log(players);

console.log(table);

//checks for flush
for (let i = 0; i < 8; i++) {
    let sevenCards = players[i].concat(table);
    for (let j = 0; j < 4; j++) {
        let suite = [];
        for (let k = 0; k < 7; k++) {
            if (sevenCards[k].suite === j) {
                suite.push(sevenCards[k]);
            }
        }
        if (suite.length > 5) {
            let cardsToRemove = suite.length - 5;

            let compareNumbers = (a, b) => {
                return a.rank - b.rank;
            };
            suite.sort(compareNumbers);
            suite.splice(0, cardsToRemove);
        } else if (suite.length === 5) {
            let compareNumbers = (a, b) => {
                return a.rank - b.rank;
            };
            suite.sort(compareNumbers);
        }
    }
}
// find a High Card
for (let i = 0; i < 8; i++) {
    let sevenCards = players[i].concat(table);
    sevenCards.sort(function (a, b) {
        return a.rank - b.rank;
    });
    //console.log(sevenCards[6]);
}

//find a Pair
for (let i = 0; i < 8; i++) {
    let sevenCards = players[i].concat(table);
    sevenCards.sort(function (a, b) {
        return a.rank - b.rank;
    });
    for (let j = 0; j < 6; j++) {
        if (sevenCards[j].rank === sevenCards[j + 1].rank) {
            console.log('pair', sevenCards[j]);
        }
    }
}