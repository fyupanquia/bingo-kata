
const BINGO = require("../Bingo")

test("It must have 3 methods", () => {
    const bingo = BINGO();
    expect(Object.keys(bingo).length).toBe(4)
    Object.keys(bingo).map(method => expect(typeof bingo[method] === "function").toBeTruthy())

})

test("It must return n cards", () => {
    const QUANTITY = 1;
    const bingo = BINGO();
    const cards = bingo.generateCards(QUANTITY);
    expect(Array.isArray(cards)).toBeTruthy()
    expect(cards.length).toBe(QUANTITY)
    cards.forEach(rows => {
        expect(Array.isArray(rows)).toBeTruthy()
        expect(rows.length).toBe(6)
        rows.map(columns => {
            expect(columns.length).toBe(5)
        })
    });
})

test("It must return a letter and a number", () => {
    const CALLS = 5
    const bingo = BINGO();
    const myCalls = []
    for (let index = 0; index < CALLS; index++) {
        const call = bingo.callNumber();
        expect(typeof call.letter).toBe("string")
        expect(typeof call.number).toBe("number")
        expect(typeof call.letterPosition).toBe("number")
        myCalls.push(myCalls);
    }
    expect(bingo.getCalls().length).toBe(CALLS)
})

test("It must return if its a winner", () => {
    const CALLS = 35;
    const bingo = BINGO();
    const cards = bingo.generateCards(1);
    const myCard = cards[0];
    for (let index = 0; index < CALLS; index++) {
        bingo.callNumber();
    }
    expect(typeof bingo.bingo(myCard)).toBe('boolean')
})