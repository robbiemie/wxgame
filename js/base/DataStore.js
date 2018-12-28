/**
 * 全局状态管理
 *
 */
export default class DataStore {
  constructor () {
    this.map = new Map()
  }
  static getInstance () {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore()
    }
    return DataStore.instance
  }
  put (key, value) {
    this.map.set(key, value)
    return this // 保证链式调用
  }
  get (key) {
    return this.map.get(key)
  }
  // 资源销毁
  destory () {
    this.map.clear()
    console.log('this.map', this.map)
  }
}
