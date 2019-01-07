import {TOGGLESUBMENU,TOGGLEFAVORMENU} from './actionTypes';
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
    state.currentActive = title;
}
mutations[TOGGLEFAVORMENU] = (state,{title,list})=>{
    if(state.currentActive == title){
        state.isExpands = !state.isExpands;
    }else{
        state.isExpands = true;
    }
    state.currentActive = title;
    state.submenu =list.map(item=>{
        item.to = 'wview';
        item.prop = { src : item.url};
        return item;
    });
}

export default mutations;