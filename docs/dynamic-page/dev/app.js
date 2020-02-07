/*
 * @Descripttion: 
 * @Author: tianxiangbing
 * @Date: 2019-03-20 10:40:24
 * @LastEditTime: 2019-11-04 15:28:09
 * @github: https://github.com/tianxiangbing
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './rewrite';
import { Dynamic } from '../src/index';
import Dnd from '../src/dnd';
import Tabs from 'xui-tabs';
import 'xui-tabs/lib/index.css';
import all from './all';
import reducers from './reducers';
import '../src/_index';
import './_index';
import data from './data2';
import tpl from './tpl2';
import childTpl from './childTpl';
import zh_CN from './i18n/zh_CN';
import I18n, { I18nContext } from 'x-i18n';
import { updateId } from '../src/utils/common';
import Coms from './coms';


const Formatter = {
  testFormatter(str) {
    return str + "testformatter"
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tpl: [], data: [],
       mapping: `
    {
    "rxd": {
        
    }}  
      `
    }
  }
  changeTpl(e) {
    this.setState({ tpl: e.target.value })
  }
  changeData(e) {
    this.setState({ data: e.target.value })
  }
  formatJson(v, callback) {
    let json = v
    try {
      json = JSON.stringify(JSON.parse(v), null, "  ");
      callback && callback(true, json);
    } catch (e) {
      json = v;
      callback && callback(false, json);
    }
    return json;
  }
  returnJSON(v) {
    let json = {};
    try {
      let rs = JSON.parse(v);
      return rs;
    } catch (ex) {
      return this.state.tpl
    }
  }
  runCode = () => {
    let tpl = JSON.parse(this.tpl.value);
    let data = JSON.parse(this.data.value);
    let childTpl = JSON.parse(this.childTpl.value);
    console.log("jsjsjsjsjjsjsjs",this.js)
    let js = this.js.value;
    let css = this.css.value;
    let format = this.format.value;
    let mapping = this.mapping.value;
    this.setState({ tpl, data, js, css, format, childTpl,mapping });
  }
  componentDidMount() {
    console.log(childTpl, 'childTpl')
    updateId(tpl);
    // this.setState({ data, tpl, childTpl });
    this.data.value = this.formatJson(JSON.stringify(data));
    this.tpl.value = this.formatJson(JSON.stringify(tpl));
    this.childTpl.value = this.formatJson(JSON.stringify(childTpl));
    this.runCode();
  }
  update = (json) => {
    // alert('update11')
    // console.log('json:::::::::', json)
    // this.setState({tpl:json})
    this.tpl.value = this.formatJson(JSON.stringify(json));
  }
  renderContent({ global }, b) {
    return <Dynamic checkPermission={this.checkPermission} id="demo" formName="customerDeal" enableRedux={true} reducers={reducers} components={all} className="tradeBox" tpl={this.state.tpl} childTpl={this.state.childTpl} data={this.state.data} js={this.state.js} css={this.state.css} format={this.state.format}></Dynamic>
  }
  //判断权限
  checkPermission(powerBit) {
    return powerBit > 100;
  }
  render() {
    let data = this.state.data// {"price":1,"quatity":15, "baseDecimal":4,"branchCode":"00012","code":"003","costBid":65.6,"costMid":0,"costOffer":68.93,"customerBid":65.6,"customerMid":0,"customerOffer":68.93,"dataType":"BondsPrice","extensionParam":{"applyStartDate":20171116,"indexation":"F","applyEndDate":20171116,"valueDate":20190314,"settlementDate":20190318,"bidYield":3.54,"bondCode":"091718001","listedCirculateDate":20171122,"localName":"17农发绿债","ytm":3.56,"interest":0,"maturityDate":20221208,"offerYield":2.43},"indexCode":"091718001 BP","isBackAudit":"N","localName":"现券","maturityDate":20221208,"priceType":"R","productTradable":"Y","strategyId":1,"tenorList":[],"tradable":"Y","underlying":"091718001","updateDate":20190509,"updateTime":180541,"valueDate":0,"priceBidMid":"66","priceOfferMid":"69","underlying2":"091718001","index":0,"tradeDate":1555406895430};
    console.log(11111, this.state.tpl)
    return (
      <div className="exmple">
        <Tabs className="source">
          <Tabs.TabPane tab="工具栏" key="0">
            <Dnd json={this.state.tpl} id="demo" mapping={this.state.mapping} components={all} update={this.update}></Dnd>
          </Tabs.TabPane>
          <Tabs.TabPane tab="模板" key="1">
            <textarea ref={ref => this.tpl = ref} defaultValue={this.formatJson(JSON.stringify(this.state.tpl))}></textarea>
          </Tabs.TabPane>
          <Tabs.TabPane tab="继承模板" key="11">
            <textarea ref={ref => this.childTpl = ref} defaultValue={this.formatJson(JSON.stringify(this.state.childTpl))}></textarea>
          </Tabs.TabPane>
          <Tabs.TabPane tab="数据" key="2">
            <textarea ref={ref => this.data = ref} defaultValue={this.formatJson(JSON.stringify(this.state.data))}></textarea>
          </Tabs.TabPane>
          <Tabs.TabPane tab="自定义组件" key="3">
            <Coms ref={ref => this.js = ref}/>
          </Tabs.TabPane>
          <Tabs.TabPane tab="css" key="4">
            <textarea ref={ref => this.css = ref}></textarea>
          </Tabs.TabPane>
          <Tabs.TabPane tab="数据处理" key="5">
            <textarea ref={ref => this.format = ref} defaultValue={this.state.format}></textarea>
          </Tabs.TabPane>
          <Tabs.TabPane tab="组件关系" key="6">
            <textarea ref={ref => this.mapping = ref} defaultValue={this.state.mapping}></textarea>
          </Tabs.TabPane>
        </Tabs>
        <button className="runCode" onClick={this.runCode}>运行</button>
        <Tabs className="result">
          <Tabs.TabPane tab="结果" key="1">
            <I18n defaultValue={zh_CN}>
              {this.renderContent.bind(this)}
            </I18n>
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}
var appElement = document.getElementById('example');
ReactDOM.render(<App />, appElement);