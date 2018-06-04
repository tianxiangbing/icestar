import {MAX,RESET} from './actionTypes';
console.log(MAX)
let actions = {};
actions[MAX] = ({ commit }) => {
    commit(MAX);
}
actions[RESET] = ({ commit }) => {
    commit(RESET);
}

export default actions;