import BaseUI from '@/js/Classes/BaseUI'
import Widget from '../ui/Widget/Widget'
import getElement from '@/js/getElement'
import styles from './Instances.module.css'
import Instance from '../ui/Instance/Instance'

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
    app.classList.add(styles.instances)

    this.btnAddInstance = getElement({
      tag: 'button',
      classes: styles.btnAddInstance,
      textContent: 'Create new instance',
    })

    app.append(this.btnAddInstance)

    return app
  }

  addInstance(instance) {
    const newInstance = Instance(instance)
    this.#instances.append(newInstance)
    newInstance.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  #clearInstances() {
    this.#instances.innerHTML = ''
  }

  renderInstances(instances) {
    this.#clearInstances()
    this.hideProcessing()

    instances.forEach((instance) => {
      this.addInstance(instance)
    })
  }

  showProcessing() {
    this.app.classList.add(styles.processing)
  }

  hideProcessing() {
    this.app.classList.remove(styles.processing)
  }
}
