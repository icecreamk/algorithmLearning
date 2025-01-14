var MedianFinder = function () {
  this.left = new MaxPriorityQueue();
  this.right = new MinPriorityQueue();
};

MedianFinder.prototype.addNum = function (num) {
  if (this.left.size() === this.right.size()) {
    this.right.enqueue(num);
    this.left.enqueue(this.right.dequeue().element);
  } else {
    this.left.enqueue(num);
    this.right.enqueue(this.left.dequeue().element);
  }
};

MedianFinder.prototype.findMedian = function () {
  if (this.left.size() > this.right.size()) {
    return this.left.front().element;
  }
  return (this.left.front().element + this.right.front().element) / 2;
};
