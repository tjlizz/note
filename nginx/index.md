# Nginx 反向代理

  ```nginx
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

# 缓存设置

```nginx
proxy_cache_path /opt/app/cache levels=1:2 keys_zone=lzz_cache:10m max_size=10g inactive=60m use_temp_path=off;

server {

   location / {
     expires      1h;
     proxy_pass_header Server;
     proxy_set_header Host $http_host;
     proxy_set_header X-Real-IP $remote_addr;
     proxy_set_header X-Scheme $scheme;
     proxy_pass http://tomcats;
     proxy_cache lzz_cache;
     proxy_cache_valid 200 304 1m;
     proxy_cache_valid any 10m;
     proxy_cache_key $host$uri$is_args$args;
     add_header Nginx-Cache "$upstream_cache_status";
     proxy_next_upstream error timeout invalid_header http_500http_502 http_503 http_504;

  }

}

```