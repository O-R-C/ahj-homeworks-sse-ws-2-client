import BaseUI from '@/js/Classes/BaseUI'
import Widget from '../ui/Widget/Widget'
import getElement from '@/js/getElement'
import styles from './Instances.module.css'

export default class Instances_UI extends BaseUI {
  #instances

  constructor(element) {
    super(element)

    this.#init()
  }

  #init() {
    this.#addElements()
  }

  #addElements() {
    this.#instances = this.app.querySelector(`div[class^="widget-body"]`)
  }

  createApp() {
    const app = Widget('Instances')

    const btnAddInstance = getElement({
      tag: 'button',
      classes: styles.btnAddInstance,
      textContent: 'Create new instance',
    })

    app.append(btnAddInstance)

    return app
  }
}
