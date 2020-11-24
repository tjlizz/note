你现在使用的输入法具体是什么？另外你是用 ibus 的吗？
在启动文件中输入
```shell
export XMODIFIERS="@im=ibus"
export GTK_IM_MODULE="ibus"
export QT_IM_MODULE="ibus"
```
然后启动 WebStorm 试试。
如果不行的话，你再换成下面的试试。
```shell
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
```
如果还不能解决，参考下面的链接操作一下

https://youtrack.jetbrains.com/issue/IDEA-246833

https://www.jetbrains.com/help/idea/switching-boot-jdk.html

https://confluence.jetbrains.com/pages/viewpage.action?pageId=173178989

以上方案由官方提供，亲测好用
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8383dba1bd194bc0b1dab30d1c757675~tplv-k3u1fbpfcp-zoom-1.image)
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dba08db916174ab4b2507b0676e81ac7~tplv-k3u1fbpfcp-zoom-1.image)