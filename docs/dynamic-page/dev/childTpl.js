/*
 * @Descripttion: 
 * @Author: tianxiangbing
 * @Date: 2019-06-05 11:07:43
 * @LastEditTime: 2019-12-12 17:07:13
 * @github: https://github.com/tianxiangbing
 */
export default [
    {
        action: "preinsert",
        id: 1,
        item: {
            "type": "TextItem",
            "props": {
                "className": "tradeItem",
                "label": "债券代码1",
                "name":"num",
                "textcls":"labelValue"
            },
            "formatter":"thousand"
        },
    },
    {
        action: "afterinsert",
        id: 1,
        item:  {
            "type": "TextItem",
            "props": {
                "className": "tradeItem",
                "label": "债券代码2",
                "name":"num",
                "textcls":"labelValue"
            },
            "formatter":"thousand"
        },
    },
    {
        action: "append",
        id: 3,
        item: {
            "type": "TextItem",
            "props": {
                "className": "tradeItem",
                "label": "债券代码3",
                "name":"num",
                "textcls":"labelValue"
            },
            "formatter":"thousand"
        },
    },
    {
        action: "delete",
        id: 2
    }
]