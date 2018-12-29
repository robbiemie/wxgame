import DataStore from './../base/DataStore'
/**
 * 积分板类
 */
export default class Score {
  constructor (ctx) {
    this.score = 0
    this.screenWidth = DataStore.getInstance().screenWidth
    this.screenHeight = DataStore.getInstance().screenHeight
    this.ctx = DataStore.getInstance().ctx
  }

  draw (score) {
    this.ctx.font = '25px Arial'
    this.ctx.fillStyle = '#000'
    this.ctx.fillText(
      this.score,
      this.screenWidth / 2, this.screenHeight / 8,
      1000
    )
  }
}
