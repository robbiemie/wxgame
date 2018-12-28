import { Resources } from './Resources'
/**
 *  资源加载器
 */
export default class ResourceLoader {
  constructor () {
    this.map = Resources
    this.length = 0
    Object.keys(this.map).forEach((key, index) => {
      let img = wx.createImage()
      img.src = this.map[key]
      this.map[key] = img
      this.length = index + 1
    })
  }
  // 资源加载完成回调
  onLoaded (cb) {
    let loadedCount = 0

    Object.keys(this.map).forEach(key => {
      this.map[key].onload = _ => {
        loadedCount++
        if (loadedCount === this.length) {
          cb(this.map)
        }
      }
    })
  }
  // 简单工厂模式
  static create () {
    return new ResourceLoader()
  }
}
