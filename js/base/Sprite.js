import DataStore from './../base/DataStore'

/**
 * 精灵类
 */
export default class Sprite {
  constructor (img = null,
    srcX = 0,
    srcY = 0,
    srcW = 0,
    srcH = 0,
    ctxX = 0,
    ctxY = 0,
    ctxW = 0,
    ctxH = 0) {
    this.dataStore = DataStore.getInstance()

    this.ctx = this.dataStore.ctx
    this.img = img
    this.srcX = srcX
    this.srcY = srcY
    this.srcW = srcW
    this.srcH = srcH
    this.ctxX = ctxX
    this.ctxY = ctxY
    this.ctxW = ctxW
    this.ctxH = ctxH
  }

  drawImage (
    img = this.img,
    srcX = this.srcX,
    srcY = this.srcY,
    srcW = this.srcW,
    srcH = this.srcH,
    ctxX = this.ctxX,
    ctxY = this.ctxY,
    ctxW = this.ctxW,
    ctxH = this.ctxH) {
    this.img = img
    this.srcX = srcX
    this.srcY = srcY
    this.srcW = srcW
    this.srcH = srcH
    this.ctxX = ctxX
    this.ctxY = ctxY
    this.ctxW = ctxW
    this.ctxH = ctxH

    this.ctx.drawImage(
      img,
      srcX, srcY,
      srcW, srcH,
      ctxX, ctxY,
      ctxW, ctxH
    )
  }

  static getImage (key) {
    return DataStore.getInstance().res[key]
  }
}
