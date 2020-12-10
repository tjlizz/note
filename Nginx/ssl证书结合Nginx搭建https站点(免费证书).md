#   创建ssl证书

 

``` shell
 $ mkdir -p /etc/nginx/ssl
 $ cd /etc/nginx/ssl
 $ openssl genrsa -idea -out server.key 1024
 $ openssl req -new -key server.key -out server.csr
 $ openssl x509 -req -days 3650 -in server.csr -signkey server.key -out server.crt
 ```

  > 注意要加过期时间，默认的有效期很短

# Nginx 配置

 

``` shell
  $ cd /etc/nginx/conf.d
  $ vim https.conf
 ```

  输入以下内容
``` nginx
     server {
        listen       443 ssl http2 default_server;
        listen       [::]:443 ssl http2 default_server;
        server_name  _;
        root         /usr/share/nginx/html;
        ssl_certificate "/etc/nginx/ssl/server.crt";
        ssl_certificate_key "/etc/nginx/ssl/server.key";
        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout  10m;
        ssl_ciphers PROFILE=SYSTEM;
        ssl_prefer_server_ciphers on;
        location / {
        }

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
        }
   ```
  保存退出并重启`nginx`

  ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d265c343d89042e4bca60e58e6021324~tplv-k3u1fbpfcp-watermark.image)

   因为我们的证书没有给相关机构认证，所以还是提示不安全，但是不影响我们测试使用
 

 如果想部署个人服务器的话可以在各大服务器厂商申请免费的ssl证书，也是很方便的，前提是要有自己的域名。

 我是在[腾讯云](https://console.cloud.tencent.com/ssl)申请的免费`ssl`证书。按照官网的提示操作很简单的。

  ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f84c40fa580a4a1fbc14bcca2c5433a4~tplv-k3u1fbpfcp-watermark.image)
