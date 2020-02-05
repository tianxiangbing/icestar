/*
 * @Descripttion: 
 * @Author: tianxiangbing
 * @Date: 2019-04-08 17:02:00
 * @LastEditTime: 2019-12-09 11:28:31
 * @github: https://github.com/tianxiangbing
 */
// import {combineReducers } from 'redux';
const handReducer = (state = {}, action) => {
    // return state;
    switch(action.type){
        case  "UPDATEHAND":{
            let {data} = action;//手数
            let amount =  Number(data) * state.quatity * state.price;
            let newState = Object.assign({}, state, {amount,hand:data,num:data});
            console.log('############')
            console.log(newState);
            return newState;
        }
        break;
        case 'REQUOTE':{
            let newState = Object.assign({}, state);
            newState.isquote = true;
            newState.price=action.data;
            return newState
        }break;
        case 'switch':{
            state.visible1 = !state.visible1
            state.visible2 = !state.visible2
        }
        default:
        return state;
    }
}

export default handReducer