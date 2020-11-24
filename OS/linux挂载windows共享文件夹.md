  创建文件夹
  ```shell
  $ mkdir -p /mnt/share
  ```
 安装依赖
 ```shell
 $ yum install  cifs-utils
 ```
修改/etc/fstab文件，文件最后加入：
```
//192.168.16.32/serverapp /mnt/share cifs  defaults  0 0
```
执行命令
```
mount -t cifs -o username='administrator',password='**'  //192.168.16.32/serverapp /mnt/share
```
