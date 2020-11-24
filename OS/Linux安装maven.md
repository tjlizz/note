# 下载maven
```shell
$ cd /usr/local        # 进入安装目录
$ wget https://mirrors.tuna.tsinghua.edu.cn/apache/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.tar.gz
$  tar -zxvf apache-maven-3.6.3-bin.tar.gz 
```
# 配置环境变量

 ```shell
 $ vim /etc/profile # 写入一下内容
 
 ```
 ```
MAVEN_HOME=/usr/local/apache-maven-3.6.3
export MAVEN_HOME
export PATH=${PATH}:${MAVEN_HOME}/bin
```

```
$ source /etc/profile
```