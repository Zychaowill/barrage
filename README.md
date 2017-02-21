# barrage
A simple barrage based on JavaScript

# 该插件仅简单实现了弹幕的效果，包括定时器。略有不足，仅供学习参考。

- **模块化编程**

```bash
(function(window, document, undefined) {

  function Barrage(selector) {
    this.doms = document.querySelectorAll(selector);

    for (var i = 0; i < this.doms.length; i += 1) {
      this[i] = this.doms[i];
    }

    this.length = this.doms.length;
  }

  Barrage.prototype = {

  };

  function B(selector) {
    return new Barrage(selector);
  }

  window.B = B; // 对外导出接口仅有B，外部使用直接通过 B.methodName形式进行使用即可

})(window, document);
```

- **弹幕插件API**

each(callback):

on(event, callback):

css(attribute, value):

val(value):

html(value):

append(childNode):

offset(): 该方法返回值为一个对象(包含width、height、left、top属性)

trigger(event):


- **弹幕定时器**

该弹幕插件是通过[野狗云](https://docs.wilddog.com/overview/index.html)进行数据的存储的。针对[野狗使用教程](https://docs.wilddog.com/resources/sync/web/tutorial.html)可自行前往官网教程学习使用。
