import DataStore from './../base/DataStore'
import Sprite from './../base/Sprite'
export default class Land extends Sprite {
  constructor () {
    const image = Sprite.getImage('land')
    const screenHeight = DataStore.getInstance().screenHeight
    super(image,
      0, 0,
      image.width,
      image.height,
      0, screenHeight - image.height, // 置底
      image.width,
      image.height
    )
    this.landX = 0
    this.LandSpeed = 2
    this.screenWidth = DataStore.getInstance().screenWidth
  }
  drawImage () {
    this.landX -= this.LandSpeed
    if (Math.abs(this.landX) > (this.img.width - this.screenWidth)) {
      this.landX = 0
    }
    super.drawImage(
      this.img,
      this.srcX,
      this.srcY,
      this.srcW,
      this.srcH,
      this.landX,
      this.ctxY,
      this.ctxW,
      this.ctxH

    )
  }
}
