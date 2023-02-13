

// state: word
// ask: letter by letter
/* input: "abcd" -> word.has("a", pos=0): (NoLetter | WrongPosition | CorrectPosition) */

const c = (tag: string) => document.createElement(tag)
const $: (arg0: string) => HTMLElement = (locator: string) => document.querySelector(locator);

enum WordleResult {
    WL = 'WL',
    WP = 'WP',
    CP = 'CP'
}

class Word {
    word: string
    parent: HTMLElement
    won: boolean
    trys: number

    constructor(parent: HTMLElement, word: string) {
        this.word = word
        this.parent = parent
        this.won = false
        this.trys = 1
        console.log(this.word)
    }

    has(letter: string, word: string, position: number): WordleResult {
        if (word[position] == letter) { return WordleResult.CP }
        if (word.includes(letter)) { return WordleResult.WP }
        return WordleResult.WL
    }

    check(word: string): [string, WordleResult][] {
        let result: [string, WordleResult][] = []
        let rest_of_word = this.word

        // get correct letters
        word.split('').forEach((letter, index) => {
            const letterType = this.has(letter, rest_of_word, index)
            if (letterType == WordleResult.CP) {
                rest_of_word = rest_of_word.replace(letter, '_')
                result[index] = [letter, letterType]
            }
        })

        word.split('').forEach((letter, index) => {
            const letterType = this.has(letter, rest_of_word, index)
            rest_of_word = rest_of_word.replace(letter, '_')
            if (result[index] == undefined)
                result[index] = [letter, letterType]
        })

        this.won = result.every(([_, type]) => type == WordleResult.CP)

        return result
    }

    createLetter(letter: string, type: WordleResult) {
        const div = c('div')
        const span = c('span')

        span.innerText = letter
        div.classList.add(type)
        div.classList.add('letter')

        div.appendChild(span)
        return div
    }

    play(word: string) {
        const hand = c('div')
        hand.classList.add('hand')

        this.check(word).forEach(r => {
            hand.appendChild(this.createLetter(...r))
        })

        this.parent.appendChild(hand)
        if (this.won) {
            this.win()
        } else {
            this.trys++
        }
    }

    win() {
        const pannel = $(`#win`)
        pannel.style.display = 'block'
        pannel.innerText = pannel.innerText.replace('{}', plural(this.trys, 'intento'))
    }
}

const plural = (number: number, noun: string) =>
    number != 1 ? `${number} ${noun}s` : `${number} ${noun}` 
