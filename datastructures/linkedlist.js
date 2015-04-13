var utils = require("../utils");

(function () {
  'use strict';

  class LinkedList {
    constructor(value, next) {
      this.value = value;
      this.next = next;
    }

    last() {
      var result = this;
      while(result.next !== undefined) {
        result = result.next;
      }
      return result;
    }

    append(value) {
      this.last().next = new LinkedList(value);
    }

    toArray(acc=[]) {
      if (this.next === undefined) {
        return acc.concat([this.value]);
      }
      return this.next.toArray(acc.concat([this.value]));
    }
  }

  utils.exampleSet("LinkedList", function() {
    var list = new LinkedList(5, (new LinkedList(6, (new LinkedList(7)))));
    console.log("The linked list is: ", list.toArray());
    console.log("appending 8 to the list");
    list.append(8);
    console.log("The linked list is now: ", list.toArray());
  });
})()
