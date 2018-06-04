// let header = require('components/header/actions')
import header from 'components/header/actions';
// let menuLeft = require('components/menuLeft/actions')
import menuLeft from 'components/menuLeft/actions';
import tab from 'components/tab/actions';
let actions = Object.assign({},header,menuLeft,tab);
module.exports = actions;