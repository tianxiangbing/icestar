[
  {
    "type": "Form",
    "props": {},
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
                    "type": "HandNumItem",
                    "method": "getFieldDecorator",
                    "mparam": [
                      "num",
                      {
                        "rules": [
                          {
                            "required": true,
                            "message": "必填项"
                          }
                        ]
                      }
                    ],
                    "isRedux": true,
                    "props": {
                      "label": "手数",
                      "className": "tradeItem",
                      "name": "num",
                      "decimals": "2"
                    }
                  }
                ]
              },
              {
                "type": "TextItem",
                "props": {
                  "className": "tradeItem disabled",
                  "label": "global.order",
                  "name": "branchName",
                  "textcls": "labelValue"
                }
              },
              {
                "type": "Form.Item",
                "children": [
                  {
                    "type": "InputItem",
                    "method": "getFieldDecorator",
                    "mparam": [
                      "hands",
                      {
                        "rules": [
                          {
                            "required": true,
                            "message": "必填项"
                          }
                        ]
                      }
                    ],
                    "isRedux": true,
                    "props": {
                      "label": "手数2",
                      "className": "tradeItem",
                      "name": "hands",
                      "decimals": "2"
                    }
                  }
                ]
              },
              {
                "type": "HandNumItem",
                "id": 1,
                "method": "getFieldDecorator",
                "mparam": [
                  "num",
                  {
                    "rules": [
                      {
                        "custom": "validate",
                        "message": "必填项"
                      }
                    ]
                  }
                ],
                "isRedux": true,
                "props": {
                  "className": "tradeItem disabled",
                  "label": "客户名称",
                  "name": "clientLocalName",
                  "textcls": "labelValue",
                  "powerBit": 102
                }
              },
              {
                "type": "TextItem",
                "props": {
                  "className": "tradeItem disabled",
                  "label": "债券简称",
                  "name": "localName",
                  "textcls": "labelValue",
                  "powerBit": 11
                },
                "formatter": "testFormatter"
              },
              {
                "type": "input",
                "props": {
                  "value": "原始按钮",
                  "type": "submit"
                }
              },
              {
                "type": "RadioList",
                "id": 2,
                "props": {
                  "className": "tradeItem"
                },
                "children": [
                  {
                    "type": "RadioList.Radio",
                    "props": {
                      "text": "buy",
                      "name": "bid"
                    }
                  },
                  {
                    "type": "RadioList.Radio",
                    "props": {
                      "text": "sell",
                      "name": "ask"
                    }
                  }
                ]
              }
            ]
          }
        ],
        "id": 1566544619609.1694,
        "isContainer": true
      },
      {
        "type": "Container",
        "props": {
          "className": "actions"
        },
        "children": [
          {
            "type": "Button",
            "isRedux": true,
            "props": {
              "value": "global.market",
              "className": "marketButton",
              "action": "http://www.baidu.com",
              "param": {
                "type": "trade"
              }
            },
            "id": 1566544569973.8218
          },
          {
            "type": "BtnRequote",
            "isRedux": true,
            "props": {
              "className": "marketButton",
              "label": "",
              "value": "global.askprice"
            },
            "id": 1566544604343.7273,
            "readOnly": "",
            "visible": "aaa"
          }
        ],
        "id": 1566544619098.3538,
        "isContainer": true
      }
    ],
    "id": 0,
    "isContainer": true
  }
]