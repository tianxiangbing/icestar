import { MOCK_PROJECT_ADD, MOCK_PROJECT_UPDATE,MOCK_INIT } from './actionTypes';
import Vue from 'vue';

let mutations = {
    [MOCK_PROJECT_ADD]: (state, data) => {
        let newValue = data;
        let len = state.projectList.length;
        let lastItem = state.projectList[len - 1];
        newValue.id = lastItem.id++;
        newValue.list = [];
        state.projectList.push(newValue)
    },
    [MOCK_PROJECT_UPDATE]: (state, data) => {
        let id = data.id;
        let index = -1;
        state.projectList.forEach((element, i) => {
            if (id == element.id) {
                index = i;
                return false;
            }
        });
        state.projectList.splice(index, 1, data);
    },
    [MOCK_INIT]:(state,data)=>{
        state.projectList = data;
    }
}
export default mutations;