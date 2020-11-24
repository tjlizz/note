## 在github上新增ssh

``` shell
$ rm -rf ~/.ssh/* 
$ ssh-keygen -t rsa -b 4096 -C "你的邮箱"
 # 按回车三次
$ cat ~/.ssh/id_rsa.pub
```

## 基础信息配置

``` shell
$ git config --global user.name 你的英文名
$ git config --global user.email 你的邮箱
$ git config --global push.default matching
$ git config --global core.quotepath false
$ git config --global core.editor "vim"
```
