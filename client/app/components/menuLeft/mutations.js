import {TOGGLESUBMENU} from './actionTypes';
import menu from './menu';

let mutations = {};

mutations[TOGGLESUBMENU] = (state,title) => {
    if(state.currentActive == title){
        state.isExpands = !state.isExpands;
    }else{
        state.isExpands = true;
    }
    if(state.isExpands){
        state.submenu = menu[title];
    }
}
export default mutations;