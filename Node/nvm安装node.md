## 安装
 ### 使用`nvm`安装

  ```shell
  $ wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
  ```
  >提示内容：
=> Downloading nvm as script to '/home/dhbm/.nvm'
=> Appending nvm source string to /home/dhbm/.bashrc
=> Appending bash_completion source string to /home/dhbm/.bashrc
=> Close and reopen your terminal to start using nvm or run the following to use it now:
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion" # This loads nvm bash_completion

按照提示，直接 copy 粘贴以上内容
```shell
export NVM_DIR="$HOME/.nvm"
		[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
		[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

```shell
$ nvm install node # 安装nodejs
$ npm config set registry http://registry.npm.taobao.org/ # 设置淘宝镜像
```