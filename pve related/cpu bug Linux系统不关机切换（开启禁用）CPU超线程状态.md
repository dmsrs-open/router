cpu bug Linux系统不关机切换（开启禁用）CPU超线程状态

在国外贴子上看到了在不关机的情况下切换（开启/禁用）CPU超线程的简单方法，适用于较新的Linux Kernel（亲测CentOS 7有效）：

1、检查超线程的状态：

```javascript
cat /sys/devices/system/cpu/smt/active
```

如果返回值是0，表示超线程已关闭；返回值是1，表示超线程已开启。

2、切换超线程状态：

（1）关闭：

```javascript
echo off > /sys/devices/system/cpu/smt/control
```

（2）开启：

```javascript
echo on > /sys/devices/system/cpu/smt/control
```

以上内容参考了网文：

Disable hyperthreading from within Linux (no access to BIOS)

<https://serverfault.com/questions/235825/disable-hyperthreading-from-within-linux-no-access-to-bios>
