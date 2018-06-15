import {OPENTAB,SHOWTAB,CLOSETAB} from './actionTypes';

let actions = {};
actions[OPENTAB] = ({ commit },props) => {
    commit(OPENTAB,props);
}

actions[SHOWTAB] = ({ commit },props) => {
    commit(SHOWTAB,props);
}

actions[CLOSETAB] = ({ commit },props) => {
    commit(CLOSETAB,props);
}

export default actions;