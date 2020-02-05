export default [
  {
    "type": "Form",
    "children": [
      {
        "type": "Fold",
        "props": {
          "defaultActive": [
            "0"
          ]
        },
        "children": [
          {
            "type": "Fold.Panel",
            "props": {
              "tab": "基本信息",
              "key": "0"
            },
            "children": [
              {
                "type": "Form.Item",
                "id":1,
                "children": [
                  {
                    "type": "Container",
                    "props": {
                      "className": "tradeItem"
                    },
                    "children": [
                      {
                        "type": "Div",
                        "props": {
                          "value": "交易行"
                        }
                      },
                      {
                        "type": "Input",
                        "readOnly": "isquote",
                        "props": {
                          "name": "name"
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "type": "Form.Item",
                "id":2,
                "children": [
                  {
                    "type": "Container",
                    "props": {
                      "className": "tradeItem"
                    },
                    "children": [
                      {
                        "type": "Div",
                        "props": {
                          "value": "客户号"
                        }
                      },
                      {
                        "type": "InterInput",
                        "props": {
                          "name": "corp"
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "type": "Form.Item",
                "id":3,
                "children": [
                  {
                    "type": "Container",
                    "props": {
                      "className": "tradeItem"
                    },
                    "children": [
                      {
                        "type": "Div",
                        "props": {
                          "value": "underly"
                        }
                      },
                      {
                        "type": "Div",
                        "props": {
                          "name": "underly",
                          "className": "labelValue"
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "type": "Form.Item",
                "children": [
                  {
                    "type": "RadioList",
                    "props": {
                      "className": "tradeItem"
                    },
                    "children": [
                      {
                        "type": "RadioList.Radio",
                        "props": {
                          "text": "买",
                          "name": "bid"
                        }
                      },
                      {
                        "type": "RadioList.Radio",
                        "props": {
                          "text": "卖",
                          "name": "ask"
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "type": "Form.Item",
                "children": [
                  {
                    "type": "Container",
                    "props": {
                      "className": "tradeItem"
                    },
                    "children": [
                      {
                        "type": "Div",
                        "props": {
                          "value": "交易日"
                        }
                      },
                      {
                        "type": "Div",
                        "props": {
                          "name": "tradeDate",
                          "className": "labelValue",
                          "formatter":"date",
                          "formatterArgs":["YY-MM-DD"]
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "type": "Form.Item",
                "children": [
                  {
                    "type": "Container",
                    "props": {
                      "className": "tradeItem"
                    },
                    "children": [
                      {
                        "type": "Div",
                        "props": {
                          "value": "定价日"
                        }
                      },
                      {
                        "type": "Input",
                        "props": {
                          "name": "tradeDate"
                        },
                        "formatter":"date"
                      }
                    ]
                  }
                ]
              },
              {
                "type": "Form.Item",
                "children": [
                  {
                    "type": "Container",
                    "props": {
                      "className": "tradeItem"
                    },
                    "children": [
                      {
                        "type": "Div",
                        "props": {
                          "value": "手数(15吨/手)"
                        }
                      },
                      {
                        "type": "NumericInput",
                        "props": {
                          "name": "num",
                          "decimals": "decimal"
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "type": "Form.Item",
                "children": [
                  {
                    "type": "Container",
                    "props": {
                      "className": "tradeItem"
                    },
                    "children": [
                      {
                        "type": "Div",
                        "props": {
                          "value": "价格"
                        }
                      },
                      {
                        "type": "ThousandInput",
                        "props": {
                          "name": "price",
                          "decimals": "2"
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "type": "Form.Item",
                "children": [
                  {
                    "type": "Container",
                    "props": {
                      "className": "tradeItem"
                    },
                    "children": [
                      {
                        "type": "Div",
                        "props": {
                          "value": "金额"
                        }
                      },
                      {
                        "type": "ThousandInput",
                        "props": {
                          "name": "amount",
                          "decimals": "2",
                          "disabled": true
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "type": "Form.Item",
                "children": [
                  {
                    "type": "NumericItem",
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
                "type": "Form.Item",
                "children": [
                  {
                    "type": "HandNumItem",
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
                      "className": "tradeItem",
                      "label": "债券代码",
                      "name":"num",
                      "textcls":"labelValue"
                  },
                  "formatter":"thousand"
              },
              {
                  "type": "NumericItem",
                  "props": {
                      "className": "tradeItem",
                      "label": "数字输入框",
                      "name": "num",
                      "textcls":""
                  },
                  "formatter":"thousand"
              },
              {
                  "type": "TestArr.Test2",
                  "props": {
                      "className": "tradeItem"
                  }
              },
              {
                  "type": "TextItem",
                  "visible": "extensionParam.pubCcy",
                  "props": {
                      "className": "tradeItem",
                      "label": "货币",
                      "name":"extensionParam.pubCcy",
                      "textcls":"labelValue"
                  }
              },
              {
                  "type": "InputItem",
                  "method": "getFieldDecorator",
                  "mparam": [
                    "extensionParam.pubCcy",
                    {
                      "rules": [
                        {
                          "required": true,
                          "message": "必填项"
                        }
                      ]
                    }
                  ],
                  "props": {
                      "className": "tradeItem",
                      "label": "货币2",
                      "name":"extensionParam.pubCcy"
                  }
              },
              {
                "type": "InputItem",
                "sync":true,
                "isRedux": true,
                "props": {
                  "className": "tradeItem",
                  "label": "自动同步",
                  "name":"extensionParam.pubCcy"
                }
              },
              {
                "type": "TextItem",
                "props": {
                  "textcls":"labelValue",
                  "className": "tradeItem",
                  "label": "自动同步",
                  "name":"extensionParam.pubCcy"
                }
              },
              {
                "type": "Form.Item",
                "visible": "isquote",
                "children": [
                  {
                    "type": "Container",
                    "props": {
                      "className": "tradeItem"
                    },
                    "children": [
                      {
                        "type": "Div",
                        "props": {
                          "value": "报价返回"
                        }
                      },
                      {
                        "type": "Div",
                        "props": {
                          "name": "price",
                          "className": "labelValue"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
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
              "value": "market",
              "className": "marketButton",
              "action": "http://www.baidu.com",
              "param": {
                "type": "trade"
              }
            }
          },
          {
            "type": "BtnRequote",
            "isRedux": true,
            "props": {
              "value": "askprice",
              "action": "http://192.168.80.37:8080/demo/ew",
              "className": "marketButton"
            }
          }
        ]
      }
    ]
  }
]
