# neteasemusic-sliding-captcha-demo

本项目为滑动认证码逆向的案例，其中识别验证码缺口的方法为sliding-captcha-demo案例中定义的方法。

本demo主要分为两个部分：

1）请求认证码

2）校验

在执行结果中，以【result】为“true”及【validate】不为空时，表示校验通过，如下所示。

```bash
__JSONP_5g71aef_1({"data":{"result":true,"zoneId":"CN31","token":"b9398b216c254817a4e96a691690166d","validate":"ogMP2QM05Uc35eePTcG3io2nqEO2Jpqh5f1NP7wdhLe1D95bcH8ZWxerGc6U2No6Oo/FuHPtQFBhkQJgfVNfwK+iYRCmnjwQABS6iF2xBAPfwrL7cRzIOjaQd1p/JN/a1yfnA3BwTSHJCbLgflhhlvZRQvQoVDCDR9Gv289kc8Q="},"error":0,"msg":"ok"});
```


## 创建虚拟环境

项目依赖于Pillow、opencv-python两个库，其中后者比较难安装，最好是创建虚拟环境来运行该项目。

可参照sliding-captcha-demo中的步骤。

[点击跳转](../sliding-captcha-demo/readme.md)

## 其他

运行demo之前，请先修改一些文件，否则会运行失败。

1、neteasemusic-sliding-captcha-demo/src/js/data.js

```js
const { atomTraceData, LL, QQ, getCC, Cee, Cii } = require("修改为自己的路径/neteasemusic-sliding-captcha-demo/src/js/data.js");
```

2、neteasemusic-sliding-captcha-demo/src/main.py

```python
local_node_runtime._binary_cache = ['修改为自己的路径/node']
```