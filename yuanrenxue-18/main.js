const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetch = require('node-fetch');

// 模拟鼠标点位数据
// 以第三页的坐标为基准，前后加减50
function generatePoint(paganation) {
    let x = 721 + (paganation - 3) * 50;
    return `${x}m128,${x}m128,${x}m127,${x}d127,${x}u127`;
}

// doc文档随便输入
let { window } = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
function createProxy(obj, objName) {
    return new Proxy(obj, {
        get(target, prop, receiver) {
            // 捕获属性读取
            console.log(`[TRACE] Accessing ${objName}.${String(prop)}`);
            const value = Reflect.get(target, prop, receiver);
            // 如果是函数，再代理函数调用
            const type = typeof value;
            if (type === 'function') {
                return new Proxy(value, {
                    apply(fnTarget, thisArg, args) {
                        console.log(`[TRACE] Calling ${objName}.${String(prop)} with arguments: `, args);
                        let saving;
                        // 若prop为encodeURIComponent，则保存参数
                        if (prop === 'encodeURIComponent') {
                            saving = true;
                            if (/\d+\|/.test(args.toString())) {
                                args[0] = args[0] + generatePoint(+args[0].replace('|', ''));
                            }
                        }
                        const r = Reflect.apply(fnTarget, thisArg, args);
                        // 将xhr.open()当做一个加密方法
                        if (saving) {
                            if (!receiver.output) {
                                receiver.output = [];
                            }
                            receiver.output.push(args);
                        }
                        return r;
                    }
                });
            }
            return value;
        },
        set(target, prop, value, receiver) {
            // 捕获属性写入
            let type = typeof value;
            if (type === 'string') {
                console.log(`[TRACE] Setting ${objName}.${String(prop)} = `, value.slice(0, 200));
            }
            else {
                console.log(`[TRACE] Setting ${objName}.${String(prop)} = `, value);
            }
            return Reflect.set(target, prop, value, receiver);
        }
    });
}

window = createProxy(window, 'window');
global = window;
require("./1");

function getdata(page){
    page = page || 2;
    const xhr = new window.XMLHttpRequest();
    // 将xhr.open()当做是获取加密数据的方法;
    const href = `https://match.yuanrenxue.cn/match/18`;
    const _url = `${href}data?page=${page}`;
    xhr.open('GET', _url, true);
    console.log(window.output);
    const [a, b, c, d] = window.output;
     // 获取秒数
    const t = parseInt(a[0].slice(0, a[0].length / 2), 16);
    const url = `${_url}&t=${t}&v=${d[0]}`;
    console.log(url);
}
getdata(2);