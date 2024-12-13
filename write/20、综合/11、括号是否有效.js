const isValid = function (s) {
  if (s % 2 === 1) {
    return false;
  }

  const regObj = {
    "{": "}",
    "(": ")",
    "[": "]",
  };

  let stack = [];
  for (let i = 0; i < s.length; i++) {
    if (["{", "(", "["].includes(s[i])) {
      stack.push(s[i]);
    } else {
      const cur = stack.pop();
      if (regObj[cur] !== s[i]) {
        return false;
      }
    }
  }

  if (stack.length) {
    return false;
  }

  return true;
};


console.log(isValid("({})[]"))
console.log(isValid("({}})[]"))
console.log(isValid("{({})[]"))