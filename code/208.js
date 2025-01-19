// 实现 Trie (前缀树)

class NodeTrie {
  constructor() {
    this.son = Array(26).fill(null);
    this.end = false;
  }
}

class Trie {
  constructor() {
    this.root = new NodeTrie();
  }

  insert(word) {
    let cur = this.root;
    for (let c of word) {
      c = c.charCodeAt(0) - "a".charCodeAt(0);
      if (cur.son[c] === null) {
        cur.son[c] = new NodeTrie();
      }
      cur = cur.son[c];
    }
    cur.end = true;
  }

  find(word) {
    let cur = this.root;
    for (let c of word) {
      c = c.charCodeAt(0) - "a".charCodeAt(0);
      if (cur.son[c] === null) {
        return 0;
      }
      cur = cur.son[c];
    }
    return cur.end ? 2 : 1;
  }

  search(word) {
    return this.find(word) === 2;
  }

  startsWith(prefix) {
    return this.find(prefix) !== 0;
  }
}
