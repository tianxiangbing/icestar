import { MOCK_DEL, MOCK_PROJECT_DEL,MOCK_START, MOCK_PROJECT_ADD, MOCK_PROJECT_UPDATE, MOCK_INIT, MOCK_LIST_INIT, MOCK_ADD, MOCK_UPDATE, MOCK_WS_START, MOCK_WS_ADD,MOCK_WS_INIT, MOCK_WS_DEL } from './actionTypes';
import renderer from 'renderer';
let action = {
    [MOCK_PROJECT_ADD]: ({ commit, state }, item) => {
        let data = [...state.projectList];
        let len = data.length;
        let obj = item.data;
        obj.id = len;
        obj.list = [];
        data.push(obj)
        // renderer.save('[]','mocklist',`mock_${obj.id}.json`);
        renderer.save(data, 'mock').then(() => {
            commit(MOCK_PROJECT_ADD, obj)
        });
    },
    [MOCK_PROJECT_UPDATE]: ({ commit, state }, item) => {
        let obj = item.data;
        let data = Object.assign([], state.projectList);
        let id = obj.id;
        let index = -1;
        data.forEach((element, i) => {
            if (id == element.id) {
                index = i;
                return false;
            }
        });
        data.splice(index, 1, obj);
        renderer.save(data, 'mock').then(() => {
            commit(MOCK_PROJECT_UPDATE, {data:obj,index:index})
        });
    },
    [MOCK_PROJECT_DEL]:({commit,state},item)=>{
        // debugger
        let index = item.data.index;
        let data = Object.assign([], state.projectList);
        data.splice(index, 1);
        // state.projectList.splice(index,1);
        renderer.save(data,'mock').then(()=>{
            commit(MOCK_PROJECT_DEL, {index:index})
        }) ;
    },
    [MOCK_INIT]: ({ commit, state }) => {
        renderer.read('mock').then(data => {
            commit(MOCK_INIT, data);
        });
    },
    [MOCK_WS_INIT]: ({ commit, state }) => {
        renderer.read('socket').then(data => {
            commit(MOCK_WS_INIT, data);
        });
    },
    [MOCK_LIST_INIT]: ({ commit, state }, item) => {
        let id = item.id;
        renderer.read(`mock_${id}.json`).then(data => {

        })
    },
    [MOCK_ADD]: ({ commit, state }, item) => {
        let data = JSON.parse(JSON.stringify(state.projectList));
        let len = data.length;
        let obj = item.data;
        let pid = obj.pid;
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
        let list = data[index].list;
        obj.id = list.length;
        list.push(obj)
        data[index].list = list;
        // renderer.save('[]','mocklist',`mock_${obj.id}.json`);
        renderer.save(data, 'mock').then(() => {
            commit(MOCK_ADD, obj);
            obj.callback && obj.callback();
        });
    },
    [MOCK_START]:({commit,state},data)=>{
        renderer.mockServer(data.data.port,data.data.status);
        commit(MOCK_START,data);
    },
    [MOCK_DEL]:({commit,state},obj)=>{
        let data = JSON.parse(JSON.stringify(state.projectList));
        let delIndex = obj.data.index;
        
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
        data[index].list.splice(delIndex,1);
        renderer.save(data, 'mock').then(() => {
            commit(MOCK_DEL, obj);
            obj.data.callback && obj.data.callback();
        });
    },
    [MOCK_WS_DEL]:({commit,state},obj)=>{
        let data = JSON.parse(JSON.stringify(state.wsList));
        let delIndex = obj.data.index;
        
        data.splice(delIndex,1);
        renderer.save(data, 'socket').then(() => {
            commit(MOCK_WS_DEL, obj);
            obj.data.callback && obj.data.callback();
        });
    },
    [MOCK_UPDATE]:({commit,state},obj)=>{
        let data = JSON.parse(JSON.stringify(state.projectList));
        
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
            data[index].list[currentIndex]=obj.data;
            renderer.save(data, 'mock').then(() => {
                commit(MOCK_UPDATE, obj);
                obj.data.callback && obj.data.callback();
            });
        }
    },
    [MOCK_WS_START]:({commit,state},data)=>{
        renderer.wsServer(data.data.port,data.data.status);
        commit(MOCK_WS_START,data);
    },
    [MOCK_WS_ADD]:({commit,state},item)=>{
        let data = JSON.parse(JSON.stringify(state.wsList));
        let len = data.length;
        let obj = item.data;
        obj.id  = data.length;
        data.push(obj)
        renderer.save(data, 'socket').then(() => {
            commit(MOCK_WS_ADD, obj);
            obj.callback && obj.callback();
        });
    }
};
export default action;