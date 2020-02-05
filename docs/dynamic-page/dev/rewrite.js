
import { Dynamic } from '../src/index';
import zh_CN from './i18n/zh_CN';
const Formatter = {
    testFormatter (str){
       return str+"testformatter"
    }
 }
Dynamic.options={
    formatter:Formatter ,
    locale:zh_CN
}