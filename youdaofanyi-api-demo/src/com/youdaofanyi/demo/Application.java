package com.youdaofanyi.demo;

import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;

public class Application {

    private static final String YOUDAO_URL = "https://openapi.youdao.com/api";

    private static final String APP_KEY = "你的应用实例id";

    private static final String APP_SECRET = "你的秘钥";

    public static void main(String[] args) throws NoSuchAlgorithmException {
        // 添加请求参数
        Map<String, String[]> params = createRequestParams();
        // 添加鉴权相关参数
        AuthV3Util.addAuthParams(APP_KEY, APP_SECRET, params);
        byte[] result = HttpUtil.doPost(YOUDAO_URL, null, params, "application/json");
        if (result != null) {
            String str = new String(result, StandardCharsets.UTF_8);
            Map<String, Object> r = JSON.parseObject(str);
            System.out.println(r);
            if (r.get("errorCode").equals("0")) {
                List<String> translation = (List<String>) r.get("translation");
                System.out.println(translation.get(0));
            }
        }
        System.exit(1);
    }

    private static Map<String, String[]> createRequestParams() {
        String q = "What is taught in succubus school classes?";
        String from = "en";
        String to = "zh-CHS";

        return new HashMap<String, String[]>() {{
            put("q", new String[]{q});
            put("from", new String[]{from});
            put("to", new String[]{to});
        }};
    }
}