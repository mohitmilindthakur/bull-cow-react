import words from "./word-bank.json";



export function getRandomWord(length:number = 5) {
    if (length < 5) {
        console.warn("Random word should have at least 4 letters in it.")
        return ""
    }
    let filteredWords = words.filter(item => item.length === length)
    let randomIndex = Math.floor(Math.random() * filteredWords.length)
    return filteredWords[randomIndex]
};

let word = getRandomWord()

console.log("WORD", word)

export function computeBullCowCount(guess: string, answer: string = word): {bulls: number; cows: number} {
    let bulls = 0;
    let cows = 0;

    if (guess.length !== answer.length) return {bulls, cows}

    for(let i = 0; i < guess.length; i++) {
        if (guess[i] === answer[i]) {
            bulls++
        }

        else if (answer.indexOf(guess[i]) > -1) {
            cows++
        }
    }

    return {bulls, cows}
}