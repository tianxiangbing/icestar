import React,{Component} from 'react';
const { Input, InterInput, LetterInput, ThousandInput, NumericInput } = require('jsx-input');
const { Div, Container, Item, Button } = require('../../src/index');
const NumericItem = Item(Div, ThousandInput);
export default NumericItem;