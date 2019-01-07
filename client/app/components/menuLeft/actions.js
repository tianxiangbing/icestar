import {TOGGLESUBMENU,TOGGLEFAVORMENU} from './actionTypes';
const axios = require('axios');
let actions = {};
actions[TOGGLESUBMENU] = ({ commit },props) => {
    if(props.title == 'favor'){
        axios({
            method: 'get',
            url: 'https://tianxiangbing.github.io/icestar/favorites.json',
            responseType: 'json',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }).then(res => {
            let data = res.data;
            commit(TOGGLEFAVORMENU,{title:props.title,list:data});
        });
    }else{
        commit(TOGGLESUBMENU,props.title);
    }
}

export default actions;