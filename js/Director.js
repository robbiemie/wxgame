import DataStore from './base/DataStore'
import UpPencil from './runtime/UpPencil'
import DownPencil from './runtime/DownPencil'
export default class Director {
  constructor () {
    console.log('Director 构造器初始化')
    this.dataStore = DataStore.getInstance()
  }

  static getInstance () {
    if (!Director.instance) {
      Director.instance = new Director()
    }
    return Director.instance
  }
  // 创建铅笔实例
  createPencil () {
    const maxHeight = -DataStore.getInstance().screenHeight / 2
    const minHeight = -DataStore.getInstance().screenHeight / 4
    let top = -Math.round(Math.random() * 400)
    // console.log('top', top, maxHeight, minHeight)
    if (Math.abs(top) > Math.abs(maxHeight)) {
      top = maxHeight
    } else if (Math.abs(top) < Math.abs(minHeight)) {
      top = minHeight
    }
    this.dataStore.get('pencils').push(new UpPencil(top))
    this.dataStore.get('pencils').push(new DownPencil(top))
  }
  // 控制小鸟飞行
  birdsEvent () {
    console.log('birds', this.dataStore.get('birds').ctxY)
    console.log('land', this.dataStore.get('land').ctxY)
    this.dataStore.get('birds').timer = 0
  }
  // 检测小鸟和铅笔碰撞
  checkStroke (birdsBorder, pencilBorder) {
    if (birdsBorder.top > pencilBorder.bottom ||
      birdsBorder.bottom < pencilBorder.top ||
      birdsBorder.right < pencilBorder.left ||
      birdsBorder.left > pencilBorder.right) {
    }
  }
  // 检测小鸟和陆地碰撞
  checkGameOver () {
    const birds = this.dataStore.get('birds')
    const land = this.dataStore.get('land')
    const pencils = this.dataStore.get('pencils')
    if (birds.ctxY > land.ctxY) {
      console.log('发生碰撞', birds)
      this.isGameOver = true
    }
    // 小鸟边框模型
    const birdsBorder = {
      top: birds.ctxY,
      bottom: birds.ctxY + birds.ctxH,
      left: birds.ctxX,
      right: birds.ctxX + birds.ctxW
    }
    pencils.forEach(item => {
      const pencilBorder = {
        top: item.ctxY,
        bottom: item.ctxY + item.ctxH,
        left: item.ctxX,
        right: item.ctxX + item.ctxW
      }
      this.checkStroke(birdsBorder, pencilBorder)
    })
  }
  update () {
    this.checkGameOver()
    if (this.isGameOver) {
      // debugger
      console.log('游戏结束')
      cancelAnimationFrame(this.dataStore.get('timer'))
      this.dataStore.destory()
      wx.triggerGC()
      return
    }
    const bg = this.dataStore.get('background')
    const land = this.dataStore.get('land')
    const birds = this.dataStore.get('birds')
    const score = this.dataStore.get('score')
    // 绘制背景
    bg.drawImage()
    // 绘制铅笔
    const pencils = this.dataStore.get('pencils')
    const x = pencils[0].pencilX
    const width = pencils[0].ctxW
    if ((x + width) <= 0 &&
      pencils.length === 4) {
      pencils.shift()
      pencils.shift()
    }
    if (x < (DataStore.getInstance().screenWidth - width) / 2 && pencils.length === 2) {
      this.createPencil()
    }

    pencils.forEach(elem => {
      elem.drawImage()
    })
    // 绘制陆地
    land.drawImage()

    // 绘制小鸟
    birds.drawImage()
    // 绘制积分器
    score.draw()

    // 定时器
    let timer = requestAnimationFrame(_ => this.update())
    this.dataStore.put('timer', timer)
  }
}
