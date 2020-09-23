## 缓存
``` nginx
proxy_cache_path /opt/app/cache levels=1:2 
keys_zone=lzz_cache:10m max_size=10g inactive=60m use_temp_path=off;

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
 
 
 
 
 