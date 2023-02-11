

// state: word
// ask: letter by letter
/* input: "abcd" -> word.has("a", pos=0): (NoLetter | WrongPosition | CorrectPosition) */

const c = (tag: string) => document.createElement(tag)

enum WordleResult {
    WL = 'WL',
    WP = 'WP',
    CP = 'CP'
}
//fix seems

class Word {
    word: string
    parent: HTMLElement

    constructor(parent: HTMLElement, word: string) {
        this.word = word
        this.parent = parent
    }

    has(letter: string, word: string, position: number): WordleResult {
        if (word[position] == letter) { return WordleResult.CP }
        if (word.includes(letter)) { return WordleResult.WP }
        return WordleResult.WL
    }

    check(word: string): [string, WordleResult][] {
        let result: [string, WordleResult][] = []
        let rest_of_word = this.word

        word.split('').forEach((letter, index) => {
            const letterType = this.has(letter, rest_of_word, index)
            if(letterType != WordleResult.WL){
                rest_of_word = rest_of_word.replace(letter, '_')
            }
            result.push([letter, letterType])
        })
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
    }
}