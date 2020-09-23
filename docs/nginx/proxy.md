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
