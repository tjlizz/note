# 下载安装包

[点击
](https://www.sonatype.com/product/repository-oss-download)从官网选择自己适合自己操作系统的安装包，下载完成之后放到一个合适的位置，无需要安装。

# 启动
 进入`nexus-3.30.0-01\bin`目录下，输入`cmd`
 
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01b5e22cbf7b40eab4fd704115ec0571~tplv-k3u1fbpfcp-watermark.image)

在命令行中输入`nexus /run`，稍等片刻

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b42cdcc5df0c4b8984e295c7b439f852~tplv-k3u1fbpfcp-watermark.image)

提示`8081`端口已经被占用，原来`nexus`默认使用的端口是`8081`,关闭正在使用的`8081`端口之后，在此运行命令稍等片刻启动成功。
# 登陆系统

启动成功之在浏览器打开`http://localhost:8081/`，


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fba587f47f764e12ab8c0ffcabb0cc67~tplv-k3u1fbpfcp-watermark.image)

初始化完成之后点击`Sign in`登陆，默认账户是`admin`,初始密码在`nexus-3.30.0-01-win64\sonatype-work\nexus3`目录下的`admin.password`文件中，复制到登陆表单中完成登陆，成功之后会提示重新设置密码，设置一个自己常用的密码即可。
# 增加阿里代理仓库

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34ad4efa144a49af9265d1404d499f61~tplv-k3u1fbpfcp-watermark.image)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76920d2ca8264380b167b2a5de96257d~tplv-k3u1fbpfcp-watermark.image)

输入两个必选项

`aliyun`

`http://maven.aliyun.com/nexus/content/groups/public/`

保存完成

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c7f21c6038943d5abf204b3ff4cb3e9~tplv-k3u1fbpfcp-watermark.image)

选择`Configuration` > `Repository`, 然后双击 `maven-public`

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ce1038d21464c519b207d2b7c650e01~tplv-k3u1fbpfcp-watermark.image)

 把`aliyun`移动到右侧 保存。
 # 配置Maven
 
找到`maven`中的`setting.xml`,在`servers`标签中

写入下面的配置
```xml
<server>
        <id>releases</id>
        <username>admin</username>
        <password>123456</password>
    </server>
    
    <server>
        <id>snapshots</id>
        <username>admin</username>
        <password>123456</password>
    </server>
 
```
 > password是自己设置的登陆密码
 

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d5387e245e049c5833b26feedeb3f86~tplv-k3u1fbpfcp-watermark.image)


## 在pom文件中加入下面的配置

``` xml
<distributionManagement>
        <repository>
            <id>releases</id>
            <name>User Project Release</name>
            <url>http://127.0.0.1:8081/repository/maven-releases</url>
        </repository>
    </distributionManagement>
```

## 发布代码到私有仓库


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10c8548941ca45779f197fd35aa41513~tplv-k3u1fbpfcp-watermark.image)

双击即可

# 查看发布的项目


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad834c71a6d540b1aaaa92a580ab7ae7~tplv-k3u1fbpfcp-watermark.image)
# 使用仓库中的项目

在`pom`文件中加入下面的配置

```xml
<repositories>
        <repository>
            <id>nexus</id>
            <name>Nexus Snapshot Repository</name>
            <url>http://127.0.0.1:8081/repository/maven-public/</url>
            <releases>
                <enabled>true</enabled>
            </releases>
            <snapshots>
                <enabled>true</enabled>
            </snapshots>
        </repository>
  </repositories>
```
# 在发布和下载的时候如果遇到权限问题


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79dac5d8a27a4ba3a8e20cd605d19c2e~tplv-k3u1fbpfcp-watermark.image)


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f1f5bd879b4448f960cdba9000820bc~tplv-k3u1fbpfcp-watermark.image)
