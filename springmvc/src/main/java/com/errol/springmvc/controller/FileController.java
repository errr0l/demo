package com.errol.springmvc.controller;

import com.alibaba.fastjson.JSON;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RequestMapping("/api/file")
@RestController
public class FileController {

    @PostMapping("/image/upload")
    public void upload(MultipartFile file, HttpServletResponse response) throws IOException {
        String classpath = ResourceUtils.getFile("classpath:").getPath();
        File imageFolder = new File(classpath + "/static/image/");

        if (!imageFolder.exists()) {
            if (!imageFolder.mkdirs()) {
                throw new RuntimeException("上传图片错误");
            }
        }
        String originalFilename = file.getOriginalFilename();
        String suffix = originalFilename.substring(originalFilename.indexOf("."));
        String fileName = imageFolder.getAbsoluteFile() + File.separator + UUID.randomUUID() + suffix;
        //String fileName2 = imageFolder.getAbsoluteFile() + File.separator + UUID.randomUUID() + "--2" + suffix;
        //FileOutputStream fos = new FileOutputStream(fileName2);
        //InputStream inputStream = file.getInputStream();
        //byte[] bytes = new byte[1024];
        //int len;
        //while ((len = inputStream.read(bytes)) != -1) {
        //    fos.write(bytes, 0, len);
        //}
        //fos.flush();
        //fos.close();
        //inputStream.close();

        file.transferTo(new File(fileName));

        Map<String, Object> r = new HashMap<>();
        r.put("message", "ok");
        r.put("code", 0);
        response.getWriter().write(JSON.toJSONString(r));
    }
}
