class Node {
  constructor(element, parent) {
    this.parent = parent;
    this.element = element;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor(compare) {
    this.root = null;
    this.size = 0;
    this.compare = compare || this.compare;
  }

  compare(a, b) {
    return a - b;
  }

  add(element) {
    if (this.root === null) {
      this.root = new Node(element, null);
      this.size++;
      return;
    }
    // 获取根节点 用当前添加的判断 放左边还是右边
    let currentNode = this.root;
    let compare;
    let parent = null;
    while (currentNode) {
      compare = this.compare(element, currentNode.element);
      parent = currentNode; // 先将父节点保存

      // currentNode 不断变化
      if (compare > 0) {
        currentNode = currentNode.right;
      } else if (compare < 0) {
        currentNode = currentNode.left;
      } else {
        currentNode.element = element; // 相等时先覆盖后续处理
      }
    }
    let newNode = new Node(element, parent);
    if (compare > 0) {
      parent.right = newNode;
    } else {
      parent.left = newNode;
    }
    this.size++;
  }

  //  层序遍历
  levelOrdrerTraversal(visitor) {
    if (this.root === null) {
      return;
    }
    let stack = [this.root];
    let index = 0;
    let currentNode;
    while ((currentNode = stack[index++])) {
      // 反转二叉树
      let tmp = currentNode.left;
      currentNode.left = currentNode.right;
      currentNode.right = tmp;
      visitor.visit(currentNode.element);
      if (currentNode.left) {
        stack.push(currentNode.left);
      }
      if (currentNode.right) {
        stack.push(currentNode.right);
      }
    }
  }
  //   前序遍历
  preOrderTraversal(visitor) {
    // if (this.root === null) {
    //   return;
    // }
    // let stack = [this.root];
    // let currentNode;
    // while ((currentNode = stack.pop())) {
    //   visitor.visit(currentNode.element);
    //   if (currentNode.right) {
    //     stack.push(currentNode.right);
    //   }
    //   if (currentNode.left) {
    //   }
    // }

    const traversal = (node) => {
      if (node === null) return;
      visitor.visit(node.element);
      traversal(node.left);
      traversal(node.right);
    };

    traversal(this.root);
  }
  //   中序遍历
  inOrderTraversal(visitor) {
    // if (this.root === null) {
    //   return;
    // }
    // let stack = [];
    // let currentNode = this.root;
    // while (currentNode || stack.length > 0) {
    //   while (currentNode) {
    //     stack.push(currentNode);
    //     currentNode = currentNode.left;
    //   }
    //   currentNode = stack.pop();
    //   visitor.visit(currentNode.element);
    // }

    const traversal = (node) => {
      if (node === null) return;
      traversal(node.left);
      visitor.visit(node.element);
      traversal(node.right);
    };

    traversal(this.root);
  }
  //   后序遍历
  postOrderTraversal(visitor) {
    // if (this.root === null) {
    //   return;
    // }
    // let stack = [];
    // let currentNode = this.root;
    // while (currentNode || stack.length > 0) {
    //   while (currentNode) {
    //     stack.push(currentNode);
    //     currentNode = currentNode.left;
    //   }
    //   currentNode = stack.pop();
    //   visitor.visit(currentNode.element);
    // }
    const traversal = (node) => {
      if (node === null) return;
      traversal(node.left);
      traversal(node.right);
      visitor.visit(node.element);
    };

    traversal(this.root);
  }
  // 反转二叉树 先序 中序 后序 层序都可以反转
  invertTree() {
    const traversal = (node) => {
      if (node === null) return;
      let tmp = node.left;
      node.left = node.right;
      node.right = tmp;
      traversal(node.left);
      traversal(node.right);
    };

    traversal(this.root);
    return this.root;
  }
}

var bst = new BST((a, b) => b.age - a.age);
bst.add({ age: 10 });
bst.add({ age: 1 });
bst.add({ age: 5 });
bst.add({ age: 3 });

console.log("bst", bst);

// 测试层序遍历

// 使用访问者模式
class Visitor {
  visit(element) {
    console.log(element.age)
    element.age = element.age * 2;
  }
}

var bst1 = new BST((a, b) => a.age - b.age);

bst1.add({ age: 10 });
bst1.add({ age: 8 });
bst1.add({ age: 19 });
bst1.add({ age: 6 });
bst1.add({ age: 15 });

bst1.levelOrdrerTraversal(new Visitor());
console.log("bst1", bst1);

// 先后中序 反转 测试

var bst2 = new BST((a, b) => a.age - b.age);

bst2.add({ age: 3 });
bst2.add({ age: 2 });
bst2.add({ age: 1 });

// bst2.preOrderTraversal(new Visitor());
// bst2.inOrderTraversal(new Visitor());
// bst2.postOrderTraversal(new Visitor());
// bst2.postOrderTraversal(new Visitor());
bst2.invertTree();
console.log("bst2", bst2);
