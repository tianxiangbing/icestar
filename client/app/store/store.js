import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import actionTypes from './actionTypes';
import mutations from './mutations';

let actions = {};
for(let key in actionTypes){
    let v = actionTypes[key]
    actions[v] = ({commit})=>{
        commit(v);
    }
}
Vue.use(Vuex);
const store = new Vuex.Store({
    state,
    mutations,
    actions
});
export default store;