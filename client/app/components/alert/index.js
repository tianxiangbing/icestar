import Vue from 'vue';
import alert from './alert.vue';

let AlertConstructor = Vue.extend(alert);
let instance = new AlertConstructor({
    el:document.createElement('div')
});
AlertConstructor.prototype.close = () => {
    const el = instance.$el;
    el.parentNode && el.parentNode.removeChild(el);
    this.close && this.close(instance);
}
let Alert = (options={})=>{
    instance.callback = options.callback;
    instance.content = options.content;
    document.body.appendChild(instance.$el);
}
export default Alert;