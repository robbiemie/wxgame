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
  createPencil () {
    const maxHeight = -DataStore.getInstance().screenHeight / 2
    const minHeight = -DataStore.getInstance().screenHeight / 4
    let top = -Math.round(Math.random() * 400)
    console.log('top', top, maxHeight, minHeight)
    if (Math.abs(top) > Math.abs(maxHeight)) {
      top = maxHeight
    } else if (Math.abs(top) < Math.abs(minHeight)) {
      top = minHeight
    }
    this.dataStore.get('pencils').push(new UpPencil(top))
    this.dataStore.get('pencils').push(new DownPencil(top))
  }
  update () {
    if (this.isGameOver) {
      // debugger
      console.log('游戏结束')
      cancelAnimationFrame(this.dataStore.get('timer'))
      this.dataStore.destory()
      return
    }
    const bg = this.dataStore.get('background')
    const land = this.dataStore.get('land')
    const birds = this.dataStore.get('birds')
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

    // 定时器
    let timer = requestAnimationFrame(_ => this.update())
    this.dataStore.put('timer', timer)
  }
}
