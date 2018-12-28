import Sprite from './../base/Sprite'
/**
 * 铅笔基类
 * @param image 资源图片
 * @param top 顶部距离
 */
export default class Pencil extends Sprite {
  constructor () {
    const image = Sprite.getImage('')
    super(image)
  }
}
