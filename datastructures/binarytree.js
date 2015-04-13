var utils = require("../utils");
var asciitree = require('ascii-tree');

(function() {
  'use strict';
  class BinaryTree {
    constructor(value, left, right) {
      Object.assign(this, {
        value: value,
        left: left,
        right: right
      });
    }

    insert(value) {
      if (this.value === undefined) {
        this.value = value;
      } else if (this.value > value) {
        if (this.left === undefined) this.left = new BinaryTree();
        this.left.insert(value);
      } else if (this.value < value) {
        if (this.right === undefined) this.right = new BinaryTree();
        this.right.insert(value);
      }
    }

    depthFirstArray(acc=[]) {
      if (this.left !== undefined)
        var leftBit = this.left.depthFirstArray(acc);
      acc.push(this.value);
      if (this.right !== undefined)
        var rightBit = this.right.depthFirstArray(acc);
      return acc;
    }

    toString(depth=0) {
      var prefix = "#";
      for (var i=0; i < depth; ++i) {
        prefix += "#";
      }
      prefix += " ";
      var result  = prefix + this.value;
      if (this.left !== undefined)
        result += "\n" + this.left.toString(depth + 1);
      if (this.right !== undefined)
        result += "\n" + this.right.toString(depth + 1);
      if (depth === 0)
        return asciitree.generate(result);
      else
        return result;
    }
  }

  utils.exampleSet("BinaryTree", function() {
    var tree = new BinaryTree();
    console.log("This is an empty tree: \n", tree.toString());
    console.log("inserting the number 6");
    tree.insert(6);
    console.log("Our new tree: \n", tree.toString());
    console.log("inserting the numbers 3,5,23,6,8,7,86,32");
    tree.insert(3);
    tree.insert(5);
    tree.insert(23);
    tree.insert(6);
    tree.insert(8);
    tree.insert(7);
    tree.insert(86);
    tree.insert(32);
    console.log("Our new tree: \n", tree.toString());
    console.log("Depth first search: ", tree.depthFirstArray());
  });

  module.exports = BinaryTree;
})()
