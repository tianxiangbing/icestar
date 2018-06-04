import {TOGGLESUBMENU} from './actionTypes';

let actions = {};
actions[TOGGLESUBMENU] = ({ commit },props) => {
    commit(TOGGLESUBMENU,props.title);
}

export default actions;