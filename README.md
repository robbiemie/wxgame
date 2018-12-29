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


- js 随机数

```javascript

Math.ceil();  //向上取整。

Math.floor();  //向下取整。

Math.round();  //四舍五入。

Math.random();  //0.0 ~ 1.0 之间的一个伪随机数
```