package com.treemaker.demo;

import java.util.List;

import com.alibaba.fastjson.annotation.JSONField;

public class TestCategory implements TreeMaker.TreeNode<TestCategory> {
    private Integer id;
    private Integer pId;
    private String categoryName;
    private List<TestCategory> children;

    public TestCategory() {}

    public TestCategory(Integer id, String categoryName, Integer pId) {
        this.id = id;
        this.categoryName = categoryName;
        this.pId = pId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPId() {
        return pId;
    }

    public void setPId(Integer pId) {
        this.pId = pId;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
    public String getCategoryName() {
        return categoryName;
    }

    @JSONField(serialize = false)
    public boolean isRootNode() {
        return pId.equals(-1);
    }

    public boolean isParentNode(TestCategory node) {
        return id.equals(node.pId);
    }

    public void setChildren(List<TestCategory> children) {
        this.children = children;
    }

    public List<TestCategory> getChildren() {
        return children;
    }
}