// import components from '../components/actionTypes';
let header = require('components/header/actionTypes')
let menuLeft = require('components/menuLeft/actionTypes')
let tab = require('components/tab/actionTypes')
// let mock = require('mock/actionTypes')
let actionTypes = Object.assign({},header,menuLeft,tab);
module.exports = actionTypes;