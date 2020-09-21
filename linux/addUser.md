## 新增用户
   `adduser`命令，添加新的用户
    
 > 这个命令很容易理解，顾名思义：add是添加的意思，user是用户的意思，合在一起就是adduser 添加用户，用法也很简单，命令后面直接写上要添加的用户名

```shell
$ adduser frank
```
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95cd310d121a4799b15471f1888ea85a~tplv-k3u1fbpfcp-zoom-1.image)

> 只需输入密码，然后一路回车，最后输入y完成新增用户

**如果使用个人用户是没有权限操作的，只能使用root用户**

现在可以查看`home`目录下，会发现多出一个`frank`的文件夹

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec4f04cbd1924116a77c00ca6e3ae0fa~tplv-k3u1fbpfcp-zoom-1.image)
## 修改密码
拿到管理员给创建的用户之后，一般情况下我们都要修改一下默认密码，修改密码的命令是`passwd `，用法和`adduser`类似，后面加上用户名即可。

下面修改一下`frank`的默认密码
```shell
$ passwd frank
```
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/baa2c183952e49ac923c87d98460327d~tplv-k3u1fbpfcp-zoom-1.image)

> 命令后面也可以不加用户名，默认是当前用户

## 删除用户
能添加用户，那就肯定可以删除用户的，下面就使用`deluser`命令来删除用户

`deluser` 是 `delete` 和 `use`r 的缩写，delete 是`删除`的意思，user 是`用户`的意思。合在一起就是`删除用户`

用法和`adduser`是一样的，如下

```shell
$ deluser frank
```
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92d479e3746541139109ca67ec9fc40c~tplv-k3u1fbpfcp-zoom-1.image)

一行命令成功删除

**可以看到删除用户是没有确认过程的，所以要慎用**

这个时候在查看一下`home`目录查看一下用户文件夹还有几个
 
 ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec4f04cbd1924116a77c00ca6e3ae0fa~tplv-k3u1fbpfcp-zoom-1.image)

只使用`deluser`是不会删除用户目录的，如果想把目录文件一块删除，需要增加一个参数

```shell
deluser --remove-home frank
```