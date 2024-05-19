import BaseUI from '@/js/Classes/BaseUI'
import Widget from '../ui/Widget/Widget'
import Log from '../ui/Log/Log'

/**
 * Work Log UI class - represents a work log component.
 *
 * @extends {BaseUI}
 * @class
 */
export default class WorkLog_UI extends BaseUI {
  /**
   * Log content element.
   *
   * @type {HTMLElement}
   * @private
   */
  #logContent

  /**
   * Creates an instance of WorkLog_UI class.
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
   * Adds elements to the component.
   *
   * @private
   */
  #addElements() {
    this.#logContent = this.app.querySelector('div[class^="widget-body"]')
  }

  /**
   * Creates app element.
   *
   * @returns {HTMLElement} - app element.
   */
  createApp() {
    const app = Widget('Work Log')
    return app
  }

  /**
   * Adds a log to the component.
   *
   * @param {Object} log - The log to be added.
   */
  addLog(log) {
    const newLog = Log(log)
    this.#logContent.append(newLog)
    newLog.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  /**
   * Clears all logs from the component.
   */
  clearLogs() {
    this.#logContent.querySelector('div').innerHTML = ''
  }
}
