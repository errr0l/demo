package com.treemaker.demo;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class TreeMaker {
    public interface TreeNode<T> {
        void setChildren(List<T> children);
        boolean isRootNode(); // 是否为根节点
        boolean isParentNode(T node); // 判断当前节点是否为传入节点的父节点
    }

    public static <T extends TreeNode<T>> List<T> make(List<T> list) {
        if (list == null || list.size() == 0) {
            return new ArrayList<>();
        }
        List<T> rootNodes = list.stream().filter(T::isRootNode).collect(Collectors.toList());
        list.removeAll(rootNodes);

        List<T> toRemove = new ArrayList<>();
        for (T rootNode : rootNodes) {
            makeChildren(rootNode, list, toRemove);
            if (toRemove.size() > 0) {
                // 将已经处理过的节点从列表中删除
                list.removeAll(toRemove);
                toRemove.clear();
            }
        }

        return rootNodes;
    }

    private static <T extends TreeNode<T>> List<T> makeChildren(T parent, List<T> list, List<T> toRemove) {

        List<T> children = new ArrayList<>();

        for (T node : list) {
            if (parent.isParentNode(node)) {
                toRemove.add(node);
                node.setChildren(makeChildren(node, list, toRemove));
                children.add(node);
            }
        }
        if (children.size() > 0) {
            parent.setChildren(children);
            return children;
        }

        return null;
    }
}