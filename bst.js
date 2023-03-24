const nodeFactory = (data = null, left = null, right = null) => {
  return {data, left, right};
};

const treeFactory = (arr = []) => {
  const builtTree = (arr) => {
    return Array.from(new Set(arr.sort((a, b) => a - b)));
  }

  const tree = (arr, start, end) => {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const node = nodeFactory(arr[mid]);
    node.left = nodeFactory(arr, start, mid - 1);
    node.right = nodeFactory(arr, mid + 1, end);
    return node;
  };

  return tree(builtTree(arr), 0, arr.length - 1);
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

  prettyPrint(treeFactory([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]));
