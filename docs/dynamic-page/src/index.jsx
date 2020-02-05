/*
 * Created with Visual Studio Code.
 * github: https://github.com/React-xui/x-form
 * User: 田想兵
 * Date: 2017-05-14
 * Time: 20:00:00
 * Contact: 55342775@qq.com
 */
import Dynamic from './components/Dynamic';
import Div from './components/Div';
import Button from './components/Button';
import Item from './components/Item';
import Container from './components/Container';
import InputItem from './components/InputItem';
import NumberItem from './components/NumberItem';
import TextItem from './components/TextItem';
// import Dnd from './dnd';
import {WrapFormItem,getI18n,getNameValue} from './utils/utils';
import Formatter from './utils/formatter';
import BatchUpdate from './components/BatchUpdate';

module.exports = {BatchUpdate,Dynamic,Div,Container,Item,Button,TextItem,NumberItem,InputItem,WrapFormItem,Formatter,getI18n,getNameValue};  //使用module.exports时，从es6到es5生成的dist不会出现export.default的问题.