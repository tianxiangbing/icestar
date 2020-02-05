import Item from './Item';
const Div = require('./Div');
const {Input} = require('jsx-input');
const TextItem = Item(Div, Input);
export default TextItem;