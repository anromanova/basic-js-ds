const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/



class BinarySearchTree {

  constructor (){
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);

    if(this._root === null){
      this._root = newNode;
    } else {
      this.addWithin(this._root, newNode);
    }
  }

  addWithin(node, newNode){
    if(newNode.data < node.data){
      if(node.left === null){
        node.left = newNode;
      } else this.addWithin(node.left, newNode);
    } else {
      if(node.right === null){
        node.right = newNode;
      } else this.addWithin(node.right, newNode);
    }
  }

  has(data) {
    
    function searchWithin(node, data){
      if(!node){
        return false;
      }

      if(node.data === data){
        return true;
      }

      if(node.data > data){
        return searchWithin(node.left, data);
      } else {
        return searchWithin(node.right, data);
      }
    }

    return searchWithin(this._root, data);
  }

  find(data) {
    function findWithin(node, data){
      if(!node){
        return false;
      }

      if(node.data === data){
        return node;
      }

      if(node.data > data){
        return findWithin(node.left, data) || null;
      } else {
        return findWithin(node.right, data) || null;
      }
    }

    return findWithin(this._root, data);
  }

  remove(data) {
    
    this._root = removeNode(this._root, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {          
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;

        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    if(!this._root){
      return;
    }

    let node = this._root;
    while(node.left){
      node = node.left;
    }

    return node.data;
  }

  max() {
    if(!this._root){
      return;
    }

    let node = this._root;
    while(node.right){
      node = node.right;
    }

    return node.data;
  }
}


module.exports = {
  BinarySearchTree
};