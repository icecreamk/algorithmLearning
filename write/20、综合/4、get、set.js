function formatKeys(path) {
  path = path.replaceAll("[", ".");
  path = path.replaceAll("]", "");
  return path;
}

function getValue(target, path, defaultValue) {
  const key = formatKeys(path);
  const keys = key.split(".").filter((_) => _ !== "");

  let i = 0;
  let result = target;
  for (; i < keys.length; i++) {
    result = result[keys[i]];
  }
  return result;
}

var object = { a: [{ b: { c: 3 } }] }; // path: 'a[0].b.c'
var array = [{ a: { b: [1] } }]; // path: '[0].a.b[0]'

console.log(getValue(object, "a[0].b.c", 0)); // 3
console.log(getValue(array, "[0].a.b[0]", 12)); // 1

// TODO 实现set