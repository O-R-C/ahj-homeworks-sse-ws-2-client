import firesEvent from '@/js/firesEvent'

/**
 * Server API class for interacting with the server via WebSocket
 *
 * @class
 */
export default class ServerApi {
  #ws
  #url

  /**
   * Constructor
   *
   * @param {string} url - WebSocket URL
   */
  constructor(url) {
    this.#url = url
  }

  /**
   * Initializes the WebSocket and sets up event listeners
   *
   * @return {void} No return value.
   */
  init() {
    firesEvent('LOG', { id: 'all', INFO: 'Trying to connect' })
    this.#createWS()
    this.#addListeners()
  }

  /**
   * Creates the WebSocket object
   *
   * @private
   */
  #createWS() {
    this.#ws = new WebSocket(this.#url)
  }

  /**
   * Sets up event listeners for the WebSocket object
   *
   * @private
   */
  #addListeners() {
    this.#ws.addEventListener('open', this.#onOpen)
    this.#ws.addEventListener('close', this.#onClose)
    this.#ws.addEventListener('message', this.#onMessage)
  }

  /**
   * Handles the 'open' event of the WebSocket object
   *
   * @private
   */
  #onOpen = () => {
    firesEvent('LOG', { id: 'all', INFO: 'Server connected' })
  }

  /**
   * Handles the 'close' event of the WebSocket object
   *
   * @param {Event} event - The WebSocket 'close' event
   * @private
   */
  #onClose = () => {
    firesEvent('disconnected', '')
  }

  /**
   * Handles the 'message' event of the WebSocket object
   *
   * @param {MessageEvent} event - The WebSocket 'message' event
   * @private
   */
  #onMessage = ({ data }) => {
    const { event, payload } = JSON.parse(data)

    this.#eventHandlers[event] && this.#eventHandlers[event](payload)
    !this.#eventHandlers[event] && console.log('Unknown event:', event)
  }

  /**
   * Event handlers
   *
   * @private
   */
  #eventHandlers = {
    Instances: (data) => this.#handleInstances(data),
    Processing: (data) => firesEvent('LOG', { id: data.id, INFO: data.INFO }),
    CREATED: (data) => this.#handleCreated(data),
    STARTED: (data) => this.#handleStarted(data),
    STOPPED: (data) => this.#handleStopped(data),
    REMOVED: (data) => this.#handleRemoved(data),
    ERROR: (data) => this.#handleError(data),
  }

  /**
   * Handles the 'Instances' event
   *
   * @param {Array} instances - Array of instances
   * @private
   */
  #handleInstances = (instances) => {
    instances.length && firesEvent('LOG', { id: 'all', INFO: 'Instances loaded' })
    !instances.length && firesEvent('LOG', { id: 'all', INFO: 'No instances found' })
    firesEvent('LoadedInstances', instances)
  }

  /**
   * Handles the 'CREATED' event
   *
   * @param {Object} data - Instance data
   * @private
   */
  #handleCreated = (data) => {
    firesEvent('LOG', { id: data.id, INFO: 'Instance created' })
    firesEvent('CREATED', data)
  }

  /**
   * Handles the 'STARTED' event
   *
   * @param {Object} data - Instance data
   * @private
   */
  #handleStarted = (data) => {
    firesEvent('LOG', { id: data.id, INFO: 'Instance started' })
    firesEvent('STARTED', data)
  }

  /**
   * Handles the 'STOPPED' event
   *
   * @param {Object} data - Instance data
   * @private
   */
  #handleStopped = (data) => {
    firesEvent('LOG', { id: data.id, INFO: 'Instance stopped' })
    firesEvent('STOPPED', data)
  }

  /**
   * Handles the 'REMOVED' event
   *
   * @param {Object} data - Instance data
   * @private
   */
  #handleRemoved = (data) => {
    firesEvent('LOG', { id: data.id, INFO: 'Instance removed' })
    firesEvent('REMOVED', data)
  }

  #handleError = (data) => {
    firesEvent('LOG', { id: data.id, INFO: data.INFO })
  }

  /**
   * Sends a message to the server
   *
   * @param {string} event - Event name
   * @param {Object} payload - Event payload
   */
  send = (event, payload) => {
    this.#ws.send(JSON.stringify({ event, payload }))
  }
}
