import React from 'react';
import {Jsonp} from 'utils/curry';
import './index.less';
import Item from './item';
import {InputContainer,Input} from 'jsx-input';
const NumberInput = InputContainer(Input,/^\d*$/);
export default class List extends React.Component{
    sortBy = 1;
    hasData=false;
    constructor(props){
        super(props);
        let yestoday = JSON.parse(localStorage.getItem('yestoday') ||"{}")||{};
        if(yestoday.date ){
            let now = new Date();
            let d = new Date(yestoday.date);
            // if(now.getDate() - d.getDate()==1){
                // yestoday={};
                this.hasData = true;
            // }
        }
        this.state={
            date:yestoday.date|| +new Date(),
            data:yestoday.data||[],
            owner:yestoday.owner||[],
            showdata:true,
            code:''
        }
    }
    componentDidMount(){
        if(!this.hasData || this.state.data.length===0 ) this.request();
    }
    request(){
        let _this = this;
        Jsonp('http://nuyd.eastmoney.com/EM_UBG_PositionChangesInterface/api/js?dtformat=HH:mm:ss&js=({data:[(x)],pc:(pc)})&rows=64&page=1&type=8213',{
            param:'cb'
        },function(res){
            console.log(res);
            _this.setState({
                data:res.data.map(item=>{
                    let arr = item.split(',');
                    let code  = arr[4];
                    let name = arr[0];
                    let info = arr[2];
                    return {
                        code,name,info
                    }
                }).filter(item=>!/^300*/.test(item.code))
            },()=>{
                _this.save();
            })
        });
    }
    addHandle=()=>{
        let d = this.state.owner;
        d.push({code:this.state.code})
        this.setState({owner:d},()=>{
            this.save();
        })
    }
    save(){
        localStorage.setItem('yestoday',JSON.stringify(this.state));
    }
    sortData(col,type){
        let data = this.state[type];
        this.sortBy = this.sortBy * -1;
        this.setState({[type]:data.sort((a,b)=>{
            return (a[col]-b[col])*this.sortBy;
        })})
    }
    onUpdate(index,dataType,data){
        if(dataType === 'owner'){
            let owner = this.state.owner;
            Object.assign(owner[index],data); 
            this.setState({owner:owner});
        }else{
            let sd = this.state.data;
            Object.assign(sd[index],data); 
            this.setState({data:sd});
        }
    }
    onFan(t){
        if(t===1){
            //根据量比和换手率来排序
            //换手为5 * 0.3，量比为3  * 1
            let arr = ['owner','data'];
            arr.forEach(type=>{
                let data = this.state[type];
                this.setState({[type]:data.sort((a,b)=>{
                    let lb11 = this.compute(3,20,a["lb"])
                    let lb22 = this.compute(3,20,b["lb"])
                    let hs1 = this.compute(3,15,a['hsl'])
                    let hs2 = this.compute(3,15,b['hsl'])
                    let n1 = lb11 + hs1
                    let n2 = lb22 + hs2;
                    if(isNaN(n1))n1=0;
                    if(isNaN(n2))n2=0;
                    //
                    // if( Math.abs(a['zk']-a['jk'])/a['jg'] >0.05){
                    //     n1=n1+0.2;
                    // }
                    // if( Math.abs(b['zk']-b['jk'])>0.05){
                    //     n2=n2+0.2;
                    // }
                    //市盈利
                    let sy1 = this.compute(40,45,isNaN(a["sy"])?100:a["sy"]);
                    let sy2 = this.compute(40,45,isNaN(b["sy"])?100:b["sy"]);
                    n1 = n1 + sy1/12;
                    n2 = n2 + sy2/12;
                    // console.log(n2,n1)
                    return n2-n1;
                })})
            })
        }
    }
    compute(x,j,v){
        let lb1 = Math.min(Math.max(0,v),x*2);
        return Math.tan(j) * 5- Math.abs(5-lb1);
    }
    onClear = ()=>{
        this.request();  
    }
    hide(type){
        if(type==1){
            this.setState({showdata:!this.state.showdata});
        }
    }
    findIndex(arr,callback) { 
        for (var i = 0; i < arr.length; i++) { 
            if (callback (arr[i]) ) return i; 
        } 
        return -1; 
    }
    remove = function(arr,callback) { 
        var index = this.findIndex(arr,callback); 
        if (index > -1) { 
            arr.splice(index, 1); 
        } 
    }
    action =(source,type,code,v)=>{
        let data = this.state[source];
        if(type==='del'){
            this.remove(data,(d)=>{
                return d.code ===code;
            })
            this.setState({[source]:data},()=>{
                this.save();
            });
        }
        if(type==='addowner'){
            data = this.state.owner;
            data=[{code}].concat(data)
            this.setState({owner:data},()=>{
                this.save();
            });
        }
        if(type==='delowner'){
            data = this.state.owner;
            this.remove(data,(d)=>{
                return d.code ===code;
            })
            this.setState({owner:data},()=>{
                this.save();
            });
        }
        if(type==='updatecb'){
            data = this.state.owner;
            let arr = data.filter(item=>item.code ==code);
            arr[0].cb = v;
            // this.save();
            this.setState({owner:data},()=>{
                this.save();
            });
        }
    }
    onChangeHandle =(v)=>{
        this.setState({code:v})
    }
    render(){
        return (
            <div>
                <div><NumberInput onChange={this.onChangeHandle} placeholder="输入股票代码"/><button onClick={this.addHandle}>新增监听</button></div>
                <p>数据来源于前一日突破60日的均线</p>
                <div><button className="btn" onClick={this.onFan.bind(this,1)}>优选排序</button></div>
                <div><button className="btn" onClick={this.onClear}>清除历史</button></div>
                <h2>异动股行情<button onClick={this.hide.bind(this,1)}>隐藏/显示</button></h2>
                <div className="half">
                {this.state.showdata ?<table className="list">
                    <thead>
                        <tr>
                            <td>名称(代码)</td>
                            <td>信息</td>
                            <td onClick={this.sortData.bind(this,'zf','data')}>涨幅</td>
                            <td>价格</td>
                            <td>今开</td>
                            <td>昨收</td>
                            <td onClick={this.sortData.bind(this,'ltsz','data')} >流通</td>
                            <td onClick={this.sortData.bind(this,'hsl','data')}>换手率</td>
                            <td onClick={this.sortData.bind(this,'sy','data')}>市盈</td>
                            <td onClick={this.sortData.bind(this,'lb','data')}>量比</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.data.map((item,index)=>{
                            let hasOwner = this.state.owner.filter(it=>it.code===item.code).length;
                            return (
                                <Item type="data" action={this.action.bind(this,'data')} hasOwner={hasOwner} key={item.code} index={index} data={item} onUpdate={this.onUpdate.bind(this,index,'data')}/>
                            )
                        })
                    }
                    </tbody>
                </table>:undefined
                }
                </div>
                <h2>自选股行情</h2>
                <table className="list">
                    <thead>
                        <tr>
                            <td>名称(代码)</td>
                            <td onClick={this.sortData.bind(this,'yk','owner')}>盈亏</td>
                            <td onClick={this.sortData.bind(this,'zf','owner')}>涨幅</td>
                            <td>价格</td>
                            <td>今开</td>
                            <td>昨收</td>
                            {/* <td>最高</td>
                            <td>最低</td> */}
                            <td onClick={this.sortData.bind(this,'ltsz','data')} >流通</td>
                            <td onClick={this.sortData.bind(this,'hsl','owner')}>换手率</td>
                            <td onClick={this.sortData.bind(this,'sy','owner')}>市盈</td>
                            <td onClick={this.sortData.bind(this,'lb','owner')}>量比</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.owner.map((item,index)=>{
                            return (
                                <Item type="owner" action={this.action.bind(this,'owner')} hasOwner={true} key={item.code} index={index} data={item} onUpdate={this.onUpdate.bind(this,index,'owner')}/>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}