import DataStore from './../base/DataStore'
import Pencil from './Pencil'
export default class UpPencil extends Pencil {
  constructor (top) {
    const image = DataStore.getInstance().res['pencilUp']
    super(image, top)
  }
  drawImage () {
    super.drawImage()
  }
}
