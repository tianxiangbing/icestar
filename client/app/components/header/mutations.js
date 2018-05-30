import { MAX, RESET } from './actionTypes';
import renderer from "renderer";

let mutations = {};

mutations[MAX] = (state) => {
    state.winStatus = true;
    renderer.max();
}
mutations[RESET] = (state) => {
    state.winStatus = false;
    renderer.reset();
} 
export default mutations;