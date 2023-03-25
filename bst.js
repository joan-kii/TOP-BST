const nodeFactory = (data = null, left = null, right = null) => {
  return {data, left, right};
};

const treeFactory = (arr = []) => {
  const sortedArray = Array.from(new Set(arr.sort((a, b) => a - b)));
  const start = 0;
  const end = sortedArray.length - 1;

  const builtTree = (arr, start, end) => {
    
    if (start > end) return null;
    
    const mid = Math.floor((start + end) / 2);
    const node = nodeFactory(arr[mid]);
    node.left = builtTree(arr, start, mid - 1);
    node.right = builtTree(arr, mid + 1, end);

    return node;
  };

  const root = builtTree(sortedArray, start, end);

  const insertNode = (data, node = root) => {

    if (node === null) {
      node = nodeFactory(data);
      return node;
    }

    if (node.data > data) {
      node.left = insertNode(data, node.left);
    } else if (node.data < data) {
      node.right = insertNode(data, node.right);
    }
    return node;
  };

  const deleteNode = (data, node = root) => {

    if (node === null) return node;

    if (node.data > data) {
      node.left = deleteNode(data, node.left);
    } else if (node.data < data) {
      node.right = deleteNode(data, node.right);
    } else {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      node.data = getMinVal(node.right);
      node.right = deleteNode(node.data, node.right);
    }

    return node;
  };

  const find = (data) => {
    // seguir aquí (implementar search)
  };
  
  const getMinVal = (node) => {
    let min = node.data;

    while (node.left !== null)
    {
      min = node.left.data;
      node = node.left;
    }

    return min;
  };

  return { root, insertNode, deleteNode, find };
};

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
       return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

const balancedTree = treeFactory([20, 30, 32, 36, 40, 50, 60, 65, 70, 75, 80, 85]);
prettyPrint(balancedTree.root);
balancedTree.insertNode(38);
prettyPrint(balancedTree.root);
balancedTree.deleteNode(50);
prettyPrint(balancedTree.root);

