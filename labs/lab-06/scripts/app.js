import * as http from './https.js';
import * as view from './view.js';
const GET_TRIVIA  = `https://opentdb.com/api.php?amount=1&difficulty=easy`;

const state = {
    score:0,
    timer:20,
    intervalId:null,
    trivia:null
};

window.playGame = async() => {
    const json = await http.sendGETRequest(GET_TRIVIA);
    [state.trivia] = json.results;
    view.PlayScene(state);
}

window.start = async () => {
    createGame();
}

const countdown = () => {
    if(state.timer){
        state.timer--;
        view.PlayScene(state);
    }else {
        clearInterval(state.intervalId);
        view.GameroverScene(state);
    }
}

const createGame = () => {
    state.timer = 20;
    state.intervalId = setInterval(countdown, 1000);
    playGame();
}

window.addEventListener('load', start);