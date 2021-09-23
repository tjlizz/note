 

Proxy 意思为`代理`，即在访问对象之前建立一道`拦截`，任何访问该对象的操作之前都会通过这道`拦截`。

# `Proxy`可以拦截什么

* `getPrototypeOf()`

* `setPrototypeOf()`

* `isExtensible()`

* `preventExtensions()`

* `getOwnPropertyDescriptor()`

* `defineProperty()`
* `has()`
* `get()`
* `set()`
* `deleteProperty()`
* `ownKeys()`
* `apply()`
* `construct()`

# 实例

## Proxy 语法

```javascript
let proxy = new Proxy(target, handler);
```

这就是`Proxy`的使用方法，所有的用法都是上面的方法，不同的是`handler`里面拦截的设置

`new Proxy()`表示生成一个`Proxy`实例

`target`表示要拦截的目标对象

`handler`是一个对象，用来定制拦截方法

**想要`handler`里的拦截方法生效，后续所有操作必须使用`Proxy`的实例**

## get

`get`方法在日常开发中应该是使用最多的方法了,先看一下在不使用`Proxy`时候的场景

```javascript
let user = {
  name: "张三",
};
console.log(user.name); //张三
console.log(user.age); //undefined
```

[运行代码](https://codepen.io/lizeze/pen/wveyzmm?editors=1011)

上面代码中，使用`let`定义了一个对象，并且有一个`name`属性

然后分别打印出`name`和`age`属性,结果很明显，`age`属性未定义会输出`undefined`

但是在实际项目中我们是不希望返回`undefined`这种值给页面的，下面我们就看一下怎么使用`Proxy`解决这个问题

```javascript
let handler = {
  //定义了get方法的拦截器
  get: function (target, key) {
    //target:要拦截的对象
    //key: 修改的属性
      if(target.hasOwnProperty(key)){
          if(key=='name'){
           return "法外狂徒-张三"
         }
      }
       return "18"
  }
};
let obj = {
  name: "张三"
};
let user = new Proxy(obj, handler);

//注意，这里的user不是上个示例的user对象了,而是Proxy的实例
console.log(user.name); //法外狂徒-张三

console.log(user.age); //18

```

[运行代码](https://codepen.io/lizeze/pen/OJgQRKw)

使用了`Proxy`之后,发现和之前什么都不一样了，这是因为我们设置了`get`方法的拦截，当获取`name`属性的时候，我们返回一个固定的值，否则就返回年龄18。

>这里是不太严谨的，实际项目中不可能只有两个字段的，这里只是为了演示

**想要`handler`里的拦截方法生效，后续所有操作必须使用`Proxy`的实例**

这个时候可以验证一下这句话，我们不使用`Proxy`实例,看看会怎么样

[运行代码](https://codepen.io/lizeze/pen/wveyoEV?editors=1111)

## set

在实际项目中，我们会经常进行修改某个对象的属性，有时候在一些特殊的场景下需要对对象修改的新属性进行判断，看是否符合当前的业务场景。

  ```javascript
let user = new Proxy(
  {
    age: 18
  },
  {
    set: function (target, key, value) {
      if (value > 140) {
        throw "你要成仙了!";
      }
      target[key]=value
    }
  }
);
user.age = 20;
console.log(user.age)//20
user.age=200
//Uncaught 你要成仙了! 
 ```
 [运行代码](https://codepen.io/lizeze/pen/oNwEazw?editors=1011)

 当我们修改一个人的年龄大于140,就会触发异常

 ## construct
 >`construct`方法用于拦截`new`操作符,为了使`new`操作符在生成的`Proxy`对象上生效,用于初始化代理的目标对象自身必须具有`Construct`内部方法

### 示例
 ```javascript
let proxy = new Proxy(1, {
  construct(target, args) {
    console.log(target);
    return new target(...args);
  }
});

//Uncaught TypeError: Cannot create proxy with a non-object as target or handler 
 ```
 [运行代码](https://codepen.io/lizeze/pen/WNOKKBV?editors=1112)

 ```javascript

 let proxy = new Proxy(function () {}, {
  construct(target, args) {
    console.log(args);
    return 1;
  }
});

let obj = new proxy();
//Uncaught TypeError: 'construct' on proxy: trap returned non-object ('1') 
 ```
 [运行代码](https://codepen.io/lizeze/pen/QWgBVWW?editors=1011)

 上面是两个错误的示例，下面写一个正确的写法
 
 
 ```javascript
var p = new Proxy(function() {}, {
  construct: function(target, argumentsList, newTarget) {
    console.log('called: ' + argumentsList.join(', '));
    return { value: argumentsList[0] * 10 };
  }
});
console.log(new p(1).value); // "called: 1"
                             // 10
 ```

 [运行代码](https://codepen.io/lizeze/pen/dyRjqPe?editors=1111)

通过以上代码得出结论

* 要代理的对象必须具有`Construct`方法
* 必须返回一个对象

# 其他

其他方法下一章继续
