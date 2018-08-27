import {MOCK_WS_START,MOCK_UPDATE, MOCK_START, MOCK_PROJECT_ADD, MOCK_PROJECT_UPDATE, MOCK_INIT, MOCK_LIST_INIT, MOCK_ADD, MOCK_DEL, MOCK_WS_ADD,MOCK_WS_INIT, MOCK_WS_DEL } from './actionTypes';
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
    [MOCK_INIT]: (state, data) => {
        state.projectList = data;
    },
    [MOCK_WS_INIT]: (state, data) => {
        state.wsList = data;
    },
    [MOCK_LIST_INIT]: (state, id) => {

    },
    [MOCK_ADD]: (state, data) => {
        let index = -1;
        let pid = data.pid;
        state.projectList.forEach((element, i) => {
            if (pid == element.id) {
                index = i;
                return false;
            }
        });
        if (!state.projectList[index].list) {
            state.projectList[index].list = []
        }
        let list = state.projectList[index].list;
        data.id = list.length;
        list.push(data)
    },
    [MOCK_DEL]: (state, obj) => {
        let delIndex = obj.data.index;
        let pid = obj.data.pid;
        let index = -1;
        let data =  state.projectList;
        data.forEach((element, i) => {
            if (pid == element.id) {
                index = i;
                return false;
            }
        });
        if (!data[index].list) {
            data[index].list = []
        }
        data[index].list.splice(delIndex,1);
    },
    [MOCK_WS_DEL]:(state,obj)=>{
        let delIndex = obj.data.index;
        let data =  state.wsList;
        data.splice(delIndex,1);
    },
    [MOCK_UPDATE]:(state,obj)=>{
        let data = state.projectList;
        let pid = obj.data.pid;
        let index = -1;
        data.forEach((element, i) => {
            if (pid == element.id) {
                index = i;
                return false;
            }
        });
        if (!data[index].list) {
            data[index].list = []
        }
        let currentIndex = -1;
        data[index].list.forEach((item,i)=>{
            if(item.id == obj.data.id){
                currentIndex = i;
            }
        });
        if(currentIndex !==-1 ){
            // data[index].list[currentIndex]=obj.data;
            data[index].list.splice(currentIndex,1,obj.data);
        }
    },
    [MOCK_START]: (state,obj) => {
        state.status = !state.status;
        state.url = obj.data.url;
    },
    [MOCK_WS_START]: (state,obj) => {
        state.wsStatus = !state.wsStatus;
    },
    [MOCK_WS_ADD]:(state,obj)=>{
        state.wsList.push(obj)
    }
}
export default mutations;