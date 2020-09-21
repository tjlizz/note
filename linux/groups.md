# 群组管理
在`Linux`中，每个用户都有一个群组。

那么新建用户的时候并没有指定群组啊，群组是怎么来的呢。

其实我们不需要设置群组，创建用户的时候会默认创建一个和用户名一样的群组，并且把用户添加到这个群组中。

下面来看一下用户的群组

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8b016ba237a4917be44590b5657d9d8~tplv-k3u1fbpfcp-zoom-1.image)

可以看到第三列和第四列是相同的。`第三列`是用户名，`第四列`是群组名。

了解这些之后下面来操作一下群组

## 新增群组

当用户少的时候默认的群组就足以使用了，但是当用户多的时候还是每个用户都在自己的群组中，这种情况就不方便管理了。

下面演示一下新增群组，使用`addgroup `命令，用法很简单，在后面直接加上要创建的群组就可以了。记得要用`root`身份

```shell
$ addgroup admin
```
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60fb204cbb4f4e7d84016c634818da1e~tplv-k3u1fbpfcp-zoom-1.image)

看到这个消息，就表示新增成功。

这个时候群组里面还是空的，没有添加用户。
## 修改用户账户
假如我要将 `dev` 这个用户放到我刚创建的 `admin` 这个群组里，可以这样写

```shell
$ usermod -g admin dev
```
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85d32fae8a974d66a209312aaca6d71c~tplv-k3u1fbpfcp-zoom-1.image)

可以看到用户dev的群组已经改成了admin

除了使用`ll`命令之外还可以这样查看用户所在群组
```shell
$ groups dev
```
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae1f123767d54f15a5bf7c045d3403f7~tplv-k3u1fbpfcp-zoom-1.image)

> 也可以不添加用户名，直接使用groups命令，则显示当前用户所在群组

我们也一次把用户添加到多个群组里面，就用`-G`参数

首先我们先来多创建两个群组，分别是`g1`和`g2`

```shell
$ addgroup g1
$ addgroup g2
```
接着运行以下命令

```shell
$ usermod -G admin,dev,g1,g2 dev
$ gropus dev
```
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/591947837e6947a2b065a854b78de643~tplv-k3u1fbpfcp-zoom-1.image)
>配合 -g 或 -G 参数时，它会把用户从原先的群组里剔除，加入到新的群组。如果不想离开原先的群组，又想加入新的群组，可以在 -G 参数的基础上加上 -a 参数，表示“追加”。

* 不添加`-a`的情况

```shell
 $ groups dev # 先查看一下用户所在群组
 $ usermod -G admin dev # 修改用户所在群组
 $ groups dev # 在一次查询用户所在群组
```
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7021f29ab3e444859879678c12d84de9~tplv-k3u1fbpfcp-zoom-1.image)

可以看出，用户的群组只有`dev`了，之前的群组已经不存在了

* 添加`-a`的情况
```shell
$ groups dev # 先查看一下用户所在群组
$ usermod -aG dev dev # 修改用户所在群组
$ groups dev # 在一次查询用户所在群组
```
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56207c151a4d4d759b1e6be4f55b980d~tplv-k3u1fbpfcp-zoom-1.image)

可以看出原来的群组还在

## 删除群组

用法很简单，在命令后接想要删除的群组名。

```shell
$ delgroup dev
```

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/048865560eb442e585e60253b6807371~tplv-k3u1fbpfcp-zoom-1.image)

`dev`已经不再`dev`群组，因为它已经被删除