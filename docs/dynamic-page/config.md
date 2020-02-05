# 模板配置说明
根结点必须为数组
## type
```
需要显示的组件名称，一般为react组件，也支持html标签
```
## props
```
组件的属性，这里对应的是组件props参数
```
### props name
```
当props下存在name属性的时候，会自动传递组件的value与data相符的值。
```
## children
```
组件的子组件，数组格式
```
## isRedux
```
是否由redux来控制全局数据,需要在引用dynamic时打开enableRedux.这时组件会自动添加update的属性方法，调用this.props.update(data,actionType)会触发对应actionType的reducer，省略了action的编写.
```
## readOnly
```
readOnly的值代表data里的name值对应的bool，如果要直接设置readOnly可以设置props下的readOnly为bool，这里的作用主要是通数据来改变readOnly值。
```
## visible
```
与readOnly相似，用数据来判断组件是否显示，这里的隐藏是指不渲染整个组件.与data里的值相关联
```
# 表单Form
[表单参数说明](https://github.com/react-xui/x-form)
```
Form的配置遵循上面的规则，但由于getFieldDecorator这个高阶组件方法的原因，新增了method和mparam配置
```
## method
```
对组件使用的方法名,目前仅支持在form表单中使用
```
## mparam
```
method方法所需要的参数，name名和验证规则等，数组顺序，详情可以参考form组件的api使用
```