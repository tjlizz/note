# Docker Desktop修改默认存储路径


目前 WSL2 已经全量发布，WSL2 下 docker-desktop-data 通常位于以下位置： C:\Users\<你当前用户名>\AppData\Local\Docker\wsl\data\ext4.vhdx，我电脑中这个文件夹高达 50GB+，完全是浪费 C 盘空间！

在开始操作前，请先退出 Docker Desktop，然后在 terminal 中输入 wsl --list -v，确保两个服务都是停止


* 备份镜像

```
wsl --export docker-desktop G:\docker-desktop.tar
wsl --export docker-desktop-data G:\docker-desktop-data.tar
```
* 取消注册

  ```
  wsl --unregister docker-desktop
  wsl --unregister docker-desktop-data
  ```

*  备份导入

```
wsl --import docker-desktop "G:\docker\desktop" "G:\docker-desktop.tar" --version 2
wsl --import docker-desktop-data "G:\docker\data" "G:\docker-desktop-data.tar" --version 2
```

* 测试

测试
输入 wsl --list -v 查看其输出是否和修改之前一样，正常情况下会出现两个发行版，即：docker-desktop，docker-desktop-data。

#  Docker 清理缓存


最后再搬运一个清理 docker 缓存的教程

在使用 docker build 构建镜像时，Docker 会按照 Dockerfile 中定义的步骤逐步生成 Docker 镜像。而镜像生成的过程中，每一步骤所生成的结果都会被缓存（cache）下来，以便下次镜像生成时不必再重新执行同一步骤以提高构建镜像的速度。
使用 --no-cache
docker build --no-cache .
使用 docker system prune
使用 docker system prune 命令来清理不再使用的资源，包括停止的容器、未被标记的镜像、未使用的网络和未使用的数据卷。

# 清理所有不再使用的资源
docker system prune
# 清理更加彻底，将未使用 Docker 镜像都删掉
docker system prune -a

内容来自 https://www.bytecho.net/archives/2324.html
