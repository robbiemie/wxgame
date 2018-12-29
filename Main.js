import ResourceLoader from './js/base/ResourceLoader'
import Background from './js/runtime/Background'
import Land from './js/runtime/Land'
import Birds from './js/player/Birds'
import Score from './js/player/Score'
import DataStore from './js/base/DataStore'
import Director from './js/Director'

const canvas = wx.createCanvas()
export default class Main {
  constructor () {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    // 全局状态管理器
    this.dataStore = DataStore.getInstance()
    // 加载资源
    this.loader = ResourceLoader.create()
    this.loader.onLoaded(map => this.onResourceLoaded(map))
  }
  // 资源加载完成回调
  onResourceLoaded (res) {
    console.log('资源加载完成')
    // 常驻资源
    this.dataStore.ctx = this.ctx
    this.dataStore.res = res
    this.dataStore.screenWidth = window.innerWidth
    this.dataStore.screenHeight = window.innerHeight
    this.dataStore.gameSpeed = 2 // 游戏速度

    this.init()
  }
  addEventListener () {
    console.log('注册全局事件')
    wx.onTouchStart(res => {
      console.log('触摸了', res, this.director)
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
      if (this.director.isGameOver) {
        console.log('游戏结束')
        this.init()
      } else {
        this.director.birdsEvent()
      }
    })
  }
  removeEvenListener () {
  }

  createBgm () {
    const bgm = wx.createInnerAudioContext()
    bgm.autoplay = true // 自动播放
    bgm.loop = true // 循环播放
    bgm.src = 'audio/bgm.mp3'
  }

  init () {
    // 游戏结束，立即的销毁资源
    const bg = new Background()
    const land = new Land()
    const birds = new Birds()
    const score = new Score()
    this.createBgm()
    // 注册资源
    this.dataStore
      .put('background', bg)
      .put('land', land)
      .put('birds', birds)
      .put('pencils', [])
      .put('score', score)
    this.director = Director.getInstance()
    // 预创建对象
    this.director.isGameOver = false
    this.director.createPencil()
    this.director.update()
    this.addEventListener()
  }
}
