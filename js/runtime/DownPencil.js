import DataStore from './../base/DataStore'
import Pencil from './Pencil'

export default class DownPencil extends Pencil {
  constructor (top) {
    const image = DataStore.getInstance().res['pencilDown']
    const gap = DataStore.getInstance().screenHeight / 4
    const _top = top + gap + image.height
    super(image, _top)
  }
  drawImage () {
    super.drawImage()
  }
}
