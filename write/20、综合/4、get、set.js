function formatKeys(path) {
  path = path.replaceAll("[", ".");
  path = path.replaceAll("]", "");
  return path;
}

function getValue(target, path) {

  // a[3].b -> a.3.b
  // TODO
  const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.').filter((_) => _ !== "");

  // const key = formatKeys(path);
  // const keys = key.split(".").filter((_) => _ !== "");

  console.log(keys, formatKeys(path));
  let i = 0;
  let result = target;
  for (; i < keys.length; i++) {
    result = result[keys[i]];
  }
  return result;
}

function setValue(target, path, value) {
  const key = formatKeys(path);
  const keys = key.split(".").filter((_) => _ !== "");

  let i = 0;
  let result = target;
  for (; i < keys.length - 1; i++) {
    if (result[keys[i]] === undefined) {
      result[keys[i]] = {};
    }
    result = result[keys[i]];
  }
  result[keys[i]] = value;
}

var object = { a: [{ b: { c: 3 } }] }; // path: 'a[0].b.c'
var array = [{ a: { b: [1] } }]; // path: '[0].a.b[0]'

console.log(getValue(object, "a[0].b.c")); // 3
console.log(getValue(array, "[0].a.b[0]")); // 1
console.log(setValue(array, "[0].a.b.c", 12)); // 1

console.log(object, array);
