/*
 * @Descripttion: 
 * @Author: tianxiangbing
 * @Date: 2019-05-28 14:48:55
 * @LastEditTime : 2020-01-08 19:30:43
 * @github: https://github.com/tianxiangbing
 */
// export default [{
//   {
//   "type": "Form",
//   "props": {},
//   "readOnly": true,
//   "children": [{
//     {
      
//     }
//   }]
// }]
export default [
  {
    "type": "BatchUpdate",
    "isRedux": true,
    props:{
      updateFields:{"num":"ask"},
      subscribe:function(callback){
          setInterval(()=>{
            callback({ask:Math.random()})
          },2000)
      }
    }
  },
  {
    "type": "Form",
    "props": {},
    "readOnly":true,
    "children": [
      {
        "type": "Fold",
        "props": {
          "defaultActive": [
            "0",
            "1"
          ]
        },
        "children": [
          {
            "type": "Fold.Panel",
            "id": 3,
            "props": {
              "tab": "baseinfo",
              "key": "0"
            },
            "children": [
              {
                "type": "Form.Item",
                "children": [
                  {
                    "type": "InputItem",
                    "id": 5555,
                    "isRedux": true,
                    "sync":true,
                    "props": {
                      "label": "数组1",
                      "className": "tradeItem",
                      "name": "aaa.4.qqq",
                      "decimals": "2"
                    }
                  }
                ]
              },
              {
                "type": "Form.Item",
                "children": [
                  {
                    "type": "InputItem",
                    "id": 5555,
                    "isRedux": true,
                    "sync":true,
                    "props": {
                      "label": "数组",
                      "className": "tradeItem",
                      "name": "aaa.1.bbb",
                      "decimals": "2"
                    }
                  }
                ]
              },
              {
                "type": "Form.Item",
                "children": [
                  {
                    "type": "InputItem",
                    "method": "getFieldDecorator",
                    "mparam": [
                      "num",
                      {
                        "rules": [
                          {
                            "required": true,
                            "message": "必填项1111"
                          }
                        ]
                      }
                    ],
                    "id": 212312313,
                    "visible":"visible1",
                    "isRedux": true,
                    "readOnly": "isquote",
                    "props": {
                      "label": "手数1",
                      "className": "tradeItem",
                      "name": "num",
                      "decimals": "2"
                    }
                  }
                ]
              },
              {
                "type": "Form.Item",
                "children": [
                  {
                    "type": "InputItem",
                    "method": "getFieldDecorator",
                    "mparam": [
                      "num",
                      {
                        "rules": [
                          {
                            "required": true,
                            "message": "必填项2222"
                          }
                        ]
                      }
                    ],
                    "visible":"visible2",
                    "isRedux": true,
                    "readOnly": "isquote",
                    "props": {
                      "label": "手数2",
                      "className": "tradeItem",
                      "name": "num",
                      "decimals": "2"
                    }
                  }
                ]
              },
            ]
          }
        ],
        "id": 1566544619609.1694,
        "isContainer": true
      },
      // {
      //   "type": "Container",
      //   "props": {
      //     "className": "actions"
      //   },
      //   "children": [
      //     {
      //       "type": "SwitchButton",
      //       "isRedux": true,
      //       "props": {
      //         "value": "切换",
      //         "className": "marketButton"
      //       }
      //     },
      //     {
      //       "type": "Button",
      //       "isRedux": true,
      //       "props": {
      //         "value": "global.market",
      //         "className": "marketButton",
      //         "action": "http://www.baidu.com",
      //         "param": {
      //           "type": "trade"
      //         }
      //       },
      //       "id": 1566544569973.8218
      //     },
      //     {
      //       "type": "BtnRequote",
      //       "isRedux": true,
      //       "props": {
      //         "className": "marketButton",
      //         "label": "",
      //         "value": "global.askprice"
      //       },
      //       "id": 1566544604343.7273
      //     }
      //   ],
      //   "id": 1566544619098.3538,
      //   "isContainer": true
      // }
    ],
    "id": 0,
    "isContainer": true
  }
]