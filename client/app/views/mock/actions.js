import { MOCK_PROJECT_ADD, MOCK_PROJECT_UPDATE ,MOCK_INIT} from './actionTypes';
import renderer from 'renderer';
let action = {
    [MOCK_PROJECT_ADD]: ({ commit, state }, item) => {
        let data = [...state.projectList];
        let len = data.length;
        let obj = item.data;
        obj.id = len;
        data.push(obj)
        renderer.save('[]','mocklist',`mock_${obj.id}`);
        renderer.save(data, 'mock').then(() => {
            commit(MOCK_PROJECT_ADD, obj)
        });
    },
    [MOCK_PROJECT_UPDATE]: ({ commit, state }, item) => {
        let obj = item.data;
        let data = [...state.projectList];
        let id  = obj.id;
        let index = -1;
        state.projectList.forEach((element,i) => {
            if(id == element.id){
                index = i;
                return false;
            }
        });
        state.projectList.splice(index,1,obj);
        renderer.save(state.projectList, 'mock').then(() => {
            commit(MOCK_PROJECT_UPDATE, obj)
        });
    },
    [MOCK_INIT]:({commit,state})=>{
        renderer.read('mock').then(data=>{
            commit(MOCK_INIT,data);
        });
    }
};
export default action;