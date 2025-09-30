import Options from './Options.js'

const Question = (trivia) => (
    `<h3>
        <div>Category - ${trivia.category}</div>
        <div>Difficulty - ${trivia.category}</div>
    </h3>
    <h4>Questions:</h4>
    <p>${trivia.question}</p>
    ${Options(trivia)}
    `
)

export default Question;