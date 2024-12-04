var s1 = "get-id-by-code";

function fun(s) {
  return s.replace(/-(\w)/g, function (all, letter) {
    console.log(all, letter);
    // -i i
    // -b b
    // -c c
    return all.slice(1).toUpperCase();
  });
}

fun(s1);
