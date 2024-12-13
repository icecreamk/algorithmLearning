a = ["2.1", "4.302.1", "5.0", "0.1.1", "0.2"];

a.sort((a, b) => {
  let i = 0;
  const arr1 = a.split(".");
  const arr2 = b.split(".");

  while (true) {
    const s1 = arr1[i];
    const s2 = arr2[i];
    i++;

    if (s1 === undefined || s2 === undefined) {
      return s2.length - s1.length;
    }
    if (s1 === s2) {
      continue;
    }
    return s2 - s1;
  }
});

console.log(a)
