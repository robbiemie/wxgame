import ResourceLoader from './js/base/ResourceLoader'
import Background from './js/runtime/Background'
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
    this.render(res)
  }
  render (res) {
    // 游戏结束，立即的销毁资源
    const bg = new Background(this.ctx, this.dataStore.res['background'])
    this.dataStore.put('background', bg)
    this.director = new Director()
    this.director.run()
  }
}
