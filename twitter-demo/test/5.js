const fs = require('fs');
const path = require('path');

const { textParser } = require("../utils/parser");

// const html = fs.readFileSync(path.resolve(__dirname, '../resource/1916639968987959347.html'), 'utf-8');
// const r = parseHtml(html);
// console.log(r);


// const js = fs.readFileSync(path.resolve(__dirname, '../resource/a/ondemand.s.6dafe76a.js'), 'utf-8');

// async function fetchJs(url) {
//     return await (await fetch(url)).text();
// }

// fetchJs('http://192.168.3.31').then(res => console.log(res));

// const config = fs.readFileSync(path.resolve(__dirname, '../config.txt'), 'utf-8');

// console.log(textParser(config));

function createP3(tsv) {
    // const selector = "[name^=tw]";
    // const elements = document.querySelectorAll(selector);
    // const chars = window.atob(tsv).split("").map((n => n.charCodeAt(0)));
    const buffer = Buffer.from(tsv, 'base64');
    return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
}

console.log(createP3("ONb2mfzO8bxjF+Pfxgz/vnC66usRtpGB1MSZzpx4Qa5bHJ+924MxxoquGXfG6AeL"))

oo = Wn['DWdHk'](Fr, Wn['DWdHk'](xr, [t[Wn['jwwXB'](n[5], 8)] || "4", t[Wn['jwwXB'](n[8], 8)]]));



async function test2() {
    // const p5 = "bc75bd1011eb851eb851ec011eb851eb851ec100";
    // const p1 = 63717919;
    // POST!/i/api/1.1/jot/client_event.json!63683098obfiowerehiring
    // const encoded = await encode(`POST!/i/api/1.1/jot/client_event.json!${p1}obfiowerehiring${p5}`);
    const d4 = [22, 201, 94, 16, 92, 145, 194, 210, 167, 137, 218, 155, 149, 160, 153, 8, 94, 69, 27, 161, 105, 164, 154, 115, 51, 38, 62, 107, 163, 101, 164, 116, 222, 1, 119, 133, 121, 192, 202, 179, 127, 151, 9, 29, 22, 28, 126, 138, 122, 25, 224, 207, 3, 71, 198, 190, 97, 143, 3, 141, 134, 241, 255, 145, 182, 186, 164, 164, 220, 3];
    // 添加oo的时机为，将加密字符转为数组后

    const uint8array = new Uint8Array(d4).map(TW);
    // console.log(uint8array);
    return Buffer.from(uint8array.buffer, uint8array.byteOffset, uint8array.byteLength).toString('base64').replace(/=/g, "");
}

console.log(test2());