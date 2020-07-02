//set up variables
let deck = [];
let shuffledDeck = [];
const rankName = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
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



