 
# 配置环境
  ## 安装`java`环境

  ```
  链接：https://pan.baidu.com/s/1o-wFA-m33JQs-sQJ-DgRaQ 
  提取码：ux7j
  ```
下载到服务器之后解压到指定位置

```shell

$ mkdir /usr/java
$ tar xzf jdk-8u301-linux-x64.tar.gz  -C /usr/java
$ vim /etc/profile
```
写入下面的内容
```
export JAVA_HOME=/usr/java/jdk1.8.0_301
export CLASSPATH=$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib
export PATH=$JAVA_HOME/bin:$PATH
```
保存退出
执行`source /etc/profile`使配置文件生效。

验证是否安装成功
```
 $ java -version
   java version "1.8.0_301"
   Java(TM) SE Runtime Environment (build 1.8.0_301-b09)
   Java HotSpot(TM) 64-Bit Server VM (build 25.301-b09, mixed mode)
```
看到这个就表示安装成功了。

##  安装`maven`
```
$ mkdir /usr/mvn
$ cd /usr/mvn
$ wget https://mirrors.tuna.tsinghua.edu.cn/apache/maven/maven-3/3.8.1/binaries/apache-maven-3.8.1-bin.tar.gz
$ tar -zxvf apache-maven-3.8.1-bin.tar.gz
$ vim /etc/profile
```
写入下面内容
```
export MAVEN_HOME=/usr/mvn/apache-maven-3.8.1

export PATH=$PATH:$MAVEN_HOME/bin

```
保存退出
执行`source /etc/profile`使配置文件生效。

验证是否安装成功
```
 $ mvn -version
 Maven home: /usr/mvn/apache-maven-3.8.1
 Java version: 1.8.0_301, vendor: Oracle Corporation, runtime: /usr/java/jdk1.8.0_301/jre
 Default locale: en_US, platform encoding: UTF-8
 OS name: "linux", version: "4.18.0-240.10.1.el8_3.x86_64", arch: "amd64", family: "unix"
```
# 其他工具

```
$ yum install git gpg -y
```
如果已经安装可以跳过这步
# 注册`sonatype`账号

 [点击](https://issues.sonatype.org/secure/Signup!default.jspa) 注册一个新的账户。

 登录之后新建一个`issues`
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/34d16e165bc64fcb8b95b59845e69ba6.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xpNTY3Mg==,size_16,color_FFFFFF,t_70)

 按要求填写就可以了，主要说一个`Group Id`
 如果你的代码时托管在`Github`上的，那么写`Group Id`的时候就不能写
 `com.github.xxx`了,我使用`io`开头，详情在[这里](https://central.sonatype.org/changelog/#2021-04-01-comgithub-is-not-supported-anymore-as-a-valid-coordinate)

 创建完成之后会跳转到这个连接`https://issues.sonatype.org/browse/OSSRH-xxxx`,当看到这个连接之后，你要在你的`Github`上创建一个仓库，来证明你是这个`Github`的主人，仓库的名字就是连接里的`OSSRH-xxxx`。

 创建后的仓库连接为`https://github.com/yourgithubname/OSSRH-xxxx`,然后在帖子下面留言告诉管理员这个仓库你已经创建好了名字为`OSSRH-xxxx`的仓库,这样可以省去他让你证明你是这个账户的拥有者，提高效率。等到管理员回复之后就可以上传`jar`包了。

 下面是管理员的回复，看到这个就表示完成了。

 ```
io.github.xxx has been prepared, now user(s) youname can:
Publish snapshot and release artifacts to s01.oss.sonatype.org
Have a look at this section of our official guide for deployment instructions:
https://central.sonatype.org/publish/publish-guide/#deployment

Depending on your build configuration, your first component(s) might be released automatically after a successful deployment.
If that happens, you will see a comment on this ticket confirming that your artifact has synced to Maven Central.
If you do not see this comment within an hour or two, you can follow the steps in this section of our guide:
https://central.sonatype.org/publish/release/

######

As part of our efforts to improve the security and quality posture of the open source supply chain,
we plan to enable additional scanning of dependencies for security alerts soon. Since you're already
hosting your source code in Github, you can get these insights today by enabling Sonatype Lift.
Sonatype Lift is free forever on public repositories! Lift tells you about open source vulnerabilities
during code review, and goes beyond open source to scan your code for both code quality and security issues,
providing feedback right in your pull requests.
More information can be found at https://links.sonatype.com/products/lift/github-integration

######
 ```

 #  发布前的准备

  ## 修改`pom`文件
  ```xml

    <groupId>io.github.xxxx</groupId>
    <artifactId>xxxx</artifactId>
    <version>1.0.0</version>
    <name>xxx</name>
    <url>xxxx</url>
    <description>xxxxx</description>
    <distributionManagement>
        <snapshotRepository>
            <id>ossrh</id>
            <url>https://s01.oss.sonatype.org/content/repositories/snapshots</url>
        </snapshotRepository>
        <repository>
            <id>ossrh</id>
            <url>https://s01.oss.sonatype.org/service/local/staging/deploy/maven2/</url>
        </repository>
    </distributionManagement>
    <build>
        <plugins>

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.1</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                </configuration>
            </plugin>
            <!-- Source -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-source-plugin</artifactId>
                <version>2.2.1</version>
                <executions>
                    <execution>
                        <phase>package</phase>
                        <goals>
                            <goal>jar-no-fork</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <!-- Javadoc -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-javadoc-plugin</artifactId>
                <version>2.9.1</version>
                <configuration>
                    <additionalparam>-Xdoclint:none</additionalparam>
                </configuration>
                <executions>
                    <execution>
                        <phase>package</phase>
                        <goals>
                            <goal>jar</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <!-- GPG mvn clean deploy -P release -Dgpg.passphrase=YourPassphase -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-gpg-plugin</artifactId>
                <version>1.5</version>
                <executions>
                    <execution>
                        <id>sign-artifacts</id>
                        <phase>verify</phase>
                        <goals>
                            <goal>sign</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>

    <licenses>
        <license>
            <name>MIT License</name>
            <url>https://github.com/xxx/xxx/xxxxxx/master/LICENSE</url>
            <distribution>repo,manual</distribution>
        </license>
    </licenses>
    <developers>
        <developer>
            <name>xxx</name>
            <email>xxxx</email>
            <url>xxxx</url>
        </developer>
    </developers>
    <scm>
        <connection>scm:git:https://github.com/xxx/xxxx.git</connection>
        <developerConnection>scm:git:https://github.com/xxxx/xxxx.git</developerConnection>
        <url>https://github.com/xxxx/xxxxx</url>
        <tag>0.0.1</tag>
    </scm>
  ```
只需修改和自己相关的内容即可，文中用`xxxx`表示，其他的不需要修改

`Group Id`一定要和申请的保持一致

## 上传`gpg key`

 ```shell
 $  gpg generate-key
 # 按照提示输入用户名和邮箱，最后会输入一个密码，记住这个密码下面会用 
 ```

  ### 将公钥发送到PGP密钥服务器

 ```shell
 $   gpg --keyserver hkp://keyserver.ubuntu.com:11371 --send-keys 6107DF0A8EE6A62EABFDD12914F722543E7D2C1E
 ```
 返回结果

```shell
gpg: 将密钥‘14F722543E7D2C1E’上传到 hkp://keyserver.ubuntu.com:11371
```
验证是否上传成功

```shell
$   gpg --keyserver hkp://keyserver.ubuntu.com:11371 --recv-keys 6107DF0A8EE6A62EABFDD12914F722543E7D2C1E
```
返回结果
```shell
gpg: 密钥 14F722543E7D2C1E：“houbb <XXX@XX.com>”未改变
gpg: 合计被处理的数量：1
gpg:           未改变：1
```

## `setting.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>

<settings xmlns="http://maven.apache.org/SETTINGS/1.2.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.2.0 http://maven.apache.org/xsd/settings-1.2.0.xsd">
  <servers>
    <server>
      <id>ossrh</id>
      <username>sonatype账号</username>
      <password>sonatype密码</password>
    </server>
  </servers>
  <profiles>
   <profile>
      <id>ossrh</id>
      <activation>
        <activeByDefault>true</activeByDefault>
      </activation>
      <properties>
        <gpg.executable>gpg2</gpg.executable>
        <gpg.passphrase>gpg公钥的密码</gpg.passphrase>
      </properties>
    </profile>
  </profiles>
</settings>
```
注意判断`mvn`使用的`setting.xml`是哪里的，一般在`mvn`主目录下的`conf`文件夹和用户目录下的`.m2`文件夹
# 上传程序

在项目根目录下执行

```shell
$ mvn clean deploy
```
稍等片刻会出现一个窗口，输入`gpg`的密码

![看到这个表示发布成功](https://img-blog.csdnimg.cn/3432ac48ec174e53990e7a3296fdb385.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xpNTY3Mg==,size_16,color_FFFFFF,t_70)

 看到这个表示已经上传成功了。

 上传成功之后登录到`https://s01.oss.sonatype.org/`,账号就是一开始注册的sonatype账号。

 登录之后会点击`Staging Repositories`会看到这个页面，选中记录点击`close`,成功之后点击`Release`。

 到这步就已经大功告成了,稍等片刻就可以在这里看到上传的包了
 
 比如 `Group Id`是`io.github.xxx`
 
  `artifactId`是`tool`
  
   `version`是`1.0.0`,
 
 查看地址就是`https://repo.maven.apache.org/maven2/io/github/xxx/tool/1.0.0`

 如果上面这个连接可以查到，就已经可以在项目中使用了。同步到中央仓库的时间不太确定。

发布成功之后去帖子上回复一下，告诉管理员发布成功了。


 ![在这里插入图片描述](https://img-blog.csdnimg.cn/689a5fa7f23b4d76890e46a39b577421.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xpNTY3Mg==,size_16,color_FFFFFF,t_70)


# 遇到的问题

  * 执行`mvn deploy`的时候总是返回`401` 错误，找了各种办法都不能解决，重新注册了个账户就可以了，不知道是为什么。

  * `repository`地址已经改变了，现在网上大部分的文章都是旧的，新的是这样的
  ```xml
    <distributionManagement>
        <snapshotRepository>
            <id>ossrh</id>
            <url>https://s01.oss.sonatype.org/content/repositories/snapshots</url>
        </snapshotRepository>
        <repository>
            <id>ossrh</id>
            <url>https://s01.oss.sonatype.org/service/local/staging/deploy/maven2/</url>
        </repository>
    </distributionManagement>
  ```
[官方文档](https://central.sonatype.org/publish/publish-maven/)有最新的配置信息，遇到问题之后还是要先查官方文档

 * 在`centos`发布时报错
 `Failed to execute goal org.apache.maven.plugins:maven-gpg-plugin:1.6:sign`

   [解决方法](https://blog.csdn.net/li5672/article/details/119564796)
