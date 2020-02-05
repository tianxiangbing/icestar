import Item from './Item';
const Div = require('./Div');
const {NumericInput} = require('jsx-input');
const NumberItem = Item(Div, NumericInput);
export default NumberItem;