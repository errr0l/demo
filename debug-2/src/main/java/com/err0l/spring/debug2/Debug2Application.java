package com.err0l.spring.debug2;

import org.apache.catalina.Context;
import org.apache.catalina.LifecycleException;
import org.apache.catalina.startup.Tomcat;
import org.apache.tomcat.util.descriptor.web.ErrorPage;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

public class Debug2Application {
    public static void main(String[] args) throws LifecycleException {
        // 启动嵌入式 Tomcat
        Tomcat tomcat = new Tomcat();
        tomcat.setPort(8080);
        // 触发 Connector 初始化
        tomcat.getConnector();

        // 创建 Spring 上下文
        AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
        context.register(AppConfig.class);

        // 添加 DispatcherServlet
        DispatcherServlet servlet = new DispatcherServlet(context);
        Context ctx = tomcat.addContext("", null);
        final ErrorPage errorPage = new ErrorPage();
        errorPage.setLocation("/error");
        ctx.addErrorPage(errorPage);
        Tomcat.addServlet(ctx, "dispatcher", servlet);
        ctx.addServletMappingDecoded("/", "dispatcher");

        // 启动 Tomcat
        tomcat.start();
        tomcat.getServer().await();
    }
}
