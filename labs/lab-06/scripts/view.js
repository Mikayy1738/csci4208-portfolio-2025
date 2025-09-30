import Question from './components/Questions.js';
import HUD from './components/HUD.js';
import Skip from './components/Skip.js';
const renderDOM = (html) => document.getElementById('view').innerHTML = html;

export const PlayScene = (props) => {
    const {timer, score, trivia} = props;
    renderDOM(
        `${HUD(timer, score)}
        ${Question(trivia)}
        ${Skip()}`
    )
}

export const GameroverScene = (props) => {
    const {timer, score, trivia} = props;
    renderDOM(
        `${HUD(timer, score)}
        <h1> Game Over! </h1>
        <button onClick='start()'>Start Menu</button>
        `
    )
}