import { MOCK_PROJECT_ADD, MOCK_PROJECT_UPDATE, MOCK_INIT, MOCK_LIST_INIT, MOCK_ADD } from './actionTypes';
import renderer from 'renderer';
let action = {
    [MOCK_PROJECT_ADD]: ({ commit, state }, item) => {
        let data = [...state.projectList];
        let len = data.length;
        let obj = item.data;
        obj.id = len;
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
            commit(MOCK_PROJECT_UPDATE, obj)
        });
    },
    [MOCK_INIT]: ({ commit, state }) => {
        renderer.read('mock').then(data => {
            commit(MOCK_INIT, data);
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
    }
};
export default action;