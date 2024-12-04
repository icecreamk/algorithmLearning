const arrayLike = document.querySelectorAll('body');

a1 = [...arrayLike];
Array.from(arrayLike);
Array.prototype.slice.call(arrayLike);
Array.prototype.concat.apply([], arrayLike);
Array.apply(null, arrayLike);
