
import DataStore from './../base/DataStore'
import Sprite from './../base/Sprite'
export default class Birds extends Sprite {
  constructor () {
    const image = Sprite.getImage('birds')
    const unitWidth = image.width / 3
    const screenHeight = DataStore.getInstance().screenHeight
    super(image,
      0, 0,
      unitWidth,
      image.height,
      0, screenHeight / 2 - image.height,
      unitWidth,
      image.height)
    this.screenMidHeight = screenHeight / 2
    this.unitWidth = unitWidth
    this.unitCount = 0
    this.index = 0
    this.speed = 1
    this.timer = 0
  }
  drawImage () {
    this.speed = 0.1
    this.unitCount = this.unitCount + this.speed

    if (this.index >= 3) {
      this.unitCount = 0
    }
    // 减速器
    this.index = Math.floor(this.unitCount)
    // 重力加速度
    const g = 0.98 / 2
    // 小鸟位移
    // 向上偏移量
    const offsetTop = 10
    // 想下偏移量
    const offsetY = (g * this.timer * (this.timer - offsetTop)) / 2
    this.timer++

    super.drawImage(this.img,
      this.index * this.unitWidth, 0,
      this.unitWidth,
      this.img.height,
      0, this.screenMidHeight - this.img.height + offsetY,
      this.unitWidth,
      this.img.height
    )
  }
}
