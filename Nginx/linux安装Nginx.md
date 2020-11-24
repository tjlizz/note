```shell
$ sudo yum install -y epel-release
$ sudo yum install -y nginx
```

安装成功后，默认的网站目录为： /usr/share/nginx/html

默认的配置文件为：/etc/nginx/nginx.conf

自定义配置文件目录为: /etc/nginx/conf.d/

# 开启端口
```shell
$ sudo firewall-cmd --permanent --zone=public --add-service=http
$ sudo firewall-cmd --permanent --zone=public --add-service=https
$ sudo firewall-cmd --reload
```
> 开启80和443端口
# 常用操作

 启动Nginx
 ```shell
 $ systemctl start nginx
 ```
 停止Nginx

 ```shell
 $ systemctl stop nginx
 ```
 重启Nginx
 ```shell
$ systemctl restart nginx
 ```

 查看Nginx状态

 ```shell
 systemctl status nginx
 ```

 设置开机启动
 ```shell
 $ systemctl enable nginx
 ```

禁止开机启动
```shell
$ systemctl disable nginx
```