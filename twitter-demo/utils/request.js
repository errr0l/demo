const { HttpsProxyAgent } = require('https-proxy-agent');
const fetch = require("node-fetch");

function _fetch(url, opts = {}) {
    if (!opts.agent) {
        if (process.env.PROXY_URL) {
            opts.agent = new HttpsProxyAgent(process.env.PROXY_URL);
        }
    }
    return fetch(url, opts);
}

async function fetchFile(url, opts) {
    return await (await _fetch(url, opts)).text();
}

async function fetchJson(url, opts) {
    const resp = await _fetch(url, opts);
    return await (resp.json());
}

exports._fetch = _fetch;
exports.fetchFile = fetchFile;
exports.fetchJson = fetchJson;