import WorkLog_UI from './WorkLog_UI'

/**
 * Work Log class - represents a work log component.
 *
 * @class
 */
export default class WorkLog {
  #ui

  /**
   * Creates an instance of WorkLog class.
   *
   * @param {HTMLElement|string} element - Element to render the component in.
   */
  constructor(element) {
    this.#ui = new WorkLog_UI(element)

    this.#init()
  }

  /**
   * Initializes the component.
   *
   * @return {void} No return value.
   */
  #init() {
    this.#addListeners()
  }

  /**
   * Adds event listeners.
   *
   * @return {void} No return value.
   */
  #addListeners() {
    document.addEventListener('LOG', this.#handleLog)
  }

  /**
   * Handles log event.
   *
   * @param {CustomEvent} e - Event object.
   * @return {void} No return value.
   */
  #handleLog = (e) => {
    this.#ui.addLog(e.detail.payload)
  }
}
