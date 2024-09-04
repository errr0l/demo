package com.treemaker.demo;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;

public class Test {
    public static void main(String[] args) {
        Test.example1();   
        example2();
    }

    /**
     * 测试方法1
     * ---
     * id/name/parent_id
     * ---
     * 1/node-1/null
     * 2/node-2/null
     * 3/node-3/1
     * 4/node-4/1
     * 5/node-5/4
     * 6/node-6/2
     * 7/node-7/5
     * 8/node-8/5
     * 9/node-9/2
     * 10/node-10/2
     */
    public static void example1() {
        List<TestNode> list = new ArrayList<>();

        TestNode n1 = new TestNode(1, "node-1", null);
        TestNode n2 = new TestNode(2, "node-2", null);
        list.add(n1);
        list.add(n2);

        TestNode n3 = new TestNode(3, "node-3", 1);
        TestNode n4 = new TestNode(4, "node-4", 1);
        TestNode n5 = new TestNode(5, "node-5", 4);
        TestNode n6 = new TestNode(6, "node-6", 2);
        TestNode n7 = new TestNode(7, "node-7", 5);
        TestNode n8 = new TestNode(8, "node-8", 5);
        TestNode n9 = new TestNode(9, "node-9", 2);
        TestNode n10 = new TestNode(10, "node-19", 2);

        list.add(n3);
        list.add(n4);
        list.add(n5);
        list.add(n6);
        list.add(n7);
        list.add(n8);
        list.add(n9);
        list.add(n10);

        List<TestNode> t = TreeMaker.make(list);

        // 使用fastjson将列表转为json字符串
        String treeJson = JSON.toJSONString(t, SerializerFeature.WriteMapNullValue);

        String path = "/Users/xieshixin/personalplace/demo/treeMaker-demo/tree.json";
        write(path, treeJson);
    }

    /**
     * 测试方法2
     * ---
     * id/category_name/p_id
     * ---
     * 1/数码/-1
     * 2/服装/-1
     * 3/手机/1
     * 4/笔记本/1
     * 5/耳机/1
     * 6/外套/2
     * 7/衬衫/2
     * 8/牛仔裤/2
     * 9/休闲裤/2
     * 10/电器/-1
     * 11/冰箱/10
     * 12/电磁炉/10
     */
    public static void example2() {
        List<TestCategory> list = new ArrayList<>();
        
        // 根节点
        TestCategory n1 = new TestCategory(1, "数码", -1);
        TestCategory n2 = new TestCategory(2, "服装", -1);
        TestCategory n3 = new TestCategory(10, "电器", -1);

        list.add(n1);
        list.add(n2);
        list.add(n3);

        TestCategory n4 = new TestCategory(3, "手机", 1);
        TestCategory n5 = new TestCategory(4, "笔记本", 1);
        TestCategory n6 = new TestCategory(5, "耳机", 1);
        TestCategory n7 = new TestCategory(6, "外套", 2);
        TestCategory n8 = new TestCategory(7, "衬衫", 2);
        TestCategory n9 = new TestCategory(8, "牛仔裤", 2);
        TestCategory n10 = new TestCategory(9, "休闲裤", 2);
        TestCategory n11 = new TestCategory(11, "冰箱", 10);
        TestCategory n12 = new TestCategory(12, "电磁炉", 10);

        list.add(n4); list.add(n5); list.add(n6); list.add(n7); list.add(n8); list.add(n9);
        list.add(n10); list.add(n11); list.add(n12);

        String path = "/Users/xieshixin/personalplace/demo/treeMaker-demo/category-tree.json";

        List<TestCategory> t = TreeMaker.make(list);

        String treeJson = JSON.toJSONString(t, SerializerFeature.WriteMapNullValue);
        write(path, treeJson);
    }

    public static void write(String path, String data) {
        Writer writer = null;
        
        try {
            writer = new FileWriter(path);
            writer.write(data);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}