import DataStore from './../base/DataStore'
import Sprite from './../base/Sprite'
/**
 * 铅笔基类
 * @param image 资源图片
 * @param top 顶部距离
 */
export default class Pencil extends Sprite {
  constructor (image, top) {
    super(image,
      0, 0,
      image.width,
      image.height,
      0, 0,
      image.width,
      image.height)
    this.top = top
    this.pencilX = DataStore.getInstance().screenWidth
    this.speed = DataStore.getInstance().gameSpeed
  }

  drawImage () {
    if (this.pencilX < -this.img.width) {
      this.pencilX = DataStore.getInstance().screenWidth
    }

    this.pencilX -= this.speed
    super.drawImage(
      this.img,
      0, 0,
      this.img.width,
      this.img.height,
      this.pencilX, this.top,
      this.img.width,
      this.img.height
    )
  }
}
