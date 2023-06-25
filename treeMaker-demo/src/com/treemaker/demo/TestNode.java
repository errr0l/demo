package com.treemaker.demo;

import java.util.List;

import com.alibaba.fastjson.annotation.JSONField;

public class TestNode implements TreeMaker.TreeNode<TestNode> {
    private Integer id;
    private Integer parentId;
    private String name;
    private List<TestNode> children;

    public TestNode() {}

    public TestNode(Integer id, String name, Integer parentId) {
        this.id = id;
        this.name = name;
        this.parentId = parentId;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public Integer getId() {
        return id;
    }
    
    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }
    public Integer getParentId() {
        return parentId;
    }

    public void setName(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }

    @JSONField(serialize = false)
    public boolean isRootNode() {
        return parentId == null;
    }

    public boolean isParentNode(TestNode node) {
        return id.equals(node.parentId);
    }

    public void setChildren(List<TestNode> children) {
        this.children = children;
    }

    public List<TestNode> getChildren() {
        return children;
    }
}