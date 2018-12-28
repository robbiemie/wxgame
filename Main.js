import ResourceLoader from './js/base/ResourceLoader'
import Background from './js/runtime/Background'
const canvas = wx.createCanvas()
export default class Main {
  constructor () {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.loader = ResourceLoader.create()
    this.loader.onLoaded(map => this.onResourceLoaded(map))
    // console.log('direct', )
    // Director.getInstance()
  }
  // 资源加载完成回调
  onResourceLoaded (res) {
    console.log('res', res)

    this.bg = new Background(this.ctx, res['background'])
    this.bg.drawImage()
  }
}
