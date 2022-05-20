const BINGO = () => {
    const ROWS = 5;
    const COLUMNS = 5;
    const letters = ["B", "I", "N", "G", "O"];
    const BOUNDS = [
        { MIN: 1, MAX: 15 },
        { MIN: 16, MAX: 30 },
        { MIN: 31, MAX: 45 },
        { MIN: 46, MAX: 60 },
        { MIN: 61, MAX: 75 },
    ]
    const calls = []

    const getNumberBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
    const findCall = (letterPosition, number) => calls.find(call => call.letterPosition === letterPosition && call.number === number)

    const generateCards = (quantity) => {
        const cards = [];
        for (let index = 0; index < quantity; index++) {
            const card = [];
            card[0] = letters;
            for (let row = 1; row <= ROWS; row++) {
                card[row] = [];
                for (let column = 0; column < COLUMNS; column++) {
                    if (!(column == 2 && row == 2)) {
                        card[row].push(getNumberBetween(BOUNDS[column].MIN, BOUNDS[column].MAX))
                    } else {
                        card[row].push("X")
                    }
                }
            }
            cards.push(card)
        }
        return cards;
    }

    const callNumber = () => {
        const letterPosition = getNumberBetween(0, letters.length - 1)
        const number = getNumberBetween(BOUNDS[letterPosition].MIN, BOUNDS[letterPosition].MAX)
        const call = {
            letter: letters[letterPosition],
            letterPosition,
            number
        }
        if (findCall(letterPosition, number) && calls.length < BOUNDS[BOUNDS.length - 1].MAX) {
            return callNumber();
        }
        calls.push(call)
        return call
    }

    const bingo = (card) => {
        if (calls.length < (ROWS * COLUMNS - 1)) return false
        for (let row = 1; row <= card.length; row++) {
            for (let column = 0; column < card[row].length; column++) {
                if (!findCall(column, card[row][column])) {
                    return false
                }
            }
        }
        return true
    }

    return {
        generateCards,
        callNumber,
        bingo,
        getCalls: () => calls
    }
}

module.exports = BINGO