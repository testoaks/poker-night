//set up variables
//for (let z = 0; z < 50000; i++) {
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
//Deal cards to table
    let table = shuffledDeck.splice(0, 5);

//Makes hands of 7cards and Sort in Ascending order for each player
    let sevenCards;
    for (let i = 0; i < 8; i++) {
        sevenCards = players[i].concat(table);
        sevenCards.sort(function (a, b) {
            return a.rank - b.rank;
        });

//See what card we got
//console.log(players);

//console.log(table);

//checks for flush

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


//find a Pair
        for (let j = 0; j < 6; j++) {
            if (sevenCards[j].rank === sevenCards[j + 1].rank) {
                //console.log('pair', sevenCards[j]);
            }
        }


// find a High Card

//console.log(sevenCards[6]);

// find 3 of a kind
        for (let j = 0; j < 12; j++) {
            let threeOfKind = sevenCards.filter(sevenCards => sevenCards.rank === j);
            if (threeOfKind.length === 3) {
                let leftOvers = sevenCards.filter(sevenCards => sevenCards.rank !== j);
                leftOvers.sort(function (a, b) {
                    return a.rank - b.rank;
                })
                threeOfKind.push(leftOvers[3], leftOvers[2]);
                //console.log('3 of a Kind',threeOfKind);
            }
        }

//find 4 of a kind
        for (let j = 0; j < 12; j++) {
            let fourOfKind = sevenCards.filter(sevenCards => sevenCards.rank === j);
            if (fourOfKind.length === 4) {
                let leftOvers = sevenCards.filter(sevenCards => sevenCards.rank !== j);
                fourOfKind.push(leftOvers[2]);
                // console.log('4 of a Kind', fourOfKind);
                // console.log(players);
                //console.log(table);
            }
        }
//find Royal Flush
        /*for (let i = 8; i < 12; i++) {
            let royalFlush = [];
            if (sevenCards.includes(sevenCards.rank[i])) {
            }
            for (let j = 0; j < 4; j++) {
                let suite = [];
                for (let k = 0; k < 7; k++) {
                    if (sevenCards[k].suite === j) {
                        royalFlush.push(sevenCards[k]);
                    }
                    let compareNumbers = (a, b) => {
                        return a.rank - b.rank;
                    };
                    suite.sort(compareNumbers);
                }
               // console.log('royal Flush', royalFlush);
            }
        }
        */
//find Straight Flush

// find Full House
        for (let j = 0; j < 12; j++) {
            let fullHouseCheck = sevenCards.filter(sevenCards => sevenCards.rank === j);
            let leftOvers = [];
            let fullHouse = [];
            if (fullHouseCheck.length === 3) {
                leftOvers = sevenCards.filter(sevenCards => sevenCards.rank !== j);
                fullHouse.push(fullHouseCheck);
            }
            if (fullHouseCheck.length === 2) {
                leftOvers = sevenCards.filter(sevenCards => sevenCards.rank !== j);
                fullHouse.push(fullHouseCheck);
            }
            //if (fullHouse.length === 5) {
            //console.log('Full House', fullHouse);
        }

//find 2 pair
        for (let i = 0; i < 6; i++) {
            let twoPair = [];
            if (sevenCards[i] === sevenCards [i + 1]) {
                twoPair.push(sevenCards[i]);
            }
        }
    }
console.log('twoPair', sevenCards);
