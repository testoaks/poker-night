//set up variables
let count = 0;
for (let z = 0; z < 1000000; z++) {
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

//Makes hands of 7cards and Sort in Ascending order for each player
    let sevenCards;
    for (let i = 0; i < 8; i++) {
        sevenCards = players[i].concat(table);
        sevenCards.sort(function (a, b) {
            return a.rank - b.rank;
        });
        //console.log(sevenCards);
        //console.log('table', table);
        //console.log('players', [players[i]]);


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
                suite.splice(0, cardsToRemove);
            }
            if (suite.length === 5) {
                //console.log('Flush', suite);
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
        for (let j = 0; j <= 12; j++) {
            let threeOfKind = sevenCards.filter(sevenCards => sevenCards.rank === j);
            if (threeOfKind.length === 3) {
                let leftOvers = sevenCards.filter(sevenCards => sevenCards.rank !== j);
                leftOvers.sort(function (a, b) {
                    return a.rank - b.rank;
                });
                threeOfKind.push(leftOvers[3], leftOvers[2]);
                //console.log('3 of a Kind',threeOfKind);
            }
        }

//find 4 of a kind
        for (let j = 0; j <= 12; j++) {
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
        for (let suite = 0; suite < 4; suite++) {
            let royalFlush = [];
            for (let eachCard = 0; eachCard < 7; eachCard++) {
                if (sevenCards[eachCard].suite === suite) {
                    royalFlush.push(sevenCards[eachCard]);
                }
            }
            if (royalFlush.length > 5) {
                let cardsToRemove = royalFlush.length - 5;
                royalFlush.splice(0, cardsToRemove);
            }
            if (royalFlush.length === 5) {
                let eachCard = 0;
                let checkIfGreaterThanTen = eachCard + 8;
                if (royalFlush[eachCard].rank === checkIfGreaterThanTen) {
                    //count++;
                    //console.log('Royal Flush', count);
                }
            }
        }

//find Straight Flush

// find Full House
        let fullHouse = [];
        let threeOfAKind = [];
        let pair = [];
        for (let j = 0; j <= 12; j++) {
            let fullHouseCheck = sevenCards.filter(sevenCards => sevenCards.rank === j);
            if (fullHouseCheck.length === 3) {
                threeOfAKind.push(...fullHouseCheck);
            }
            if (fullHouseCheck.length === 2) {
                pair.push(...fullHouseCheck);
            }
            if (threeOfAKind.length === 6) {
                pair.push(threeOfAKind[0], threeOfAKind[1]);
                threeOfAKind.splice(0, 3);
            }
            if (pair.length > 2) {
                pair.splice(0, 2);
            }
        }
        fullHouse.push(...pair, ...threeOfAKind);
        if (fullHouse.length === 5) {
            count++;
        }

        //find 2 pair
        let twoPair = [];
        let highCard = [];
        for (let i = 0; i <= 12; i++) {
            let twoPairCheck = sevenCards.filter(sevenCards => sevenCards.rank === i);
            if (twoPairCheck.length === 2) {
                twoPair.push(...twoPairCheck);
            }
            if (twoPairCheck.length === 1) {
                highCard.push(twoPairCheck[0]);
            }
        }
        if (twoPair.length === 6) {
            highCard.push(twoPair[0]);
            twoPair.slice(0,2);
        }
        if(twoPair.length === 4 ) {
            twoPair.push(highCard[2]);
            console.log('twoPair', twoPair);
        }
    }
}

//console.log('Full House', count);