import mock from 'mock/module';

import state from './state';
import mutations from './mutations';
import actions from './actions';

let base ={
    state,
    mutations,
    actions
}
export default {
    base,
    mock
}