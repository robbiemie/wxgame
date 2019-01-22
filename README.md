## 微信小游戏实践

## 源码目录介绍
```
./js
├── base                                 // 定义游戏开发基础类
│   ├── DataStore.js                       // 全局变量缓存器
│   ├── ResourceLoader.js                  // 资源加载器
|   ├── Resources.js                       // 资源类
|   └── Sprite.js                          // 精灵类
├── instance                             // 游戏实例类
|   ├── Birds.js                           // 小鸟
|   ├── Score.js                           // 积分板
|   └── StartButton.js                     // 开始按钮
├── runtime                              // 游戏场景类
|   ├── Background.js                       // 背景
|   ├── DownPencil.js                       // 下层铅笔
|   ├── Land.js                             // 陆地
|   └── UpPencil.js                         // 上层铅笔
└── Director.js                          // 游戏入口主函数
```


## 小游戏填坑指南

- 微信小游戏只允许在调试模式下使用`window`全局变量，在真机模式下使用`window`会导致报错。

- 微信小游戏用户授权信息（从基础库2.0.1）仅支持通过授权按钮进行唤起调用。

[createUserInfoButton 示例文档](https://developers.weixin.qq.com/minigame/dev/api/wx.createUserInfoButton.html)

- 如何在canvas绘制图片

```javascript
  let image = wx.createImage()
  image.src = './resources/background.png'
  // 资源加载完成回调
  image.onload = _ => {
    this.ctx.drawImage(
      image,
      0, 0,
      // 源图片裁剪的宽高
      image.width,
      image.height,
      0, 0,
      // 屏幕投影宽高
      image.width,
      image.height
    )
  }

```


- 单例模式应用

```javascript
export default class Director {
  constructor () {
    console.log('Director 构造器初始化')
  }

  static getInstance () {
    if (!Director.instance) {
      Director.instance = new Director()
    }
    return Director.instance
  }
}


// other Class
import Director from './js/Director'

export default class Main {
  constructor () {
    // 获取 Director 实例
    this.director = Director.getInstance()
  }
}


```

- 实现全局状态管理器

```javascript

export default class DataStore {
  constructor () {
    this.map = new Map()
  }
  static getInstance () {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore()
    }
    return DataStore.instance
  }
  put (key, value) {
    this.map.set(key, value)
    return this // 保证链式调用
  }
  get (key) {
    return this.map.get(key)
  }
  // 资源销毁
  destory () {
    // for (let value of this.map.values()) {
    //   value = null
    // }
  }
}


```

- `super`之前不可以调用`this`

```javascript
export default class Background extends Sprite {
  constructor (image = null) {
    // this 不可以调用
    this.image = null 
    // this 不可以调用
    super(image,
      0, 0,
      image.width,
      image.height,
      0, 0,
      screenWidth,
      screenHeight
    )
  }
}

```


- 子类中通过`super`，可以调用父类的方法

```javascript
export default class Background extends Sprite {
  draw () {
    super.drawImage()
  }
}

```


- 微信垃圾回收

```javascript
wx.triggerGC()
```
- 播放音乐

```
// 播放背景音乐
createBackgroundMusic () {
  const bgm = wx.createInnerAudioContext()
  bgm.autoplay = true // 自动播放
  bgm.loop = true // 循环播放
  bgm.src = 'audio/bgm.mp3'
}
```

- 振动检测

```javascript
// 振动检测
wx.vibrateShort({
  success () {
    console.log('success')
  },
  fail () {
    console.log('fail')
  },
  complete () {
    console.log('complete')
  }
})
```

- 微信常用数据接口

```javascript

// 获取用户授权信息
// https://developers.weixin.qq.com/miniprogram/dev/api/wx.getUserInfo.html
wx.getUserInfo(Object object)
// 用户登录
// https://developers.weixin.qq.com/miniprogram/dev/api/wx.login.html
wx.login(Object object)
```


- 搭建简易的websocket服务

```javascript
// 服务端ws
const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ port: 8080 });
// 建立连接
wss.on('connection', function connection(ws) {
  // 接受客户端消息
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  // 发送消息
  ws.send('something');
});


// 客户端ws
setConnect () {
  console.log('setConnect')
  wx.connectSocket({
    url: 'ws://127.0.0.1:8080',
    success () {
      console.log('建立成功')
    },
    complete () {
      console.log('建立完成')
    }
  })
}
```

- 在webSocket中发送消息

```javascript
wx.onSocketOpen(_ => {
  // 必须在onSocketOpen回调中发送
  wx.sendSocketMessage({
    data: '发送客户端消息~~~~~~~~~~~',
    success () {
      console.log('发送成功')
    },
    complete () {
      console.log('发送完成')
    }
  })
  // 监听服务端的消息
  wx.onSocketMessage(res => {
    console.log('这是接受服务端数据', res)
  })
})
```

- 简易碰撞检测

```javascript
  // 碰撞检测
  checkCollision (point, range, image) {
    const offset = {
      top: -1,
      bottom: -1,
      left: -1,
      right: -1
    }
    if (point.y < range.top + image.height / 2) {
      // 超出上边界
      offset.top = parseFloat((range.top + image.height / 2 - point.y) / image.height)
    } else if (point.y > range.bottom - image.height / 2) {
      // 超出下边界
      offset.bottom = parseFloat((point.y - (range.bottom - image.height / 2)) / image.height)
    }
    if (point.x < range.left + image.width / 2) {
      // 超出左边界
      offset.left = parseFloat((range.left + image.width / 2 - point.x) / image.width)
    } else if (point.x > range.right - image.width / 2) {
      // 超出右边界
      offset.right = parseFloat((point.x - (range.right - image.width / 2)) / image.width)
    }
    return offset
  }
```


- 简易边界检测

```javascript
  checkRange (point) {
    let infos = {
      valid: false,
      pos: -1, // 点击区域无效
      point
    }
    const unitImage = this.dataStore.get('wrong')
    if (point.y >= this.topRange.top &&
        point.y <= this.topRange.bottom &&
        point.x >= this.topRange.left &&
        point.x <= this.topRange.right
    ) {
      console.log('点击了上边界')
      infos.pos = 0
      infos.valid = true
      infos.offset = this.checkCollision(point, this.topRange, unitImage)
    } else if (point.y >= this.bottomRange.top &&
      point.y <= this.bottomRange.bottom &&
      point.x >= this.bottomRange.left &&
      point.x <= this.bottomRange.right
    ) {
      console.log('点击了下边界')
      infos.pos = 1
      infos.valid = true
      infos.offset = this.checkCollision(point, this.bottomRange, unitImage)
    }
    return infos
  }
```

- canvas 文字居中

```javascript
// canvas 文字居中（动态计算文字长度）
const len = (this.score.toString().length - 1)
this.dataStore.ctx.font = `bold ${px(48)}px Arial`
this.dataStore.ctx.fillStyle = '#833823'
this.dataStore.ctx.fillText(
  this.score,
  px(pos.x - 10 * len), px(pos.y), 1000)
```

- Promise.all 应用

```javascript
  // 资源加载
  this.image = wx.createImage()
  this.progressbg = wx.createImage()
  this.progressbar = wx.createImage()
  this.image.src = 'resources/images/common/bg.png'
  this.progressbg.src = 'resources/images/common/progress-bar.png'
  this.progressbar.src = 'resources/images/common/progress.png'
  this.loaded = false
  const p1 = new Promise(resolve => {
    this.image.onload = _ => {
      resolve()
    }
  })
  const p2 = new Promise(resolve => {
    this.progressbg.onload = _ => {
      resolve()
    }
  })
  const p3 = new Promise(resolve => {
    this.progressbar.onload = _ => {
      resolve()
    }
  })
  Promise.all([p1, p2, p3]).then(_ => {
    console.log('loading页加载完成')
    this.loaded = true
  })
```

- 绘制矩形

```javascript
// 绘制矩形
ctx.fillStyle = 'rgba(255,255,255,0.9)'
const width = px(300)
const height = px(200)
ctx.fillRect(this.screenWidth / 2 - width / 2, this.screenHeight / 2 - height / 2, width, height)
ctx.fill()
```

- canvas 文字溢出

```
  spliteWord (content) {
    let templateWord = ''
    /* 自定义文字内容长度 */
    const len = 10
    if (content.length * 2 <= len) {
      return content
    }
    /* 用于记录文字内容的总长度 */
    let strLength = 0
    for (let i = 0; i < content.length; i++) {
      templateWord += content.charAt(i)
      /* charCodeAt()返回指定位置的字符的Unicode编码，值为128以下时一个字符占一位，当值在128以上是一个字符占两位 */
      if (content.charCodeAt(i) > 128) {
        strLength = strLength + 2
        if (strLength >= len) {
          return templateWord.substring(0, templateWord.length - 1) + '...'
        }
      } else {
        strLength = strLength + 1
        if (strLength >= len) {
          return templateWord.substring(0, templateWord.length - 2) + '...'
        }
      }
    }
    return templateWord
  }
```

- 小游戏登录授权流程图

![](https://makefriends.bs2dl.yy.com/bm1548142443125.jpg)



- js 随机数

```javascript

Math.ceil();  //向上取整。

Math.floor();  //向下取整。

Math.round();  //四舍五入。

Math.random();  //0.0 ~ 1.0 之间的一个伪随机数
```
