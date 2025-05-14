const fs = require("fs");

// 解析推文文档；
// 返回twitter-site-verification、hash、以及一个d属性列表（不确定是哪一个，需要从ondemand.s.[hash].js文件中获取下标）；
function htmlParser(html, opts = {}) {
    const patterns = {
        tsv: /<meta\sname=(["'])twitter-site-verification\1.*?content=(["'])(.*?)\2/,
        d: /id=(["'])loading-x-anim-\d\1.*?<path.*?d=(["'])(M\s.*?)\2/sg,
        hash: /(["'])ondemand.s\1:.*?(["'])(\w+)\2/
    };
    const result = {};
    for (const attribute of opts.attributes || []) {
        const pattern = patterns[attribute];
        if (attribute === 'd') {
            const dList = [];
            let group;
            while ((group = pattern.exec(html)) != null) {
                dList.push(group[3]);
            }
            result[attribute] = dList;
        }
        else {
            const [a, b, c, d] = html.match(pattern);
            result[attribute] = d;
        }
    }
   
    return result;
}

// 解析ondemand.s.hash.js文件，获取参数（一共四个），用于计算出d属性列表的下标；
// const [t, An] = [Hr['ONqDe'](arr1[30], 16), Hr['yKeoX'](Hr['DyztN'](Hr['fUUce'](n[43], 16), Hr['fUUce'](n[31], 16)), Hr['fUUce'](n[8], 16))]
function jsParser(js) {
    const pattern1 = /\(\w+\[(\d+)\],\s*16\)/g;
    let group, indexes = [];
    while ((group = pattern1.exec(js)) != null && indexes.length < 4) {
        indexes.push(+group[1]);
    }
    return {
        indexes
    };
}

// 简单的文本解析器；
// 只解析以非字母下划线开头，即一般变量的命名规范，且包含"="的行，作为键值对，不含嵌套；
function textParser(input) {
    const lines = input.split("\n");
    const pattern1 = /^[a-zA-Z$_]+=/;
    const pattern2 = /(.*?)=/;
    const r = {};
    for (const item of lines) {
        if (pattern1.test(item)) {
            const [a, k] = item.match(pattern2);
            r[k] = item.substring(a.length);
        }
    }
    return r;
}

module.exports = {
    htmlParser,
    jsParser,
    textParser
}