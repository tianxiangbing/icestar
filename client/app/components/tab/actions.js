import {OPENTAB,SHOWTAB} from './actionTypes';

let actions = {};
actions[OPENTAB] = ({ commit },props) => {
    commit(OPENTAB,props.to,props.title,props.prop);
}

actions[SHOWTAB] = ({ commit },props) => {
    commit(SHOWTAB,props);
}

export default actions;