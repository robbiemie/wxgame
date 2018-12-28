/**
 * 精灵类
 */
export default class Sprite {
  constructor (ctx = null,
    img = null,
    srcX = 0,
    srcY = 0,
    srcW = 0,
    srcH = 0,
    ctxX = 0,
    ctxY = 0,
    ctxW = 0,
    ctxH = 0) {
    this.ctx = ctx
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
  drawImage () {
    this.ctx.drawImage(
      this.img,
      this.srcX,
      this.srcY,
      this.srcW,
      this.srcH,
      this.ctxX,
      this.ctxY,
      this.ctxW,
      this.ctxH
    )
  }
}
