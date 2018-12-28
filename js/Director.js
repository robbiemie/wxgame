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
  run () {
    const bg = this.dataStore.get('background')
    bg.drawImage()
  }
}
