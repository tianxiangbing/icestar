import {TOGGLESUBMENU} from './actionTypes';

let mutations = {};

mutations[TOGGLESUBMENU] = (state) => {
    state.isExpands = !state.isExpands;
} 
export default mutations;