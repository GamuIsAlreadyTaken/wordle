// state: word
// ask: letter by letter
/* input: "abcd" -> word.has("a", pos=0): (NoLetter | WrongPosition | CorrectPosition) */
const c = (tag) => document.createElement(tag);
var WordleResult;
(function (WordleResult) {
    WordleResult["WL"] = "WL";
    WordleResult["WP"] = "WP";
    WordleResult["CP"] = "CP";
})(WordleResult || (WordleResult = {}));
//fix seems
class Word {
    word;
    parent;
    constructor(parent, word) {
        this.word = /*word*/ 'seems';
        this.parent = parent;
        console.log(this.word);
    }
    has(letter, word, position) {
        if (word[position] == letter) {
            return WordleResult.CP;
        }
        if (word.includes(letter)) {
            return WordleResult.WP;
        }
        return WordleResult.WL;
    }
    check(word) {
        let result = [];
        let rest_of_word = this.word;
        word.split('').forEach((letter, index) => {
            const letterType = this.has(letter, rest_of_word, index);
            if (letterType != WordleResult.WL) {
                rest_of_word = rest_of_word.replace(letter, '_');
            }
            result.push([letter, letterType]);
        });
        return result;
    }
    createLetter(letter, type) {
        const div = c('div');
        const span = c('span');
        span.innerText = letter;
        div.classList.add(type);
        div.classList.add('letter');
        div.appendChild(span);
        return div;
    }
    play(word) {
        const hand = c('div');
        hand.classList.add('hand');
        this.check(word).forEach(r => {
            hand.appendChild(this.createLetter(...r));
        });
        this.parent.appendChild(hand);
    }
}
