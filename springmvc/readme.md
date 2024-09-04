# springmvc

简约的spring-MVC项目，主要展示了MultipartResolver的配置和使用方式。

业务功能也比较简单，只有一个上传文件接口，负责接收前端发送的文件，并保存到项目根目录中，可以使用postman或其他可以发送ajax请求的工具进行测试。

## Web接口

### 1、上传文件

> /api/file/image/upload

请求方法：post

请求参数：

| 字段               | 描述       | 必填                                            |
| ------------------ | ---------- | ----------------------------------------------- |
| MultipartFile file | 上传的文件 | 是                                              |

请求参数类型：multipart/form-data

响应数据类型：application/json

响应数据：

```json
{
    "code": 0,
    "message": "ok!"
}
```