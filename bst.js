const nodeFactory = (data = null, left = null, right = null) => {
  return {data, left, right};
};

const treeFactory = (arr = []) => {
  const sortedArray = [...new Set(arr.sort((a, b) => a - b))];
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

  let root = builtTree(sortedArray, start, end);

  const insert = (data, node = root) => {
    if (node === null) {
      node = nodeFactory(data);
      return node;
    }

    if (node.data > data) {
      node.left = insert(data, node.left);
    } else if (node.data < data) {
      node.right = insert(data, node.right);
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

  const find = (data, node = root) => {
    if (node === null || data === node.data) return node;

    if (data > node.data) return find(data, node.right);

    return find(data, node.left);
  };

  const levelOrderIteration = (callback, node = root, queue = [], data = []) => {
    while (node) {
      if (node !== null) {
        if (node.left !== null) queue.push(node.left);
        if (node.right !== null) queue.push(node.right);
      }

      data.push(node.data);
      if (callback) callback(node);
      node = queue.shift();
    }

    return callback ? undefined : data;
  };

  const levelOrderRecursion = (callback, node = root, queue = [], data = []) => {
    if (node === null) {
      return callback ? undefined : data;
    }

    if (node.left !== null) queue.push(node.left);
    if (node.right !== null) queue.push(node.right);

    data.push(node.data);
    if (callback) callback(node);

    node = queue.shift() || null;
    return levelOrderRecursion(callback, node, queue, data);
  };

  const inOrder = (callback, node = root, data = []) => {
    if (node === null) return;
    
    inOrder(callback, node.left, data);

    data.push(node.data);
    if (callback) callback(node.data);

    inOrder(callback, node.right, data);

    return callback ? undefined : data;
  };

  const preOrder = (callback, node = root, data = []) => {
    if (node === null) return;

    if (callback) callback(node.data);
    data.push(node.data);

    inOrder(callback, node.left, data);
    inOrder(callback, node.right, data);

    return callback ? undefined : data;
  };

  const postOrder = (callback, node = root, data = []) => {
    if (node === null) return;

    inOrder(callback, node.left, data);
    inOrder(callback, node.right, data);

    data.push(node.data);
    if (callback) callback(node.data);
    
    return callback ? undefined : data;
  };

  const height = (node = root) => {
    if (node === null) return -1;

    let heightLeft = height(node.left);
    let heightRight = height(node.right);

    return heightLeft > heightRight ? heightLeft + 1 : heightRight + 1;
  };

  const depth = (node, newRoot = root) => {
    if (newRoot === null) return -1;
    let count = -1;

    if ((node === newRoot) || 
      (count = depth(node, newRoot.left)) >= 0 || 
      (count = depth(node, newRoot.right)) >= 0) {
      return count + 1;
    }

    return count;
  };

  const isBalanced = (node = root) => {
    if (node === null) return true;

    let leftHeight = height(node.left);
    let rightHeight = height(node.right);

    if ((leftHeight - rightHeight) <= 1 && 
      isBalanced(node.left) === true && 
      isBalanced(node.right) === true) {
      return true;
    }

    return false;
  };

  const rebalance = () => {
    let unbalancedArray = inOrder();
    root = builtTree(unbalancedArray, 0, unbalancedArray.length - 1);
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

  return { root, insert, deleteNode, 
    find, levelOrderIteration, levelOrderRecursion,
    inOrder, preOrder, postOrder, height, depth,
    isBalanced, rebalance };
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

const randomArray = () => {
  let arr = [];

  for (let i = 0; i < 20; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
};

const addNumbers = (tree) => {
  for (let i = 0; i < 20; i++) {
    tree.insert(Math.floor(Math.random() * 100) + 100);
  }
};

const treeScript = () => {
  console.log('Create new tree \n');
  const tree = treeFactory(randomArray());
  console.log(`Is the tree balanced? => ${tree.isBalanced()} \n`);
  console.log('========= Pre order =========');
  tree.preOrder(console.log);
  console.log('========= Post order ========');
  tree.postOrder(console.log);
  console.log('========== In order =========');
  tree.inOrder(console.log);
  console.log('Add 20 numbers above 100 \n');
  addNumbers(tree);
  console.log(`Is the tree balanced? => ${tree.isBalanced()} \n`);
  console.log('Rebalance tree \n');
  tree.rebalance();
  console.log(`Is the tree balanced? => ${tree.isBalanced()} \n`);
  console.log('========= Pre order =========');
  tree.preOrder(console.log);
  console.log('========= Post order ========');
  tree.postOrder(console.log);
  console.log('========== In order =========');
  tree.inOrder(console.log);
};

treeScript();
