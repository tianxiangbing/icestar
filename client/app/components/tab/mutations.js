import { OPENTAB, SHOWTAB, CLOSETAB } from './actionTypes';
import tabs from 'store/tabs';
import store from 'store/store';

let mutations = {};

mutations[OPENTAB] = (state, props) => {
    let {to, title, prop} = props;
    let tab = tabs.find(item => item.name == to);
    let ti;
    let index;
    state.tabList.forEach((item,idx)=>{
        if( item.name == to){
            ti = item;
            index = idx;
        }
    })
    if (!ti || JSON.stringify(prop) != JSON.stringify(ti.prop)) {
        tab.title = title || tab.title;
        tab.prop = prop;
        state.tabList.push(tab);
        state.tabActive = state.tabList.length - 1;
    }else{
      store.dispatch({
        type: SHOWTAB,
        index: index
      });
    }
}
mutations[SHOWTAB] = (state, props) => {
    let index = props.index;
    state.tabActive = index;
}
mutations[CLOSETAB] = (state, props) => {
    let index = props.index;
    if (index == state.tabActive) {
        if (index < state.tabList.length - 1) {
            state.tabActive = index + 1;
        } else {
            state.tabActive = state.tabList.length - 2;
        }
    } else if (index < state.tabActive) {
        state.tabActive = state.tabActive - 1;
    }
    state.tabList.splice(index, 1);
}
export default mutations;