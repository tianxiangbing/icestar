import Vue from 'vue';
import dialog from './dialog';

const DialogConstructor = Vue.extend(dialog);

const Dialog = (params = { callback: () => { }, submit: () => { } }) => {
    const instance = new DialogConstructor({
        el: document.createElement('div'),
        components: {
            temp: params.content
        }
    });
    instance.close = () => {
        const el = instance.$el;
        el.parentNode && el.parentNode.removeChild(el);
        params.cancel && params.cancel(instance);
    }
    instance.title = params.title;
    instance.callback = params.callback;
    instance.params = params.params;
    let el = instance.$el;
    document.body.appendChild(el);
    return instance;
}

export default Dialog;