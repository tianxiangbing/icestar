import {OPENTAB,SHOWTAB} from './actionTypes';
import tabs from 'store/tabs';

let mutations = {};

mutations[OPENTAB] = (state,name,title,prop) => {
    let tab = tabs.find(item=>item.name ==name);
    tab.title = title||tab.title;
    state.tabList.push(tab);
    state.tabActive = state.tabList.length-1;
}
mutations[SHOWTAB] = (state,props) => {
    let index = props.index;
    state.tabActive = index;
}
export default mutations;