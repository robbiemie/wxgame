## quickstart

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