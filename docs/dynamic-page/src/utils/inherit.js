/*
 * @Descripttion: 模板继承的做法
 * @Author: tianxiangbing
 * @Date: 2019-06-05 11:58:04
 * @LastEditTime : 2020-01-14 17:06:38
 * @github: https://github.com/tianxiangbing
 */
import { getItem } from './common';

/**
 * 继承模板解析
 */
const inherit = (tpl) => {
    // tpl = JSON.parse(JSON.stringify(tpl));
    // tpl = Object.assign({},tpl);
    return (child = []) => {
        child.forEach(obj => {
            let { action, item, id } = obj;
            let res = getItem(id, tpl);
            if (res) {
                let { item, parent, i } = res;
                // console.log(obj,88888)
                if (!parent) {
                    parent = tpl;
                }
                switch (action) {
                    case 'preinsert':
                        parent.children.splice(i, 0, obj.item)
                        break;
                    case 'afterinsert':
                        parent.children.splice(i + 1, 0, obj.item)
                        break;
                    case 'append':
                            item.children.push(obj.item);
                        break;
                    case 'delete':
                        parent.children.splice(i, 1);
                        break;
                    default:

                        break;
                }
            }
        })
        return tpl;
    }
}
export default inherit;