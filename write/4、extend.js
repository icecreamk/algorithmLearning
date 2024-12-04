// 总结
// 构造函数继承：可以传递参数，但不能继承父类的原型方法。
// 原型链继承：简单，但不能传递参数，且所有实例共享父类的原型方法。
// 组合继承：结合了原型链继承和构造函数继承的优点，但会调用两次父类的构造函数。
// 寄生组合继承：解决了组合继承中的重复调用问题，是最常用的继承方式之一。
// ES6 类继承：语法简洁，功能强大，推荐在现代项目中使用。

// ---------------------------------------------- call调用父类构造函数 --------------------------------------------
// 缺点：子类无法使用父类原型上的方法
function Parent() {
  this.name = "parent";
}

Parent.prototype.say = function () {
  console.log("111");
};

function Child() {
  Parent.call(this);
  this.type = "child";
}
var c = new Child();
c.say; // undefined

// ---------------------------------------------- 原型链实现 --------------------------------------------

function Parent() {
  this.name = "parent";
  this.infos = [1, 2];
}
function Child() {
  this.type = "child";
}

Child.prototype = new Parent();
var c1 = new Child();
var c2 = new Child();
c2.name = "test";
c1.infos.push(3);
console.log(c1.name); // parent
console.log(c2.name); // test
console.log(c1.infos); // [1,2,3]
console.log(c2.infos); // [1,2,3]

// ---------------------------------------------- 组合继承，以上两种结合 --------------------------------------------
// 缺点：parent被执行了两次实例，一次call 一次new Parent()
function Parent() {
  this.name = "parent";
  this.infos = [1, 2];
}
function Child() {
  Parent.call(this);
  this.type = "child";
}

Child.prototype = new Parent();
var c1 = new Child();
var c2 = new Child();
c2.name = "test";
c1.infos.push(3);
console.log(c1.name); // parent
console.log(c2.name); // test
console.log(c1.infos); // [1,2,3]
console.log(c2.infos); // [1,2]

// ---------------------------------------------- 组合继承（优化上面的缺点） --------------------------------------------
// 优点：解决以上两个问题
// 缺点：Child的构造函数指向了Parent，应该是Child,但是绑定重新Child不就行了吗？还有别的缺点吗？
function Parent() {
  this.name = "parent";
  this.infos = [1, 2];
}
function Child() {
  Parent.call(this);
  this.type = "child";
}

Child.prototype = Parent.prototype;
// Child.prototype.constructor = Child;

var c1 = new Child();
var c2 = new Child();
c2.name = "test";
c1.infos.push(3);
console.log(c1.name); // parent
console.log(c2.name); // test
console.log(c1.infos); // [1,2,3]
console.log(c2.infos); // [1,2]
console.log(c1.constructor); // Parent

// ---------------------------------------------- 寄生组合（优化上面的缺点，最推荐的） --------------------------------------------
function Parent() {
  this.name = "parent";
  this.infos = [1, 2];
}
function Child() {
  Parent.call(this);
  this.type = "child";
}

// 下面两行区别：第一种，Child 和 Parent 共享同一个原型对象，缺乏独立性，对 Parent.prototype 的任何修改都会直接影响到 Child 的实例，反之亦然
// Child.prototype = Parent.prototype;
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

var c1 = new Child();
var c2 = new Child();
c2.name = "test";
c1.infos.push(3);
console.log(c1.name); // parent
console.log(c2.name); // test
console.log(c1.infos); // [1,2,3]
console.log(c2.infos); // [1,2]
console.log(c1.constructor); // Child
