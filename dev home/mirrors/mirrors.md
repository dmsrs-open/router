

- [1. Mirrors for dev](#1-mirrors-for-dev)
	- [1.1. **pip镜像**](#11-pip镜像)
		- [1.1.1. **南大pip镜像**](#111-南大pip镜像)
		- [1.1.2. **清华pip镜像**](#112-清华pip镜像)
		- [1.1.3. **阿里pip镜像**](#113-阿里pip镜像)
		- [1.1.4. **腾讯pip镜像**](#114-腾讯pip镜像)
		- [1.1.5. **豆瓣pip镜像**](#115-豆瓣pip镜像)
		- [1.1.6. **网易pip镜像**](#116-网易pip镜像)
		- [1.1.7. **临时使用**](#117-临时使用)
	- [1.2. **conda镜像**](#12-conda镜像)
		- [1.2.1. **南大镜像**](#121-南大镜像)
		- [1.2.2. **清华conda镜像**](#122-清华conda镜像)
		- [1.2.3. **中科大conda镜像**](#123-中科大conda镜像)
# 1. Mirrors for dev


> ## Excerpt
>1. 安装和更新conda install package_name: 安装指定的软件包。conda update package_name: 更新已安装的软件包。conda update conda：将conda本身更新到最新可用版本。conda upgrade conda: 会卸载旧版本的conda…

## 1.1. **pip镜像**

### 1.1.1. **南大pip镜像**

```shell
pip config set global.index-url https://mirror.nju.edu.cn/pypi/web/simple/
```

### 1.1.2. **清华pip镜像**

```shell
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

### 1.1.3. **阿里pip镜像**

```shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/
```

### 1.1.4. **腾讯pip镜像**

```shell
pip config set global.index-url http://mirrors.cloud.tencent.com/pypi/simple/
```

### 1.1.5. **豆瓣pip镜像**

```shell
pip config set global.index-url http://pypi.doubanio.com/simple
```

### 1.1.6. **网易pip镜像**

```shell
pip config set global.index-url https://mirrors.163.com/pypi/simple/
```

### 1.1.7. **临时使用**

另外如果临时使用可以pip的时候在后面加上-i参数，指定pip源：

```shell
pip install package -i https://mirrors.aliyun.com/pypi/simple/
```

## 1.2. **conda镜像**

### 1.2.1. **南大镜像**

```shell
conda config --add channels https://mirrors.nju.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.nju.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.nju.edu.cn/anaconda/cloud/conda-forge/
conda config --set show_channel_urls yes
```

Conda 在执行诸如 conda install 或 conda update 等命令时，会显示软件包通道的 URL 地址。

### 1.2.2. **清华conda镜像**

```shell
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/
conda config --set show_channel_urls yes
```

### 1.2.3. **中科大conda镜像**

```shell
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/menpo/
conda config --set show_channel_urls yes
```

