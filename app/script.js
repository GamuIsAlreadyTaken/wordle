
const wordle_length = 5;

(async () => {
    const board = $(`#board`)
    const word = new Word(board, await randWord(wordle_length));

    $`#input`.onchange = async () => {
        const val = $`input`.value
        if (val.length < wordle_length) return;
        word.play(val)
        $`input`.value = ''
    }
    $`#input`.maxlength = wordle_length

    $`#play`.onclick = () => location.reload()
})()

async function randWord(length) {
    let resp = await fetch(`https://random-word-api.herokuapp.com/word?length=${length}`)
    let body = await resp.json()

    return body[0]
} 