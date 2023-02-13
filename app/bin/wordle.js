// state: word
// ask: letter by letter
/* input: "abcd" -> word.has("a", pos=0): (NoLetter | WrongPosition | CorrectPosition) */
const c = (tag) => document.createElement(tag);
const $ = (locator) => document.querySelector(locator);
var WordleResult;
(function (WordleResult) {
    WordleResult["WL"] = "WL";
    WordleResult["WP"] = "WP";
    WordleResult["CP"] = "CP";
})(WordleResult || (WordleResult = {}));
class Word {
    word;
    parent;
    won;
    trys;
    constructor(parent, word) {
        this.word = word;
        this.parent = parent;
        this.won = false;
        this.trys = 1;
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
        // get correct letters
        word.split('').forEach((letter, index) => {
            const letterType = this.has(letter, rest_of_word, index);
            if (letterType == WordleResult.CP) {
                rest_of_word = rest_of_word.replace(letter, '_');
                result[index] = [letter, letterType];
            }
        });
        word.split('').forEach((letter, index) => {
            const letterType = this.has(letter, rest_of_word, index);
            rest_of_word = rest_of_word.replace(letter, '_');
            if (result[index] == undefined)
                result[index] = [letter, letterType];
        });
        this.won = result.every(([_, type]) => type == WordleResult.CP);
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
        if (this.won) {
            this.win();
        }
        else {
            this.trys++;
        }
    }
    win() {
        const pannel = $(`#win`);
        pannel.style.display = 'block';
        pannel.innerText = pannel.innerText.replace('{}', plural(this.trys, 'intento'));
    }
}
const plural = (number, noun) => number != 1 ? `${number} ${noun}s` : `${number} ${noun}`;
