package com.err0l.spring.debug2;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

@Controller
public class TestController {

    @GetMapping("/test1")
    @ResponseBody
    public Map<String, String> test1() {
        Map<String, String> map = new HashMap<>();
        map.put("key", "hello");
        map.put("value", "world");
        return map;
    }

    @GetMapping(value = "/test2")
    public ModelAndView test2() {
        final ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("hello");
        return modelAndView;
    }
}
