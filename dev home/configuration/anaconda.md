
# 管窥Anaconda的channel查询顺序_anaconda 频道查看-CSDN博客


#### channel顺序机制
C://Users/yourname/.condarc

清华源的`.condarc`长这样：

```
channels:
  - defaults
show_channel_urls: true
default_channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  msys2: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  bioconda: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  menpo: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch-lts: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  simpleitk: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  deepmodeling: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/
<div class="hljs-button {2}" data-title="复制" onclick="hljs.copyCode(event);setTimeout(function(){$('.hljs-button').attr('data-title', '免登录复制');},3500);"></div>
```

其中分为了三个部分，channels、default\_channels、custom\_channels

-   channels里面的频道都会被搜索
-   default\_channels就是在channels中的defaults，有三个频道
-   custom\_channels的频道只有在指定`-c`的时候才会查找

举个例子，如果我运行`conda install pytorch torchvision torchaudio pytorch-cuda=11.8 -c pytorch -c nvidia`

最终要查找的频道顺序是：

```
https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch(由-c pytorch指定)
https://conda.anaconda.org/nvidia(由-c nvidia指定)
https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main(由channels的default给出)
https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r(由channels的default给出)
https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2(由channels的default给出)
<div class="hljs-button {2}" data-title="免登录复制" onclick="hljs.copyCode(event);setTimeout(function(){$('.hljs-button').attr('data-title', '免登录复制');},3500);"></div>
```

#### custom\_channels的使用

设置`.condarc`为：

```
show_channel_urls: true
channels:
  - defaults

custom_channels:
  hjjjjj: https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
<div class="hljs-button {2}" data-title="免登录复制" onclick="hljs.copyCode(event);setTimeout(function(){$('.hljs-button').attr('data-title', '免登录复制');},3500);"></div>
```

运行`conda update numpy -c hjjjjj`，会显示：

```
UnavailableInvalidChannel: HTTP 404 NOT FOUND for channel hjjjjj &lt;https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/hjjjjj&gt;
<div class="hljs-button {2}" data-title="免登录复制" onclick="hljs.copyCode(event);setTimeout(function(){$('.hljs-button').attr('data-title', '免登录复制');},3500);"></div>
```

如果不设置`custom_channels`，运行`conda update numpy -c hjjjjj`，会显示：

```
UnavailableInvalidChannel: HTTP 404 NOT FOUND for channel hjjjjj &lt;https://conda.anaconda.org/hjjjjj&gt;
<div class="hljs-button {2}" data-title="免登录复制" onclick="hljs.copyCode(event);setTimeout(function(){$('.hljs-button').attr('data-title', '免登录复制');},3500);"></div>
```



$(function() { setTimeout(function () { var mathcodeList = document.querySelectorAll('.htmledit\_views img.mathcode'); if (mathcodeList.length > 0) { for (let i = 0; i < mathcodeList.length; i++) { if (mathcodeList\[i\].naturalWidth === 0 || mathcodeList\[i\].naturalHeight === 0) { var alt = mathcodeList\[i\].alt; alt = '\\\\(' + alt + '\\\\)'; var curSpan = $('<span class="img-codecogs"></span>'); curSpan.text(alt); $(mathcodeList\[i\]).before(curSpan); $(mathcodeList\[i\]).remove(); } } MathJax.Hub.Queue(\["Typeset",MathJax.Hub\]); } }, 1000) });
