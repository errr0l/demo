const style = {
    setProperty: () => {}
};
document = {
    baseURI: '',
    getElementsByTagName: () => {
        return []
    },
    createElement: () => {
        return {
            setAttribute: () => {},
            style,
        }
    },
    head: {
        appendChild: () => {},
        insertBefore: () => {}
    },
    getElementById: () => ({
        style
    }),
    querySelector: () => {
        return {}
    },
    querySelectorAll: (selector) => {
        // console.log(selector);
        // 返回tsv；模拟meta对象
        const nodes = [];
        if (selector === '[name^=tw]') {
            const meta = { content: window.tsv };
            const getAttribute = key => meta[key];
            meta['getAttribute'] = getAttribute;
            nodes.push(meta);
            return nodes;
        }
        // 不同的demand.s.xxx.js文件selector不一样，但每个文件的selector是固定不变的，使用console.log(selector)打印一次即可；
        if (selector === '.r-3p73i0') {
            const d = window.d;
            for (const item of d) {
                const svg = {
                    tagName: 'svg',
                    childNodes: [
                        {
                            childNodes: [
                                null,
                                { getAttribute: () => item },
                            ]
                        }
                    ]
                };
                nodes.push(svg);
            }
        }
        return nodes;
    },
    addEventListener: () => {},
    documentElement: {
        clientHeight: 1000,
        clientWidth: 1000,
        getAttribute: () => {},
        style
    },
    cookie: "",
    body: {
        append: () => {}
    }
};
window.document = document;
window.location = {
    hostname: "x.com",
    search: "",
    host: "x.com",
    pathname: "",
    origin: "https://x.com"
};
window.navigator = {
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
};
window.history = {
    state: {},
    replaceState: () => {},
    pushState: () => {}
};
window.addEventListener = () => {};
window.removeEventListener = () => {};
window.DOMException = global.Error;
window.getComputedStyle = () => ({});
window.Element = {
    prototype: Object.create(null)
};
window.screen = {};
window.fetch = () => ({});
window.Headers = class {};
window.Request = class {};
window.Response = class {};
window.requestIdleCallback = () => {};
window.requestAnimationFrame = () => {};

const { encode } = require("./utils/crypto");
const { atob, btoa } = require('./utils/transaction_id_generator');

window.crypto = {
    subtle: {
        digest: encode
    }
};

window.atob = atob;
window.btoa = btoa;