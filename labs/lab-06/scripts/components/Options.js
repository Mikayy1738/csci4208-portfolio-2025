const BooleanOptions = () => (
    `<div>
        <button onClick="checkAnswer('True')">True</button>
        <button onClick="checkAnswer('False)">False</button>
    </div>
    `
)

const MultiOptions = (trivia) => {
    const options = [trivia.correct_answer, ...trivia.incorrect_answers];
    const [a, b, c, d] = options.sort();
    return (
        `<div>
            <button onClick='checkAnswer("${a}")'>${a}</button>
            <button onClick='checkAnswer("${b}")'>${b}</button>
            <button onClick='checkAnswer("${c}")'>${c}</button>
            <button onClick='checkAnswer("${d}")'>${d}</button>
        </div>
        `
    )        
}

const Options = (trivia) => {
    switch(trivia.type){
        case "boolean": return BooleanOptions(trivia);
        case "multiple": return MultiOptions(trivia);
    }
}

export default Options;