var dirPrefix = "../../";
var examples = require(dirPrefix + 'examples');
var utils = require(dirPrefix + 'utils');
var BinaryTree = require(dirPrefix + "datastructures/binarytree");

(function() {
  'use strict';
  class RedBlackTree extends BinaryTree {
    insert(value) {
      super.insert(value);
    }
  }

  utils.exampleSet("RedBlackTree", function() {
    var tree = new RedBlackTree();
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
})()
