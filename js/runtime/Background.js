import DataStore from './../base/DataStore'
import Sprite from './../base/Sprite'

export default class Background extends Sprite {
  constructor () {
    const image = Sprite.getImage('background')
    const screenWidth = DataStore.getInstance().screenWidth
    const screenHeight = DataStore.getInstance().screenHeight
    super(image,
      0, 0,
      image.width,
      image.height,
      0, 0,
      screenWidth,
      screenHeight
    )
    // console.log('sprite', Sprite.getImage('background'))
  }
}
