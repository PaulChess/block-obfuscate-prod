# block-obfuscate-prod

阻断混淆产物

#### 任务背景:

目前有一些前端项目在本地打包完将产物直接上传到 Gitlab 仓库，不在 CI 阶段进行打包，如果开发忘记在本地打包的话，发布的代码还是老代码，可能会造成一些不可避免的生产事故。为了保证打包产物是最新的，我们需要尽可能阻断掉开发在本地打包然后直接进行发布的操作。  

下面是具体的执行方案。

#### 执行阶段:
CI clone 代码阶段，前端不用检测 MIME 文件类型，替换成下述检测方法  

#### 检测步骤:

1. 检测仓库中是否存在 dist 目录，如果不存在则直接通过，存在的话则继续执行检测。

2. 找到 dist 目录下所有的 js 文件。定采样文件数为 5，如果 js 文件数量小于等于 5 则全部检测；如果数量 > 5 则随机抽取 5 个文件进行采样。

3. 读取文件内容，执行 isMinify 方法，只要检测到其中 1 个文件是压缩过的则执行阻断，如果全部通过检测则可以认定通过。
  
**isMinify** 方法:

参考 Chome Dev Tools 中的实现:

https://github.com/ChromeDevTools/devtools-frontend/blob/main/front_end/models/text_utils/TextUtils.ts#L336

```javascript
const fs = require('fs');
 
function isMinified (text) {
  const kMaxNonMinifiedLength = 500;
  let linesToCheck = 10;
  let lastPosition = 0;
  do {
    let eolIndex = text.indexOf('\n', lastPosition);
    if (eolIndex < 0) {
      eolIndex = text.length;
    }
    if (eolIndex - lastPosition > kMaxNonMinifiedLength && text.substr(lastPosition, 3) !== '//#') {
      return true;
    }
    lastPosition = eolIndex + 1;
  } while (--linesToCheck >= 0 && lastPosition < text.length);
 
  // Check the end of the text as well
  linesToCheck = 10;
  lastPosition = text.length;
  do {
    let eolIndex = text.lastIndexOf('\n', lastPosition);
    if (eolIndex < 0) {
      eolIndex = 0;
    }
    if (lastPosition - eolIndex > kMaxNonMinifiedLength && text.substr(lastPosition, 3) !== '//#') {
      return true;
    }
    lastPosition = eolIndex - 1;
  } while (--linesToCheck >= 0 && lastPosition > 0);
  return false;
};
```