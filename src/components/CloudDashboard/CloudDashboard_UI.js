import BaseUI from '@/js/Classes/BaseUI'
import getElement from '@/js/getElement'
import styles from './CloudDashboard.module.css'
import WorkLog from '../WorkLog/WorkLog'
import Instances from '../Instances/Instances'

/**
 * Cloud Dashboard UI class - represents a cloud dashboard component.
 *
 * @extends {BaseUI}
 * @class
 */
export default class CloudDashboard_UI extends BaseUI {
  /**
   * Creates an instance of CloudDashboard_UI class.
   *
   * @param {HTMLElement|string} element - Element to render the component in.
   */
  constructor(element) {
    super(element)

    this.#init()
  }

  /**
   * Initializes the component.
   *
   * @private
   */
  #init() {
    this.#addElements()
  }

  /**
   * Adds all necessary elements to the component.
   *
   * @private
   */
  #addElements() {
    new WorkLog(this.workLogContainer)
    new Instances(this.instancesListContainer)
  }

  /**
   * Creates app element.
   *
   * @returns {HTMLElement} - app element.
   */
  createApp() {
    const app = getElement({
      tag: 'div',
      classes: styles.cloudDashboard,
    })

    this.dialog = getElement({
      tag: 'dialog',
      classes: styles.dialog,
    })

    this.instancesListContainer = getElement({
      tag: 'div',
      classes: styles.instancesListContainer,
    })

    this.workLogContainer = getElement({
      tag: 'div',
      classes: styles.workLogContainer,
    })

    app.append(this.dialog, this.instancesListContainer, this.workLogContainer)

    return app
  }

  /**
   * Opens the dialog.
   *
   * @param {string} message - The message to be displayed in the dialog.
   */
  openDialog(message) {
    this.dialog.textContent = message
    this.dialog.showModal()
  }
}
