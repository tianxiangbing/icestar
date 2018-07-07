import Clipboard from 'clipboard';
export default {
    formatJson(v, callback) {
        let json = v
        try {
            json = JSON.stringify(JSON.parse(v), null, "    ");
            callback && callback(true, json);
        } catch (e) {
            json = v;
            callback && callback(false, e);
        }
        return json;
    },
    copy(target,text){
        var clipboard = new Clipboard(target, {
            text
        });//实例化
        //复制成功执行的回调，可选
        clipboard.on('success', function (e) {
            alert('内容已成功复制进粘贴板中，可以去其他地方粘贴了!')
        });
        //复制失败执行的回调，可选
        clipboard.on('error', function (e) {
            alert('复制失败，请按ctrl+c复制');
        });
    }
}