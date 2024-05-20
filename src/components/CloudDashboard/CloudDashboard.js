import CloudDashboard_UI from './CloudDashboard_UI'

/**
 * Cloud Dashboard class - represents a cloud dashboard component.
 *
 * @class
 */
export default class CloudDashboard {
  /**
   * UI instance.
   *
   * @private
   * @type {CloudDashboard_UI}
   */
  #ui

  /**
   * WebSocket instance.
   *
   * @private
   * @type {ServerApi}
   */
  #ws

  /**
   * Creates an instance of CloudDashboard class.
   *
   * @param {HTMLElement|string} element - Element to render the component in.
   * @param {string} url - WebSocket URL.
   * @param {ServerApi} ServerApi - Server API instance.
   */
  constructor(element, url, ServerApi) {
    !element && this.#throwError('Element not found')
    !ServerApi && this.#throwError('Server API is not provided')
    !url && this.#throwError('Server URL is not provided')

    this.#ui = new CloudDashboard_UI(element)
    this.#ws = new ServerApi(url)

    this.#init()
  }

  /**
   * Throws an error with the provided message.
   *
   * @private
   * @param {string} message - Error message.
   */
  #throwError(message) {
    throw new Error(message)
  }

  /**
   * Initializes the component.
   *
   * @private
   */
  #init() {
    this.#ws.init()
    this.#addListeners()
  }

  /**
   * Adds event listeners.
   *
   * @private
   */
  #addListeners() {
    document.addEventListener('CREATE', this.#handleCREATE)
    document.addEventListener('START', this.#handleSTART)
    document.addEventListener('STOP', this.#handleSTOP)
    document.addEventListener('REMOVE', this.#handleREMOVE)
    document.addEventListener('disconnected', this.#handleDisconnected)
  }

  /**
   * Handles the 'CREATE' event.
   *
   * @private
   * @param {CustomEvent} e - The 'CREATE' event.
   */
  #handleCREATE = (e) => {
    console.log('🚀 ~ e:', e)
    this.#ws.send('CREATE', e.detail.payload)
  }

  /**
   * Handles the 'START' event.
   *
   * @private
   * @param {CustomEvent} e - The 'START' event.
   */
  #handleSTART = (e) => {
    console.log('🚀 ~ e:', e)
    this.#ws.send('START', e.detail.payload)
  }

  /**
   * Handles the 'STOP' event.
   *
   * @private
   * @param {CustomEvent} e - The 'STOP' event.
   */
  #handleSTOP = (e) => {
    console.log('🚀 ~ e:', e)
    this.#ws.send('STOP', e.detail.payload)
  }

  /**
   * Handles the 'REMOVE' event.
   *
   * @private
   * @param {CustomEvent} e - The 'REMOVE' event.
   */
  #handleREMOVE = (e) => {
    console.log('🚀 ~ e:', e)
    this.#ws.send('REMOVE', e.detail.payload)
  }

  /**
   * Handles the 'disconnected' event.
   *
   * @private
   * @param {CustomEvent} e - The 'disconnected' event.
   */
  #handleDisconnected = (e) => {
    this.#ui.openDialog('Connection error, please reload the page and try again')
  }
}
