//set up variables
let foundHands = {
    royalFlush: 0,
    straightFlush: 0,
    fourOfAKind: 0,
    fullHouse: 0,
    flush: 0,
    straight: 0,
    threeOfAKind: 0,
    twoPair: 0,
    pair: 0,
    highCard: 0
};

for (let z = 0; z < 10000000; z++) {
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
    for (let i = 0; i < 1; i++) {
        let handDetected = false;
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
                    handDetected = true;
                    foundHands.royalFlush++;
                }
            }
        }
        if (handDetected) {
            continue;
        }

        //find Straight Flush
        for (let suite = 0; suite < 4; suite++) {
            let straightFlush = [];
            let straightFlushCheck = [];
            for (let eachCard = 0; eachCard < 7; eachCard++) {
                if (sevenCards[eachCard].suite === suite) {
                    straightFlush.push(sevenCards[eachCard]);
                }
            }
            if (straightFlush.length >= 5) {
                let straight = [];
                let aLowStraight = [];
                let nextCardIsPartOfStraight = false;
                if (straightFlush.some(card => card.rank === 12) && straightFlush.some(card => card.rank === 2) && straightFlush.some(card => card.rank === 3) && straightFlush.some(card => card.rank === 1) && straightFlush.some(card => card.rank === 0)) {
                    let eachCard = straightFlush.filter(straightFlush => straightFlush.rank === 12);
                    aLowStraight.push(eachCard[0]);
                    for (let j = 0; j < 4; j++) {
                        let eachCard = straightFlush.filter(straightFlush => straightFlush.rank === j);
                        aLowStraight.push(eachCard[0]);
                    }
                }
                for (let eachCard = 0; eachCard < straightFlush.length - 1; eachCard++) {
                    let eachCardPlusOne = eachCard + 1;
                    let nextNumInStraight = straightFlush[eachCardPlusOne].rank;
                    if (straightFlush[eachCard].rank === (nextNumInStraight - 1)) {
                        straight.push(straightFlush[eachCard]);
                        nextCardIsPartOfStraight = true;
                    } else if (straightFlush[eachCard].rank === (nextNumInStraight)) {
                    } else if (nextCardIsPartOfStraight) {
                        straight.push(straightFlush[eachCard]);
                        nextCardIsPartOfStraight = false;
                    }
                    if (straightFlush[eachCard].rank === (nextNumInStraight - 1)) {
                    } else if (straightFlush[eachCard].rank === (nextNumInStraight)) {
                    } else if (straight.length < 5) {
                        straight = [];
                        nextCardIsPartOfStraight = false;
                    } else {
                        nextCardIsPartOfStraight = false;
                        break;
                    }
                }
                if (nextCardIsPartOfStraight) {
                    straight.push(straightFlush[straightFlush.length - 1]);
                    nextCardIsPartOfStraight = false;
                }

                if (straight.length >= 5) {
                    let cardsToRemove = straight.length - 5;
                    straight.splice(0, cardsToRemove);
                    handDetected = true;
                    foundHands.straightFlush++;
                } else if (aLowStraight.length === 5) {
                    handDetected = true;
                    foundHands.straightFlush++;
                }
            }
        }
        if (handDetected) {
            continue;
        }

        //find 4 of a kind
        for (let j = 0; j <= 12; j++) {
            let fourOfKind = sevenCards.filter(sevenCards => sevenCards.rank === j);
            if (fourOfKind.length === 4) {
                let leftOvers = sevenCards.filter(sevenCards => sevenCards.rank !== j);
                fourOfKind.push(leftOvers[2]);
                handDetected = true;
                foundHands.fourOfAKind++
            }
        }
        if (handDetected) {
            continue;
        }

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
            handDetected = true;
            foundHands.fullHouse++
        }
        if (handDetected) {
            continue;
        }

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
                handDetected = true;
                foundHands.flush++
            }
        }
        if (handDetected) {
            continue;
        }

        //find straight
        let straight = [];
        let aLowStraight = [];
        let nextCardIsPartOfStraight = false;
        if (sevenCards.some(card => card.rank === 12) && sevenCards.some(card => card.rank === 2) && sevenCards.some(card => card.rank === 3) && sevenCards.some(card => card.rank === 1) && sevenCards.some(card => card.rank === 0)) {
            let eachCard = sevenCards.filter(sevenCards => sevenCards.rank === 12);
            aLowStraight.push(eachCard[0]);
            for (let j = 0; j < 4; j++) {
                let eachCard = sevenCards.filter(sevenCards => sevenCards.rank === j);
                aLowStraight.push(eachCard[0]);
            }
        }
        for (let eachCard = 0; eachCard < 6; eachCard++) {
            let eachCardPlusOne = eachCard + 1;
            let nextNumInStraight = sevenCards[eachCardPlusOne].rank;
            if (sevenCards[eachCard].rank === (nextNumInStraight - 1)) {
                straight.push(sevenCards[eachCard]);
                nextCardIsPartOfStraight = true;
            } else if (sevenCards[eachCard].rank === (nextNumInStraight)) {
            } else if (nextCardIsPartOfStraight) {
                straight.push(sevenCards[eachCard]);
                nextCardIsPartOfStraight = false;
            }
            if (sevenCards[eachCard].rank === (nextNumInStraight - 1)) {
            } else if (sevenCards[eachCard].rank === (nextNumInStraight)) {
            } else if (straight.length < 5) {
                straight = [];
                nextCardIsPartOfStraight = false;
            } else {
                nextCardIsPartOfStraight = false;
                break;
            }
        }
        if (nextCardIsPartOfStraight) {
            straight.push(sevenCards[6]);
            nextCardIsPartOfStraight = false;
        }

        if (straight.length >= 5) {
            let cardsToRemove = straight.length - 5;
            straight.splice(0, cardsToRemove);
            foundHands.straight++
        } else if (aLowStraight.length === 5) {
            handDetected = true;
            foundHands.straight++
        }
        if (handDetected) {
            continue;
        }

        // find 3 of a kind
        for (let j = 0; j <= 12; j++) {
            let threeOfKind = sevenCards.filter(sevenCards => sevenCards.rank === j);
            if (threeOfKind.length === 3) {
                let leftOvers = sevenCards.filter(sevenCards => sevenCards.rank !== j);
                leftOvers.sort(function (a, b) {
                    return a.rank - b.rank;
                });
                threeOfKind.push(leftOvers[3], leftOvers[2]);
                handDetected = true;
                foundHands.threeOfAKind++
            }
        }
        if (handDetected) {
            continue;
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
            twoPair.slice(0, 2);
        }
        highCard.sort(function (a, b) {
            return a.rank - b.rank;
        });
        if (twoPair.length === 4) {
            twoPair.push(highCard[2]);
            handDetected = true;
            foundHands.twoPair++
        }
        if (handDetected) {
            continue;
        }

        //find a Pair
        for (let j = 0; j < 6; j++) {
            if (sevenCards[j].rank === sevenCards[j + 1].rank) {
                handDetected = true;
                foundHands.pair++
            }
        }
        if (handDetected) {
            continue;
        }


        // find a High Card
        highCard = [sevenCards[6], sevenCards[5], sevenCards[4], sevenCards[3], sevenCards[2]];
        foundHands.highCard++


    }
}

console.log(foundHands);
