var dirPrefix = "../../";
var examples = require(dirPrefix + 'examples');
var utils = require(dirPrefix + 'utils');
var BinaryTree = require(dirPrefix + "datastructures/binarytree");

(function() {
  'use strict';
  class RedBlackTree extends BinaryTree {
    insert(value) {
      var newNode = super.insert(value);
      newNode.insertCase1();
      return newNode;
    }

    buildNode() {
      return new RedBlackTree(this);
    }

    insertCase1() {
      if (this.parent === undefined) {
        this.color = "black";
      } else {
        this.insertCase2();
      }
    }

    insertCase2() {
      if (this.parent.color !== "black") {
        this.insertCase3();
      }
    }

    insertCase3() {
      var uncle = this.uncle();
      var grandparent = this.grandparent();
      if (uncle !== undefined && uncle.color == "red") {
        this.parent.color = "black";
        uncle.color = "black";
        grandparent.color = "red";
        grandparent.insertCase1();
      } else {
        this.insertCase4();
      }
    }

    insertCase4() {
      var grandparent = this.grandparent();
      var target = this;
      if (this.rightOfParent() && this.parent.leftOfParent()) {
        this.parent.rotateLeft();
        target = this.left;
      } else if (this.leftOfParent() && this.parent.rightOfParent()) {
        this.parent.rotateRight();
        target = this.right;
      }
      target.insertCase5();
    }

    insertCase5() {
      var grandparent = this.grandparent();
      this.parent.color = "black";
      grandparent.color = "red";
      if (this.leftOfParent()) {
        grandparent.rotateRight();
      } else {
        grandparent.rotateLeft();
      }
    }

    rotateRight() {
      var savedLeft = this.left;
      var savedParent = this.parent;
      var leftOfParent = this.leftOfParent();
      var rightOfParent = this.rightOfParent();
      this.left = savedLeft.right;
      if (this.left !== undefined) {
        this.left.parent = this;
      }
      savedLeft.right = this;
      savedLeft.parent = savedParent;
      if (leftOfParent) {
        savedParent.left = savedLeft;
      } else if (rightOfParent) {
        savedParent.right = savedLeft;
      }
      this.parent = savedLeft;
    }

    rotateLeft() {
      var savedRight = this.right;
      var savedParent = this.parent;
      var leftOfParent = this.leftOfParent();
      var rightOfParent = this.rightOfParent();
      this.right = savedRight.left;
      if (this.right !== undefined) {
        this.right.parent = this;
      }
      savedRight.left = this;
      savedRight.parent = savedParent;
      if (leftOfParent) {
        savedParent.left = savedRight;
      } else if (rightOfParent) {
        savedParent.right = savedRight;
      }
      this.parent = savedRight;
    }

    leftOfParent() {
      if (this.parent !== undefined) {
        return this.parent.left === this;
      }
    }

    rightOfParent() {
      if (this.parent !== undefined) {
        return this.parent.right === this;
      }
    }

    grandparent() {
      return this.parent.parent;
    }

    uncle() {
      var grandparent = this.grandparent();
      if (this.parent.leftOfParent()) {
        return grandparent.right;
      } else {
        return grandparent.left;
      }
    }
  }

  var tree = new RedBlackTree();
  utils.exampleSet("RedBlackTree", BinaryTree.example(tree));
})()
