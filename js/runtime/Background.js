import Sprite from './../base/Sprite'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
export default class Background extends Sprite {
  constructor (ctx, image = null) {
    super(ctx, image,
      0, 0,
      image.width,
      image.height,
      0, 0,
      screenWidth,
      screenHeight
    )
  }
}
