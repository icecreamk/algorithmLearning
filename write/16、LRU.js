// LRU: 不常用的数据会被清除
// 例如：vue中keep-alive
// 实现：使用map，时间复杂度为O(1)，数组是O(n)

class LRUCache {
  constructor(length) {
    this.length = length;
    this.data = new Map();
  }

  set(key, value) {
    const data = this.data;

    // 存在的话，删除重新放进map
    if (data.has(key)) {
      data.delete(key);
    }
    data.set(key, value);

    if (data.size > this.length) {
      // Map是具有迭代器方法的，因此可以用next
      const delKey = data.keys().next().value;
      data.delete(delKey);
    }
  }

  get(key) {
    const data = this.data;
    if (!data.has(key)) {
      return null;
    }

    const value = data.get(key);
    data.delete(key);
    data.set(key, value);

    return value;
  }
}

// 测试
const cache = new LRUCache(3);
cache.set("name", "test");
cache.set("age", "11");
cache.set("sex", "男");
cache.set("age", "男");
cache.set("height", "180");

console.log(cache);
// {'sex' => '男', 'age' => '男', 'height' => '180'}
