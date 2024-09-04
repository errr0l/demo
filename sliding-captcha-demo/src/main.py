import cv2
from PIL import Image, ImageDraw


def collect(path, start_x=0, start_y=0, offset_x=0, offset_y=0):
    """
    采集滑块边沿像素点坐标，可根据需要传入遍历的起始位置及偏移量，以优化执行效果

    :param path 图片路径
    :param start_x x轴起始位置
    :param start_y y轴起始位置
    :param offset_x x轴偏移量
    :param offset_y y轴偏移量
    :returns list
    """
    gray = Image.open(path).convert("L")
    threshold = 127
    table = [0 if _ < threshold else 1 for _ in range(256)]
    image = gray.point(table, "1")
    image.show()
    _size = image.size
    pos_list = []
    for y in range(start_y, _size[1] + offset_y, 4):
        for x in range(start_x, _size[0] + offset_x):
            if image.getpixel((x, y)) != 0:
                _x = x
                while image.getpixel((_x + 1, y)) == 0:
                    _x += 1
                pos_list.append((_x, y))
                break
    return pos_list


def match(path, pos_list, start_x=0, offset_x=0):
    """
    匹配边沿像素点坐标

    :param path 图片路径
    :param pos_list 滑块边沿坐标
    :param start_x x轴起始位置
    :param offset_x y轴起始位置
    :returns dict
    """
    image = cv2.imread(path)
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


def draw(pos_list, image_path):
    image = cv2.imread(image_path)
    for pos in pos_list:
        cv2.circle(image, (pos[0], pos[1]), 3, (0, 255, 0))
    show_img(image)


def draw2(pos_list, image_path):
    image = Image.open(image_path)
    draw = ImageDraw.Draw(image)
    for pos in pos_list:
        # draw.point((pos[0], pos[1]), fill=(0, 255, 0))
        draw.circle((pos[0], pos[1]), fill=(0, 255, 0), width=3, radius=1.5)
    image.show()
    del draw


def patch(pos_list, x=0, y=0):
    """
    偏移坐标

    :param x x轴偏移量
    :param y y轴偏移量
    :returns list
    """
    if x == 0 and y == 0:
        return
    _pos_list = []
    for item in pos_list:
        _pos_list.append((item[0] + x, item[1] + y))
    return _pos_list


def show_img(img, title='untitled'):
    cv2.imshow(title, img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()


def convert_transparency_to_white(input_image_path, output_image_path):
    with Image.open(input_image_path) as img:
        # 将图像转换为RGBA模式
        img = img.convert("RGBA")
        datas = img.getdata()
        newData = []
        for item in datas:
            # 如果透明度为0，则像素为白色
            if item[3] == 0:
                newData.append((0, 0, 0, 0))
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(output_image_path, "PNG")


# 网易云
def test1():
    bg_path = "images/7-1.jpeg"
    slider_path = "images/7-2.png"
    pos_list = collect(slider_path)
    r = match(bg_path, pos_list, start_x=90, offset_x=-90)
    print(r)
    draw(r.get('pos'), bg_path)


# b站
def test2():
    bg_path = "images/6-1.png"
    slider_path = "images/6-2.png"
    pos_list = collect(slider_path)
    r = match(bg_path, pos_list, start_x=90, offset_x=-90)
    print(r)
    draw(r.get('pos'), bg_path)


# 极验
def test3():
    bg_path = "images/3-1.png"
    slider_path = "images/3-2.png"
    pos_list = collect(slider_path)
    pos_list = patch(pos_list, y=22)
    r = match(bg_path, pos_list, start_x=90, offset_x=-90)
    print(r)
    draw(r.get('pos'), bg_path)


# 豆瓣；其中，豆瓣的滑块图需要调用convert_transparency_to_white()方法处理
def test4():
    bg_path = "images/5-1.png"
    slider_path = "images/5-22222.png"
    pos_list = collect(slider_path, start_x=145, start_y=510, offset_y=-30)
    pos_list = patch(pos_list, 0, -510 + 233)
    r = match(bg_path, pos_list, start_x=90, offset_x=-90)
    print(r)
    draw(r.get('pos'), bg_path)


if __name__ == '__main__':
    test4()
