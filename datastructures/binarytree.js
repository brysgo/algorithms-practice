var utils = require("../utils");
var asciitree = require('ascii-tree');

(function() {
  'use strict';
  class BinaryTree {
    constructor(parent) {
      this.parent = parent
    }

    _insert(value) {
      if (this.value === undefined) {
        this.value = value;
        return this;
      } else if (this.value > value) {
        if (this.left === undefined) this.left = this.buildNode();
        return this.left._insert(value);
      } else if (this.value < value) {
        if (this.right === undefined) this.right = this.buildNode();
        return this.right._insert(value);
      }

      return this;
    }

    insert(value) {
      return this.root()._insert(value);
    }

    buildNode() {
      return new BinaryTree(this);
    }

    root() {
      if (this.parent !== undefined) {
        return this.parent.root();
      } else {
        return this;
      }
    }

    depthFirstArray(acc) {
      if (acc === undefined) {
        if (this.parent === undefined)
          acc = [];
        else
          return this.root().depthFirstArray();
      }
      if (this.left !== undefined)
        var leftBit = this.left.depthFirstArray(acc);
      if (this.value !== undefined)
        acc.push(this.value);
      if (this.right !== undefined)
        var rightBit = this.right.depthFirstArray(acc);
      return acc;
    }

    toString(depth=0) {
      if (depth == 0 && this.parent !== undefined)
        return this.root().toString();
      if (this.value === undefined)
        return "";
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

  function example(tree) {
    return function() {
      console.log("This is an empty tree: \n", tree.toString());
      console.log("inserting the number 6");
      tree.insert(6);
      console.log("Our new tree: \n", tree.toString());
      console.log("inserting new numbers:",
        tree.insert(3).value,
        ",",
        tree.insert(5).value,
        ",",
        tree.insert(23).value,
        ",",
        tree.insert(6).value,
        ",",
        tree.insert(8).value,
        ",",
        tree.insert(7).value,
        ",",
        tree.insert(86).value,
        ",",
        tree.insert(32).value
      );
      console.log("Our new tree: \n", tree.toString());
      console.log("Depth first search: ", tree.depthFirstArray());
      console.log("inserting 1-30:");
      for (var i=1; i<=30; ++i) tree.insert(i);
      console.log("Our new tree: \n", tree.toString());
    }
  }

  var tree = new BinaryTree();
  utils.exampleSet("BinaryTree", example(tree));

  module.exports = BinaryTree;
  module.exports.example = example;
})()
