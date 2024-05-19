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

    this.#isBtnStart(btn) && firesEvent('START', { id: btn.dataset.id })
    this.#isBtnStop(btn) && firesEvent('STOP', { id: btn.dataset.id })
    this.#isBtnRemove(btn) && firesEvent('REMOVE', { id: btn.dataset.id })
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
  }
}
