

var obj = {
  a: 1,
  b: 9,
  c: 4,
};

Object.entries(obj) // [['a', 1], ['b', 9], ['c', 4]]
Object.fromEntries(Object.entries(obj)) // {a: 1, b: 9, c: 4}


function foo(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => {
      return value > 2;
    })
  );
}



console.log(obj, foo(obj));
