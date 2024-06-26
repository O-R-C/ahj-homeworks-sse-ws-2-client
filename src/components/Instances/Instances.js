import firesEvent from '@/js/firesEvent'
import Instances_UI from './Instances_UI'

/**
 * Instances class - represents a instances component.
 *
 * @class
 * @param {HTMLElement|string} element - Element to render the component in.
 * @throws {Error} - If element is not found.
 */
export default class Instances {
  /**
   * UI instance.
   *
   * @private
   * @type {Instances_UI}
   */
  #ui

  /**
   * Creates an instance of Instances class.
   *
   * @param {HTMLElement|string} element - Element to render the component in.
   * @throws {Error} - If element is not found.
   */
  constructor(element) {
    !element && this.#throwError('Element not found')

    this.#ui = new Instances_UI(element)

    this.#init()
  }

  /**
   * Initializes the component.
   *
   * @private
   */
  #init() {
    this.#addListeners()
  }

  /**
   * Adds event listeners to the component.
   *
   * @private
   */
  #addListeners() {
    this.#ui.app.addEventListener('click', this.#handleClick)
    document.addEventListener('LoadedInstances', this.#handleLoadedInstances)
    document.addEventListener('CREATED', this.#handleCREATED)
    document.addEventListener('STARTED', this.#handleSTARTED)
    document.addEventListener('STOPPED', this.#handleSTOPPED)
    document.addEventListener('REMOVED', this.#handleREMOVED)
  }

  /**
   * Throws an error with the given message.
   *
   * @private
   * @param {string} message - The error message.
   * @throws {Error} - The error with the given message.
   */
  #throwError(message) {
    throw new Error(message)
  }

  /**
   * Event listener for 'click' event.
   *
   * @private
   * @param {Event} e - The 'click' event.
   */
  #handleClick = (e) => {
    const btn = e.target.closest('button')

    if (!btn) return

    if (this.#isBtnAdd(btn)) {
      firesEvent('CREATE', '')
      this.#ui.showProcessing()
      return
    }

    const instanceId = this.#getInstanceId(btn)

    if (this.#isBtnStart(btn)) {
      firesEvent('START', { id: instanceId })
      this.#ui.showProcessing(instanceId)
      return
    }

    if (this.#isBtnStop(btn)) {
      firesEvent('STOP', { id: instanceId })
      this.#ui.showProcessing(instanceId)
      return
    }

    if (this.#isBtnRemove(btn)) {
      firesEvent('REMOVE', { id: instanceId })
      this.#ui.showProcessing(instanceId)
      return
    }
  }

  /**
   * Checks if the given button is a add button.
   *
   * @private
   * @param {HTMLElement} btn - The button to check.
   * @returns {boolean} - True if the button is a add button, false otherwise.
   */
  #isBtnAdd(btn) {
    return btn.closest('button[class^="btn-add"]')
  }

  /**
   * Checks if the given button is a start button.
   *
   * @private
   * @param {HTMLElement} btn - The button to check.
   * @returns {boolean} - True if the button is a start button, false otherwise.
   */
  #isBtnStart(btn) {
    return btn.closest('button[class^="btn-start"]')
  }

  /**
   * Checks if the given button is a stop button.
   *
   * @private
   * @param {HTMLElement} btn - The button to check.
   * @returns {boolean} - True if the button is a stop button, false otherwise.
   */
  #isBtnStop(btn) {
    return btn.closest('button[class^="btn-stop"]')
  }

  /**
   * Checks if the given button is a remove button.
   *
   * @private
   * @param {HTMLElement} btn - The button to check.
   * @returns {boolean} - True if the button is a remove button, false otherwise.
   */
  #isBtnRemove(btn) {
    return btn.closest('button[class^="btn-remove"]')
  }

  /**
   * Event listener for 'LoadedInstances' event.
   *
   * @private
   * @param {Event} event - The 'LoadedInstances' event.
   */
  #handleLoadedInstances = (e) => {
    this.#ui.renderInstances(e.detail.payload)
  }

  /**
   * Event listener for 'CREATED' event.
   *
   * @private
   * @param {Event} event - The 'CREATED' event.
   */
  #handleCREATED = (e) => {
    this.#ui.addInstance(e.detail.payload)
    this.#ui.hideProcessing()
  }

  /**
   * Event listener for 'STARTED' event.
   *
   * @private
   * @param {Event} event - The 'STARTED' event.
   */
  #handleSTARTED = (e) => {
    const id = this.#getServerId(e.detail)
    this.#ui.toggleStatusInstance({ id, status: 'started' })
    this.#ui.hideProcessing()
  }

  /**
   * Event listener for 'STOPPED' event.
   *
   * @private
   * @param {Event} event - The 'STOPPED' event.
   */
  #handleSTOPPED = (e) => {
    const id = this.#getServerId(e.detail)
    this.#ui.toggleStatusInstance({ id, status: 'stopped' })
    this.#ui.hideProcessing()
  }

  /**
   * Event listener for 'REMOVED' event.
   *
   * @private
   * @param {Event} event - The 'REMOVED' event.
   */
  #handleREMOVED = (e) => {
    const id = this.#getServerId(e.detail)
    this.#ui.removeInstance({ id })
    this.#ui.hideProcessing()
  }

  /**
   * Gets the ID of the instance from the given button.
   * @param {HTMLElement} btn - The button to get the ID from.
   * @returns {string} - The ID of the instance.
   * @private
   */
  #getInstanceId(btn) {
    return btn.closest('div[class^="instance"]').dataset.id
  }

  /**
   * Gets the ID of the server from the given event detail.
   * @param {Object} detail - The event detail to get the ID from.
   * @returns {string} - The ID of the server.
   * @private
   */
  #getServerId(detail) {
    return detail.payload.id
  }
}
