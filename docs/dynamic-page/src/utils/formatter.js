
import moment from 'moment';

const Formatter = {
    getValue(formatter,value,args=[],id,formatterObj){
        if(this[formatter]){
            return this[formatter].apply(null,[value].concat([...args]));;
        }else  if( id && window.__txb[id] &&window.__txb[id].method && window.__txb[id].method[formatter]){
            return window.__txb[id].method[formatter].apply(null,[value].concat([...args]));
        }else if(formatterObj && formatterObj[formatter]) {
            return formatterObj[formatter].apply(null,[value].concat([...args]));
        }else{
            return value;
        }
    },
    regular(value,exe){
        return value.match(exe);
    },
    int(value) {
        let reg = /-?(0|[1-9][0-9]*)/;
        return value.match(reg);
    },
    thousand(num) {
        num = String(num).replace(/\,/g,'');
        let arr = num.split('.');
        let number = arr[0]
        let decimals  = arr.length>1 ?arr[1].length:0;
        if (typeof (number) == undefined) return '';
        if (!number && number !== 0) {
            return '';
        } else {
            number = (number + '').replace(/[^0-9+-Ee.]/g, '');
            let n = !isFinite(+number) ? 0 : +number,
                prec = 0,
                sep = ',',
                dec = '.',
                s = '';
            s = (prec ? n.fromFixed(prec) : '' + Math.round(n)).split('.');
            var re = /(-?\d+)(\d{3})/;
            while (re.test(s[0])) {
                s[0] = s[0].replace(re, "$1" + sep + "$2");
            }

            if ((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            let str = s.join(dec);
            if (arr.length > 1) {
                str += '.' + arr[1].substr(0, decimals).replace(/[^0-9]/ig, "");
            }
            return str;
        }
    },
    date(v,f='YYYY-MM-DD'){
        return moment(String(v)).format(f)
    }
}
export default Formatter ;