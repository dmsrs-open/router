# tensorflow 2.15.0 windows 支持gpu，安装cuda支持（GPU）还是那么难吗？

## 不！，现在pip就帮你解决了（只有在wsl里，原生windows不可能了）

注意一定要在页面右上角把语言切换成英文，中文的内容没更新。
https://tensorflow.google.cn/install/pip#windows-wsl2

## 安装过程
主要的安装步骤是：

```shell
## 装最新的RTX驱动
conda activate py310-tf215 #your env name
## No need
# pip install tensorrt-bindings tensorrt-libs -i https://pypi.nvidia.com
pip install -U tensorflow[and-cuda]

```
 安装过程会下载和安装很多个组件。我这边下载速度大概800k/s，安装用了一个小时。安装完成后用下面的语句验证：

测试一下，如果有输出，那么恭喜你，如果没成功，或者安装过程出错了，你找我，如果找不到我，就找错误原因。至少我测试过，这条河，我给你趟过

```shell
python3 -c "import tensorflow as tf; print(tf.config.list_physical_devices('GPU'))"
```