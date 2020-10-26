 ## 反向代理

  

``` nginx
upstream tomcats {
    server 127.0.0.1:8001;
    server 127.0.0.1:8002;
    server 127.0.0.1:8003;
}
# 要定义在http模块之内，server模块之外
  ```

``` nginx
server {
         listen 80 ;
        location / {
            proxy_pass_header Server;
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Scheme $scheme;
            proxy_pass http://tomcats;
           
        }
}    
                                                              
```

## 去除前缀
  使用Nginx做反向代理的时候如果需要根据不同的url代理到不同的服务器，需要通过以下方法：
  * 地址后面加`/`
   ```nginx
   server {

    location ^~/v1/ {
        proxy_set_header Host $host;
        proxy_set_header  X-Real-IP        $remote_addr;
        proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;

        proxy_pass http://localhost:8080/;
    }
  }
   ```
   `^~/v1/`表示请求前缀是`v1`的请求，`proxy_pass`最后加上`/`，就会把`v1`去除，比如请求的地址是`v1/api/test`，则代理发出的请求是`http://localhost:8080/api/test`
   
  * 使用`rewrite`
  ```nginx
  server {
  
    location ^~/v1/ {
        rewrite ^/v1/(.*)$ /$1 break;
        proxy_pass http://localhost:8080;
    }
}
  ```

   使用 `rewrite`重写了`url`
   注意 `proxy_pass`后**不需要**加`/`

     
     
  



  
  
  
  
