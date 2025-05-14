const { fetchFile } = require("../utils/request");
const { encode } = require("../utils/crypto");
const { htmlParser, jsParser } = require("../utils/parser");
const fs = require("fs");
const path = require("path");

var So = n => (n < 16 ? "0" : "") + n['toString'](16);
const Ko = (n, t, W, r) => {
    const o = Hr['sTXrz'](Hr['NwcGI'](Hr['slAir'](n, Hr['FmgRL'](W, t)), 255), t);
    return o.toFixed(2);
};
const Ro = (n) => Math.round(n);
const TW = (n, t, W) => t ? n ^ W[0] : n;
const Hr = {
    sTXrz: function(n, t) {
        return n + t
    },
    aFaqC: function(n, t) {
        return n / t
    },
    tIRXP: function(n, t) {
        return n * t
    },
    Heegj: function(n, t) {
        return n - t
    },
    qCCer: function(n, t) {
        return n(t)
    },
    JJxdl: function(n, t) {
        return n !== t
    },
    // JzoMX: po("2h]A", n, 196, t, W),
    // HDfWN: po(")N6E", o, 258, u, c),
    // eqPaL: po(e, i, k, f, a),
    IpZPM: function(n, t) {
        return n(t)
    },
    DHiWE: function(n, t) {
        return n(t)
    },
    YfFNi: function(n, t) {
        return n % t
    },
    yGiXE: function(n, t) {
        return n === t
    },
    // Vbxlk: jr(0, 0, 0, 976, "SJXG"),
    // VmQCo: po("Mbmx", d, m, C, 266),
    HQEuj: function(n, t) {
        return n(t)
    },
    kHgiW: function(n, t) {
        return n * t
    },
    UoXGF: function(n, t) {
        return n / t
    },
    NbUlT: function(n, t) {
        return n === t
    },
    // uDnPM: jr(0, 0, 0, s, v),
    NwcGI: function(n, t) {
        return n / t
    },
    slAir: function(n, t) {
        return n * t
    },
    FmgRL: function(n, t) {
        return n - t
    },
    dPnbs: function(n, t) {
        return n(t)
    },
    duCWP: function(n, t) {
        return n(t)
    },
    fUUce: function(n, t) {
        return n % t
    },
    NirKJ: function(n, t) {
        return n !== t
    },
    // TYnld: jr(0, 0, 0, 939, "ph%M"),
    // MemjJ: jr(0, 0, 0, P, S),
    nIPYY: function(n, t) {
        return n % t
    },
    KZkWz: function(n, t) {
        return n(t)
    },
    tbtiY: function(n, t) {
        return n % t
    },
    xjcln: function(n) {
        return n()
    },
    // EgAbW: go(l, O, R, q, 562),
    // gZjgT: go(519, 399, G, 428, Q),
    ONqDe: function(n, t) {
        return n % t
    },
    yKeoX: function(n, t) {
        return n * t
    },
    DyztN: function(n, t) {
        return n * t
    },
    sNkxM: function(n, t, W) {
        return n(t, W)
    },
    // dgRLv: jr(0, 0, 0, h, w) + po(z, 245, 226, N, L),
    ZTLem: function(n, t, W, r) {
        return n(t, W, r)
    },
    HMWoG: function(n, t) {
        return n(t)
    },
    StdnL: function(n, t) {
        return n(t)
    },
    sxrqA: function(n) {
        return n()
    },
    sHEBN: function(n, t) {
        return n / t
    },
    OyBku: function(n, t) {
        return n - t
    },
    jGlYy: function(n) {
        return n()
    },
    gjkTH: function(n, t) {
        return n(t)
    },
    QPJeV: function(n, t) {
        return n(t)
    },
    lFEbY: function(n, t) {
        return n(t)
    },
    TKvNa: function(n, t) {
        return n + t
    },
    lTvez: function(n, t) {
        return n + t
    },
    // zCuNf: jr(0, 0, 0, F, "UAxt") + eo(-126, K, x, -g, -228) + go(p, 668, I, b, y),
    jZGmF: function(n, t) {
        return n ** t
    }
}
const NAME = "TransactionIdGenerator"
function log(msg, level = 'info') {
    console[level](`[${new Date().toLocaleString()} - ${NAME} - ${level}]: ${msg}`)
}

/**
 * 生成ClientTransactionId；
 * 一般情况下，路径是基本路径，即不带参数的路径，具体可使用关键字'transaction-id'在资源面板中搜索，然后断点查看；
 * @param {String} html 推文文档
 * @param {String} method 请求方法（全大写）
 * @param {String} url 请求路径
 * @param {Object} opts
 * @returns {String}
 */
async function generateTransactionId(html, method, url, opts = {}) {
    log('解析html');
    const { tsv, d, hash } = htmlParser(html, { attributes: ['tsv', 'd', 'hash'] });
    console.log('tsv: %s, hash: %s, d:', tsv, hash, d);
    log("生成时间参数");
    const p1 = createP1();
    const arr1 = createP3(tsv);
    const arr2 = createP2(p1);
    console.log("p1: %s", p1);
    let n = arr1;
    let local_js = path.resolve(__dirname, `../resource/ondemand.s.${hash}a.js`);
    let js;
    if (fs.existsSync(local_js)) {
        log("读取本地js文件");
        js = fs.readFileSync(local_js, 'utf-8');
    }
    else {
        js = await fetchFile(`https://abs.twimg.com/responsive-web/client-web/ondemand.s.${hash}a.js`);
        fs.writeFileSync(local_js, js);
    }
    log("解析js文件");
    const { indexes } = jsParser(js);
    console.log("indexes: %s", indexes.toString());
    log("计算下标");
    const [t, An] = [Hr['ONqDe'](n[indexes[0]], 16), Hr['yKeoX'](Hr['DyztN'](Hr['fUUce'](n[indexes[1]], 16), Hr['fUUce'](n[indexes[2]], 16)), Hr['fUUce'](n[indexes[3]], 16))]
    console.log("t: %s, An: %s", t, An);
    const arr3 = createP4(d[arr1[5] % 4]);
    n = arr3[t];
    const W = 360, t1 = 60;
    const o = Hr['sTXrz'](Hr['NwcGI'](Hr['slAir'](n[6], Hr['FmgRL'](W, t1)), 255), t1);
    log("样式相关");
    const keyframes = {
        color: ["#" + So(n[0]) + So(n[1]) + So(n[2]), "#" + So(n[3]) + So(n[4]) + So(n[5])],
        transform: ["rotate(0deg)", `rotate(${Math.floor(o)}deg)`],
        easing: "cubic-bezier(" + Array.from(n['slice'](7))['map'](((n, t) => Ko(n, t % 2 ? -1 : 0, 1)))['join']() + ")"
    };
    const currentTime = Hr['kHgiW'](Hr['qCCer'](Ro, Hr['UoXGF'](An, 10)), 10);
    const styles = computeAnimationValues(keyframes, 4096, currentTime);
    console.log('currentTime: %s, color: %s, transform: %s, easing: %s', currentTime, keyframes.color.toString(), keyframes.transform.toString(), keyframes.easing);
    const p5 = createP5({ color: styles.color.rgb, transform: styles.transform.matrix });
    const encoded = await encode(`${method}!${url}!${p1}obfiowerehiring${p5}`);
    log(`encoded: ${encoded}`);
    // 前端的逻辑为：拼接字符，加密，转uint8array，转为数组，裁剪0-16
    const d4 = [createRandom()].concat(
        Array.from(arr1),
        Array.from(arr2),
        Array.from(encoded).slice(0, 16),
        [3]
    );
    // 添加oo的时机为，将加密字符转为数组后

    const uint8array = new Uint8Array(d4).map(TW);
    return Buffer.from(uint8array.buffer, uint8array.byteOffset, uint8array.byteLength).toString('base64').replace(/=/g, "");
}

function createRandom() {
    return Math.random() * 256;
}

// 生成一个数字；
function createP1() {
    // const r = floor(Ko, 除法(减法(获取时间, 乘法), 1e3))
    const v1 = 1682924400 * 1e3;
    const v2 = Date.now();
    const v3 = v2 - v1;
    const v4 = v3 / 1e3;
    return Math.floor(v4);
}

// 生成一个长度为4的一维数组；
// 根据p1生成一个Uint8Array类型实例；
function createP2(p1) {
    const v1 = new Uint32Array([p1]).buffer;
    const v2 = new Uint8Array(v1);
    return v2;
}

// 生成一个长度为48的一维数组；
// p3有点麻烦，它依赖于网站的一些dom节点；
// 经研究后，发现是一个固定参数，且可以从html页面中获取，麻烦的是p4；
function createP3(tsv) {
    const buffer = Buffer.from(tsv, 'base64');
    return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
}

function atob(input) {
    const buffer = Buffer.from(input, 'base64');
    return buffer.toString('binary');
}

function btoa(string) {
    // 创建一个Buffer对象，然后调用toString方法并指定输出格式为base64
    return Buffer.from(string, 'utf-8').toString('base64');
}

// 生成一个长度为16的二维数组；
// 这个svg的路径参数，在推文文档里也有；
// 选取哪一个svg是不固定的，而是通过tsv生成数组后决定，arr1[5] % 4为svg节点列表的下标
function createP4(d) {
    return d.slice(9).split("C").map(item => item.replace(/[^\d]+/g, " ").trim().split(" ").map(Number));
}

function createP5(ln) {
    // mr['xxx'](Fr, ("" + "rgb(244, 17, 21)matrix(0.58271, -0.81268, 0.81268, 0.58271, 0, 0)")["matchAll"](/([\d.-]+)/g))["map"]((n => Number(Number(n[0])["toFixed"](2))["toString"](16)))["join"]("")["replace"](/[.-]/g, "")
    var Nc = Array.from(("" + ln['color'] + ln['transform'])['matchAll'](/([\d.-]+)/g))['map']((n => Number(Number(n[0])["toFixed"](2))['toString'](16)))['join']("")["replace"](/[.-]/g, "");
    return Nc;
}

// 工具函数：将十六进制颜色转换为 RGB 数组
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

// 工具函数：RGB数组转十六进制
function rgbToHex(rgb) {
    return "#" + rgb.map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join('');
}

// 插值函数：线性插值两个数值
function lerp(start, end, t) {
    return start + (end - start) * t;
}

// Bezier Easing 函数（来自 bezier-easing 库简化版）
function cubicBezier(t, p1x, p1y, p2x, p2y) {
    const eps = 1e-6;

    function calcBezier(t, p1x, p2x) {
        return 3 * p1x * (1 - t) * (1 - t) * t +
               3 * p2x * (1 - t) * t * t +
               t * t * t;
    }

    function getTforX(x) {
        let tL = 0, tH = 1, tM;
        while (Math.abs(tH - tL) > eps) {
            tM = (tL + tH) / 2;
            const xGuess = calcBezier(tM, p1x, p2x);
            if (xGuess < x) tL = tM; else tH = tM;
        }
        return tM;
    }

    if (t <= 0) return 0;
    if (t >= 1) return 1;
    return calcBezier(getTforX(t), p1y, p2y);
}

// 工具函数：将 rotate 转换为 matrix
function rotateToMatrix(degrees) {
    const rad = degrees * Math.PI / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    return `matrix(${cos.toFixed(6)}, ${sin.toFixed(6)}, ${(-sin).toFixed(6)}, ${cos.toFixed(6)}, 0, 0)`;
}

// 主函数：根据 currentTime 和 easing 计算当前属性值
function computeAnimationValues(config, duration, currentTime) {
    const tNormalized = Math.max(0, Math.min(1, currentTime / duration));
    const easingValues = config.easing.match(/.*?\((.*?)\)/)[1].split(",").map(Number)
    const tEased = cubicBezier(tNormalized, ...easingValues);

    const result = {};

    // 颜色插值
    if (config.color) {
        const startColor = hexToRgb(config.color[0]);
        const endColor = hexToRgb(config.color[1]);
        const currentColor = [
            Math.round(lerp(startColor[0], endColor[0], tEased)),
            Math.round(lerp(startColor[1], endColor[1], tEased)),
            Math.round(lerp(startColor[2], endColor[2], tEased))
        ];
        result.color = {
            rgb: `rgb(${currentColor.join(',')})`,
            hex: rgbToHex(currentColor)
        };
    }

    // transform rotate 插值 + 转 matrix
    if (config.transform) {
        const startDeg = parseFloat(config.transform[0].match(/-?\d+/)[0]);
        const endDeg = parseFloat(config.transform[1].match(/-?\d+/)[0]);
        const currentDeg = lerp(startDeg, endDeg, tEased);
        result.transform = {
            rotate: `rotate(${currentDeg.toFixed(2)}deg)`,
            matrix: rotateToMatrix(currentDeg)
        };
    }

    return result;
}

module.exports = {
    generateTransactionId, atob, btoa
}