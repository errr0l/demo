const { atomTraceData, LL, QQ, getCC, Cee, Cii } = require("/Users/errol/personalplace/demo/neteasemusic-sliding-captcha-demo/src/js/data.js");

var keyMap = {
    "__SBOX__": "a7be3f3933fa8c5fcf86c4b6908b569ba1e26c1a6d7cfbf60ae4b00e074a194dac4b73e7f898541159a39d08183b76eedee3ed341e6685d2357440158394b1ff03a9004cbbb5ca7dcb7f41489a16e03dcc9c71eb3c9796685b1d01b4d56193a6e1f1a2470445c191ae49c5d82765dc82c350f263387a24a502fcbf442e2dddaad0e936d9ea22b89275307b42518fbc3a626ba806d4ecd6d725f50cc8c72fefa4551ccd6fc9b2b7ab954f815c7264c6e51f4eaf99885a79892b1b60a0b3526e57ba5d178d370958847eb9fd28f9ce0bc023f4148a2adfe632126769057043d3bd8eda0df7872629f3809ef05310e83113216afe202c460fc23e789f77d1addb5e",
    "__ROUND_KEY__": "037606da0296055c",
    "__SEED_KEY__": "fd6a43ae25f74398b61c03c83be37449",
    "__BASE64_ALPHABET__": "MB.CfHUzEeJpsuGkgNwhqiSaI4Fd9L6jYKZAxn1/Vml0c5rbXRP+8tD3QTO2vWyo",
    "__BASE64_PADDING__": "7",
    "0x24d": "2732a4"
};

function C8(CO, CN) {
    var Ct = k(CN)
        , CJ = k(CO);
    return Cu(L(Ct, CJ));
}

function j(x, F) {
    return z(z(x) ^ z(F));
}

function L() {
    for (var x = arguments.length > 0x0 && void 0x0 !== arguments[0x0] ? arguments[0x0] : [], F = arguments.length > 0x1 && void 0x0 !== arguments[0x1] ? arguments[0x1] : [], b = [], w = F.length, D = 0x0, B = x.length; D < B; D++)
        b[D] = j(x[D], F[D % w]);
    return b;
}

function Q(x) {
    x = '' + x;
    for (var F = [], D = 0x0, B = 0x0, I = x.length / 0x2; D < I; D++) {
        var Z = parseInt(x.charAt(B++), 0x10) << 0x4
            , H = parseInt(x.charAt(B++), 0x10);
        F[D] = z(Z + H);
    }
    return F;
}

var QQQ = Q;

function z(x) {
    return x < -0x80 ? z(0x100 + x) : x > 0x7f ? z(x - 0x100) : x;
}

function k(x) {
    x = encodeURIComponent(x);
    for (var F = [], b = 0x0, w = x.length; b < w; b++)
        '%' === x.charAt(b) ? b + 0x2 < w && F.push(Q('' + x.charAt(++b) + x.charAt(++b))[0x0]) : F.push(z(x.charCodeAt(b)));
    return F;
}

function P(T, m, O) {
    var N = void 0x0
        , J = void 0x0
        , q = void 0x0
        , S = [];
    switch (T.length) {
        case 0x1:
            N = T[0x0],
                J = q = 0x0,
                S.push(m[N >>> 0x2 & 0x3f], m[(N << 0x4 & 0x30) + (J >>> 0x4 & 0xf)], O, O);
            break;
        case 0x2:
            N = T[0x0],
                J = T[0x1],
                q = 0x0,
                S.push(m[N >>> 0x2 & 0x3f], m[(N << 0x4 & 0x30) + (J >>> 0x4 & 0xf)], m[(J << 0x2 & 0x3c) + (q >>> 0x6 & 0x3)], O);
            break;
        case 0x3:
            N = T[0x0],
                J = T[0x1],
                q = T[0x2],
                S.push(m[N >>> 0x2 & 0x3f], m[(N << 0x4 & 0x30) + (J >>> 0x4 & 0xf)], m[(J << 0x2 & 0x3c) + (q >>> 0x6 & 0x3)], m[0x3f & q]);
            break;
        default:
            return '';
    }
    return S['join']('');
}

function z2(T, m, O) {
    if (!T || 0x0 === T.length)
        return '';
    try {
        for (var N = 0x0, J = []; N < T.length;) {
            if (!(N + 0x3 <= T.length)) {
                var q = T.slice(N);
                J['push'](P(q, m, O));
                break;
            }
            var S = T.slice(N, N + 0x3);
            J.push(P(S, m, O)),
                N += 0x3;
        }
        return J.join('');
    } catch (V) {
        return '';
    }
}

function Cu(T) {
    var m = ['i', '/', 'x', '1', 'X', 'g', 'U', '0', 'z', '7', 'k', '8', 'N', '+', 'l', 'C', 'p', 'O', 'n', 'P', 'r', 'v', '6', '\x5c', 'q', 'u', '2', 'G', 'j', '9', 'H', 'R', 'c', 'w', 'T', 'Y', 'Z', '4', 'b', 'f', 'S', 'J', 'B', 'h', 'a', 'W', 's', 't', 'A', 'e', 'o', 'M', 'I', 'E', 'Q', '5', 'm', 'D', 'd', 'V', 'F', 'L', 'K', 'y']
        , O = '3';
    return z2(T, m, O);
}

function sample(G, j = 50) {
    var L = G.length;
    if (L <= j)
        return G;
    for (var E = [], Q = 0x0, k = 0x0; k < L; k++){
        k >= Q * (L - 0x1) / (j - 0x1) && (E['push'](G[k]),
            Q += 0x1);
    }
    return E;
}

// 生成轨迹参数
function generateTraceData(token, atomTraceData) {
    const _traceData = [];
    for (const item of atomTraceData) {
        _traceData.push(C8(token, item + ''));
    }
    return _traceData;
}

function filter(atomTraceData, offset) {
    let _atomTraceData = [];
    let index = 0;
    let _offset = offset - 4;
    for (const item of atomTraceData) {
        if (item[0] > _offset) {
            // 保证_atomTraceData中的滑动距离与offset相等
            if (_atomTraceData[_atomTraceData.length - 1][0] !== _offset) {
                _atomTraceData[_atomTraceData.length - 1][0] = _offset;
            }
            break;
        }
        _atomTraceData.push(item);
        index++;
    }
    // 模仿拉拽放慢的区间；分为几个阶段；
    // 上面的循环中，在到达offset之前跳出循环，取而代之的是，下面生成填充数据
    let buffer = {
        '1': Math.ceil(Math.random() * 4),
        '2': Math.ceil(Math.random() * 4),
        '3': Math.ceil(Math.random() * 4),
        '4': Math.ceil(Math.random() * 4)
    };
    let last = _atomTraceData[index - 1];
    let last_offset = last[0];
    let dy = last[1];
    let last_time = last[2];
    for (let i=1; i<5; i++) {
        last_offset++;
        if (i === Math.ceil(Math.random() * 2) + 2) {
            dy++;
        }
        for (let j=0; j<buffer[i]; j++) {
            // 随机一个7-10的数
            last_time += Math.ceil(Math.random() * 3) + 7;
            _atomTraceData.push([
                last_offset,
                dy,
                last_time
            ]);
        }
    }

    _atomTraceData[_atomTraceData.length - 1][2] += 30;

    return _atomTraceData;
}

function CQ(x) {
    return x < -0x80 ? CQ(0x100 + x) : x > 0x7f ? CQ(x - 0x100) : x;
}

function Z() {
    for (var CO = [], CN = 0x0; CN < 0x4; CN++)
        CO[CN] = CQ(Math['floor'](0x100 * Math.random()));
    return CO;
}

function q2(x) {
    throw new Error()
}

function X(CO) {
    var CN = [];
    if (!CO.length)
        return q2(0x40);
    if (CO.length >= 0x40)
        return CO.splice(0x0, 0x40);
    for (var Ct = 0x0; Ct < 0x40; Ct++)
        CN[Ct] = CO[Ct % CO.length];
    return CN;
}

function C7() {
    var CO = k(keyMap['__SEED_KEY__'])
      , CN = Z();
    return CO = X(CO),
    CO = L(CO, X(CN)),
    CO = X(CO),
    [CO, CN];
}

function CM(CN, Ct) {
    // var U3 = M;
    if (Array.isArray(CN))
        return CN;
    // if (Symbol.iterator in Object(CN))
    //     return CO(CN, Ct);
    throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

function E(x) {
    var F = [];
    return F[0x0] = z(x >>> 0x18 & 0xff),
    F[0x1] = z(x >>> 0x10 & 0xff),
    F[0x2] = z(x >>> 0x8 & 0xff),
    F[0x3] = z(0xff & x),
    F;
}

function X2(x) {
    var F = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    return '' + F[x >>> 0x4 & 0xf] + F[0xf & x];
}

function O(x) {
    return x['map'](function(F) {
        return X2(F);
    }).join('');
}

function N(x) {
    return O(E(x));
}

function S(x) {
    for (var F = [0x0, 0x77073096, 0xee0e612c, 0x990951ba, 0x76dc419, 0x706af48f, 0xe963a535, 0x9e6495a3, 0xedb8832, 0x79dcb8a4, 0xe0d5e91e, 0x97d2d988, 0x9b64c2b, 0x7eb17cbd, 0xe7b82d07, 0x90bf1d91, 0x1db71064, 0x6ab020f2, 0xf3b97148, 0x84be41de, 0x1adad47d, 0x6ddde4eb, 0xf4d4b551, 0x83d385c7, 0x136c9856, 0x646ba8c0, 0xfd62f97a, 0x8a65c9ec, 0x14015c4f, 0x63066cd9, 0xfa0f3d63, 0x8d080df5, 0x3b6e20c8, 0x4c69105e, 0xd56041e4, 0xa2677172, 0x3c03e4d1, 0x4b04d447, 0xd20d85fd, 0xa50ab56b, 0x35b5a8fa, 0x42b2986c, 0xdbbbc9d6, 0xacbcf940, 0x32d86ce3, 0x45df5c75, 0xdcd60dcf, 0xabd13d59, 0x26d930ac, 0x51de003a, 0xc8d75180, 0xbfd06116, 0x21b4f4b5, 0x56b3c423, 0xcfba9599, 0xb8bda50f, 0x2802b89e, 0x5f058808, 0xc60cd9b2, 0xb10be924, 0x2f6f7c87, 0x58684c11, 0xc1611dab, 0xb6662d3d, 0x76dc4190, 0x1db7106, 0x98d220bc, 0xefd5102a, 0x71b18589, 0x6b6b51f, 0x9fbfe4a5, 0xe8b8d433, 0x7807c9a2, 0xf00f934, 0x9609a88e, 0xe10e9818, 0x7f6a0dbb, 0x86d3d2d, 0x91646c97, 0xe6635c01, 0x6b6b51f4, 0x1c6c6162, 0x856530d8, 0xf262004e, 0x6c0695ed, 0x1b01a57b, 0x8208f4c1, 0xf50fc457, 0x65b0d9c6, 0x12b7e950, 0x8bbeb8ea, 0xfcb9887c, 0x62dd1ddf, 0x15da2d49, 0x8cd37cf3, 0xfbd44c65, 0x4db26158, 0x3ab551ce, 0xa3bc0074, 0xd4bb30e2, 0x4adfa541, 0x3dd895d7, 0xa4d1c46d, 0xd3d6f4fb, 0x4369e96a, 0x346ed9fc, 0xad678846, 0xda60b8d0, 0x44042d73, 0x33031de5, 0xaa0a4c5f, 0xdd0d7cc9, 0x5005713c, 0x270241aa, 0xbe0b1010, 0xc90c2086, 0x5768b525, 0x206f85b3, 0xb966d409, 0xce61e49f, 0x5edef90e, 0x29d9c998, 0xb0d09822, 0xc7d7a8b4, 0x59b33d17, 0x2eb40d81, 0xb7bd5c3b, 0xc0ba6cad, 0xedb88320, 0x9abfb3b6, 0x3b6e20c, 0x74b1d29a, 0xead54739, 0x9dd277af, 0x4db2615, 0x73dc1683, 0xe3630b12, 0x94643b84, 0xd6d6a3e, 0x7a6a5aa8, 0xe40ecf0b, 0x9309ff9d, 0xa00ae27, 0x7d079eb1, 0xf00f9344, 0x8708a3d2, 0x1e01f268, 0x6906c2fe, 0xf762575d, 0x806567cb, 0x196c3671, 0x6e6b06e7, 0xfed41b76, 0x89d32be0, 0x10da7a5a, 0x67dd4acc, 0xf9b9df6f, 0x8ebeeff9, 0x17b7be43, 0x60b08ed5, 0xd6d6a3e8, 0xa1d1937e, 0x38d8c2c4, 0x4fdff252, 0xd1bb67f1, 0xa6bc5767, 0x3fb506dd, 0x48b2364b, 0xd80d2bda, 0xaf0a1b4c, 0x36034af6, 0x41047a60, 0xdf60efc3, 0xa867df55, 0x316e8eef, 0x4669be79, 0xcb61b38c, 0xbc66831a, 0x256fd2a0, 0x5268e236, 0xcc0c7795, 0xbb0b4703, 0x220216b9, 0x5505262f, 0xc5ba3bbe, 0xb2bd0b28, 0x2bb45a92, 0x5cb36a04, 0xc2d7ffa7, 0xb5d0cf31, 0x2cd99e8b, 0x5bdeae1d, 0x9b64c2b0, 0xec63f226, 0x756aa39c, 0x26d930a, 0x9c0906a9, 0xeb0e363f, 0x72076785, 0x5005713, 0x95bf4a82, 0xe2b87a14, 0x7bb12bae, 0xcb61b38, 0x92d28e9b, 0xe5d5be0d, 0x7cdcefb7, 0xbdbdf21, 0x86d3d2d4, 0xf1d4e242, 0x68ddb3f8, 0x1fda836e, 0x81be16cd, 0xf6b9265b, 0x6fb077e1, 0x18b74777, 0x88085ae6, 0xff0f6a70, 0x66063bca, 0x11010b5c, 0x8f659eff, 0xf862ae69, 0x616bffd3, 0x166ccf45, 0xa00ae278, 0xd70dd2ee, 0x4e048354, 0x3903b3c2, 0xa7672661, 0xd06016f7, 0x4969474d, 0x3e6e77db, 0xaed16a4a, 0xd9d65adc, 0x40df0b66, 0x37d83bf0, 0xa9bcae53, 0xdebb9ec5, 0x47b2cf7f, 0x30b5ffe9, 0xbdbdf21c, 0xcabac28a, 0x53b39330, 0x24b4a3a6, 0xbad03605, 0xcdd70693, 0x54de5729, 0x23d967bf, 0xb3667a2e, 0xc4614ab8, 0x5d681b02, 0x2a6f2b94, 0xb40bbe37, 0xc30c8ea1, 0x5a05df1b, 0x2d02ef8d], b = 0xffffffff, w = 0x0, D = x['length']; w < D; w++)
        b = b >>> 0x8 ^ F[0xff & (b ^ x[w])];
    return N(0xffffffff ^ b);
}

function J2(x, F, b, w, D) {
    for (var B = 0x0, I = x.length; B < D; B++)
        F + B < I && (b[w + B] = x[F + B]);
    return b;
}

function J(CO) {
    if (!CO['length'])
        return [];
    var CN = []
      , Ct = CO.length
      , CJ = Ct % 0x40 <= 0x3c ? 0x40 - Ct % 0x40 - 0x4 : 0x80 - Ct % 0x40 - 0x4;
    J2(CO, 0x0, CN, 0x0, Ct);
    for (var Cq = 0x0; Cq < CJ; Cq++)
        CN[Ct + Cq] = 0x0;
    return J2(E(Ct), 0x0, CN, Ct + CJ, 0x4),
    CN;
}

function K(CO) {
    if (Array['isArray'](CO)) {
        for (var CN = 0x0, Ct = Array(CO.length); CN < CO.length; CN++)
            Ct[CN] = CO[CN];
        return Ct;
    }
    return Array.from(CO);
}

function q(CO) {
    if (CO.length % 0x40 !== 0x0)
        return [];
    for (var CN = [], Ct = CO.length / 0x40, CJ = 0x0, Cq = 0x0; CJ < Ct; CJ++) {
        CN[CJ] = [];
        for (var CS = 0x0; CS < 0x40; CS++)
            CN[CJ][CS] = CO[Cq++];
    }
    return CN;
}

function C5(CO) {
    var CN = arguments.length > 0x1 && void 0x0 !== arguments[0x1] ? arguments[0x1] : 0x0;
    return CN + 0x100 >= 0x0 ? CO : [];
}

function C2(CO, CN) {
    if (!CO.length)
        return [];
    CN = CQ(CN);
    for (var Ct = [], CJ = 0x0, Cq = CO['length']; CJ < Cq; CJ++)
        Ct.push(CG(CO[CJ], CN));
    return Ct;
}

function H(CO, CN) {
    if (!CO.length)
        return [];
    CN = CQ(CN);
    for (var Ct = [], CJ = 0x0, Cq = CO.length; CJ < Cq; CJ++)
        Ct.push(j(CO[CJ], CN));
    return Ct;
}

function C0(CO, CN) {
    if (!CO.length)
        return [];
    CN = CQ(CN);
    for (var Ct = [], CJ = 0x0, Cq = CO.length; CJ < Cq; CJ++)
        Ct['push'](j(CO[CJ], CN++));
    return Ct;
}

function A(x, F) {
    return z(x + F);
}

function C3(CO, CN) {
    if (!CO['length'])
        return [];
    CN = CQ(CN);
    for (var Ct = [], CJ = 0x0, Cq = CO.length; CJ < Cq; CJ++)
        Ct.push(A(CO[CJ], CN++));
    return Ct;
}

function C1(CO, CN) {
    if (!CO['length'])
        return [];
    CN = CQ(CN);
    for (var Ct = [], CJ = 0x0, Cq = CO.length; CJ < Cq; CJ++)
        Ct.push(j(CO[CJ], CN--));
    return Ct;
}

function CG(x, F) {
    return z(x + F);
}

function C4(CO, CN) {
    if (!CO.length)
        return [];
    CN = CQ(CN);
    for (var Ct = [], CJ = 0x0, Cq = CO.length; CJ < Cq; CJ++)
        Ct['push'](CG(CO[CJ], CN--));
    return Ct;
}

function T(x) {
    x = '' + x;
    var w = parseInt(x.charAt(0x0), 0x10) << 0x4
      , D = parseInt(x.charAt(0x1), 0x10);
    return z(w + D);
}

function C6(CO) {
    for (var CN = [C5, H, C2, C0, C3, C1, C4], Ct = keyMap['__ROUND_KEY__'], CJ = 0x0, Cq = Ct['length']; CJ < Cq; ) {
        var CS = Ct.substring(CJ, CJ + 0x4)
          , CV = T(CS.substring(0x0, 0x2))
          , Cy = T(CS.substring(0x2, 0x4));
        CO = CN[CV](CO, Cy),
        CJ += 0x4;
    }
    return CO;
}

function G() {
    for (var x = arguments.length > 0x0 && void 0x0 !== arguments[0x0] ? arguments[0x0] : [], F = arguments.length > 0x1 && void 0x0 !== arguments[0x1] ? arguments[0x1] : [], b = [], w = F.length, D = 0x0, B = x.length; D < B; D++)
        b[D] = A(x[D], F[D % w]);
    return b;
}

function F(CO) {
    var CN = QQQ(keyMap['__SBOX__'])
      , Ct = function(CV) {
        return CN[0x10 * (CV >>> 0x4 & 0xf) + (0xf & CV)];
    };
    if (!CO.length)
        return [];
    for (var CJ = [], Cq = 0x0, CS = CO['length']; Cq < CS; Cq++)
        CJ[Cq] = Ct(CO[Cq]);
    return CJ;
}

function J3(x, F, b, w, D) {
    for (var B = 0x0, I = x.length; B < D; B++)
        F + B < I && (b[w + B] = x[F + B]);
    return b;
}

function E2(T, m, O) {
    var N = void 0x0 !== m && null !== m ? m : keyMap['__BASE64_ALPHABET__']
      , J = void 0x0 !== O && null !== O ? O : keyMap['__BASE64_PADDING__'];
    return z2(T, N['split'](''), J);
}

function CC(CO, ct) {
    for (var CN = k(CO), Ct = C7(), CJ = CM(Ct, 0x2), Cq = CJ[0x0], CS = CJ[0x1], CV = k(S(CN)), Cy = J([].concat(K(CN), K(CV))), Cn = q(Cy), Ce = []['concat'](K(CS)), Ci = Cq, Cx = 0x0, CF = Cn.length; Cx < CF; Cx++) {
        // var Cb = Cl(C6(Cn[Cx]), Cq)
        var Cb = L(C6(Cn[Cx]), Cq)
          , Cc = G(Cb, Ci);
        Cb = L(Cc, Ci),
        Ci = F(F(Cb)),
        J3(Ci, 0x0, Ce, 0x40 * Cx + 0x4, 0x40);
    }
    return E2(Ce);
}

function unique2DArray(j) {
    var L = arguments.length > 0x1 && void 0x0 !== arguments[0x1] ? arguments[0x1] : 0x0;
    if (!Array.isArray(j))
        return j;
    for (var E = {}, Q = [], k = 0x0, l = j['length']; k < l; k++) {
        var h = j[k][L];
        null === h || void 0x0 === h || E[h] || (E[h] = !0x0,
        Q.push(j[k]));
    }
    return Q;
}

function E3() {
    var X = arguments.length > 0x0 && void 0x0 !== arguments[0x0] ? arguments[0x0] : []
      , T = []
      , m = []
      , O = [];
    if (!Array['isArray'](X) || X['length'] <= 0x2)
        return [T, m, O];
    for (var N = 0x0; N < X.length; N++) {
        var J = X[N];
        T.push(J[0x0]),
        m['push'](J[0x1]),
        O.push(J[0x2]);
    }
    return [T, m, O];
}

function K2(T, m) {
    if (Array.isArray(T))
        return T;
    // if (Symbol[Ed(0x6cf)]in Object(T))
    //     return X(T, m);
    throw new TypeError('Ed(0x7c4)');
}

function L2(X, T) {
    for (var m = [], O = [], N = 0x0; N < X.length - 0x1; N++)
        m.push(X[N + 0x1] - X[N]),
        O['push'](T[N + 0x1] - T[N]);
    for (var J = [], q = 0x0; q < O.length; q++)
        J.push(O[q] / m[q]);
    return J;
}

function Q2(X, T, m) {
    for (var O = L2(m, X), N = L2(m, T), J = [], q = 0x0; q < X.length; q++) {
        var S = Math['sqrt'](Math.pow(X[q], 0x2) + Math.pow(T[q], 0x2));
        J.push(S);
    }
    var V = L2(m, J);
    return [O, N, V];
}

function k2(X, T, m, O) {
    var N = O.slice(0x0, -0x1)
      , J = L2(N, X)
      , q = L2(N, T)
      , S = L2(N, m);
    return [J, q, S];
}

function P2(X) {
    for (var T = [], m = X.length, O = 0x0; O < m; O++)
        T['indexOf'](X[O]) === -0x1 && T['push'](X[O]);
    return T;
}

function z3(X) {
    for (var T = 0x0, m = X['length'], O = 0x0; O < m; O++)
        T += X[O];
    return T / m;
}

function G2(X) {
    return parseFloat(X.toFixed(0x4));
}

function A2(X) {
    for (var T = z3(X), m = X.length, O = [], N = 0x0; N < m; N++) {
        var J = X[N] - T;
        O.push(Math.pow(J, 0x2));
    }
    for (var q = 0x0, S = 0x0; S < O.length; S++)
        O[S] && (q += O[S]);
    return Math['sqrt'](q / m);
}

function R(X) {
    if (Array.isArray(X)) {
        for (var T = 0x0, m = Array(X.length); T < X.length; T++)
            m[T] = X[T];
        return m;
    }
    return Array.from(X);
}

function j2(X, T) {
    var m = X.sort(function(q, S) {
        return q - S;
    });
    if (T <= 0x0)
        return m[0x0];
    if (T >= 0x64)
        return m[m['length'] - 0x1];
    var O = Math.floor((m.length - 0x1) * (T / 0x64))
      , N = m[O]
      , J = m[O + 0x1];
    return N + (J - N) * ((m.length - 0x1) * (T / 0x64) - O);
}

function h() {
    var C0 = arguments.length > 0x0 && void 0x0 !== arguments[0x0] ? arguments[0x0] : [];
    if (!Array.isArray(C0) || C0.length <= 0x2)
        return [];
    var C1 = E3(C0)
      , C2 = K2(C1, 0x3)
      , C3 = C2[0x0]
      , C4 = C2[0x1]
      , C5 = C2[0x2]
      , C6 = Q2(C3, C4, C5)
      , C7 = K2(C6, 0x3)
      , C8 = C7[0x0]
      , C9 = C7[0x1]
      , CC = C7[0x2]
      , CM = k2(C8, C9, CC, C5)
      , Ca = K2(CM, 0x3)
      , CW = Ca[0x0]
      , CU = Ca[0x1]
      , CR = Ca[0x2]
      , CP = P2(C3).length
      , Cz = P2(C4)['length']
      , CA = G2(z3(C4))
      , CG = G2(A2(C4))
      , Cj = C3['length']
      , CL = G2(Math['min']['apply'](Math, R(C8)))
      , CE = G2(Math['max']['apply'](Math, R(C8)))
      , CQ = G2(z3(C8))
      , Ck = G2(A2(C8))
      , Cl = P2(C8)['length']
      , Ch = G2(j2(C8, 0x19))
      , CK = G2(j2(C8, 0x4b))
      , Cu = G2(Math['min']['apply'](Math, R(C9)))
      , CX = G2(Math['max']['apply'](Math, R(C9)))
      , CT = G2(z3(C9))
      , Cs = G2(A2(C9))
      , Cm = P2(C9)['length']
      , Cp = G2(j2(C9, 0x19))
      , CO = G2(j2(C9, 0x4b))
      , CN = G2(Math['min']['apply'](Math, R(CC)))
      , Ct = G2(Math['max']['apply'](Math, R(CC)))
      , CJ = G2(z3(CC))
      , Cq = G2(A2(CC))
      , CS = P2(CC)['length']
      , CV = G2(j2(CC, 0x19))
      , Cy = G2(j2(CC, 0x4b))
      , Cn = G2(Math['min']['apply'](Math, R(CW)))
      , Ce = G2(Math['max']['apply'](Math, R(CW)))
      , Ci = G2(z3(CW))
      , Cx = G2(A2(CW))
      , CF = P2(CW)['length']
      , Cb = G2(j2(CW, 0x19))
      , Cc = G2(j2(CW, 0x4b))
      , Cv = G2(Math['min']['apply'](Math, R(CU)))
      , Cf = G2(Math['max']['apply'](Math, R(CU)))
      , CY = G2(z3(CU))
      , Cw = G2(A2(CU))
      , CD = P2(CU)['length']
      , CB = G2(j2(CU, 0x19))
      , Co = G2(j2(CU, 0x4b))
      , CI = G2(Math['min']['apply'](Math, R(CR)))
      , Cr = G2(Math['max']['apply'](Math, R(CR)))
      , CZ = G2(z3(CR))
      , CH = G2(A2(CR))
      , Cd = P2(CR)['length']
      , Cg = G2(j2(CR, 0x19))
      , M0 = G2(j2(CR, 0x4b));
    return [CP, Cz, CA, CG, Cj, CL, CE, CQ, Ck, Cl, Ch, CK, Cu, CX, CT, Cs, Cm, Cp, CO, CN, Ct, CJ, Cq, CS, CV, Cy, Cn, Ce, Ci, Cx, CF, Cb, Cc, Cv, Cf, CY, Cw, CD, CB, Co, CI, Cr, CZ, CH, Cd, Cg, M0];
}

function GUuid(j, L) {
    var E = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'['split']('')
      , Q = []
      , k = void 0x0;
    if (L = L || E.length,
    j) {
        for (k = 0x0; k < j; k++)
            Q[k] = E[0x0 | Math['random']() * L];
    } else {
        var l = void 0x0;
        for (Q[0x8] = Q[0xd] = Q[0x12] = Q[0x17] = '-',
        Q[0xe] = '4',
        k = 0x0; k < 0x24; k++)
            Q[k] || (l = 0x0 | 0x10 * Math.random(),
            Q[k] = E[0x13 === k ? 0x3 & l | 0x8 : l]);
    }
    return Q.join('');
}

function C22() {
    var Ci = {
        'suffix': 'kz2o4e',
        'code': keyMap['0x24d'],
        'pos': [0x8, 0xf, 0x11, 0x19, 0x1b, 0x1d]
    } || {}
      , Cx = Ci['code']
      , CF = Ci['pos']
      , Cb = GUuid(0x20);
    if (Cx && CF && Array.isArray(CF)) {
        for (var Cc = Cb.split(''), Cv = 0x0; Cv < CF.length; Cv++)
            Cc[CF[Cv]] = Cx[Cv];
        Cb = Cc.join('');
    }
    return CC(Cb);
}

function Cl(CH) {
    var CY = "aZbY0cXdW1eVf2Ug3Th4SiR5jQk6PlO7mNn8MoL9pKqJrIsHtGuFvEwDxCyBzA";
    for (var Cd = [], Cg = 0; Cg < CH; Cg++) {
        var M0 = Math.random() * 62;
        M0 = Math.floor(M0),
        Cd['push'](CY['charAt'](M0));
    }
    return Cd['join']("");
}

function CX(CH, Cd) {
    for (var Cg = [], M0 = 0; M0 < Cd; M0++)
        Cg['push'](CH);
    return Cg['join']("");
}

function CK(CH) {
    var Cd = [LL[0x89], LL[0xb9], LL[0x88], LL[0x6e], LL[0xa2], LL[0xa9], LL[0x180]]
      , Cg = LL[0x0];
    if (null == CH || void 0x0 == CH)
        return CH;
    if (("undefined" == typeof CH ? "undefined" : typeof CH) == [LL[0x129], LL[0xe3], LL[0x7d]]['join'](LL[0x0])) {
        Cg += LL[0x90];
        for (var M0 = 0; M0 < Cd.length; M0++)
            if (CH['hasOwnProperty'](Cd[M0])) {
                var M1 = LL[0x1f] + Cd[M0] + LL[0x10d]
                  , M2 = LL[0x0] + CH[Cd[M0]];
                M2 = null == M2 || void 0x0 == M2 ? M2 : M2['replace'](/'/g, LL[0x1cf])['replace'](/"/g, LL[0x1a]),
                Cg += M1 + M2 + LL[0xc3];
            }
        return Cg['charAt'](Cg.length - 1) == LL[0x24] && (Cg = Cg['substring'](0, Cg.length - 1)),
        Cg += LL[0x91];
    }
    return null;
}

function C66(CH) {
    var Cd = [];
    return Cd[0x0] = CH >>> QQ[0x41] & QQ[0x122],
    Cd[0x1] = CH >>> QQ[0x31] & QQ[0x122],
    Cd[0x2] = CH >>> QQ[0x1d] & QQ[0x122],
    Cd[0x3] = CH & QQ[0x122],
    Cd;
}

function C9(CH) {
    var Cn = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    var Qj = getCC
      , Cd = [];
    return Cd[Qj(0x813)](Cn[CH >>> QQ[0xe] & QQ[0x2f]]),
    Cd['push'](Cn[CH & QQ[0x2f]]),
    Cd['join'](LL[0x0]);
}

function C222(CH) {
    var Cd = QQ[0x18a];
    if (null != CH) {
        for (var Cg = QQ[0x6]; Cg < CH[getCC(0x735)]; Cg++)
            Cd = Cd >>> QQ[0x1d] ^ Cee[(Cd ^ CH[Cg]) & QQ[0x122]];
    }
    if (CH = C66(Cd ^ QQ[0x18a]),
    Cd = CH[getCC(0x735)],
    null == CH || Cd < QQ[0x6])
        CH = new String(LL[0x0]);
    else {
        Cg = [];
        for (var M0 = QQ[0x6]; M0 < Cd; M0++)
            Cg['push'](C9(CH[M0]));
        CH = Cg[getCC(0x819)](LL[0x0]);
    }
    return CH;
}

function C77(CH) {
    if (null == CH || void 0x0 == CH)
        return CH;
    CH = encodeURIComponent(CH);
    for (var Cd = [], Cg = CH.length, M0 = 0; M0 < Cg; M0++)
        if (CH.charAt(M0) == "%") {
            if (!(M0 + 2 < Cg))
                throw Error(LL[0x94]);
            Cd.push(C88(CH['charAt'](++M0) + LL[0x0] + CH['charAt'](++M0))[0x0]);
        } else
            Cd['push'](CH['charCodeAt'](M0));
    return Cd;
}

function C88(CH) {
    if (null == CH || CH['length'] == 0)
        return [];
    CH = new String(CH);
    for (var Cd = [], Cg = CH['length'] / 2, M0 = 0, M1 = 0; M1 < Cg; M1++) {
        var M2 = parseInt(CH.charAt(M0++), 16) << 4
          , M3 = parseInt(CH.charAt(M0++), 16);
        Cd[M1] = CW(M2 + M3);
    }
    return Cd;
}

function CW(CH) {
    if (CH < QQ[0x119])
        return CW(QQ[0x11a] - (QQ[0x119] - CH));
    if (CH >= QQ[0x119] && CH <= QQ[0x111])
        return CH;
    if (CH > QQ[0x111])
        return CW(QQ[0x11b] + CH - QQ[0x111]);
    throw Error(LL[0x8a]);
}

function C11(CH) {
    var QU = getCC
      , Cd = [], Q = QQ, L = LL, CF = 64;
    if (null == CH || void 0x0 == CH || CH['length'] == Q[0x6])
        return C4(CF);
    if (CH[QU(0x735)] >= CF) {
        Cd = Q[0x6];
        var Cg = [];
        if (null != CH && CH[QU(0x735)] != Q[0x6]) {
            if (CH[QU(0x735)] < CF)
                throw Error(L[0x87]);
            for (var M0 = Q[0x6]; M0 < CF; M0++)
                Cg[M0] = CH[Cd + M0];
        }
        return Cg;
    }
    for (Cg = Q[0x6]; Cg < CF; Cg++)
        Cd[Cg] = CH[Cg % CH[QU(0x735)]];
    return Cd;
}

function CCC(CH, Cd) {
    var QL = getCC, Q = QQ;
    if (null == CH || null == Cd || CH[QL(0x735)] != Cd[QL(0x735)])
        return CH;
    for (var Cg = [], M0 = Q[0x6], M1 = CH['length']; M0 < M1; M0++)
        Cg[M0] = CMM(CH[M0], Cd[M0]);
    return Cg;
}

function CMM(CH, Cd) {
    return CH = CW(CH),
    Cd = CW(Cd),
    CW(CH ^ Cd);
}

function C44(CH) {
    var Q = QQ;
    for (var Cd = [], Cg = Q[0x6]; Cg < CH; Cg++)
        Cd[Cg] = Q[0x6];
    return Cd;
}

function C55(CH, Cd, Cg, M0, M1) {
    var Qz = getCC, L = LL, Q = QQ;
    if (null == CH || CH[Qz(0x735)] == Q[0x6])
        return Cg;
    if (null == Cg)
        throw Error(L[0x85]);
    if (CH[Qz(0x735)] < M1)
        throw Error(L[0x87]);
    for (var M2 = Q[0x6]; M2 < M1; M2++)
        Cg[M0 + M2] = CH[Cd + M2];
    return Cg;
}

function Ca(CH, Cd) {
    return CW(CH + Cd);
}

function C00(CH) {
    var QW = getCC, Q = QQ, Ci = Cii;
    if (null == CH)
        return null;
    for (var Cd = [], Cg = Q[0x6], M0 = CH[QW(0x735)]; Cg < M0; Cg++) {
        var M1 = CH[Cg];
        Cd[Cg] = Ci[(M1 >>> Q[0xe] & Q[0x2f]) * Q[0x31] + (M1 & Q[0x2f])];
    }
    return Cd;
}

function C33(CH, Cd, Cg) {
    var QP = getCC, L = LL, Q = QQ
      , M0 = [L[0x2d], L[0x2f], L[0x2b], L[0x63], L[0x5c], L[0x47], L[0x70], L[0x51], L[0x8c], L[0x4c], L[0x5f], L[0x5d], L[0x88], L[0x6c], L[0x58], L[0x75], L[0x6d], L[0x36], L[0x83], L[0x50], L[0x4d], L[0x52], L[0x32], L[0x69], L[0x46], L[0x74], L[0x5b], L[0x89], L[0x4f], L[0x2a], L[0x40], L[0x65], L[0x8b], L[0x37], L[0x5a], L[0x41], L[0x73], L[0x2c], L[0x42], L[0x55], L[0x8e], L[0x48], L[0x53], L[0x67], L[0x76], L[0x6b], L[0x78], L[0x49], L[0x8f], L[0x2e], L[0x34], L[0x7c], L[0x86], L[0x6e], L[0x3f], L[0x7f], L[0x57], L[0x23], L[0x4b], L[0x4e], L[0x3e], L[0x31], L[0x79], L[0x77]]
      , M1 = L[0x44]
      , M2 = [];
    if (Cg == Q[0x213]) {
        Cg = CH[Cd];
        var M3 = Q[0x6];
        M2['push'](M0[Cg >>> Q[0x7] & Q[0x90]]),
        M2[QP(0x813)](M0[(Cg << Q[0xe] & Q[0x71]) + (M3 >>> Q[0xe] & Q[0x2f])]),
        M2['push'](M1),
        M2[QP(0x813)](M1);
    } else {
        if (Cg == Q[0x7])
            Cg = CH[Cd],
            M3 = CH[Cd + Q[0x213]],
            CH = Q[0x6],
            M2[QP(0x813)](M0[Cg >>> Q[0x7] & Q[0x90]]),
            M2[QP(0x813)](M0[(Cg << Q[0xe] & Q[0x71]) + (M3 >>> Q[0xe] & Q[0x2f])]),
            M2[QP(0x813)](M0[(M3 << Q[0x7] & Q[0x8b]) + (CH >>> Q[0x15] & Q[0xa])]),
            M2[QP(0x813)](M1);
        else {
            if (Cg != Q[0xa])
                throw Error(L[0x71]);
            Cg = CH[Cd],
            M3 = CH[Cd + Q[0x213]],
            CH = CH[Cd + Q[0x7]],
            M2[QP(0x813)](M0[Cg >>> Q[0x7] & Q[0x90]]),
            M2[QP(0x813)](M0[(Cg << Q[0xe] & Q[0x71]) + (M3 >>> Q[0xe] & Q[0x2f])]),
            M2['push'](M0[(M3 << Q[0x7] & Q[0x8b]) + (CH >>> Q[0x15] & Q[0xa])]),
            M2['push'](M0[CH & Q[0x90]]);
        }
    }
    return M2[QP(0x819)](L[0x0]);
}

function CO() {
    var QY = getCC;
    var Cv = "14731255234d414cF91356d684E4E8F5F56c8f1bc";
    var CH = !0x0
      , Cd = {
        'v': "v1.1"
    }
    , Cg = null, Cx = 64, Cb = 4, Cc = 4
    Cd['h'] = "music.163.com";
    var M0 = new Date().getTime() + 900000, M1 = M0 + 1000 * 60 * 60 * 24 * 30;
    Cd['u'] = Cl(3) + M0 + Cl(3);
    try {
        var M2 = ['16003344383240', "13142614903142"];
        null != M2 && void 0x0 != M2 && M2['length'] > 0 ? Cd['fp'] = M2['join'](',') : (Cd['fp'] = CX("0", 10),
        Cd['ec'] = "1",
        CH = !0x1);
    } catch (Mn) {
        Cd[LL[0xb9]] = CX(LL[0x2b], ""),
        Cd[LL[0xa2]] = LL[0x2c],
        CH = !0x1;
    }
    try {
        var M3 = Cg = CK(Cd);
        if (Cd = Cv,
        null == Cd || void 0x0 == Cd)
            throw Error(LL[0x7a]);
        null != M3 && void 0x0 != M3 || (M3 = LL[0x0]),
        M2 = M3;
        var M4 = C222(null == M3 ? [] : C77(M3))
          , M5 = C77(M2 + M4)
          , M6 = C77(Cd);
        null == M5 && (M5 = []),
        M4 = [];
        for (var M7 = QQ[0x6]; M7 < Cc; M7++) {
            var M8 = Math['random']() * QQ[0x124];
            M8 = Math[QY(0x7ea)](M8),
            M4[M7] = CW(M8);
        }
        if (M6 = C11(M6),
        M6 = CCC(M6, C11(M4)),
        M7 = M6 = C11(M6),
        M8 = M5,
        null == M8 || void 0x0 == M8 || M8[QY(0x735)] == QQ[0x6])
            var M9 = C44(Cx);
        else {
            var MC = M8['length']
              , MM = MC % Cx <= Cx - Cb ? Cx - MC % Cx - Cb : Cx * QQ[0x7] - MC % Cx - Cb;
            M5 = [],
            C55(M8, QQ[0x6], M5, QQ[0x6], MC);
            for (var Ma = QQ[0x6]; Ma < MM; Ma++)
                M5[MC + Ma] = QQ[0x6];
            var MW = C66(MC);
            C55(MW, QQ[0x6], M5, MC + MM, Cb),
            M9 = M5;
        }
        if (MC = M9,
        null == MC || MC[QY(0x735)] % Cx != QQ[0x6])
            throw Error(LL[0x84]);
        M9 = [];
        for (var MU = QQ[0x6], MR = MC[QY(0x735)] / Cx, MP = QQ[0x6]; MP < MR; MP++) {
            M9[MP] = [];
            for (var Mz = QQ[0x6]; Mz < Cx; Mz++)
                M9[MP][Mz] = MC[MU++];
        }
        MU = [],
        C55(M4, QQ[0x6], MU, QQ[0x6], Cc);
        for (var MA = M9['length'], MG = QQ[0x6]; MG < MA; MG++) {
            var Mj = M9[MG];
            if (null == Mj)
                var ML = null;
            else {
                var ME = CW(QQ[0x59]);
                MR = [];
                for (var MQ = Mj[QY(0x735)], Mk = QQ[0x6]; Mk < MQ; Mk++)
                    MR[QY(0x813)](CMM(Mj[Mk], ME));
                ML = MR;
            }
            if (MR = ML,
            null == MR)
                var Ml = null;
            else {
                var Mh = CW(QQ[0x58]);
                MP = [];
                for (var MK = MR[QY(0x735)], Mu = QQ[0x6]; Mu < MK; Mu++)
                    MP[QY(0x813)](CMM(MR[Mu], Mh--));
                Ml = MP;
            }
            if (MR = Ml,
            null == MR)
                var MX = null;
            else {
                var MT = CW(QQ[0x6b]);
                MP = [];
                for (var Ms = MR[QY(0x735)], Mm = QQ[0x6]; Mm < Ms; Mm++)
                    MP['push'](Ca(MR[Mm], MT++));
                MX = MP;
            }
            var Mp = CCC(MX, M6);
            if (MR = Mp,
            MP = M7,
            null == MR)
                var MO = null;
            else {
                if (null == MP)
                    MO = MR;
                else {
                    Mz = [];
                    for (var MN = MP['length'], Mt = QQ[0x6], MJ = MR[QY(0x735)]; Mt < MJ; Mt++)
                        Mz[Mt] = CW(MR[Mt] + MP[Mt % MN]);
                    MO = Mz;
                }
            }
            Mp = CCC(MO, M7);
            var Mq = C00(Mp);
            Mq = C00(Mq),
            C55(Mq, QQ[0x6], MU, MG * Cx + Cc, Cx),
            M7 = Mq;
        }
        if (null == MU || void 0x0 == MU)
            var MS = null;
        else {
            if (MU['length'] == QQ[0x6])
                MS = LL[0x0];
            else {
                var MV = QQ[0xa];
                try {
                    MA = [];
                    for (var My = QQ[0x6]; My < MU[QY(0x735)]; ) {
                        if (!(My + MV <= MU['length'])) {
                            MA['push'](C33(MU, My, MU['length'] - My));
                            break;
                        }
                        MA[QY(0x813)](C33(MU, My, MV)),
                        My += MV;
                    }
                    MS = MA['join'](LL[0x0]);
                } catch (Me) {
                    throw Error(LL[0x71]);
                }
            }
        }
        Cg = MS;
    } catch (Mi) {
        Cg = CK({
            'ec': LL[0x2d],
            'em': Mi[LL[0xc5]]
        }),
        CH = !0x1;
    }
    Cg = Cg + LL[0x39] + M0;
    return Cg;
}

// ---------------------------------
// 生成fingerprint
function generateFingerprint() {
    return CO();
}

// _atomTraceData是拉拽轨迹，是在前端认证码操作界面从头拉到尾的数据集；offset是原图像素，前端渲染的图片宽度为320像素，因此需要转换
// 两者拉拽时，并不是同时按比例移动，而是分为三个阶段；
// 其一是当下方滑块拉动距离超过上方缺块的宽度时；其二是当下方滑块的可移动距离超过上方缺块的可移动距离时；最后是介于前两种的中间状态，此时，两者的差距都在11px之间
// 注意，虽然同为像素，但11px和4px标准是不一样的：11像素以前端渲染的宽度为参照，而4像素是以图片的原本宽度为参照，即480px
function _generateParameters(token, offset, deviceToken, captchaId, _atomTraceData, scale, PX_11) {
    const atomTraceData = filter(_atomTraceData, parseInt('' + (offset * scale + PX_11)));
    // console.log(atomTraceData.length, atomTraceData.slice(atomTraceData.length - 40))
    const traceData = generateTraceData(token, atomTraceData);
    const H = sample(traceData);
    // 计算百分百：offset * scale / 320；下方滑块的偏移量会比缺块的偏移量大一些
    const C1 = CC(C8(token, parseInt(offset * scale + '') / 320 * 0x64 + ''));
    const C2 = h(unique2DArray(atomTraceData, 0x2));
    const params = {
        data: JSON.stringify({
            d: CC(H.join(":")),
            m: '',
            p: C1,
            f: CC(C8(token, C2.join(','))),
            ext: CC(C8(token, '1,' + traceData.length))
        }),
        'id': captchaId,
        'token': token, // 这个是从获取认证码接口返回的
        'acToken': undefined,
        'width': 320,
        'type': 2,
        'version': "2.27.2",
        'cb': C22(),
        'extraData': "",
        'bf': 0,
        'runEnv': 10,
        'sdkVersion': undefined,
        'iv': 4,
        dt: deviceToken,
        referer: 'https://music.163.com/#/download',
        zoneId: "CN31",
        "callback": "__JSONP_" + Math.random().toString(0x24).slice(0x2, 0x9) + "_1"
    };
    let r2 = [];
    for (let k in params)
        r2.push(encodeURIComponent(k) + '=' + encodeURIComponent(params[k]));
    return r2.join('&');
}

// 生成url参数
function generateParameters(token, offset, deviceToken) {
    const captchaId = "73a18dc827b24b18ad0783701a75277d";
    const scale = 2 / 3;
    const PX_4 = 4;
    return _generateParameters(token, offset + PX_4, deviceToken, captchaId, atomTraceData, scale);
}