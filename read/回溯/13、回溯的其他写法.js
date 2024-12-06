// 使用set去重的版本相对于used数组的版本效率都要低很多
// 原因在回溯算法：哈希映射相对费时间,而使用used数组在时间复杂度上几乎没有额外负担！

// 使用set去重，不仅时间复杂度高了，空间复杂度也高了，
// 组合，子集，排列问题的空间复杂度都是O(n)，但如果使用set去重，空间复杂度就变成了O(n^2)，因为每一层递归都有一个set集合，系统栈空间是n，每一个空间都有set集合。
// 那有同学可能疑惑 用used数组也是占用O(n)的空间啊？
// used数组可是全局变量，每层与每层之间公用一个used数组，所以空间复杂度是O(n + n)，最终空间复杂度还是O(n)。

// 90.子集II
function subsetsWithDup(nums) {
    nums.sort((a, b) => a - b);
    const resArr = [];
    backTraking(nums, 0, []);
    return resArr;
    function backTraking(nums, startIndex, route) {
        resArr.push([...route]);
        const helperSet = new Set();
        for (let i = startIndex, length = nums.length; i < length; i++) {
            if (helperSet.has(nums[i])) continue;
            helperSet.add(nums[i]);
            route.push(nums[i]);
            backTraking(nums, i + 1, route);
            route.pop();
        }
    }
};
// 40. 组合总和 II
function combinationSum2(candidates, target) {
    candidates.sort((a, b) => a - b);
    const resArr = [];
    backTracking(candidates, target, 0, 0, []);
    return resArr;
    function backTracking( candidates, target, curSum, startIndex, route ) {
        if (curSum > target) return;
        if (curSum === target) {
            resArr.push([...route]);
            return;
        }
        const helperSet = new Set();
        for (let i = startIndex, length = candidates.length; i < length; i++) {
            let tempVal = candidates[i];
            if (helperSet.has(tempVal)) continue;
            helperSet.add(tempVal);
            route.push(tempVal);
            backTracking(candidates, target, curSum + tempVal, i + 1, route);
            route.pop();
        }
    }
};
// 47. 全排列 II
function permuteUnique(nums) {
    const resArr = [];
    const usedArr = [];
    backTracking(nums, []);
    return resArr;
    function backTracking(nums, route) {
        if (nums.length === route.length) {
            resArr.push([...route]);
            return;
        }
        const usedSet = new Set();
        for (let i = 0, length = nums.length; i < length; i++) {
            if (usedArr[i] === true || usedSet.has(nums[i])) continue;
            usedSet.add(nums[i]);
            route.push(nums[i]);
            usedArr[i] = true;
            backTracking(nums, route);
            usedArr[i] = false;
            route.pop();
        }
    }
};