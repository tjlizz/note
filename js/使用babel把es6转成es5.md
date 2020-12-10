
# Babel 是什么

Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

# Babel能用在哪里

## NodeJs

###  使用 `npm` 初始化项目

```shell script
$ mkdir es6-to-es5
$ npm init -y
```
   
### 安装Babel
 ```shell script
$ npm install --save-dev @babel/core @babel/cli
```

安装完成之后, 你的 `package.json` 会加入这些代码
   

```json5
  "devDependencies": {
   + "@babel/cli": "^7.12.8",
   + "@babel/core": "^7.12.9"
  }
```

 现在把 `Babel` 的运行命令放入到 `npm` 脚本中, 也是在 `package.json` 中
 

```json5
 "scripts": {
+     "build": "babel src -d lib"

  }
```

### 创建.babelrc配置文件

```shell script
$ npm install @babel/preset-env --save-dev

```
创建`babel.config.json`文件,写入以下内容
```json
{
  "presets": ["@babel/preset-env"]
}
```

环境都配置完成, 下面开始正式写代码了

### 写一段ES6代码

 创建 `/src/index.js`

 ```shell script
$  mkdir src
$  touch src/index.js

```
写入一个简单的箭头函数
```javascript
let sayHello = () => {
    console.log('hello xiaotaideng')
}

sayHello()

```

现在运行刚刚写好的启动脚本

```shell script
$ npm run build

```
 完成之后可以看到目录中新增了一个`build`文件夹,打开里面的`index.js`它的内容是这样的
 
 ```javascript
"use strict";

var sayHello = function sayHello() {
  console.log('hello xiaotaideng');
};

sayHello();
```

现在执行下面的命令

```shell
 $  node build/index.js
```

 可以正常的输出，到现在好像已经可以正常的使用了
 
[点击](https://github.com/lizeze/es6-to-es5)获取源码 

 