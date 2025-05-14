
const fs = require("fs");
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../resource/1916639968987959347.html'), 'utf-8');

const { parse } = require('../utils/html-parser');
const r = parse(html);
// console.log(r);
const d1 = r['__INITIAL_STATE__'];
// console.log(d1);
console.log(JSON.parse(d1));

// const d2 = r['__META_DATA__'];
// console.log(JSON.parse(d2));