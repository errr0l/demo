import io
import math
import random
import re

import execjs
import json
import requests
from PIL import Image, ImageDraw
import cv2
import numpy as np
import execjs._runner_sources as _runner_sources
from urllib.parse import urlencode

local_node_runtime = execjs.ExternalRuntime(
    name="Node.js (V8)",
    command='',
    encoding='UTF-8',
    runner_source=_runner_sources.Node
)
local_node_runtime._binary_cache = ['/usr/local/bin/node']
local_node_runtime._available = True
execjs.register('node1', local_node_runtime)

node = execjs.get('node1')


with open('./js/captcha.js') as _f:
    content = _f.read()
    captcha_js_ctx = node.compile(content)


def collect(image, start_x=0, start_y=0, offset_x=-20, offset_y=0):
    """
    采集滑块边沿像素点坐标，可根据需要传入遍历的起始位置及偏移量，以优化执行效果

    :param image 图片流数据
    :param start_x x轴起始位置
    :param start_y y轴起始位置
    :param offset_x x轴偏移量
    :param offset_y y轴偏移量
    :returns list
    """
    gray = image.convert("L")
    threshold = 127
    table = [0 if _ < threshold else 1 for _ in range(256)]
    image = gray.point(table, "1")
    _size = image.size
    pos_list = []
    end_x = _size[0] + offset_x
    for y in range(start_y, _size[1] + offset_y, 4):
        for x in range(start_x, end_x):
            if image.getpixel((x, y)) != 0:
                _x = x + 1
                while _x < end_x and image.getpixel((_x, y)) == 0:
                    _x += 1
                pos_list.append((_x, y))
                break
    return pos_list


def match(image, pos_list, start_x=0, offset_x=0):
    """
    匹配边沿像素点坐标

    :param pos_list 滑块边沿坐标
    :param start_x x轴起始位置
    :param offset_x y轴起始位置
    :returns dict
    """
    blurred = cv2.GaussianBlur(image, (5, 5), 0)
    canny = cv2.Canny(blurred, 200, 300)
    _size = canny.shape
    _len = len(pos_list)
    record = None
    for x in range(start_x, _size[1] + offset_x, 3):
        pos_list2 = []
        matched = False
        count = 0
        for i in range(0, _len):
            x0, y0 = pos_list[i]
            _x = x0 + x
            pixel = canny[y0, _x]
            if pixel == 255:
                pos_list2.append((_x, y0, True))
            else:
                for deviation in range(1, 3):
                    pixel = canny[y0, _x + deviation]
                    if pixel == 255:
                        pos_list2.append((_x + deviation, y0, True))
                        break
                if pixel == 0:
                    pos_list2.append((_x, y0, False))
            if len(pos_list2) > _len / 2:
                _count = 0
                _count2 = 0
                for pos in pos_list2:
                    if pos[2]:
                        _count += 1
                    else:
                        _count2 += 1
                count = _count
                if _count >= int(_len * 0.8):
                    matched = True
                    break
                if _count2 >= int(_len * 0.5):
                    matched = False
                    break
        if matched:
            record = {'offset': x, 'pos': pos_list2, 'type': 'matched'}
            break
        elif record is None or record['count'] < count:
            record = {'offset': x, 'pos': pos_list2, 'type': 'not_matched', 'count': count}
    return record


def get_conf():
    """
    获取配置信息，dt(deviceToken等)等，返回值可以持续使用

    curl 'https://c.dun.163yun.com/api/v2/getconf?referer=https%3A%2F%2Fmusic.163.com%2F%23%2Fdownload&zoneId=&id=73a18dc827b24b18ad0783701a75277d&ipv6=false&runEnv=10&iv=4&loadVersion=2.5.0&lang=zh-CN&callback=__JSONP_e6zkt7z_6' \
      -H 'Accept: */*' \
      -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8' \
      -H 'Cache-Control: no-cache' \
      -H 'Connection: keep-alive' \
      -H 'Pragma: no-cache' \
      -H 'Referer: https://music.163.com/' \
      -H 'Sec-Fetch-Dest: script' \
      -H 'Sec-Fetch-Mode: no-cors' \
      -H 'Sec-Fetch-Site: cross-site' \
      -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36' \
      -H 'sec-ch-ua: "Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"' \
      -H 'sec-ch-ua-mobile: ?0' \
      -H 'sec-ch-ua-platform: "macOS"'
    """
    pass


def get_captcha(dt, token):
    """
    获取验证码(url、token、cookies)

    :param dt 设备id，可通过get_conf()获取；
    """
    params = {
        "referer": "https://music.163.com/#/download",
        "zoneId": "CN31",
        "dt": dt,
        "acToken": "9ca17ae2e6fecda16ae2e6eeb5cb528ab69db8ea65bcaeaf9ad05b9c94a3a3c434898987d2b25ef4b2a983bb2af0feacc3b92ae2f4ee95a132e29aa3b1cd72abae8cd1d44eb0b7bb82f55bb08fa3afd437fffeb3",
        "id": "73a18dc827b24b18ad0783701a75277d",
        "fp": captcha_js_ctx.call('generateFingerprint'),
        "https": "true",
        "type": "undefined",
        "version": "2.27.2",
        "dpr": 2,
        "dev": 1,
        "cb": captcha_js_ctx.call('C22'),
        "ipv6": "false",
        "runEnv": 10, "group": "",
        "scene": "", "lang": "zh-CN",
        "sdkVersion": "undefined", "iv": 4,
        "width": 320, "audio": "false",
        "sizeType": 10, "smsVersion": "v3",
        "token": token,
        'callback': f'__JSONP_m3ilehc_{random.randint(1, 9)}'
    }
    headers = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Host": "c.dun.163.com",
        "Referer": "https://music.163.com/",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) "
                      "Chrome/128.0.0.0 Safari/537.36",
    }
    r = requests.get(f'https://c.dun.163.com/api/v3/get?{urlencode(params)}', headers=headers)
    cookies = r.cookies.get_dict()
    pattern = re.compile(r'__JSONP_.*?\((.*?)\)')
    r = json.loads(pattern.match(r.text).group(1))
    return {
        'cookies': cookies,
        'bg': r.get('data').get('bg')[0],
        'front': r.get('data').get('front')[0],
        'token': r.get('data').get('token')
    }


def get_offset(bg, front):
    """
    获取缺口偏移量；由于是链接，因此还需在方法内获取图片

    :param bg 背景url
    :param front 滑块url
    """
    front_resp = requests.get(front)
    front = Image.open(io.BytesIO(front_resp.content))
    pos_list = collect(front)
    bg_resp = requests.get(bg)
    bg = np.asarray(bytearray(bg_resp.content), dtype="uint8")
    bg_image = cv2.imdecode(bg, cv2.IMREAD_COLOR)
    return match(bg_image, pos_list, start_x=90, offset_x=-90)


def login():
    url = "https://music.163.com/weapi/login/cellphone"
    r = requests.post(url)
    print(r.text)


if __name__ == '__main__':
    dt = "RE+Yi5ZI1vFBAgVQVFOGWtVNhsdVskhv"
    token = ""
    captcha_resp = get_captcha(dt, token)
    print(captcha_resp)
    offset_resp = get_offset(captcha_resp.get('bg'), captcha_resp.get('front'))
    if offset_resp is not None:
        offset = offset_resp.get('offset')
        token = captcha_resp.get('token')
        url = "https://c.dun.163.com/api/v3/check?"
        url += captcha_js_ctx.call('generateParameters', token, offset, dt)
        headers = {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
            'referer': 'https://music.163.com/',
            'Sec-Fetch-Dest': 'script',
            'Accept': '*/*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Sec-Fetch-Mode': 'no-cors',
            'Sec-Fetch-Site': 'same-site',
            'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"'
        }
        r = requests.get(url, headers=headers)
        print(r.text)
