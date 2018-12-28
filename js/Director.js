import DataStore from './base/DataStore'
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
  update () {
    const bg = this.dataStore.get('background')
    const land = this.dataStore.get('land')
    // 绘制背景
    bg.drawImage()
    // 绘制陆地
    land.drawImage()
    // 定时器
    let timer = requestAnimationFrame(_ => this.update())
    this.dataStore.put('timer', timer)
  }
}
