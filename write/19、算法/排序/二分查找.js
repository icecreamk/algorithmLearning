function search(arr, target, start, end) {
  let targetIndex = -1;
  let mid = Math.floor((start + end) / 2);

  if (arr[mid] === target) {
    targetIndex = mid;
    return targetIndex;
  }

  if (start >= end) {
    return targetIndex;
  }

  if (arr[mid] < target) {
    return search(arr, target, mid + 1, end);
  } else {
    return search(arr, target, start, mid - 1);
  }
}

const test = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(search(test, 5, 0, test.length - 1));
