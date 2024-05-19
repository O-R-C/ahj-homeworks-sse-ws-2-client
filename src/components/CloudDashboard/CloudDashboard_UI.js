import BaseUI from '@/js/Classes/BaseUI'
import getElement from '@/js/getElement'
import styles from './CloudDashboard.module.css'
import WorkLog from '../WorkLog/WorkLog'

export default class CloudDashboard_UI extends BaseUI {
  constructor(element) {
    super(element)

    this.#init()
  }

  #init() {
    this.#addElements()
  }

  #addElements() {
    new WorkLog(this.workLogContainer)
  }

  createApp() {
    const app = getElement({
      tag: 'div',
      classes: styles.cloudDashboard,
    })

    this.instancesListContainer = getElement({
      tag: 'div',
      classes: styles.instancesListContainer,
    })

    this.workLogContainer = getElement({
      tag: 'div',
      classes: styles.workLogContainer,
    })

    app.append(this.instancesListContainer, this.workLogContainer)

    return app
  }
}
