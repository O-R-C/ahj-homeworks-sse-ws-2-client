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
  #addListeners() {}

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
}
